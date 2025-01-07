'use server';

import { db } from '@/lib/db';
import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

export async function CreateLinkAction({
  link,
  slug,
}: {
  link: string;
  slug: string;
}): Promise<{
  error?: string;
  id?: string;
  slug?: string;
  link?: string;
}> {
  const parse = await z
    .object({
      link: z.string().url(),
      slug: z.string().min(3),
    })
    .safeParseAsync({
      link,
      slug,
    });

  if (!parse.success || !parse.data) {
    return {
      error: 'Given fields are not valid!',
      id: undefined,
    };
  }

  const allLinks = await db.link.count();

  // check if the limit is reached
  if (process.env.LIMIT && +process.env.LIMIT <= allLinks) {
    return {
      error:
        'Link limit is reached. Please try it again later or contact the owner of this site.',
    };
  }
  // create the new link
  const shortLink = await db.link.create({
    data: {
      id: createId(),
      link,
      slug,
    },
  });

  if (!shortLink) {
    return {
      error: 'Something went wrong while creating your link.',
      id: undefined,
    };
  }

  return {
    error: undefined,
    id: shortLink.id,
    link: shortLink.link,
    slug: shortLink.slug,
  };
}
