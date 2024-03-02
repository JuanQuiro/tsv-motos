import Form from '@/components/form'
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation'
import { toast,Toaster } from 'sonner';



const prisma: PrismaClient = new PrismaClient();

export default async function Home({alldata}: any) {
  const { userId } : { userId: string | null } = auth();

  const allData = await prisma.clerk.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })


  //console.log('Data :',allData, userId);
  

  if (allData?.estado_formulario === 'Formulario') return redirect('/documentos')
  else if (allData?.estado_formulario === 'Finalizar') return redirect('/dashoard-tvs')
  //else return redirect('/')

  



  

  return (
    <>
          <Toaster />
    <section className='py-24'>
      <div className='container'>
        <Form />
      </div>
    </section>
    </>
  )
}
