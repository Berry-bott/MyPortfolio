# Dev.AI - Professional Portfolio Website

A sophisticated, feature-rich portfolio website for web development and AI automation specialists. Built with Next.js 16, TypeScript, and modern web technologies.

## 🌟 Features

### Public Pages
- **Landing Page** - Compelling hero section with featured projects and service previews
- **About** - Professional background, journey, expertise, and core values
- **Projects** - Filterable portfolio with detailed project showcases
- **Project Details** - Deep dives into individual projects with challenges, solutions, and results
- **Services** - Comprehensive service offerings and technology stack
- **AI Automation** - Dedicated page for AI automation solutions and use cases
- **Lead Generation** - Lead generation strategies and pipeline management
- **Contact** - Contact form with lead capture and automated responses

### Automation Features
- **Lead Capture & Management** - Automated lead form submission with CRM integration
- **Visit Tracking & Analytics** - Real-time visitor tracking and analytics dashboard
- **Automated Email Responses** - AI-powered auto-responses to inquiries
- **Job Management** - Intelligent job tracking, sorting, and status management
- **Admin Dashboard** - Minimal but functional dashboard for monitoring key metrics

### Design & UX
- **Dark Mode Theme** - Modern, sophisticated dark theme with teal/cyan accents
- **Fully Responsive** - Mobile-first design, optimized for all devices
- **Performance Optimized** - Fast load times with image optimization
- **Accessible** - WCAG compliant with semantic HTML and ARIA attributes
- **Modern Interactions** - Smooth transitions, hover effects, and intuitive navigation

## 📁 Project Structure

```
dev-ai-portfolio/
├── app/
│   ├── api/
│   │   ├── leads/             # Lead capture API
│   │   ├── visits/            # Visit tracking API
│   │   ├── auto-responses/    # Email auto-response API
│   │   └── jobs/              # Job management API
│   ├── admin/                 # Admin dashboard
│   ├── projects/
│   │   ├── page.tsx           # Projects listing
│   │   └── [slug]/page.tsx    # Project detail pages
│   ├── services/
│   │   ├── page.tsx           # Services overview
│   │   └── [slug]/page.tsx    # Service detail pages
│   ├── ai-automation/         # AI automation services page
│   ├── lead-generation/       # Lead generation page
│   ├── about/                 # About page
│   ├── contact/               # Contact page
│   ├── page.tsx               # Landing page
│   ├── layout.tsx             # Root layout with navigation
│   └── globals.css            # Global styles with design tokens
├── components/
│   ├── navigation.tsx         # Top navigation bar
│   ├── footer.tsx             # Footer component
│   ├── tracking-provider.tsx  # Visit tracking integration
│   └── ui/                    # shadcn/ui components
├── hooks/
│   └── use-visit-tracking.ts # Visit tracking hook
├── lib/
│   ├── supabase/
│   │   └── client.ts          # Supabase client setup
│   ├── types.ts               # TypeScript type definitions
│   └── utils.ts               # Utility functions
├── scripts/
│   └── 01-create-tables.sql   # Database schema (Supabase)
└── public/
    └── images/                # Image assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (optional, for full database features)
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dev-ai-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Customize Profile Information
Edit `/lib/types.ts` to customize the Profile interface, then update the relevant pages with your information.

### Update Projects
The projects are defined in `/app/projects/page.tsx` and `/app/projects/[slug]/page.tsx`. Add or modify projects in the `projects` object.

### Customize Services
Services are defined in `/app/services/page.tsx`. Update the `services` array with your offerings.

### Design Tokens
Customize the color scheme and styling in `/app/globals.css`:
- Update CSS variables in `:root` and `.dark` sections
- Modify color schemes (primary, accent, etc.)
- Adjust spacing and border radius

## 🤖 Automation Features

### Lead Capture
The contact form automatically:
- Captures visitor information
- Logs leads to the API
- Triggers automated responses
- Integrates with the admin dashboard

### Visit Tracking
Implemented via `useVisitTracking` hook:
- Tracks page visits and duration
- Records referrer information
- Sends data to `/api/visits`
- Viewable in admin dashboard

### Auto-Responses
Triggered when leads are captured:
- Sends confirmation email to visitor
- Customizable response templates
- Logs all responses for audit trail

### Job Management
API at `/api/jobs`:
- Add, update, and track jobs
- Organize by status (saved, applied, interviewed, etc.)
- Filter by priority
- Track sources (email, LinkedIn, etc.)

## 📊 Admin Dashboard

Access the admin dashboard at `/admin` (should be protected in production):

- **Stats Cards** - Overview of key metrics
- **Recent Leads** - Latest captured leads with status
- **Page Visits** - Real-time visitor analytics
- **Analytics** - Top pages and traffic sources

## 🔐 Security Considerations

For production deployment:

1. **Enable Authentication** - Protect admin routes with authentication
2. **Set Up Supabase RLS** - Enable Row Level Security policies
3. **Environment Variables** - Keep sensitive data in environment variables
4. **API Rate Limiting** - Implement rate limiting on API endpoints
5. **Email Service** - Connect real email service (SendGrid, Resend, etc.)
6. **Database Backup** - Regular Supabase backups

## 📈 Performance Optimization

- Images are optimized and lazy-loaded
- CSS is minified and tree-shaken
- Next.js automatic code splitting
- Server-side rendering for SEO
- Caching strategies implemented

## 🎨 Design System

### Color Palette
- **Primary** - Deep blue/teal (oklch format)
- **Accent** - Bright cyan/teal
- **Background** - Very dark gray (oklch 0.08)
- **Card** - Dark gray (oklch 0.12)
- **Text** - Off-white (oklch 0.95)

### Typography
- **Font Sans** - Geist (UI elements)
- **Font Mono** - Geist Mono (code/technical text)
- Line height: 1.5-1.6 for body text

## 📱 Responsive Breakpoints

- **Mobile** - 375px to 640px
- **Tablet** - 641px to 1024px
- **Desktop** - 1025px+

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

1. **Environment variables** - Set all required environment variables
2. **Database** - Connect Supabase or your database
3. **Build command** - `npm run build`
4. **Start command** - `npm run start`

## 📝 API Endpoints

### Leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Fetch all leads

### Visits
- `POST /api/visits` - Track a page visit
- `GET /api/visits` - Get visit analytics

### Auto-Responses
- `POST /api/auto-responses` - Send auto-response
- `GET /api/auto-responses` - Get response history

### Jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs` - Get all jobs with stats
- `PATCH /api/jobs?id=jobId` - Update a job

## 🔄 Integration with Supabase (Optional)

For full database integration:

1. Create a Supabase project
2. Set up database tables using the migration scripts
3. Enable RLS policies
4. Update API routes to use Supabase client

## 🐛 Debugging

Enable debug logging by checking browser console. API routes log to server console with `[v0]` prefix for easy identification.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and use this template for your own portfolio!

## 📞 Support

For questions or issues:
- Check the GitHub issues
- Review the documentation
- Contact the development team

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
