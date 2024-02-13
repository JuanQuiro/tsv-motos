'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RedirectProvider = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    console.log('REDIRIGIENDO')
    router.push('/')
    
    }, [children]);

  return children;
};