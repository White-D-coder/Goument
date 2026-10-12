export const LOTUS_GIFT_ID = 'preview-envelope-ep1';
// SKIP is a legacy draft read shape; it never satisfies the required-name gate.
export type GiftPersonalisation = { mode: 'PRINT'; name: string } | { mode: 'SKIP' };
export function printNameError(name: string): string {
  return !name.trim() || name.trim().length > 80 || /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/.test(name)
    ? 'Enter a name of 1–80 characters.' : '';
}
