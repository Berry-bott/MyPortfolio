# Admin Dashboard Setup Guide

Complete guide to initialize and use your production-ready admin dashboard with real database integration.

## Quick Start - 5 Minutes

### 1. Initialize Database Tables

**Via Supabase Dashboard (Easiest):**

1. Go to https://app.supabase.com and open your project
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy all content from `scripts/setup-database.sql`
5. Paste into the SQL editor
6. Click **Run**

**Expected:** All tables created successfully (leads, visits, workflows, jobs, etc.)

### 2. Verify Environment Variables

Check your `.env.local` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access Admin Dashboard

Navigate to: `http://localhost:3000/admin`

You should see:
- Real-time metrics (leads, visits, conversion rate, avg duration)
- Leads management with filtering
- Visit analytics with charts
- Automation workflows interface
- Job tracking system

## Step-by-Step Setup

### Step 1: Database Migration

Run the SQL migration script to create all tables:

```sql
-- File: scripts/setup-database.sql
-- Contains:
-- - leads table
-- - visits table
-- - automation_workflows table
-- - automation_logs table
-- - jobs table
-- - messages table
-- - analytics table
```

**Check migration succeeded:**
```sql
SELECT COUNT(*) as table_count FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should return: 7
```

### Step 2: Test API Endpoints

#### Test Lead Creation
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Tech Corp",
    "service": "Web Development"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "leadId": "uuid-string"
}
```

#### Test Visit Tracking
```bash
curl -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{
    "page": "/projects",
    "referrer": "google.com",
    "duration": 120
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Visit tracked successfully"
}
```

#### Test Workflow Creation
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Welcome Email",
    "trigger_type": "lead_created",
    "actions": [
      {
        "type": "send_email",
        "config": {
          "subject": "Welcome!",
          "template": "welcome"
        }
      }
    ]
  }'
```

### Step 3: Enable Real-Time Visit Tracking

Visit tracking is automatically integrated. To test:

1. Open your website in browser: `http://localhost:3000`
2. Navigate between pages
3. Go to `/admin` → **Visits** tab
4. You should see recent visits appearing

Visits are tracked automatically on page load via the tracking hook.

### Step 4: Create Your First Automation Workflow

**Via Admin Dashboard:**

1. Navigate to `http://localhost:3000/admin`
2. Click **Workflows** tab
3. Click **New Workflow** button
4. Fill in:
   - **Name:** "Send Welcome Email"
   - **Trigger Type:** "Lead Created"
5. Click **Create Workflow**

**Via API:**
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Send Welcome Email",
    "trigger_type": "lead_created",
    "is_active": true,
    "actions": [
      {
        "type": "send_email",
        "config": {
          "recipient": "default@example.com",
          "subject": "Welcome to Dev.AI!",
          "body": "Thanks for reaching out!"
        }
      }
    ]
  }'
```

### Step 5: Execute a Workflow

**Via Dashboard:**
1. Go to `/admin` → **Workflows** tab
2. Find your workflow
3. Click the **Play** (▶) button to execute

**Via API:**
```bash
curl -X POST http://localhost:3000/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "your-workflow-uuid",
    "triggerData": {
      "email": "test@example.com",
      "name": "Test User"
    }
  }'
```

## Production Deployment

### 1. Add Environment Variables to Vercel

In your Vercel project settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
POSTGRES_URL=your-postgres-url (if using connection pooling)
POSTGRES_PRISMA_URL=your-prisma-url (if using Prisma)
```

### 2. Run Database Migration on Production

Same as Step 1, but in your **production** Supabase project.

### 3. Deploy to Vercel

```bash
git add .
git commit -m "Add production admin dashboard"
git push
```

Or click **Publish** in v0.app.

## Advanced Customization

### Add Custom Workflow Actions

Edit `/app/api/workflows/execute/route.ts`:

```typescript
async function executeAction(action: WorkflowAction, triggerData: any) {
  const { type, config } = action

  switch (type) {
    case 'your_custom_action':
      return await yourCustomAction(config, triggerData)
    // ... other cases
  }
}

async function yourCustomAction(config: any, triggerData: any) {
  // Implement your action logic
  return { success: true }
}
```

### Connect Real Email Service

#### Using Resend

1. Install: `npm install resend`
2. Add API key: `RESEND_API_KEY=your-key` to `.env.local`
3. Update `sendEmailAction` in `/app/api/workflows/execute/route.ts`:

```typescript
import { Resend } from 'resend'

async function sendEmailAction(config: any, triggerData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  const response = await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: config.recipient || triggerData.email,
    subject: config.subject,
    html: config.body || '<h1>Welcome!</h1>',
  })
  
  return response
}
```

#### Using SendGrid

1. Install: `npm install @sendgrid/mail`
2. Add API key: `SENDGRID_API_KEY=your-key`
3. Update `sendEmailAction`:

```typescript
import sgMail from '@sendgrid/mail'

async function sendEmailAction(config: any, triggerData: any) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
  
  await sgMail.send({
    to: config.recipient || triggerData.email,
    from: 'noreply@yourdomain.com',
    subject: config.subject,
    html: config.body,
  })
  
  return { success: true }
}
```

### Enable Admin Authentication

1. Set up Supabase Auth in your project
2. Create protected route middleware
3. Update admin page to require authentication

```typescript
// app/admin/middleware.ts
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(...)
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

### Custom Analytics Metrics

Add to your application:

```typescript
// Track custom events
await fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    metric_name: 'feature_used',
    metric_value: 1,
    dimension_1: 'feature_name',
  })
})
```

## Monitoring & Debugging

### View Server Logs

In your development terminal, look for:
```
[v0] Visit tracked: { page: '/', referrer: 'direct', ... }
[v0] New lead captured: { email: 'test@example.com', ... }
[v0] Workflow executed: { workflowId: 'xxx', actionsExecuted: 1, ... }
[v0] Automation workflow created: { name: 'xxx', ... }
```

### Check Database Directly

In Supabase SQL Editor:

```sql
-- View recent leads
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- View visit analytics
SELECT page_path, COUNT(*) as views 
FROM visits 
GROUP BY page_path;

-- View workflow executions
SELECT * FROM automation_logs 
ORDER BY executed_at DESC LIMIT 20;

-- View job statistics
SELECT status, COUNT(*) as count 
FROM jobs 
GROUP BY status;
```

### Monitor API Errors

Check browser console (F12) for API errors, or server terminal for backend logs.

## Troubleshooting

### Dashboard shows "No data"

**Check:**
1. Supabase connection strings in `.env.local`
2. Database tables exist (run SQL migration)
3. API endpoints accessible via curl commands
4. RLS policies allow reads (should be enabled by default)

**Fix:**
```bash
# Restart dev server
npm run dev

# Check Supabase status
# Visit https://app.supabase.com/
```

### Visits not appearing

1. Verify API is reachable: `curl http://localhost:3000/api/visits`
2. Check browser console for fetch errors
3. Ensure page loads successfully

### Workflows not executing

1. Check automation_logs table for errors
2. Verify workflow is marked as active
3. Review action configuration
4. Check server logs for `[v0]` messages

### Database permission errors

1. Check RLS policies in Supabase
2. Verify service role key is correct
3. Ensure tables were created successfully

## Next Steps

1. ✅ Database set up
2. ✅ APIs tested
3. ✅ Admin dashboard working
4. ⏭️ Add authentication for security
5. ⏭️ Connect email service
6. ⏭️ Deploy to production
7. ⏭️ Monitor and iterate

## File Structure

```
admin-system/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard main page
│   ├── api/
│   │   ├── leads/
│   │   │   └── route.ts          # Leads API
│   │   ├── visits/
│   │   │   └── route.ts          # Visits tracking API
│   │   ├── jobs/
│   │   │   └── route.ts          # Jobs API
│   │   └── workflows/
│   │       ├── route.ts          # Workflow CRUD
│   │       └── execute/
│   │           └── route.ts      # Workflow execution
│
├── components/
│   └── admin/
│       ├── dashboard.tsx          # Main dashboard component
│       ├── metrics-card.tsx        # Metrics display
│       └── tabs/
│           ├── leads-tab.tsx       # Leads management
│           ├── visits-tab.tsx      # Visit analytics
│           ├── workflows-tab.tsx   # Workflow management
│           └── jobs-tab.tsx        # Job tracking
│
├── lib/
│   └── supabase/
│       ├── client.ts              # Client-side Supabase
│       └── server.ts              # Server-side Supabase
│
├── scripts/
│   └── setup-database.sql         # Database schema
│
└── docs/
    ├── ADMIN_SYSTEM_DOCS.md       # Complete API documentation
    └── SETUP_GUIDE.md             # This file
```

## Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **API Examples:** See ADMIN_SYSTEM_DOCS.md
- **Database Schema:** See scripts/setup-database.sql
