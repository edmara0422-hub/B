"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, [router]);
  return <div style={{ backgroundColor: '#000000', width: '100vw', height: '100vh' }}></div>;
}
