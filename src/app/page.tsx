'use client';
import { Toaster } from 'sonner';
import BaseGlobe from '@/components/Hero';
import GlobeHeader from '@/components/Hero/GlobeHeader';

import { DetailsSheet } from '@/components/Passport/details-sheet';
import EventSheet from '@/components/Passport/event-sheet';
import { usePassport } from '@/stores/passport';
import { Suspense } from 'react';
import Loading from './loading';

export default function Home() {
  const open = usePassport((state) => state.open);

  return (
    <main className="bg-black scrollbar-hide">
      <DetailsSheet />
      <GlobeHeader />
      <Suspense fallback={<Loading />}>
        <BaseGlobe />
      </Suspense>
      <EventSheet />
      <Toaster visibleToasts={7} />
    </main>
  );
}
