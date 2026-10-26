"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  CONTACT_PATH,
  SUBMIT_TIMEOUT_MS,
  contactEvents,
  errorSummary,
  fieldConfig,
  fieldErrors,
  notices,
  roleOptions,
  survey,
  topicOptions,
} from "@/data/contact";
import { trackEvent } from "@/lib/analytics";
import {
  STEP_FIELDS,
  stepOfField,
  validateField,
  validateStep,
  type ContactErrors,
  type ContactField,
  type ContactStep,
  type ContactValues,
} from "@/shared/contact-schema";
import { SiteLink } from "@/components/ui/SiteLink";
import { ErrorSummary, type SummaryItem } from "./survey/ErrorSummary";
import { Notice } from "./survey/Notice";
import { PillGroup } from "./survey/PillGroup";
import { StepIndicator } from "./survey/StepIndicator";
import { SuccessPanel } from "./survey/SuccessPanel";
import { TextArea } from "./survey/TextArea";
import { TextField } from "./survey/TextField";
import { TurnstileWidget, loadTurnstileScript } from "./survey/TurnstileWidget";

type Status = "idle" | "sending" | "success";
type NoticeKind = "verification" | "network" | "server";
type FocusTarget = "heading" | "summary" | "notice" | "success";

const EMPTY_VALUES: ContactValues = {
  role: "",
  topic: "",
  message: "",
  name: "",
  phone: "",
  email: "",
};

// Public site key. Set in the environment; there is no default.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const KNOWN_FIELDS = new Set<string>(["role", "topic", "message", "name", "phone", "email"]);

// Analytics parameters carry only the page path, step numbers, field names and
// selected option values. Never a name, phone number, email address, or message.
function track(
  name: (typeof contactEvents)[keyof typeof contactEvents],
  params: Record<string, string | number> = {},
) {
  trackEvent(name, { page_path: CONTACT_PATH, ...params });
}

export function ContactSurvey() {
  const [step, setStep] = useState<ContactStep>(1);
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [summaryKind, setSummaryKind] = useState<"continue" | "send" | null>(null);
  const [notice, setNotice] = useState<NoticeKind | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const [announce, setAnnounce] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [focusTick, setFocusTick] = useState(0);

  const token = useRef<string | null>(null);
  const pendingFocus = useRef<FocusTarget | null>(null);
  const focusedFields = useRef(new Set<string>());
  const scriptRequested = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const sending = status === "sending";

  function requestFocus(target: FocusTarget) {
    pendingFocus.current = target;
    setFocusTick((tick) => tick + 1);
  }

  // Moves focus after the render that shows the new step, summary, or notice.
  useEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;
    pendingFocus.current = null;
    const element =
      target === "heading"
        ? headingRef.current
        : target === "summary"
          ? summaryRef.current
          : target === "notice"
            ? noticeRef.current
            : successRef.current;
    element?.focus();
  }, [focusTick]);

  // contact_form_view: once, the first time the survey enters the viewport.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track(contactEvents.formView);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  // contact_step_view: every time a step is shown, including step 1 on load.
  useEffect(() => {
    track(contactEvents.stepView, { step });
  }, [step]);

  // Load the Turnstile script on the first pill or field interaction, so the
  // check is ready by step 3.
  function onInteract() {
    if (scriptRequested.current || !TURNSTILE_SITE_KEY) return;
    scriptRequested.current = true;
    loadTurnstileScript().catch(() => {
      scriptRequested.current = false;
    });
  }

  // contact_field_focus: once per field per page load.
  function onFieldFocus(field: ContactField) {
    if (focusedFields.current.has(field)) return;
    focusedFields.current.add(field);
    track(contactEvents.fieldFocus, { field });
  }

  function goToStep(next: ContactStep) {
    setStep(next);
    setErrors({});
    setAttempted(false);
    setSummaryKind(null);
    setNotice(null);
    setAnnounce(survey.progress(next));
    requestFocus("heading");
  }

  function showErrors(found: ContactErrors, kind: "continue" | "send", forStep: ContactStep) {
    setErrors(found);
    setAttempted(true);
    setSummaryKind(kind);
    track(contactEvents.error, {
      step: forStep,
      error_type: "validation",
      field_count: Object.keys(found).length,
    });
    requestFocus("summary");
  }

  function showNotice(kind: NoticeKind) {
    setNotice(kind);
    // A token can be used once. Start a fresh check after any failure.
    setResetSignal((signal) => signal + 1);
    track(contactEvents.error, { step: 3, error_type: kind });
    requestFocus("notice");
  }

  function setValue(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear an existing error as soon as the answer becomes valid. Errors are
    // only ever raised on submit or blur, never on each keystroke.
    if (errors[field] && !validateField(field, value)) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  // After a failed attempt, re-check one field and clear its error as soon as
  // it is valid. Never on focus or on each keystroke.
  function revalidate(field: ContactField, value: string) {
    const code = validateField(field, value);
    setErrors((current) => {
      const next = { ...current };
      if (code) next[field] = code;
      else delete next[field];
      return next;
    });
  }

  function onPillChange(field: "role" | "topic", value: string) {
    setValue(field, value);
    if (attempted) revalidate(field, value);
  }

  function onBlurField(field: ContactField) {
    if (attempted) revalidate(field, values[field]);
  }

  function handleNext() {
    const found = validateStep(step, values);
    if (Object.keys(found).length > 0) {
      showErrors(found, "continue", step);
      return;
    }
    track(contactEvents.stepComplete, {
      step,
      ...(step === 1 ? { role: values.role } : {}),
      ...(step === 2 ? { topic: values.topic } : {}),
    });
    goToStep((step + 1) as ContactStep);
  }

  function handleBack() {
    if (step > 1) goToStep((step - 1) as ContactStep);
  }

  async function handleSend() {
    if (sending) return;

    const found = validateStep(3, values);
    if (Object.keys(found).length > 0) {
      showErrors(found, "send", 3);
      return;
    }
    if (!token.current) {
      showNotice("verification");
      return;
    }

    setNotice(null);
    setSummaryKind(null);
    setStatus("sending");
    setAnnounce(survey.sendingStatus);
    // Locking the fields can drop focus from a field. Keep it on the button.
    submitRef.current?.focus();
    track(contactEvents.submit, { topic: values.topic, role: values.role });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: values.role,
          topic: values.topic,
          message: values.message,
          name: values.name,
          phone: values.phone,
          email: values.email,
          website,
          token: token.current,
        }),
        signal: controller.signal,
      });

      let data: { ok?: boolean; code?: string; errors?: Record<string, string> } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (data?.ok === true) {
        setFirstName(values.name.trim().split(/\s+/)[0] ?? "");
        setStatus("success");
        setAnnounce("");
        track(contactEvents.success, { topic: values.topic, role: values.role });
        requestFocus("success");
        return;
      }

      setStatus("idle");
      setAnnounce("");

      if (data?.code === "validation" && data.errors) {
        // The Function is the authority. Send the visitor back to the earliest
        // step with a problem, with that step's summary.
        const fields = Object.keys(data.errors).filter((key) =>
          KNOWN_FIELDS.has(key),
        ) as ContactField[];
        if (fields.length > 0) {
          const target = Math.min(...fields.map(stepOfField)) as ContactStep;
          const stepErrors: ContactErrors = {};
          for (const field of STEP_FIELDS[target]) {
            const code = validateField(field, values[field]);
            if (code) stepErrors[field] = code;
          }
          if (Object.keys(stepErrors).length > 0) {
            setStep(target);
            showErrors(stepErrors, target === 3 ? "send" : "continue", target);
            return;
          }
        }
        showNotice("server");
        return;
      }

      showNotice(data?.code === "verification" ? "verification" : "server");
    } catch {
      setStatus("idle");
      setAnnounce("");
      showNotice("network");
    } finally {
      clearTimeout(timer);
    }
  }

  // Pressing a button with the mouse would blur the focused field first, and
  // the blur check can add or remove an error message above the button. The
  // layout shift moves the button out from under the pointer and the click is
  // lost. Keeping focus where it is avoids that; the click still validates.
  function keepFieldFocus(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 3) handleNext();
    else void handleSend();
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setWebsite("");
    setFirstName("");
    setStatus("idle");
    setAnnounce("");
    token.current = null;
    setResetSignal((signal) => signal + 1);
    goToStep(1);
  }

  const errorText = (field: ContactField) =>
    errors[field] ? fieldErrors[errors[field]!] : undefined;

  const summaryItems: SummaryItem[] = STEP_FIELDS[step]
    .filter((field) => errors[field])
    .map((field) => ({
      targetId:
        field === "role"
          ? `ct-role-${roleOptions[0].value}`
          : field === "topic"
            ? `ct-topic-${topicOptions[0].value}`
            : `ct-${field}`,
      message: fieldErrors[errors[field]!],
    }));

  const showSummary = summaryKind !== null && summaryItems.length > 0;
  const stepCopy = survey.steps[step];

  return (
    <div className="ct-panel" ref={panelRef}>
      <h2 id="h-survey" className="ct-h2">
        {survey.h2}
      </h2>

      <noscript>
        <style>{".ct-live,.ct-form,.ct-progress{display:none}"}</style>
        <p className="ct-noscript">{survey.noscript}</p>
      </noscript>

      {/* Announces step changes and the sending state to screen readers. */}
      <p className="sr-only ct-live" role="status" aria-live="polite">
        {announce}
      </p>

      {status === "success" ? (
        <SuccessPanel
          firstName={firstName}
          headingRef={successRef}
          onReset={handleReset}
        />
      ) : (
        <>
          <StepIndicator step={step} />

          <form
            className="ct-form"
            noValidate
            onSubmit={onSubmit}
            onFocusCapture={onInteract}
            onPointerDownCapture={onInteract}
            aria-labelledby="h-survey"
          >
            {showSummary ? (
              <ErrorSummary
                heading={
                  summaryKind === "send"
                    ? errorSummary.send(summaryItems.length)
                    : errorSummary.continue(summaryItems.length)
                }
                items={summaryItems}
                headingRef={summaryRef}
              />
            ) : null}

            <div key={step}>
              {step === 1 ? (
                <PillGroup
                  name="role"
                  question={stepCopy.question}
                  qualifier={stepCopy.qualifier}
                  helper={stepCopy.helper}
                  options={roleOptions}
                  value={values.role}
                  error={errorText("role")}
                  headingRef={headingRef}
                  onChange={(value) => onPillChange("role", value)}
                  onFocus={() => onFieldFocus("role")}
                />
              ) : null}

              {step === 2 ? (
                <>
                  <PillGroup
                    name="topic"
                    question={stepCopy.question}
                    qualifier={stepCopy.qualifier}
                    options={topicOptions}
                    value={values.topic}
                    error={errorText("topic")}
                    headingRef={headingRef}
                    onChange={(value) => onPillChange("topic", value)}
                    onFocus={() => onFieldFocus("topic")}
                  />
                  <TextArea
                    id="ct-message"
                    name="message"
                    label={fieldConfig.message.label}
                    qualifier={fieldConfig.message.qualifier}
                    helper={fieldConfig.message.helper}
                    rows={fieldConfig.message.rows ?? 6}
                    value={values.message}
                    error={errorText("message")}
                    onChange={(value) => setValue("message", value)}
                    onBlur={() => onBlurField("message")}
                    onFocus={() => onFieldFocus("message")}
                  />
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <fieldset className="ct-group" disabled={sending}>
                    <legend>
                      <h3 className="ct-q" tabIndex={-1} ref={headingRef}>
                        {stepCopy.question}
                      </h3>
                    </legend>
                    {(["name", "phone", "email"] as const).map((field) => {
                      const config = fieldConfig[field];
                      return (
                        <TextField
                          key={field}
                          id={`ct-${field}`}
                          name={field}
                          label={config.label}
                          qualifier={config.qualifier}
                          helper={config.helper}
                          type={config.type}
                          inputMode={config.inputMode}
                          autoComplete={config.autoComplete}
                          value={values[field]}
                          error={errorText(field)}
                          onChange={(value) => setValue(field, value)}
                          onBlur={() => onBlurField(field)}
                          onFocus={() => onFieldFocus(field)}
                        />
                      );
                    })}
                  </fieldset>

                  {/* Honeypot: hidden from people and assistive technology. */}
                  <div className="ct-hp" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>

                  {TURNSTILE_SITE_KEY ? (
                    <div
                      className="ct-security"
                      role="group"
                      aria-labelledby="ct-security-label"
                    >
                      <p id="ct-security-label" className="ct-fl">
                        {survey.securityCheck}
                      </p>
                      <TurnstileWidget
                        siteKey={TURNSTILE_SITE_KEY}
                        resetSignal={resetSignal}
                        onToken={(value) => {
                          token.current = value;
                        }}
                      />
                    </div>
                  ) : null}

                  <p className="ct-privacy">
                    {survey.privacy.before}
                    <SiteLink href={survey.privacy.href}>
                      {survey.privacy.linkText}
                    </SiteLink>
                    {survey.privacy.after}
                  </p>
                </>
              ) : null}
            </div>

            {notice ? (
              <Notice message={notices[notice]} noticeRef={noticeRef} />
            ) : null}

            <div className="ct-actions">
              <button
                type="submit"
                className="btn ct-btn"
                ref={submitRef}
                aria-disabled={sending || undefined}
                onMouseDown={keepFieldFocus}
              >
                {step < 3 ? survey.next : sending ? survey.sending : survey.send}
              </button>
              {step > 1 && !sending ? (
                <button
                  type="button"
                  className="ct-back"
                  onClick={handleBack}
                  onMouseDown={keepFieldFocus}
                >
                  {survey.back}
                </button>
              ) : null}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
