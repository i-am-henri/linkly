'use server';

import { db } from '@/lib/db';

type CurrentMonthClicks = {
  month: string;
  clicks: number;
};

export async function getCurrentMonthClicks(
  linkId: string
): Promise<CurrentMonthClicks> {
  'use cache';
  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentMonthName = now.toLocaleString('default', { month: 'long' });

  const clicks = await db.click.findMany({
    where: {
      link: {
        id: linkId,
      },
      time: {
        gte: new Date(now.getFullYear(), currentMonthIndex, 1),
        lt: new Date(now.getFullYear(), currentMonthIndex + 1, 1),
      },
    },
  });

  const totalClicks = clicks.length;

  return {
    month: currentMonthName,
    clicks: totalClicks > 0 ? totalClicks : 0,
  };
}
type DailyClicks = {
  day: string;
  clicks: number;
};

export async function getDailyClicksForCurrentMonth(
  linkId: string
): Promise<DailyClicks[]> {
  'use cache';
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const clicks = await db.click.findMany({
    where: {
      link: {
        id: linkId,
      },
      time: {
        gte: startOfMonth,
        lt: new Date(year, month + 1, 1),
      },
    },
  });

  const dailyClicks = clicks.reduce(
    (acc, click) => {
      const day = new Date(click.time).getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const daysInMonth = endOfMonth.getDate();
  const result: DailyClicks[] = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    return {
      day,
      clicks: dailyClicks[i + 1] || 0,
    };
  });

  return result;
}
