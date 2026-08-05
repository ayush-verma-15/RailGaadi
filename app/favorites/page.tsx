'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FavoritesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/bookmarks');
  }, [router]);

  return null;
}
