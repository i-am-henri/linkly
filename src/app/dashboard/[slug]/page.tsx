import {
  getCurrentMonthClicks,
  getDailyClicksForCurrentMonth,
} from '@/actions/dashboard/clicks';
import Copy from '@/components/copy';
import Count from '@/components/count';
import Header from '@/components/header';
import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Dashboard({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <Data slug={slug} />
      </Suspense>{' '}
    </>
  );
}

async function Data({
  slug,
}: {
  slug: string;
}) {
  const link = await db.link.findUnique({
    where: {
      id: slug,
    },
    select: {
      code: true,
      id: true,
      link: true,
      slug: true,
      _count: {
        select: {
          clicks: {
            where: {
              id: slug,
            },
          },
        },
      },
    },
  });

  if (!link) {
    notFound();
  }

  const monthlyClicks = await getCurrentMonthClicks(link.id);
  const dailyClicks = await getDailyClicksForCurrentMonth(link.id);

  const image = await fetch(
    `https://icons.duckduckgo.com/ip3/${link.link.replace('https://', '').replace('http://', '')}.ico`
  );
  const blob = await image.blob();
  const dataUrl = `data:${blob.type};base64,${Buffer.from(await blob.arrayBuffer()).toString('base64')}`;

  return (
    <>
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Dashboard for {link.slug}</h2>
        <p className="flex flex-wrap space-x-1">
          Your link <b className="mx-1"> {link.slug}</b> is redirecting to{' '}
          <Link
            className="text-blue-500 flex space-x-2 items-center"
            target="_blank"
            href={link.link}
          >
            <Image
              alt={`Favicon of ${link.link}`}
              width={16}
              height={16}
              src={dataUrl}
              className="flex"
            />
            <span>{link.link}</span>
          </Link>{' '}
          and has a total of {link._count.clicks} clicks. The code for this link
          is{' '}
          <span>
            <b>{link.code}</b>.
          </span>{' '}
          You need this code later for sharing it with your friends or accessing
          is for these analytics.
        </p>
      </div>

      <div className="w-full px-5 py-3 bg-neutral-200 rounded-full border border-neutral-300 flex justify-between items-center">
        <Link
          target="_blank"
          className="text-blue-500"
          href={`${process.env.NEXT_PUBLIC_URL}/link/${link.slug}`}
        >
          {process.env.NEXT_PUBLIC_URL}/link/{link.slug}
        </Link>
        <Copy link={`${process.env.NEXT_PUBLIC_URL}/link/${link.slug}`} />
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-medium">
          Current month: <Count number={monthlyClicks.clicks} /> clicks
        </h2>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <DailyClicksChart data={dailyClicks} />
        </Suspense> */}
      </div>
    </>
  );
}
