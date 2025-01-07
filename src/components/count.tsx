'use client';

import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';

export default function Count({ number }: { number: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount(number);
      console.log(number);
    }, 100);
  }, [number]);
  return <NumberFlow value={count} />;
}
