# Advanced Admin Features

This document explains the upgraded admin system for the portfolio project.

## Overview

The admin dashboard is becoming a lightweight CRM and automation center. It now manages:

- Leads from the public contact form
- Message and auto-response logs
- Visitor analytics
- Automation workflows
- Jobs, gigs, and opportunities

The dashboard lives at:

```txt
/admin
```

## Leads

Leads are contact form submissions from the website.

Current features:

- View all contact form leads
- Search by name, email, phone, company, service, status, or message
- Filter by lead status
- View full lead details
- See the submitted message
- Email a lead from inside the dashboard using Resend
- Update lead status
- Delete a lead

Lead statuses:

- `new`
- `contacted`
- `qualified`
- `converted`
- `archived`

Supabase table:

```txt
leads
```

## Messages

Messages are logs of automated replies or workflow email actions.

Current features:

- View logged auto-responses from contact form submissions
- View workflow email logs
- See recipient, subject, type, status, and date

Important note:

Messages are logged to Supabase. If `RESEND_API_KEY` is configured, manual lead replies can also be sent through Resend.

Supabase table:

```txt
messages
```

## Visits

Visits track website page views.

Current features:

- View recent visits
- See page path, referrer, duration, and date
- View page view chart
- View traffic source chart

Supabase table:

```txt
visits
```

## Workflows

Workflows are automation rules.

Current features:

- Create workflows
- Select trigger type
- Select action type
- Configure action fields
- Toggle active/inactive
- Execute a workflow manually
- Delete workflows

Supported triggers:

- `lead_created`
- `visit_recorded`
- `scheduled`
- `manual`

Supported actions:

- `notification`: logs a notification-style action result
- `send_email`: logs an email message to the `messages` table
- `webhook`: calls an external webhook URL

Supabase tables:

```txt
automation_workflows
automation_logs
messages
```

## Jobs And Gigs

Jobs are opportunities, freelance gigs, or applications you want to track.

Current features:

- Create a new job/gig from the admin dashboard
- Add title, company/client, location, budget/salary, URL, description
- Set priority
- Set status
- Update status and priority inline
- Open job URL
- Delete job

Job statuses:

- `saved`
- `applied`
- `interviewed`
- `offered`
- `rejected`

Job priorities:

- `high`
- `medium`
- `low`

Supabase table:

```txt
jobs
```

## Current Limitations

The following are not fully connected yet:

- Admin login/auth protection
- Scheduled workflow execution
- Lead notes with follow-up reminders
- File uploads or attachments
- Full workflow history UI
- Verified custom sender domain for production email sending

## Recommended Next Steps

1. Add admin authentication before deployment.
2. Verify a custom sender domain in Resend for production email sending.
3. Add lead notes and follow-up reminders.
4. Add a workflow execution history tab.
5. Add dashboard analytics for lead conversion and job pipeline health.

## Environment

The app needs these Supabase variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

After changing keys, restart the dev server.

## Verification

Use this command to confirm Supabase tables are reachable:

```bash
npm run supabase:check
```

Use this command to verify TypeScript:

```bash
npx tsc --noEmit
```
