/**
 * Centralized API client for the frontend.
 *
 * Usage:
 *   import { apiFetch } from '@/lib/api';
 *
 *   // GET request
 *   const members = await apiFetch('/team/members');
 *
 *   // POST with body
 *   const result = await apiFetch('/applicants', {
 *     method: 'POST',
 *     body: JSON.stringify(data),
 *     token: userToken,
 *   });
 *
 *   // Dynamic image URL from relative path
 *   import { buildImageUrl } from '@/lib/api';
 *   <img src={buildImageUrl(member.avatar)} />
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

if (!API_BASE) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not defined. Add it to your .env.local file.'
  );
}

export interface ApiFetchOptions extends RequestInit {
  /** Bearer token to attach to Authorization header */
  token?: string;
}

/**
 * Makes an authenticated API request to the backend.
 * Automatically prepends NEXT_PUBLIC_API_URL and handles JSON parsing and errors.
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { token, headers: extraHeaders, ...restOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extraHeaders as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...restOptions,
    headers,
  });

  // Try to parse JSON regardless of status
  let data: unknown;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      (data as { message?: string })?.message ||
      `API Error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return data as T;
}

/**
 * Builds a full image URL from a relative path stored in the DB.
 *
 * Examples:
 *   buildImageUrl('/uploads/team/avatar.webp')
 *   // → 'http://localhost:5000/uploads/team/avatar.webp' (dev)
 *   // → 'https://abhibhidevelopers.online/uploads/team/avatar.webp' (prod)
 *
 *   buildImageUrl('https://lh3.googleusercontent.com/....')
 *   // → 'https://lh3.googleusercontent.com/....' (returned as-is)
 */
export function buildImageUrl(imagePath?: string | null): string {
  if (!imagePath) return '/placeholder-avatar.png';

  // Already a full external URL — return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Relative path — build full URL using backend base (strip /api suffix)
  const base = API_BASE.replace(/\/api$/, '');
  return `${base}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}

/**
 * Helper for multipart form-data uploads (no Content-Type header — browser sets boundary).
 */
export async function apiUpload<T = unknown>(
  path: string,
  formData: FormData,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Upload failed: ${response.status}`);
  }

  return data as T;
}
