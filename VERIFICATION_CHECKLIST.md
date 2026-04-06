# Admin Dashboard Verification Checklist

Use this checklist to verify your admin dashboard is properly set up and functional.

## Pre-Setup

- [ ] Supabase project created
- [ ] Environment variables set in `.env.local`
- [ ] `npm install` completed successfully
- [ ] Development server can start with `npm run dev`

## Database Setup

### Table Creation
- [ ] Open Supabase SQL Editor
- [ ] Paste content from `scripts/setup-database.sql`
- [ ] Click "Run" - should execute without errors
- [ ] Verify tables exist:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' ORDER BY table_name;
```

Expected tables (7 total):
- [ ] automation_logs
- [ ] automation_workflows
- [ ] jobs
- [ ] leads
- [ ] messages
- [ ] visits
- [ ] analytics

### Index Verification
```sql
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('leads', 'visits', 'jobs', 'automation_workflows');
```

Should have indexes on:
- [ ] leads.email
- [ ] leads.status
- [ ] leads.created_at
- [ ] visits.page_path
- [ ] visits.referrer
- [ ] visits.created_at
- [ ] jobs.status
- [ ] jobs.priority
- [ ] automation_logs.workflow_id

## API Endpoint Testing

### Leads API

#### Test POST - Create Lead
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
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

- [ ] Request succeeds (200 or 201)
- [ ] Response includes success message
- [ ] Response includes leadId

#### Test GET - Retrieve Leads
```bash
curl http://localhost:3000/api/leads
```

**Expected Response:**
```json
{
  "success": true,
  "leads": [...],
  "count": N
}
```

- [ ] Request succeeds (200)
- [ ] Returns leads array
- [ ] Returns count field

#### Test GET with Filters
```bash
curl 'http://localhost:3000/api/leads?status=new&limit=5'
```

- [ ] Status filter works
- [ ] Limit parameter respected
- [ ] Only leads with matching status returned

### Visits API

#### Test POST - Track Visit
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

- [ ] Request succeeds (200)
- [ ] Response confirms success

#### Test GET - Analytics
```bash
curl http://localhost:3000/api/visits
```

**Expected Response:**
```json
{
  "success": true,
  "totalVisits": N,
  "avgDuration": N,
  "pageViews": {...},
  "referrers": {...},
  "recentVisits": [...]
}
```

- [ ] Request succeeds (200)
- [ ] totalVisits is a number
- [ ] avgDuration is calculated
- [ ] pageViews shows breakdown
- [ ] referrers shows breakdown
- [ ] recentVisits array populated

### Jobs API

#### Test POST - Add Job
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior React Developer",
    "description": "Build amazing web apps",
    "company": "Tech Company",
    "priority": "high"
  }'
```

- [ ] Request succeeds (201)
- [ ] Returns jobId in response

#### Test GET - Retrieve Jobs
```bash
curl http://localhost:3000/api/jobs
```

- [ ] Returns jobs array
- [ ] Returns stats object
- [ ] Stats include byStatus and byPriority

#### Test PATCH - Update Job
```bash
curl -X PATCH 'http://localhost:3000/api/jobs?id=YOUR_JOB_ID' \
  -H "Content-Type: application/json" \
  -d '{"status": "applied"}'
```

- [ ] Request succeeds (200)
- [ ] Job status updated
- [ ] Response includes updated job

### Workflows API

#### Test POST - Create Workflow
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
          "subject": "Welcome!"
        }
      }
    ]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Workflow created successfully",
  "workflow": {...}
}
```

- [ ] Request succeeds (201)
- [ ] Returns workflow object
- [ ] Workflow has is_active=true

#### Test GET - List Workflows
```bash
curl http://localhost:3000/api/workflows
```

- [ ] Returns workflows array
- [ ] Returns count

#### Test PUT - Update Workflow
```bash
curl -X PUT 'http://localhost:3000/api/workflows?id=YOUR_WORKFLOW_ID' \
  -H "Content-Type: application/json" \
  -d '{"is_active": false}'
```

- [ ] Request succeeds (200)
- [ ] Workflow updated
- [ ] is_active field changed

#### Test POST - Execute Workflow
```bash
curl -X POST http://localhost:3000/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{
    "workflowId": "YOUR_WORKFLOW_ID",
    "triggerData": {
      "email": "test@example.com",
      "name": "Test"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Workflow executed successfully",
  "results": [...],
  "executedAt": "2026-04-05T..."
}
```

- [ ] Request succeeds (200)
- [ ] Returns results array
- [ ] Each result has action, status, result fields

#### Test DELETE - Delete Workflow
```bash
curl -X DELETE 'http://localhost:3000/api/workflows?id=YOUR_WORKFLOW_ID'
```

- [ ] Request succeeds (200)
- [ ] Workflow deleted
- [ ] GET /api/workflows no longer includes it

## Admin Dashboard UI

### Access Dashboard
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Page loads without errors
- [ ] Dashboard renders

### Metrics Display
- [ ] Total Leads card shows a number
- [ ] Recent Visits card shows a number
- [ ] Conversion Rate card shows a percentage
- [ ] Avg Duration card shows seconds
- [ ] All metrics update correctly

### Leads Tab
- [ ] Click **Leads** tab
- [ ] Table displays leads
- [ ] Can filter by status (All, New, Contacted, Qualified)
- [ ] Status badges show correct colors
- [ ] Email button present
- [ ] Delete button present

### Visits Tab
- [ ] Click **Visits** tab
- [ ] Bar chart renders (Page Views)
- [ ] Pie chart renders (Traffic Sources)
- [ ] Recent Visits table displays
- [ ] All data comes from database
- [ ] Charts show real data

### Workflows Tab
- [ ] Click **Workflows** tab
- [ ] **New Workflow** button present
- [ ] Click to open workflow creation form
- [ ] Form has:
  - [ ] Name input field
  - [ ] Trigger Type dropdown
  - [ ] Create Workflow button
- [ ] Can create workflow via UI
- [ ] Workflow appears in list
- [ ] Play button executes workflow
- [ ] Toggle button changes active status
- [ ] Delete button removes workflow

### Jobs Tab
- [ ] Click **Jobs** tab
- [ ] Jobs table displays
- [ ] Status filter dropdown works
- [ ] Priority filter dropdown works
- [ ] Stats cards show (Total Jobs, Applied, High Priority)
- [ ] Can view job details

## Data Persistence

### Leads
- [ ] Create lead via API
- [ ] Close and reopen admin dashboard
- [ ] Lead still appears in Leads tab
- [ ] Data persisted to database

### Visits
- [ ] Open website (e.g., home page)
- [ ] Go to admin Visits tab
- [ ] Visit appears in recent visits table
- [ ] Referrer shows 'direct'
- [ ] Page shows '/'

### Workflows
- [ ] Create workflow via dashboard
- [ ] Refresh page
- [ ] Workflow still appears
- [ ] Settings preserved

### Jobs
- [ ] Add job via API or form
- [ ] Refresh dashboard
- [ ] Job still appears
- [ ] Status and priority preserved

## Auto-Refresh Testing

- [ ] Metrics auto-refresh every 30 seconds
- [ ] Create new lead
- [ ] Wait 30 seconds
- [ ] Leads count updates automatically
- [ ] No page refresh needed

## Error Handling

### Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'  # Missing email
```

- [ ] Request returns 400 error
- [ ] Error message indicates missing email

### Invalid Workflow Execution
```bash
curl -X POST http://localhost:3000/api/workflows/execute \
  -H "Content-Type: application/json" \
  -d '{"workflowId": "invalid-id"}'
```

- [ ] Request returns 404 error
- [ ] Error message indicates workflow not found

### Database Connection Error
- [ ] Check if Supabase down
- [ ] API should return 500 error
- [ ] Error message indicates database issue

## Responsive Design

### Mobile View (320px width)
- [ ] Open dashboard on mobile device
- [ ] All tabs visible (may scroll)
- [ ] Charts responsive
- [ ] Tables scrollable
- [ ] Buttons touch-friendly
- [ ] Text readable

### Tablet View (768px width)
- [ ] Metrics cards in 2 column grid
- [ ] Charts side-by-side or stacked appropriately
- [ ] Tables fully visible or scrollable
- [ ] No horizontal overflow

### Desktop View (1024px+)
- [ ] Metrics cards in 4 column grid
- [ ] Charts side-by-side
- [ ] Tables full width
- [ ] All content visible

## Performance Testing

### Load Time
```bash
# In browser DevTools
# Go to admin dashboard
# Check Network tab
```

- [ ] Initial load < 3 seconds
- [ ] API responses < 500ms
- [ ] Charts render smoothly
- [ ] No console errors

### Metrics Refresh
- [ ] Metrics update every 30 seconds
- [ ] No loading delays
- [ ] Smooth transitions

### Large Data Sets
```bash
# Create 100+ visits
# Create 50+ leads
```

- [ ] Dashboard still responsive
- [ ] Tables still load quickly
- [ ] No performance degradation

## Security Testing

### No Hardcoded Secrets
- [ ] Check all files - no API keys exposed
- [ ] Check env variables - only references
- [ ] Check commits - no secrets in history

### Input Validation
- [ ] Try SQL injection in lead name
  ```
  curl -X POST http://localhost:3000/api/leads \
    -d '{"name":"x; DROP TABLE leads;--","email":"test@example.com"}'
  ```
- [ ] Should fail gracefully or be escaped
- [ ] Table still exists

- [ ] Try XSS in lead email
  ```
  curl -X POST http://localhost:3000/api/leads \
    -d '{"name":"Test","email":"<script>alert(1)</script>"}'
  ```
- [ ] Should be stored safely
- [ ] No script execution in dashboard

## Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] No console errors in any browser

## Documentation Verification

- [ ] SETUP_GUIDE.md is comprehensive
- [ ] ADMIN_SYSTEM_DOCS.md covers all APIs
- [ ] ADMIN_QUICK_REFERENCE.md has quick lookups
- [ ] ADMIN_IMPLEMENTATION_SUMMARY.md explains architecture
- [ ] Code comments present where needed

## Final Verification

- [ ] All checks above passed
- [ ] Admin dashboard fully functional
- [ ] All data stored in real database
- [ ] Real-time updates working
- [ ] Automation workflows operational
- [ ] Documentation complete
- [ ] Ready for production deployment

## Known Limitations

If any of these apply, they're expected:

- [ ] Email sending uses mock (not real emails)
- [ ] Webhooks log but don't send (implement in production)
- [ ] No authentication required (add for security)
- [ ] Old visits not auto-archived (implement cleanup jobs)
- [ ] No rate limiting (add for production)

## Next Steps After Verification

1. ✅ All checks passing
2. ➜ Connect email service (Resend/SendGrid)
3. ➜ Add Supabase Auth for security
4. ➜ Deploy to production
5. ➜ Set up monitoring
6. ➜ Configure backups
7. ➜ Scale as needed

## Support

If any check fails:

1. Check **SETUP_GUIDE.md** for setup issues
2. Check **ADMIN_SYSTEM_DOCS.md** for API issues
3. Review **ADMIN_QUICK_REFERENCE.md** for common tasks
4. Check browser console for frontend errors
5. Check server logs for backend errors (look for `[v0]` messages)
6. Verify environment variables are correct
7. Verify database connection in Supabase dashboard

## Sign-Off

System verified and ready for use:

- **Date:** _______________
- **Verified By:** _______________
- **Environment:** [ ] Dev [ ] Staging [ ] Production
- **Notes:** _______________

All systems operational and dashboard fully functional! 🎉
