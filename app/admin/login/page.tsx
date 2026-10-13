import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminLoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = {
  title: 'Admin Login - HENRY.CODE',
  description: 'Sign in to the admin dashboard',
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </div>
  )
}
