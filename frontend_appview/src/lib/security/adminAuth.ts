import crypto from 'crypto';
import { NextRequest } from 'next/server';

const AUTH_SECRET = process.env.ADMIN_SESSION_SECRET || 'the_gourmet_gifts_luxury_portal_auth_secret_key_2026';
export const ADMIN_PIN = process.env.ADMIN_PORTAL_PIN || 'gourmet2026';
export const ADMIN_COOKIE_NAME = 'gourmet_admin_session';

// Rate Limiter tracking: IP -> { attempts: number, lockUntil: number }
const rateLimitMap = new Map<string, { attempts: number; lockUntil: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remainingMinutes?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    return { allowed: true };
  }

  if (entry.lockUntil > now) {
    const remainingMinutes = Math.ceil((entry.lockUntil - now) / 60000);
    return { allowed: false, remainingMinutes };
  }

  // Lock expired
  if (entry.lockUntil > 0 && entry.lockUntil <= now) {
    rateLimitMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function registerFailedAttempt(ip: string): { locked: boolean; remainingMinutes?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { attempts: 0, lockUntil: 0 };
  entry.attempts += 1;

  if (entry.attempts >= 5) {
    // Lock for 15 minutes
    entry.lockUntil = now + 15 * 60 * 1000;
    rateLimitMap.set(ip, entry);
    return { locked: true, remainingMinutes: 15 };
  }

  rateLimitMap.set(ip, entry);
  return { locked: false };
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days session
  const payload = `gourmet_admin:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
  return `${payload}:${hmac}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(':');
  if (parts.length !== 3) return false;

  const [role, expiresAtStr, signature] = parts;
  if (role !== 'gourmet_admin') return false;

  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  const expectedPayload = `${role}:${expiresAtStr}`;
  const expectedHmac = crypto.createHmac('sha256', AUTH_SECRET).update(expectedPayload).digest('hex');

  // Constant-time comparison
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expectedHmac, 'hex');
  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expBuf);
}

export function verifyAdminRequest(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
  return verifySessionToken(cookie?.value);
}
