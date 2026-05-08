
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading, isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
    // If authenticated and on login page, redirect to admin dashboard
    if (!loading && isAuthenticated && isLoginPage) {
      router.push('/admin/dashboard');
    }
  }, [loading, isAuthenticated, router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0520] flex items-center justify-center relative overflow-hidden">
        <div className="aurora-dashboard-bg opacity-30" />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-white/60 uppercase tracking-widest text-xs font-medium">Initializing Aurora Admin...</p>
        </div>
      </div>
    );
  }

  // Allow rendering login page even if not authenticated
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
}