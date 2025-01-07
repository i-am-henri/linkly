import { db } from '@/lib/db';
import { createId } from '@paralleldrive/cuid2';
import { notFound, redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  // get the link from the db, return it and log it
  const link = await db.link.findUnique({
    where: {
      slug,
    },
  });

  if (!link) {
    notFound();
  }

  // create new click for the link
  const click = await db.click.create({
    data: {
      id: createId(),
      linkId: link.id,
    },
  });

  if (!click) {
    throw new Error(
      'Could not create click, please try it again or contact us.'
    );
  }

  const url = await z.string().url().safeParseAsync(link.link);

  if (!url.success) {
    throw new Error('You are getting redirected to an invalid URL.');
  }

  return redirect(link.link);
}
