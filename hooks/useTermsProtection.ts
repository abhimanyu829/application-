import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { checkTermsAcceptance, UserTermsStatus } from '@/lib/termsService';

/**
 * Hook to protect routes that require terms acceptance
 * Use this in protected pages to automatically redirect unauthenticated users
 * or users who haven't accepted terms to the accept-terms page
 */
export function useTermsProtection() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [termsStatus, setTermsStatus] = useState<UserTermsStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // If still loading auth, wait
        if (authLoading) {
          return;
        }

        // If no user, allow page to render (not forcing redirect here — each page manages it)
        if (!user) {
          setIsAllowed(true);
          setIsLoading(false);
          return;
        }

        // Only fetch once per mount to avoid flicker
        if (hasFetched.current) return;
        hasFetched.current = true;

        // Check terms acceptance
        const status = await checkTermsAcceptance(user._id);
        setTermsStatus(status);

        // If terms not accepted, redirect
        if (status.needsAcceptance) {
          router.push('/accept-terms');
        } else {
          setIsAllowed(true);
        }

        setIsLoading(false);
      } catch (error) {
        // If Backend is not available, just allow access (fail open for now) or handle error
        console.warn('Terms check failed (Backend unavailable):', error);
        setIsAllowed(true);
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [user, authLoading, router]);

  return {
    isLoading: isLoading || authLoading,
    isAllowed,
    termsStatus,
    user,
  };
}
