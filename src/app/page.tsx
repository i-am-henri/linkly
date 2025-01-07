'use client';

import Header from '@/components/header';
import RenderDate from '@/components/render-date';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { allPosts } from 'content-collections';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

const Links = dynamic(() => import('@/components/links'));

export default function Page() {
  const posts = allPosts.sort(
    (a, b) => b.htmlDate.getTime() - a.htmlDate.getTime()
  );
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Create Short Links Instantly</h2>
        <p>
          Linky is your go-to service for creating short links quickly and
          effortlessly. Track clicks, manage links with passwords, and enjoy a
          host of features—all for free and with your own domain coming soon!
          Our service is hosted in Germany, prioritizing your security and
          privacy. No sign-ups are required, and we implement rate limits to
          prevent spam. Share your tracking links with friends easily; they
          won’t need to sign up to access your domain. Join us in simplifying
          link sharing!
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Start creating your first links</h2>
        <div className="flex space-x-3">
          <Link href="/create">
            <StartButton />
          </Link>
          <TrackingTextButton />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Documentation</h2>
        <div className="border-y flex flex-col border-y-neutral-200  *:py-2 divide-y divide-neutral-200">
          {posts.map((post) => (
            <DocumentationItem
              href={post._meta.path}
              title={post.title}
              key={post._meta.path}
              date={post.htmlDate}
            />
          ))}
          {posts.length === 0 && (
            <p className="text-neutral-500">No blog posts found.</p>
          )}
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Links />
      </Suspense>
    </>
  );
}

const DocumentationItem = ({
  title,
  date,
  href,
}: { title: string; date: Date; href: string }) => (
  <Link
    href={`/documentation/${href}`}
    className="w-full flex items-center justify-between cursor-pointer"
  >
    <p>{title}</p>
    <p className="text-neutral-500">
      <RenderDate>{date}</RenderDate>
    </p>
  </Link>
);

function StartButton() {
  return (
    <button
      type="submit"
      className="flex space-x-2 items-center  bg-orange-700 text-white px-2 py-1 rounded-md"
    >
      <span>Create a new link</span>
      <ChevronRightIcon
        className="w-4 h-4"
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}

function TrackingTextButton() {
  return (
    <button
      type="submit"
      className="flex space-x-2 items-center  bg-neutral-700 text-white px-2 py-1 rounded-md"
    >
      <span>I got a tracking text</span>
      <ChevronRightIcon
        className="w-4 h-4"
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
