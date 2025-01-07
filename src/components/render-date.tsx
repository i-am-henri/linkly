'use client';

import { useEffect, useState } from 'react';

export default function RenderDate({ children }: { children: Date }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return <>{isClient ? children.toLocaleDateString() : ''}</>;
}
