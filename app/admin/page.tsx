import type { Metadata } from 'next'
import { AdminDashboard } from '@/components/admin/dashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Dev.AI',
  description: 'Manage leads, visits, automation workflows, and jobs',
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard />
    </div>
  )
}
