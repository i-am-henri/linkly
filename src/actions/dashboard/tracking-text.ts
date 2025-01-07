'use server';

import { db } from '@/lib/db';
import { z } from 'zod';

export async function getTrackingText(code: string): Promise<{
  error?: string;
  id?: string;
  slug?: string;
  link?: string;
}> {
  const parse = await z
    .object({
      code: z.string().min(5),
    })
    .safeParseAsync({
      code,
    });

  if (!parse.success) {
    return {
      error: 'Input is invalid.',
      id: undefined,
    };
  }

  const link = await db.link.findUnique({
    where: {
      code,
    },
  });

  if (!link) {
    return {
      error:
        'Error while looking up for your link. It could be possible that your code is wrong.',
      id: undefined,
    };
  }

  return {
    error: undefined,
    id: link.id,
    slug: link.slug,
    link: link.link,
  };
}
