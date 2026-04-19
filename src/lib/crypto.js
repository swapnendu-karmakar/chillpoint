// ──────────────────────────────────────────────────────────────────
// crypto.js — PBKDF2 password hashing using the Web Crypto API
// Production-level: random salt + 100,000 iterations of SHA-256
// ──────────────────────────────────────────────────────────────────

const ITERATIONS = 100_000
const KEY_LENGTH = 256 // bits
const HASH_ALGO  = 'SHA-256'

function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

function base64ToBuf(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

/**
 * Hash a plaintext password using PBKDF2 + random salt.
 * Returns { hash: string, salt: string } — both base64 encoded.
 */
export async function hashPassword(plaintext) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(plaintext),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: HASH_ALGO },
    keyMaterial,
    KEY_LENGTH
  )
  return {
    hash: bufToBase64(derived),
    salt: bufToBase64(salt),
  }
}

/**
 * Verify a plaintext password against a stored { hash, salt } record.
 * Returns true if they match.
 */
export async function verifyPassword(plaintext, stored) {
  const salt = base64ToBuf(stored.salt)
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(plaintext),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const derived = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: HASH_ALGO },
    keyMaterial,
    KEY_LENGTH
  )
  return bufToBase64(derived) === stored.hash
}

/**
 * Detect whether a DB value is a legacy plaintext password.
 * We check if it parses as a JSON object with { hash, salt } keys.
 */
export function isHashed(value) {
  try {
    const parsed = JSON.parse(value)
    return typeof parsed === 'object' && 'hash' in parsed && 'salt' in parsed
  } catch {
    return false
  }
}
