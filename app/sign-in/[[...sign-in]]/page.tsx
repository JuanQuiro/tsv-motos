import { Suspense } from 'react';
import { SignIn } from '@clerk/nextjs';

export default async function Page() {
  return (
    <div className='flex justify-center'>
      <Suspense fallback={<div>Cargando...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}