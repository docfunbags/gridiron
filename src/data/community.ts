import { sanity, img } from '../lib/sanity';

interface RawPhoto {
  asset: { _ref: string; _type: 'reference' };
  alt: string;
}

export interface CommunityPhoto {
  src: string;       // ~600px thumbnail
  srcFull: string;   // ~1600px lightbox
  alt: string;
}

async function fetchPhotos(): Promise<CommunityPhoto[]> {
  try {
    const raw = await sanity.fetch<{ image: RawPhoto['asset']; alt: string }[]>(`
      *[_type == "communityPhoto" && defined(image.asset)] | order(_createdAt asc) {
        image, alt
      }
    `);
    return raw.map((p) => ({
      src: img(p.image).width(600).height(600).quality(75).url(),
      srcFull: img(p.image).width(1600).quality(82).url(),
      alt: p.alt,
    }));
  } catch (err) {
    console.error('[sanity] Failed to load community photos:', err);
    return [];
  }
}

export const photos: CommunityPhoto[] = await fetchPhotos();
