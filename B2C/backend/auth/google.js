const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// Fixed Google endpoints: no caller-controlled discovery/JWKS URLs.
function googleProvider({ clientId, clientSecret, redirectUri, fetcher = fetch }) {
  let keys = []; let expires = 0;
  async function verify(idToken, nonce) {
    const decoded = jwt.decode(idToken, { complete: true });
    if (!decoded || decoded.header.alg !== 'RS256' || typeof decoded.header.kid !== 'string') throw new Error('Invalid Google token');
    if (Date.now() >= expires || !keys.some(k => k.kid === decoded.header.kid)) {
      const response = await fetcher('https://www.googleapis.com/oauth2/v3/certs', { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('Google keys unavailable');
      const body = await response.json(); keys = Array.isArray(body.keys) ? body.keys : []; expires = Date.now() + 300000;
    }
    const key = keys.find(k => k.kid === decoded.header.kid && k.kty === 'RSA' && (!k.use || k.use === 'sig'));
    if (!key) throw new Error('Unknown Google signing key');
    const claims = jwt.verify(idToken, crypto.createPublicKey({ key, format: 'jwk' }), { algorithms: ['RS256'], audience: clientId, issuer: ['https://accounts.google.com', 'accounts.google.com'], clockTolerance: 5 });
    if (!Number.isInteger(claims.exp) || !Number.isInteger(claims.iat) || claims.iat > Date.now()/1000+5 || claims.nonce !== nonce || claims.email_verified !== true || typeof claims.sub !== 'string' || !claims.sub || claims.sub.length > 255 || typeof claims.email !== 'string' || (claims.azp && claims.azp !== clientId)) throw new Error('Invalid Google identity claims');
    return claims;
  }
  return {
    authorization({ state, nonce, verifier }) {
      return 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: 'code', scope: 'openid email profile', state, nonce, code_challenge: crypto.createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256', prompt: 'select_account' });
    },
    async exchange(code, { nonce, verifier }) {
      const response = await fetcher('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code', code_verifier: verifier }), signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('Google exchange failed');
      const body = await response.json();
      if (typeof body.id_token !== 'string') throw new Error('Google identity missing');
      return verify(body.id_token, nonce);
    }, verify
  };
}
module.exports = { googleProvider };
