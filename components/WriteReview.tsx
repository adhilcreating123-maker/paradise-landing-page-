'use client';

import { useRef, useState, type FormEvent } from 'react';

export default function WriteReview() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.get('name'),
          rating: Number(fields.get('rating')),
          review: fields.get('review'),
        }),
      });
      if (!response.ok) throw new Error('Review submission failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const fieldClass = 'mt-1 w-full rounded-lg border border-[#C9A34E]/35 bg-[#2B0E16] text-[#FDF2D8] px-3 py-2 text-base focus:border-[#E3A04B] focus:outline-none';

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          if (status === 'sent') setStatus('idle');
          dialogRef.current?.showModal();
        }}
        className="ml-2 rounded-lg bg-[#E3A04B] hover:bg-[#CA8B4A] px-3.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1C050B] transition-all shadow-md hover:shadow-lg"
      >
        Write a Review
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="write-review-title"
        className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-md overflow-auto rounded-2xl bg-[#1C050B] border border-[#C9A34E]/40 p-6 text-[#FDF2D8] shadow-2xl backdrop:bg-black/80"
      >
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#C9A34E]/25 pb-3">
          <h3 id="write-review-title" className="font-serif text-2xl font-bold text-white">Write a Review</h3>
          <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-lg border border-[#C9A34E]/40 text-[#FDF2D8] hover:bg-[#C9A34E]/20 px-3 py-1.5 text-sm transition-colors">
            Close
          </button>
        </div>
        <p role="status" className={status === 'sent' ? 'text-base text-emerald-300' : 'sr-only'}>
          {status === 'sent' ? 'Thanks! Paradise Bakes received your review.' : status === 'sending' ? 'Sending your review…' : ''}
        </p>
        <form onSubmit={submitReview} hidden={status === 'sent'}>
          <fieldset disabled={status === 'sending'} className="space-y-4">
            <label className="block text-sm font-semibold text-[#ffd7c9]">
              Name
              <input autoFocus name="name" autoComplete="name" required maxLength={80} className={fieldClass} />
            </label>
            <label className="block text-sm font-semibold text-[#ffd7c9]">
              Rating
              <select name="rating" required defaultValue="" className={fieldClass}>
                <option value="" disabled className="bg-[#1C050B] text-[#FDF2D8]">Select a rating</option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating} className="bg-[#1C050B] text-[#FDF2D8]">{rating} out of 5</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-[#ffd7c9]">
              Your review
              <textarea name="review" required rows={4} maxLength={2000} className={fieldClass} />
            </label>
            {status === 'error' && <p role="alert" className="text-sm text-rose-400">Your review could not be sent. Check your entries and try again.</p>}
            <button type="submit" className="rounded-lg bg-[#E3A04B] hover:bg-[#CA8B4A] px-4 py-2.5 font-bold text-[#1C050B] uppercase tracking-wider text-xs transition-all shadow-md disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send Review'}
            </button>
          </fieldset>
        </form>
      </dialog>
    </>
  );
}
