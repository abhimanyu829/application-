'use client';

import { Suspense } from 'react';
import TermsAcceptance from '@/components/TermsAcceptance';

export default function TermsGatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsAcceptance />
    </Suspense>
  );
}
