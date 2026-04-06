# Error Recovery Guide

## Issue: Supabase Connection Error (ENOTFOUND)

### What Happened?

```
Error: getaddrinfo ENOTFOUND gkltwujrqusupzxpzigk.supabase.co
```

This error means the Supabase database is not accessible. This typically happens when:
1. The database schema hasn't been initialized yet
2. Supabase tables don't exist
3. RLS policies are blocking access

### Solution: Initialize Supabase Database

#### Step 1: Access Supabase SQL Editor

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** in the left sidebar

#### Step 2: Create Database Tables

Copy and paste the entire SQL migration script from `scripts/setup-database.sql` into the SQL Editor:

```sql
-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'contact-form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create visits table
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_ip TEXT,
  page_path TEXT,
  referrer TEXT DEFAULT 'direct',
  user_agent TEXT,
  duration_seconds INTEGER DEFAULT 0,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create workflows table
CREATE TABLE IF NOT EXISTS automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL,
  actions JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create automation logs table
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES automation_workflows(id),
  event_type TEXT,
  event_data JSONB,
  status TEXT DEFAULT 'pending',
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  source TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'saved',
  company TEXT,
  salary_range TEXT,
  location TEXT,
  job_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_email TEXT,
  recipient_email TEXT,
  subject TEXT,
  body TEXT,
  message_type TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for service role)
CREATE POLICY "Allow service role" ON leads FOR ALL USING (true);
CREATE POLICY "Allow service role" ON visits FOR ALL USING (true);
CREATE POLICY "Allow service role" ON automation_workflows FOR ALL USING (true);
CREATE POLICY "Allow service role" ON automation_logs FOR ALL USING (true);
CREATE POLICY "Allow service role" ON jobs FOR ALL USING (true);
CREATE POLICY "Allow service role" ON messages FOR ALL USING (true);
```

Click **Run** button to execute the SQL.

#### Step 3: Verify Tables Created

In the SQL Editor, run:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see these tables:
- leads
- visits
- automation_workflows
- automation_logs
- jobs
- messages

#### Step 4: Test Connection

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit your website and navigate to a page - you should see visit logs appearing

3. Submit a contact form - the lead should be captured

4. Access `/admin` dashboard - it should show data

### Verify Setup Steps

Use this checklist to confirm everything is working:

- [ ] Tables exist in Supabase
- [ ] Supabase environment variables are set in `.env.local`
- [ ] Dev server restarted after setup
- [ ] No errors in browser console or server terminal
- [ ] Visits are being tracked (check `/admin` → Visits tab)
- [ ] Leads can be captured (try contact form at `/contact`)
- [ ] Workflows page shows no errors

### If Still Getting Errors

1. **Check Supabase Status**
   - Go to https://app.supabase.com
   - Verify your project is active
   - Check if there are any alerts/issues

2. **Verify Environment Variables**
   - Open `.env.local` and check:
     - `NEXT_PUBLIC_SUPABASE_URL` is set
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
     - `SUPABASE_SERVICE_ROLE_KEY` is set

3. **Check Browser Console**
   - Open DevTools (F12)
   - Look for API errors
   - Check Network tab for failed requests

4. **Check Server Logs**
   - Terminal where `npm run dev` is running
   - Look for `[v0]` prefixed messages
   - Look for any error messages

### Development Mode (No Supabase)

If Supabase setup takes too long, the app will still work in development mode:

1. Features that will work:
   - All pages load correctly
   - Contact form submission shows success message
   - Admin dashboard shows "No data" message
   - Logs show warnings instead of errors

2. Features that won't work without Supabase:
   - Data persistence (clears on server restart)
   - Admin analytics and tracking
   - Workflow execution

Once Supabase is set up following the steps above, all features will be fully functional.

## Issue: Toggle2 Icon Not Found

**Fixed in:** `/components/admin/tabs/workflows-tab.tsx`

Changed from:
```javascript
import { Play, Plus, Trash2, Toggle2 } from 'lucide-react'
```

To:
```javascript
import { Play, Plus, Trash2, CheckCircle2 } from 'lucide-react'
```

The `Toggle2` icon doesn't exist in lucide-react v0.564.0. Using `CheckCircle2` instead for the workflow status toggle button.

## Questions?

- Check `/ADMIN_README.md` for admin dashboard documentation
- Check `/ADMIN_SYSTEM_DOCS.md` for detailed API documentation
- Check `/SETUP_GUIDE.md` for complete setup instructions
- Check `/VERIFICATION_CHECKLIST.md` for testing procedures
