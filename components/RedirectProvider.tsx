'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RedirectProvider = ({ children}:any) => {
  const router = useRouter();
  const redirect = true

  useEffect(() => {
    if (redirect) {
      router.push('/');
    }
  }, []);

  return children;
};