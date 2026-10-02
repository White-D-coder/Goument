const crypto = require('crypto');
const failure = (message, status = 400) => Object.assign(new Error(message), { status });
function validSignature(body, signature, secret) {
  if (!secret || typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = crypto.createHmac('sha256', secret).update(body).digest();
  return crypto.timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}
function razorpayGateway({ keyId, keySecret, webhookSecret, fetcher = fetch }) {
  if (!/^rzp_(test|live)_[A-Za-z0-9]+$/.test(keyId || '') || !keySecret || !webhookSecret) return null;
  async function call(path, body) {
    let response;
    try { response = await fetcher(`https://api.razorpay.com/v1${path}`, { method: body ? 'POST' : 'GET', headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`, 'Content-Type': 'application/json' }, ...(body ? {body:JSON.stringify(body)} : {}), signal: AbortSignal.timeout(10000) }); }
    catch { throw failure('Payment provider did not respond. Check payment status before retrying.', 503); }
    if (!response.ok) throw failure('Payment provider could not complete this request.', 503);
    return response.json();
  }
  return {
    keyId,
    createOrder: data => call('/orders', data),
    fetchPayment: id => { if (!/^pay_[A-Za-z0-9]+$/.test(id)) throw failure('Invalid payment reference'); return call(`/payments/${id}`); },
    verifyCheckout: (orderId, paymentId, signature) => validSignature(`${orderId}|${paymentId}`, signature, keySecret),
    verifyWebhook: (body, signature) => validSignature(body, signature, webhookSecret)
  };
}
module.exports = { razorpayGateway, validSignature, failure };
