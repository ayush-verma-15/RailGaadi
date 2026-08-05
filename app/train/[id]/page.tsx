'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrainRedirectPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      router.replace(`/telemetry/${params.id}`);
    }
  }, [params.id, router]);

  return null;
}
