import type { Branch, Cake } from './data.ts';
export function totalFor(cake: Cake, weight: number): number | undefined { return cake.confirmedPricePerKg === undefined ? undefined : Math.round(cake.confirmedPricePerKg * weight * 100) / 100; }
export function inquiryText(values: Record<string, string>): string { return ['Hello Paradise Bakes, I would like to inquire about a cake.', ...Object.entries(values).map(([key, value]) => `${key}: ${value || 'Not specified'}`), 'Please confirm the price, options, and availability. This is an inquiry, not a confirmed order.'].join('\n'); }
export function whatsappUrl(branch: Branch, text: string): string | undefined { if (!branch.whatsapp || !/^\d{10,15}$/.test(branch.whatsapp))
    return undefined; return `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(text)}`; }
export function localDateTime(date = new Date()): string { const pad = (n: number) => String(n).padStart(2, '0'); return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`; }
