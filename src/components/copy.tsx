'use client';

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export default function Copy({ link }: { link: string }) {
  return (
    <ClipboardDocumentIcon
      strokeWidth={2}
      onClick={() => {
        navigator.clipboard.writeText(link);
        toast.success(`Link ${link} copied to clipboard.`);
      }}
      className="h-4 cursor-pointer font-bold w-4"
    />
  );
}
