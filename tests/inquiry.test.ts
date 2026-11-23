import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inquiryText, totalFor, whatsappUrl, localDateTime } from '../lib/inquiry.ts';
import { cakes, branches } from '../lib/data.ts';
test('unconfirmed prices never produce totals', () => assert.equal(totalFor(cakes[0], 2), undefined));
test('confirmed per-kg prices calculate and round correctly', () => { assert.equal(totalFor({ ...cakes[0], confirmedPricePerKg: 750 }, 0.5), 375); assert.equal(totalFor({ ...cakes[0], confirmedPricePerKg: 850 }, 2), 1700); assert.equal(totalFor({ ...cakes[0], confirmedPricePerKg: 749.99 }, 0.5), 375); });
test('WhatsApp requires a configured official number', () => { assert.equal(whatsappUrl(branches[0], 'test'), undefined); assert.equal(whatsappUrl({ ...branches[0], whatsapp: 'bad-number' }, 'test'), undefined); });
test('WhatsApp inquiry retains punctuation, line breaks, Unicode and all fields', () => { const text = inquiryText({ Cake: 'Rose & berry', Weight: '1 kg', Message: 'Happy birthday, Anu! ?', Pickup: '2026-12-20T17:00', Branch: 'Olavanna' }); const url = whatsappUrl({ ...branches[0], whatsapp: '919999999999' }, text)!; assert.equal(new URL(url).searchParams.get('text'), text); assert.match(text, /not a confirmed order/); assert.match(text, /Weight: 1 kg/); });
test('pickup input uses local calendar fields', () => { const d = new Date(2026, 0, 2, 3, 4); assert.equal(localDateTime(d), '2026-01-02T03:04'); });
