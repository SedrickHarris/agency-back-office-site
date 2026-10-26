# Migration and Redirect Plan

## Purpose

Protect existing search equity and user access if an existing Agency Back Office website is replaced or URLs change.

## Pre-Migration Inventory

Before launch, collect:

- all existing indexable URLs
- current page titles
- current canonical tags
- indexed URLs from Search Console
- backlinks to important URLs
- existing redirects
- high-traffic landing pages

## Redirect Mapping

For each old URL, assign:

- exact new equivalent, or
- closest relevant replacement

Use permanent 301 redirects for genuine route moves.

## Implementation

Redirects are implemented in `public/_redirects`. The site is a static export, so `next.config` redirects cannot be used (see `nextjs-technical-architecture.md`).

`public/_redirects` stays empty until a real inventory of old URLs exists. Verify the file syntax and limits against Cloudflare's official documentation before adding rules.

## Avoid

- redirecting every old page to the homepage
- redirect chains
- redirect loops
- deleting valuable content without replacement
- changing URLs unnecessarily

## Launch Checks

- test all redirects
- confirm canonicals
- generate sitemap
- verify robots rules
- inspect top URLs
- monitor 404s
- watch indexing changes

## If No Existing Site Exists

Keep this document as the future change-control process for any route changes after launch.
