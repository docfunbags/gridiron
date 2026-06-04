import { sanity, img } from '../lib/sanity';

interface RawImageRef {
  asset: { _ref: string; _type: 'reference' };
}

export interface Event {
  title: string;
  desc: string;
  when: string;
  day: string;
  month: string;
  calDate: string;
  endDate?: string;
  cover: string;
  image: string;       // ~600px thumb
  imageFull: string;   // ~1600px lightbox
  recurring: boolean;
}

interface RawEvent extends Omit<Event, 'image' | 'imageFull'> {
  image?: RawImageRef;
}

async function fetchEvents(): Promise<Event[]> {
  try {
    const raw = await sanity.fetch<RawEvent[]>(`
      *[_type == "event"] | order(recurring asc, calDate asc) {
        title, desc, when, day, month, calDate, endDate, cover, image,
        recurring
      }
    `);
    return raw.map((e) => ({
      ...e,
      cover: e.cover ?? '',
      image: e.image ? img(e.image).width(600).quality(75).url() : '',
      imageFull: e.image ? img(e.image).width(1600).quality(82).url() : '',
    }));
  } catch (err) {
    console.error('[sanity] Failed to load events:', err);
    return [];
  }
}

export const events: Event[] = await fetchEvents();
