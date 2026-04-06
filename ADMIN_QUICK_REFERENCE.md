# Admin Dashboard - Quick Reference

Fast lookup guide for common admin tasks and API commands.

## Access Dashboard

**URL:** `http://localhost:3000/admin` (development)  
**URL:** `https://yourdomain.com/admin` (production)

## Dashboard Tabs

| Tab | Purpose | Key Features |
|-----|---------|--------------|
| **Leads** | Manage contact form submissions | Filter by status, send emails, view details |
| **Visits** | Analytics & visitor tracking | Charts, traffic sources, duration analysis |
| **Workflows** | Automation management | Create, execute, toggle active/inactive |
| **Jobs** | Job opportunity tracking | Filter by status/priority, view stats |

## API Quick Commands

### Create Lead
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","company":"Corp"}'
```

### Get All Leads
```bash
curl http://localhost:3000/api/leads
```

### Get Leads by Status
```bash
curl 'http://localhost:3000/api/leads?status=qualified&limit=10'
```

### Track Visit
```bash
curl -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{"page":"/projects","referrer":"google","duration":120}'
```

### Get Visit Analytics
```bash
curl http://localhost:3000/api/visits
```

### Create Workflow
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Welcome Email",
    "trigger_type":"lead_created",
    "actions":[{"type":"send_email","config":{"subject":"Hi!"}}]
  }'
```

### Get All Workflows
```bash
curl http://localhost:3000/api/workflows
```

### Execute Workflow
```bash
curl -X POST http://localhost:3000/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{"workflowId":"xxx","triggerData":{"email":"test@example.com"}}'
```

### Update Workflow
```bash
curl -X PUT 'http://localhost:3000/api/workflows?id=xxx' \
  -H "Content-Type: application/json" \
  -d '{"is_active":false}'
```

### Delete Workflow
```bash
curl -X DELETE 'http://localhost:3000/api/workflows?id=xxx'
```

### Add Job
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title":"React Developer",
    "description":"Build web apps",
    "company":"Tech Inc",
    "priority":"high"
  }'
```

### Get Jobs with Filter
```bash
curl 'http://localhost:3000/api/jobs?status=applied&priority=high'
```

### Update Job Status
```bash
curl -X PATCH 'http://localhost:3000/api/jobs?id=xxx' \
  -H "Content-Type: application/json" \
  -d '{"status":"interviewed"}'
```

## Database Queries

### Count Total Leads
```sql
SELECT COUNT(*) FROM leads;
```

### Top Traffic Pages
```sql
SELECT page_path, COUNT(*) as views 
FROM visits 
GROUP BY page_path 
ORDER BY views DESC;
```

### Traffic by Source
```sql
SELECT referrer, COUNT(*) as count 
FROM visits 
GROUP BY referrer 
ORDER BY count DESC;
```

### Active Workflows
```sql
SELECT id, name, trigger_type, is_active 
FROM automation_workflows 
WHERE is_active = true;
```

### Recent Lead Conversions
```sql
SELECT name, email, status, created_at 
FROM leads 
WHERE status = 'qualified' 
ORDER BY created_at DESC LIMIT 10;
```

### Job Application Summary
```sql
SELECT status, COUNT(*) as count 
FROM jobs 
GROUP BY status;
```

### Workflow Execution History
```sql
SELECT workflow_id, event_type, status, executed_at 
FROM automation_logs 
ORDER BY executed_at DESC LIMIT 20;
```

### Average Time on Site
```sql
SELECT 
  ROUND(AVG(duration_seconds)::numeric, 0) as avg_duration_seconds,
  MIN(duration_seconds) as min_duration,
  MAX(duration_seconds) as max_duration
FROM visits;
```

## Workflow Action Types

### send_email
Sends an automated email.

```json
{
  "type": "send_email",
  "config": {
    "recipient": "user@example.com",
    "subject": "Welcome!",
    "body": "<h1>Hello</h1>"
  }
}
```

### create_record
Creates a new database record.

```json
{
  "type": "create_record",
  "config": {
    "table": "messages",
    "data": {
      "from_email": "auto@system.com",
      "subject": "Auto-generated"
    }
  }
}
```

### update_status
Updates a record's status.

```json
{
  "type": "update_status",
  "config": {
    "table": "leads",
    "recordId": "uuid",
    "status": "contacted"
  }
}
```

### webhook
Triggers an external webhook.

```json
{
  "type": "webhook",
  "config": {
    "url": "https://example.com/webhook",
    "method": "POST"
  }
}
```

### notification
Sends a notification.

```json
{
  "type": "notification",
  "config": {
    "channel": "slack",
    "message": "New lead received!"
  }
}
```

## Lead Status Codes

| Status | Meaning |
|--------|---------|
| `new` | Just submitted |
| `contacted` | Outreach initiated |
| `qualified` | Potential customer |
| `rejected` | Not interested |

## Job Status Codes

| Status | Meaning |
|--------|---------|
| `saved` | Bookmarked |
| `applied` | Application sent |
| `interviewed` | Interview scheduled |
| `offered` | Job offer received |
| `rejected` | Application rejected |

## Job Priority Levels

| Priority | Usage |
|----------|-------|
| `high` | Top choice positions |
| `medium` | Interesting opportunities |
| `low` | Backup options |

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Common Tasks

### Monitor New Leads in Real-Time

1. Go to `/admin` → **Leads** tab
2. Filter by "New"
3. Metrics auto-refresh every 30 seconds
4. Click email icon to contact lead

### Analyze Traffic Sources

1. Go to `/admin` → **Visits** tab
2. View pie chart showing traffic sources
3. View bar chart showing page views
4. Identify top performing pages

### Set Up Lead Welcome Workflow

1. Go to `/admin` → **Workflows** tab
2. Click **New Workflow**
3. Name: "Lead Welcome Email"
4. Trigger: "Lead Created"
5. Click **Create**
6. Workflow auto-triggers for new leads

### Execute Workflow Manually

1. Go to `/admin` → **Workflows** tab
2. Find workflow in list
3. Click play (▶) button
4. Workflow executes immediately
5. Check results in automation_logs table

### Track Job Application Progress

1. Go to `/admin` → **Jobs** tab
2. Add new job with `curl` or form
3. Filter by priority (High priority first)
4. Update status as you progress
5. View stats dashboard

### Toggle Workflow On/Off

1. Go to `/admin` → **Workflows** tab
2. Click toggle (⊕) button
3. Workflow becomes inactive/active
4. Check admin bar shows status

### View Detailed Analytics

1. Leads: Total, by status, recent activity
2. Visits: By page, by source, average time
3. Workflows: Active count, execution logs
4. Jobs: By status, by priority, applied count

## Server Logs

Look for these patterns in terminal:

```
[v0] Visit tracked: { page: '...', referrer: '...', ... }
[v0] New lead captured: { email: '...', service: '...', ... }
[v0] Job added: { title: '...', priority: '...', ... }
[v0] Automation workflow created: { name: '...', ... }
[v0] Workflow executed: { workflowId: '...', actionsExecuted: N, ... }
```

## Performance Tips

1. **Visits Table**: Can grow large - consider archiving old data
2. **Indexes**: Database has indexes on common queries
3. **RLS Policies**: Enabled for security, may slow complex queries
4. **Dashboard Refresh**: Auto-refreshes every 30-60 seconds
5. **API Caching**: No caching - always fresh data

## Security Notes

⚠️ Current setup allows public access to APIs. For production:

1. Implement Supabase Auth
2. Add authentication checks in API routes
3. Protect `/admin` routes with middleware
4. Never expose service role key in frontend
5. Use environment variables for secrets

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Submit form |
| `Esc` | Close modals |
| `Tab` | Navigate fields |
| `Ctrl+K` | Command palette (if implemented) |

## Time Format

All timestamps use ISO 8601 format:
```
2026-04-05T20:38:46.000Z
```

Displayed in local timezone on dashboard.

## File References

| File | Purpose |
|------|---------|
| `app/admin/page.tsx` | Admin dashboard page |
| `components/admin/dashboard.tsx` | Main dashboard component |
| `components/admin/tabs/*.tsx` | Tab implementations |
| `app/api/leads/route.ts` | Leads endpoints |
| `app/api/visits/route.ts` | Visits endpoints |
| `app/api/jobs/route.ts` | Jobs endpoints |
| `app/api/workflows/route.ts` | Workflow CRUD |
| `app/api/workflows/execute/route.ts` | Workflow executor |
| `scripts/setup-database.sql` | Database schema |

## Support

For detailed information, see:
- **ADMIN_SYSTEM_DOCS.md** - Complete API documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **Database Schema** - See scripts/setup-database.sql
