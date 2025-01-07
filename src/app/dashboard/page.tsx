'use client';

import { getTrackingText } from '@/actions/dashboard/tracking-text';
import Header from '@/components/header';
import { SlugInput } from '@/components/ui/input';
import { linkSchema, setLink } from '@/lib/utils';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

// input to get the tracking text

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-3 w-full">
        <h2 className="text-lg font-medium">The tracking code</h2>
        <form
          action={async (e: FormData) => {
            const code = e.get('code') as string;

            const parse = await z
              .object({
                code: z.string().min(5),
              })
              .safeParseAsync({
                code,
              });

            if (!parse.success) {
              toast.error(
                'Validation Error: Please fill out every input element correct.'
              );
              return;
            }

            const link = await getTrackingText(code);

            if (link.error) {
              toast.error(link.error);
              return;
            }

            const linkSchemaParse = await linkSchema.safeParseAsync({
              link: link.link,
              id: link.id,
              slug: link.slug,
            });

            if (!linkSchemaParse.success) {
              toast.error('We got an error while createing your link.');
              return;
            }

            // set the link to the viewed link in the local storage
            setLink({
              key: 'viewedLinks',
              link: {
                id: linkSchemaParse.data.id,
                slug: linkSchemaParse.data.slug,
                link: linkSchemaParse.data.link,
              },
            });

            redirect(`/dashboard/${link.id}`);
          }}
          className="items-center flex flex-col rounded-lg space-y-3 justify-center border h-[50vh]"
        >
          <div className="flex flex-col space-y-3 items-start">
            <SlugInput type="text" min={5} name="code" required />
            <ProceedButton />
          </div>
        </form>
      </div>
    </>
  );
}
function ProceedButton() {
  return (
    <button
      type="submit"
      className="flex space-x-2 items-center w-min  bg-orange-700 text-white px-2 py-1 rounded-md"
    >
      <span>Proceed</span>
      <ChevronRightIcon
        className="w-4 h-4"
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
