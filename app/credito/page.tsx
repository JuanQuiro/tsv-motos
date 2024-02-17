import Form from '@/components/form'
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation'



const prisma: PrismaClient = new PrismaClient();

export default async function Home() {
  const { userId } : { userId: string | null } = auth();
  const allData = await prisma.clerk.findMany({});
  const filteredData = allData.filter(data => data.id_clerk === userId); 


  //if (allData[0]?.estado_formulario == 'Formulario') return redirect('/documentos?formulario=true')
  //if (allData[0]?.estado_formulario == 'Finalizar') return redirect('/dashoard-tvs')

  
  

  return (
    <section className='py-24'>
      <div className='container'>
        <Form />
      </div>
    </section>
  )
}
