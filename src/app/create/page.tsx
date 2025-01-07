'use client';
import { CreateLinkAction } from '@/actions/create/link';
import Header from '@/components/header';
import { SlugInput, UrlInput } from '@/components/ui/input';
import { linkSchema, setLink } from '@/lib/utils';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

export default function CreateLink() {
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-3 w-full">
        <h2 className="text-lg font-medium">Create a new link</h2>
        <p>
          You will get after this a small code to share with your friends, so
          they can also access the analytics for this link. We are saving this
          link also local on your machine.
        </p>
        <form
          action={async (e: FormData) => {
            const link = e.get('link') as string;
            const slug = e.get('slug') as string;

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
              toast.error(
                'Validation Error: Please fill out every input element.'
              );
              return;
            }

            // create the link
            const shortLink = await CreateLinkAction({
              link: parse.data.link,
              slug: parse.data.slug,
            });

            if (shortLink.error) {
              toast.error(shortLink.error);
              return;
            }

            const linkSchemaParse = await linkSchema.safeParseAsync({
              link: shortLink.link,
              id: shortLink.id,
              slug: shortLink.slug,
            });

            if (!linkSchemaParse.success) {
              toast.error('We got an error while createing your link.');
              return;
            }

            // set the link to the viewed link in the local storage
            setLink({
              key: 'createdLinks',
              link: {
                id: linkSchemaParse.data.id,
                slug: linkSchemaParse.data.slug,
                link: linkSchemaParse.data.link,
              },
            });

            redirect(`/dashboard/${shortLink.id}`);
          }}
          className="items-center flex flex-col rounded-lg space-y-3 justify-center border h-[50vh]"
        >
          <div className="flex flex-col space-y-3 items-start">
            <UrlInput type="url" name="link" required />
            <SlugInput min={3} name="slug" required />
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
