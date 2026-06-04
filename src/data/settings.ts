import { sanity } from '../lib/sanity';

export interface Schedule {
  title: string;
  holidayNote: string;
  days: {
    day: string;
    isClosed: boolean;
    opens: string;
    closes: string;
  }[];
}

export async function fetchActiveSchedule(): Promise<Schedule | null> {
  try {
    const data = await sanity.fetch(`
      *[_type == "siteSettings"][0] {
        "active": activeSchedule-> {
          title,
          holidayNote,
          days
        }
      }
    `);
    return data?.active || null;
  } catch (err) {
    console.error('[sanity] Failed to load active schedule:', err);
    return null;
  }
}

export const activeSchedule = await fetchActiveSchedule();
