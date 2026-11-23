import Image from 'next/image';
import { repository, type GalleryItem } from '../lib/data';

export function GalleryCards({ items, previous = false }: { items: GalleryItem[]; previous?: boolean }) {
    return <div data-reveal-group className={`swipe-row three${previous ? ' previous-gallery' : ''}`}>
        {items.map(item => <article className={`gallery-placeholder${previous ? ' light' : ''}`} key={item.id}>
            {item.verified && item.image ? <div className="gallery-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 767px) 84vw, 30vw" /></div> : <span aria-hidden="true">✧</span>}
            <h3>{item.title}</h3>
            {!(item.verified && item.image) && <p>{previous ? 'Completed customer cake photographs awaiting approval.' : 'Authentic Paradise photographs coming soon.'}</p>}
            {previous && <a href="#custom" className="text-link">Plan your own cake →</a>}
        </article>)}
    </div>;
}

export function ReviewCards() {
    const reviews = repository.getReviews();
    return <div data-reveal-group className="swipe-row three">{reviews.length ? reviews.map(review => <article className="review-card" key={review.id}>
        <span aria-hidden="true">“</span><blockquote><p>{review.text}</p><cite>{review.author}</cite></blockquote>
        <a href={review.sourceUrl} target="_blank" rel="noreferrer" className="text-link">Read original review ↗</a>
    </article>) : repository.getBranches().map(branch => <article className="review-card" key={branch.id}>
        <span aria-hidden="true">“</span><h3>Tell us about {branch.name}</h3><p>We’d love to hear about your visit.</p>
        {branch.reviewUrl ? <a href={branch.reviewUrl} target="_blank" rel="noreferrer" className="text-link">Leave a review ↗</a> : <span className="pending">Review link coming soon</span>}
    </article>)}</div>;
}

export function ContactLinks() {
    const contact = repository.getContact();
    return <>{contact.email && <a href={`mailto:${contact.email}`}>Email Paradise Bakes</a>}{contact.instagram && <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}</>;
}
