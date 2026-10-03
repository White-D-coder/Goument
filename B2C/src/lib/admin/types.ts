export type AdminRecord = { id: string; version?: number; [key: string]: unknown };
export type AdminList = { items: AdminRecord[]; next: string | null };
export type AdminDetail = { item: AdminRecord; related?: Record<string, AdminList> };
export type Capability = { available: boolean; reason?: string };
export type AdminSession = {
  user: { id: string; email: string; role: string };
  permissions: string[];
  capabilities: Record<string, Capability>;
  reporting: { timezone: string; currency: string } | null;
};
export type AdminMetric = { key: string; label: string; value: number | null; unit: string; source: string; formula: string; range?: string; reason?: string };
export type AdminReport = {
  window: { from: string; to: string; currency: string; timezone: string };
  metrics: AdminMetric[];
  attention: { id: string; label: string; status: string; href: string }[];
  topProducts: { productId: string | null; productName?: string; quantity: number }[];
  definitions?: { revenue?: string; topProducts?: string; attention?: string };
};
export type AdminResource = 'orders' | 'customers' | 'products' | 'variants' | 'categories' | 'inventory' | 'payments' | 'refunds' | 'invoices' | 'coupons' | 'shipping' | 'notifications' | 'audit-logs' | 'staff';
export type FieldKind = 'text' | 'date' | 'money' | 'status' | 'boolean' | 'number';
export type DisplayField = { key: string; label: string; kind?: FieldKind; currencyKey?: string; link?: AdminResource };
export type ResourceDefinition = { key: AdminResource; title: string; singular: string; description: string; permission: string; writePermission?: string; fields: DisplayField[]; columns: string[]; statuses?: string[]; create?: boolean; edit?: boolean; capability?: string; search?: string };
