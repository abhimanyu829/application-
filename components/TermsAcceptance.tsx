'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TermsAcceptance() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const accepted = localStorage.getItem('termsAccepted') === 'true';
    if (accepted) {
      router.replace(redirect);
    }
  }, [router, redirect]);

  const onContinue = () => {
    if (typeof window === 'undefined') return;
    // Persist in localStorage and a short-lived cookie for middleware checks
    localStorage.setItem('termsAccepted', 'true');
    document.cookie = `termsAccepted=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.replace(redirect);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-6">Terms & Conditions</h1>
        <p className="text-black/70 mb-6">
          Please read and accept our{' '}
          <Link href="/terms-of-service" className="underline">
            Terms and Conditions
          </Link>{' '}
          before continuing.
        </p>
        <label className="flex items-center gap-3 text-black/80 mb-6">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-4 w-4"
          />
          <span>I agree to the Terms and Conditions</span>
        </label>
        <button
          type="button"
          disabled={!checked}
          onClick={onContinue}
          className="bg-black text-white px-6 py-3 text-sm disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

