'use client';

import { type StorageLink, getLinks } from '@/lib/utils';
import Link from 'next/link';
/* This file is used to get the created and viewed links
   from this user out of the local storage. */

import { useEffect, useState } from 'react';

export default function Links() {
  const [viewedLinks, setViewedLinks] = useState<StorageLink[]>([]);
  const [createdLinks, setCreatedLinks] = useState<StorageLink[]>([]);

  useEffect(() => {
    setViewedLinks(
      getLinks({
        key: 'viewedLinks',
      })
    );
    setCreatedLinks(
      getLinks({
        key: 'createdLinks',
      })
    );
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Links created on this device</h2>
        <div className="border-y flex flex-col border-y-neutral-200  *:py-2 divide-y divide-neutral-200">
          {createdLinks.length > 0 ? (
            createdLinks.map((link) => (
              <Link
                href={`/dashboard/${link.id}`}
                className="flex items-center justify-between"
                key={link.slug}
              >
                <span>{link.slug}</span>
                <span>{link.link}</span>
              </Link>
            ))
          ) : (
            <p>No Links found.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Links opened on this device</h2>
        <div className="border-y flex flex-col border-y-neutral-200  *:py-2 divide-y divide-neutral-200">
          {viewedLinks.length > 0 ? (
            viewedLinks.map((link) => (
              <Link
                href={`/dashboard/${link.id}`}
                className="flex items-center justify-between"
                key={link.slug}
              >
                <span>{link.slug}</span>
                <span>{link.link}</span>
              </Link>
            ))
          ) : (
            <p>No Links found.</p>
          )}
        </div>
      </div>
    </>
  );
}
