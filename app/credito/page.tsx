import Form from '@/components/form'
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';

const prisma: PrismaClient = new PrismaClient();

export default async function Home() {
  const { userId } : { userId: string | null } = auth();
  const allData = await prisma.clerk.findMany({});
  

  
  const filteredData = allData.filter(data => data.id_clerk === 'user_2apgrkYwKNabuAuhnbIax9bojTy'); 
  
  console.log(filteredData);
  
  

  return (
    <section className='py-24'>
      <div className='container'>
        <Form />
      </div>
    </section>
  )
}
