export interface UserTermsStatus {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  policyVersion: string;
  needsAcceptance: boolean;
}

const CURRENT_POLICY_VERSION = 'v1.0';

/**
 * Check if user's terms and privacy acceptance is up to date
 */
export async function checkTermsAcceptance(userId: string): Promise<UserTermsStatus> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return {
        termsAccepted: false,
        privacyAccepted: false,
        policyVersion: '',
        needsAcceptance: true,
      };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        termsAccepted: false,
        privacyAccepted: false,
        policyVersion: '',
        needsAcceptance: true,
      };
    }

    const userDoc = await response.json();
    
    // In our new backend, we assume user data might have these fields or we manage it.
    // For now, let's look at the User model we created: it has name, email, googleId.
    // We should probably add terms_accepted to User model if we want this check to work.
    
    const termsAccepted = userDoc.terms_accepted === true;
    const privacyAccepted = userDoc.privacy_accepted === true;
    const policyVersion = userDoc.policy_version || '';

    const needsAcceptance =
      !termsAccepted ||
      !privacyAccepted ||
      policyVersion !== CURRENT_POLICY_VERSION;

    return {
      termsAccepted,
      privacyAccepted,
      policyVersion,
      needsAcceptance,
    };
  } catch (error) {
    console.error('Error checking terms acceptance:', error);
    return {
      termsAccepted: false,
      privacyAccepted: false,
      policyVersion: '',
      needsAcceptance: true,
    };
  }
}

/**
 * Update user's terms and privacy acceptance in database
 */
export async function acceptTermsAndPrivacy(userId: string): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const now = new Date().toISOString();
    
    // We'll update the user document in the backend. 
    // We need a PATCH /api/auth/me or similar endpoint for profile updates.
    // For now, let's assume we can update it via a generic update endpoint or we add one.
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        terms_accepted: true,
        privacy_accepted: true,
        policy_version: CURRENT_POLICY_VERSION,
        accepted_at: now,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error accepting terms:', error);
    return false;
  }
}

/**
 * Get current policy version
 */
export function getCurrentPolicyVersion(): string {
  return CURRENT_POLICY_VERSION;
}
