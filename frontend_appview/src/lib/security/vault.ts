import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface InquiryRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  occasion?: string;
  quantity?: string | number;
  targetDate?: string;
  message?: string;
  boxItem?: any;
  productItems?: Array<{ name: string; quantity: number }>;
  source?: string;
  ip?: string;
  geoCity?: string;
  geoRegion?: string;
  geoCountry?: string;
}

export interface SessionRecord {
  id: string;
  firstSeen: string;
  lastSeen: string;
  ip: string;
  geoCity: string;
  geoRegion: string;
  geoCountry: string;
  deviceType: string;
  browser: string;
  os: string;
  landingPage: string;
  referrer: string;
  totalDwellTimeSec: number;
  pagesVisited: string[];
}

export interface SectionEngagementRecord {
  sectionId: string;
  pagePath: string;
  totalViews: number;
  totalDwellTimeSec: number;
}

export interface VaultData {
  inquiries: InquiryRecord[];
  sessions: Record<string, SessionRecord>;
  sectionEngagement: Record<string, SectionEngagementRecord>;
  lastUpdated: string;
}

const VAULT_DIR = path.join(process.cwd(), 'data');
const VAULT_FILE = path.join(VAULT_DIR, 'analytics_vault.enc');

const ALGORITHM = 'aes-256-gcm';
const SECRET_SEED = process.env.ENCRYPTION_SECRET || 'gourmet_luxury_analytics_vault_secret_key_2026_salt_99';
const SALT = 'the_gourmet_gifts_secure_salt_b2b_luxury_2026';
const DERIVED_KEY = crypto.scryptSync(SECRET_SEED, SALT, 32);

function ensureVaultDir() {
  if (!fs.existsSync(VAULT_DIR)) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
  }
}

function encryptPayload(plainText: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, DERIVED_KEY, iv);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Format: iv:authTag:encryptedData
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

function decryptPayload(cipherText: string): string {
  const parts = cipherText.split(':');
  if (parts.length !== 3) {
    throw new Error('Corrupted cipher format in encrypted vault.');
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, DERIVED_KEY, iv);
  
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

function getInitialVault(): VaultData {
  return {
    inquiries: [],
    sessions: {},
    sectionEngagement: {},
    lastUpdated: new Date().toISOString(),
  };
}

export async function readVaultData(): Promise<VaultData> {
  ensureVaultDir();
  if (!fs.existsSync(VAULT_FILE)) {
    const initial = getInitialVault();
    await writeVaultData(initial);
    return initial;
  }

  try {
    const rawCipher = fs.readFileSync(VAULT_FILE, 'utf8');
    if (!rawCipher || rawCipher.trim() === '') {
      return getInitialVault();
    }
    const decrypted = decryptPayload(rawCipher.trim());
    const parsed = JSON.parse(decrypted);
    return {
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
      sessions: parsed.sessions && typeof parsed.sessions === 'object' ? parsed.sessions : {},
      sectionEngagement: parsed.sectionEngagement && typeof parsed.sectionEngagement === 'object' ? parsed.sectionEngagement : {},
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (error) {
    console.error('[VAULT] Failed to decrypt or parse vault, recovering safe state:', error);
    return getInitialVault();
  }
}

export async function writeVaultData(data: VaultData): Promise<void> {
  ensureVaultDir();
  data.lastUpdated = new Date().toISOString();
  const serialized = JSON.stringify(data);
  const encrypted = encryptPayload(serialized);
  
  // Atomic write to avoid partial writes during concurrent requests
  const tempFile = `${VAULT_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, encrypted, 'utf8');
  fs.renameSync(tempFile, VAULT_FILE);
}

export async function recordInquiryInVault(
  inquiry: Omit<InquiryRecord, 'id' | 'createdAt'>
): Promise<InquiryRecord> {
  const vault = await readVaultData();
  const newRecord: InquiryRecord = {
    ...inquiry,
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  vault.inquiries.unshift(newRecord);
  // Cap at last 2000 inquiries to prevent unbounded memory growth
  if (vault.inquiries.length > 2000) {
    vault.inquiries = vault.inquiries.slice(0, 2000);
  }

  await writeVaultData(vault);
  return newRecord;
}

export interface TelemetryPayload {
  type: 'pageview' | 'heartbeat';
  sessionId: string;
  pagePath: string;
  activeSection?: string;
  dwellTimeSec?: number;
  deviceType?: string;
  browser?: string;
  os?: string;
  referrer?: string;
}

export async function recordTelemetryInVault(
  payload: TelemetryPayload,
  geoInfo: { ip: string; city: string; region: string; country: string }
): Promise<void> {
  const vault = await readVaultData();
  const now = new Date().toISOString();
  const sid = payload.sessionId || `anon_${geoInfo.ip.replace(/[^a-zA-Z0-9]/g, '')}`;

  // 1. Session tracking
  if (!vault.sessions[sid]) {
    vault.sessions[sid] = {
      id: sid,
      firstSeen: now,
      lastSeen: now,
      ip: geoInfo.ip,
      geoCity: geoInfo.city || 'Unknown',
      geoRegion: geoInfo.region || 'Unknown',
      geoCountry: geoInfo.country || 'Unknown',
      deviceType: payload.deviceType || 'Desktop',
      browser: payload.browser || 'Unknown',
      os: payload.os || 'Unknown',
      landingPage: payload.pagePath || '/',
      referrer: payload.referrer || 'Direct',
      totalDwellTimeSec: payload.dwellTimeSec || 0,
      pagesVisited: [payload.pagePath || '/'],
    };
  } else {
    const s = vault.sessions[sid];
    s.lastSeen = now;
    if (payload.dwellTimeSec && payload.dwellTimeSec > 0) {
      s.totalDwellTimeSec = (s.totalDwellTimeSec || 0) + payload.dwellTimeSec;
    }
    if (payload.pagePath && !s.pagesVisited.includes(payload.pagePath)) {
      s.pagesVisited.push(payload.pagePath);
    }
    if (geoInfo.city && (!s.geoCity || s.geoCity === 'Unknown')) {
      s.geoCity = geoInfo.city;
      s.geoRegion = geoInfo.region;
      s.geoCountry = geoInfo.country;
    }
  }

  // 2. Section engagement tracking
  if (payload.activeSection && payload.pagePath) {
    const key = `${payload.pagePath}#${payload.activeSection}`;
    if (!vault.sectionEngagement[key]) {
      vault.sectionEngagement[key] = {
        sectionId: payload.activeSection,
        pagePath: payload.pagePath,
        totalViews: 1,
        totalDwellTimeSec: payload.dwellTimeSec || 5,
      };
    } else {
      const sec = vault.sectionEngagement[key];
      sec.totalViews += payload.type === 'pageview' ? 1 : 0;
      sec.totalDwellTimeSec += payload.dwellTimeSec || 5;
    }
  }

  // Session pruning: keep up to 5,000 recent sessions
  const sessionKeys = Object.keys(vault.sessions);
  if (sessionKeys.length > 5000) {
    const sorted = sessionKeys.sort(
      (a, b) => new Date(vault.sessions[b].lastSeen).getTime() - new Date(vault.sessions[a].lastSeen).getTime()
    );
    const toKeep = sorted.slice(0, 5000);
    const prunedSessions: Record<string, SessionRecord> = {};
    for (const k of toKeep) {
      prunedSessions[k] = vault.sessions[k];
    }
    vault.sessions = prunedSessions;
  }

  await writeVaultData(vault);
}
