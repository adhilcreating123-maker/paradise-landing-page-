import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export async function POST(request: Request) {
  const input: unknown = await request.json().catch(() => null);
  if (typeof input !== 'object' || input === null) {
    return Response.json({ error: 'Enter a name, rating, and review.' }, { status: 400 });
  }

  const fields = input as Record<string, unknown>;
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const review = typeof fields.review === 'string' ? fields.review.trim() : '';
  const rating = fields.rating;
  if (!name || name.length > 80 || !review || review.length > 2000 ||
      typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json({ error: 'Enter a valid name, rating, and review.' }, { status: 400 });
  }

  const storagePath = resolve(/* turbopackIgnore: true */ process.env.REVIEW_SUBMISSIONS_FILE || 'data/review-submissions.jsonl');
  try {
    await mkdir(dirname(storagePath), { recursive: true });
    const entry = JSON.stringify({ name, rating, review, submittedAt: new Date().toISOString() });
    await appendFile(storagePath, entry + '\n', { mode: 0o600 });
  } catch {
    return Response.json({ error: 'Review storage is unavailable.' }, { status: 503 });
  }

  return Response.json({ received: true }, { status: 201 });
}
