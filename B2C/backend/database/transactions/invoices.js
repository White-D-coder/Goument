const { transaction, required, audit } = require('./common');
async function issueInvoice(db, { invoiceId, invoiceNumber, documentUrl, actorId }) {
  // Number/seller/tax policy must be approved upstream. This does not generate legal invoices.
  if (!invoiceNumber || !actorId) throw new Error('Approved invoice number and actor required');
  return transaction(db, async session => {
    const actor = await required(db.models.User, actorId, session);
    if (!actor.roles.some(role => ['ADMIN', 'OWNER'].includes(role)) || actor.status !== 'ACTIVE') throw new Error('Staff identity required');
    const invoice = await required(db.models.Invoice, invoiceId, session);
    if (invoice.status === 'ISSUED') { if (invoice.invoiceNumber !== invoiceNumber || invoice.documentUrl !== documentUrl) throw new Error('Invoice issuance conflict'); return invoice; }
    if (invoice.status !== 'DRAFT') throw new Error('Invoice is not draft');
    invoice.$locals.issuing = true; invoice.invoiceNumber = invoiceNumber; invoice.documentUrl = documentUrl; invoice.issuedAt = new Date(); invoice.status = 'ISSUED'; await invoice.save({ session });
    await audit(db, session, 'INVOICE_ISSUED', 'invoices', invoice, actorId, { status: 'DRAFT' }, { status: 'ISSUED' }); return invoice;
  });
}
module.exports = { issueInvoice };
