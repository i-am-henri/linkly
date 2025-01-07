'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

type DailyClicks = {
  day: string;
  clicks: number;
};
export function DailyClicksChart({
  data,
}: {
  data: DailyClicks[];
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="rounded-md p-4 bg-white border">
      {isClient && (
        <AreaChart
          className="w-full outline-0 focus-within:outline-none focus:outline-none"
          style={'outline-width: 0px'}
          width={500}
          height={300}
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={3}
          />
          <Area
            className="outline-none"
            dataKey="clicks"
            fill="#f97316"
            fillOpacity={0.4}
            stroke="#ff9416"
          />
        </AreaChart>
      )}
    </div>
  );
}
