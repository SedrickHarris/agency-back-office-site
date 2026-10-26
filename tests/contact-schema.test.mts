// Step-level checks for shared/contact-schema.ts (the rules the client form uses).
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  stepOfField,
  validateStep,
} from "../shared/contact-schema.ts";

describe("contact schema steps", () => {
  it("step 1 has no required answer", () => {
    assert.deepEqual(validateStep(1, {}), {});
    assert.deepEqual(validateStep(1, { role: "freelancer" }), {});
  });

  it("step 2 requires a topic and a message", () => {
    assert.deepEqual(validateStep(2, {}), {
      topic: "topic-required",
      message: "message-empty",
    });
    assert.deepEqual(validateStep(2, { topic: "sessions", message: "   " }), {
      message: "message-empty",
    });
  });

  it("trims before measuring the message", () => {
    assert.deepEqual(validateStep(2, { topic: "other", message: "   short   " }), {
      message: "message-short",
    });
  });

  it("step 3 requires name, phone and email", () => {
    assert.deepEqual(validateStep(3, {}), {
      name: "name-required",
      phone: "phone-empty",
      email: "email-empty",
    });
  });

  it("limits the name to 100 characters", () => {
    assert.deepEqual(validateStep(3, { name: "a".repeat(100), phone: "5551234567", email: "a@b.co" }), {});
    assert.deepEqual(validateStep(3, { name: "a".repeat(101), phone: "5551234567", email: "a@b.co" }), {
      name: "name-required",
    });
  });

  it("maps fields to steps", () => {
    assert.equal(stepOfField("role"), 1);
    assert.equal(stepOfField("message"), 2);
    assert.equal(stepOfField("email"), 3);
  });
});
