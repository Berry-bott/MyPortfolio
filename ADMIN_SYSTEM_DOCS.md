# Admin Dashboard & Database System Documentation

## Overview

This portfolio website features a comprehensive admin dashboard with real-time database integration, visitor tracking analytics, automation workflow management, and job tracking capabilities.

## Database Architecture

### Tables

#### 1. **leads**
Stores all captured leads from the contact form.

```sql
- id (UUID): Primary key
- name (VARCHAR): Lead name
- email (VARCHAR): Email address (unique)
- phone (VARCHAR): Contact phone
- company (VARCHAR): Company name
- service (VARCHAR): Service interested in
- message (TEXT): Message content
- status (VARCHAR): new, contacted, qualified, rejected
- source (VARCHAR): Where lead came from
- created_at (TIMESTAMP): Creation date
- updated_at (TIMESTAMP): Last update
```

#### 2. **visits**
Tracks all website visits with analytics data.

```sql
- id (UUID): Primary key
- visitor_ip (VARCHAR): Visitor IP address
- page_path (VARCHAR): Page visited
- referrer (VARCHAR): Traffic source
- user_agent (TEXT): Browser info
- duration_seconds (INTEGER): Time on page
- session_id (VARCHAR): Session identifier
- created_at (TIMESTAMP): Visit timestamp
```

#### 3. **automation_workflows**
Manages automation workflow configurations.

```sql
- id (UUID): Primary key
- name (VARCHAR): Workflow name
- description (TEXT): Workflow description
- trigger_type (VARCHAR): lead_created, visit_recorded, scheduled, manual
- actions (JSONB): Array of actions to execute
- is_active (BOOLEAN): Workflow status
- created_at (TIMESTAMP): Creation date
- updated_at (TIMESTAMP): Last update
```

#### 4. **automation_logs**
Tracks automation workflow executions.

```sql
- id (UUID): Primary key
- workflow_id (UUID): Reference to workflow
- event_type (VARCHAR): Type of event
- event_data (JSONB): Event details
- status (VARCHAR): triggered, completed, failed
- executed_at (TIMESTAMP): Execution time
```

#### 5. **jobs**
Stores job opportunities for tracking.

```sql
- id (UUID): Primary key
- title (VARCHAR): Job title
- description (TEXT): Job description
- source (VARCHAR): Where job was found
- priority (VARCHAR): high, medium, low
- status (VARCHAR): saved, applied, interviewed, offered, rejected
- company (VARCHAR): Company name
- salary_range (VARCHAR): Salary information
- location (VARCHAR): Job location
- job_url (VARCHAR): Link to job posting
- created_at (TIMESTAMP): Added date
- updated_at (TIMESTAMP): Last update
```

#### 6. **messages**
Stores automated messages and responses.

```sql
- id (UUID): Primary key
- from_email (VARCHAR): Sender email
- from_name (VARCHAR): Sender name
- to_email (VARCHAR): Recipient email
- subject (VARCHAR): Message subject
- body (TEXT): Message content
- message_type (VARCHAR): email, notification, etc.
- status (VARCHAR): sent, pending, failed
- created_at (TIMESTAMP): Send time
```

#### 7. **analytics**
General analytics metrics storage.

```sql
- id (UUID): Primary key
- metric_name (VARCHAR): Metric identifier
- metric_value (DECIMAL): Metric value
- dimension_1 (VARCHAR): First dimension
- dimension_2 (VARCHAR): Second dimension
- recorded_at (TIMESTAMP): Recording time
```

## API Routes

### Leads Management

#### `POST /api/leads`
Create a new lead from contact form.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "company": "Tech Corp",
  "service": "Web Development",
  "message": "I need a website..."
}
```

#### `GET /api/leads`
Retrieve leads with optional filtering.

**Query Parameters:**
- `status`: Filter by lead status (new, contacted, qualified, rejected)
- `limit`: Number of records to return (default: 50)

### Visits Tracking

#### `POST /api/visits`
Track a page visit (auto-called by tracking provider).

```json
{
  "page": "/projects",
  "referrer": "google.com",
  "duration": 120,
  "sessionId": "session-123"
}
```

#### `GET /api/visits`
Get visit analytics and statistics.

**Returns:**
- totalVisits
- avgDuration
- pageViews (breakdown by page)
- referrers (traffic sources)
- recentVisits (last N visits)

### Automation Workflows

#### `GET /api/workflows`
Retrieve automation workflows.

**Query Parameters:**
- `active`: Filter by active status (true/false)

#### `POST /api/workflows`
Create a new automation workflow.

```json
{
  "name": "Email new leads",
  "description": "Send welcome email to new leads",
  "trigger_type": "lead_created",
  "is_active": true,
  "actions": [
    {
      "type": "send_email",
      "config": {
        "subject": "Welcome!",
        "template": "welcome"
      }
    }
  ]
}
```

#### `PUT /api/workflows?id={workflowId}`
Update a workflow configuration.

#### `DELETE /api/workflows?id={workflowId}`
Delete a workflow.

#### `POST /api/workflows/execute`
Execute a workflow immediately.

```json
{
  "workflowId": "workflow-uuid",
  "triggerData": {
    "email": "john@example.com",
    "name": "John"
  }
}
```

**Supported Actions:**
- `send_email`: Send automated emails
- `create_record`: Create database records
- `update_status`: Update record status
- `webhook`: Trigger external webhooks
- `notification`: Send notifications

### Jobs Management

#### `POST /api/jobs`
Add a new job opportunity.

```json
{
  "title": "Senior React Developer",
  "description": "Build amazing web apps",
  "company": "Tech Company",
  "location": "Remote",
  "salary_range": "$120k-$150k",
  "source": "linkedin",
  "priority": "high",
  "jobUrl": "https://..."
}
```

#### `GET /api/jobs`
Retrieve jobs with filtering.

**Query Parameters:**
- `status`: Filter by status
- `priority`: Filter by priority (high, medium, low)
- `limit`: Number of records

#### `PATCH /api/jobs?id={jobId}`
Update a job's status or details.

```json
{
  "status": "applied",
  "priority": "medium"
}
```

## Admin Dashboard Features

### 1. Real-Time Metrics
- **Total Leads**: Count of all captured leads
- **Recent Visits**: Latest visitor count
- **Conversion Rate**: Qualified leads percentage
- **Avg Duration**: Average time on site

### 2. Leads Tab
- View all leads with filtering by status
- Filter options: All, New, Contacted, Qualified, Rejected
- Send emails to leads
- Delete leads
- Real-time status display

### 3. Visits Tab
- **Page Views Chart**: Bar chart of traffic by page
- **Traffic Sources**: Pie chart of referrers
- **Recent Visits Table**: Detailed visit records with:
  - Page visited
  - Traffic source
  - Time on page
  - Visit timestamp

### 4. Workflows Tab
- Create new automation workflows
- Configure workflow triggers
- Execute workflows manually
- Toggle workflow active/inactive status
- Delete workflows
- View all workflow history

**Trigger Types:**
- `lead_created`: When a new lead is captured
- `visit_recorded`: When a visitor lands
- `scheduled`: At specific times
- `manual`: On-demand execution

### 5. Jobs Tab
- Track job opportunities
- Filter by status and priority
- View statistics:
  - Total jobs
  - Jobs applied to
  - High-priority positions
- External link to job posting
- Edit job details
- Delete job records

## Real-Time Data Synchronization

The dashboard automatically refreshes data at regular intervals:
- **Metrics**: Every 30 seconds
- **Visits**: Every 60 seconds
- **All other data**: On-demand with instant refresh

## Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Public read access with authenticated write protection (configurable)
- Service role key used for admin operations

### Input Validation
- All API endpoints validate required fields
- Type checking on data inputs
- SQL injection prevention via parameterized queries

### Authentication Ready
- Supabase Auth integration (optional)
- Admin routes can be protected
- Environment variables for sensitive operations

## Setup Instructions

### 1. Database Migration
Run the SQL script to create tables and indexes:

```bash
# Via Supabase dashboard:
# 1. Go to SQL Editor
# 2. Paste content from: scripts/setup-database.sql
# 3. Execute
```

Or via command line:
```bash
psql -U postgres -d postgres -f scripts/setup-database.sql
```

### 2. Environment Variables
Ensure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Access the Dashboard
Navigate to `/admin` in your browser to access the admin dashboard.

## Advanced Customization

### Adding New Workflow Actions

Edit `/app/api/workflows/execute/route.ts` and add to the `executeAction` function:

```typescript
case 'custom_action':
  return await customActionHandler(config, triggerData)
```

Then implement the handler function.

### Connecting Email Service

Replace the mock email function in the workflow executor with real service:

```typescript
async function sendEmailAction(config: any, triggerData: any) {
  // Use Resend, SendGrid, etc.
  const response = await resend.emails.send({
    to: config.recipient,
    subject: config.subject,
    html: config.body,
  })
  return response
}
```

### Custom Metrics

Add new metrics to the analytics table and query in the dashboard:

```typescript
// In API route
await supabaseServer.from('analytics').insert({
  metric_name: 'custom_event',
  metric_value: value,
  dimension_1: category,
})
```

## Monitoring & Debugging

### View Logs
All operations are logged with `console.log('[v0] ...')` statements for easy debugging in server logs.

### Check Automation Logs
Query the `automation_logs` table to see execution history:

```sql
SELECT * FROM automation_logs 
WHERE workflow_id = 'xxx' 
ORDER BY executed_at DESC;
```

### Monitor Performance
- Check `visits` table size (auto-cleanup recommended for production)
- Review index usage with `EXPLAIN ANALYZE`
- Monitor RLS policy performance

## Production Considerations

1. **Backup Strategy**: Enable Supabase automatic backups
2. **Data Retention**: Implement purge policies for old visits
3. **Rate Limiting**: Add API rate limiting to prevent abuse
4. **Monitoring**: Set up alerts for failed automations
5. **Admin Auth**: Implement Supabase Auth for admin access
6. **CORS**: Configure CORS policies for webhook endpoints
7. **Email Service**: Integrate actual email provider (Resend, SendGrid)

## Troubleshooting

### Leads not being saved
- Check Supabase connection strings
- Verify table permissions with RLS policies
- Check browser console for API errors

### Analytics not updating
- Verify visit tracking is active (check console for tracking logs)
- Confirm API route is accessible
- Check Supabase table for data

### Workflows not executing
- Verify workflow is marked as active
- Check automation_logs table for errors
- Review workflow action configuration

## Support

For issues or questions:
1. Check Supabase status
2. Review API logs in terminal
3. Verify environment variables
4. Check browser console for errors
5. Review database permissions
