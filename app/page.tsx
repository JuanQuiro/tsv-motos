import Inicio from "@/components/page/Inicio";
import { currentUser } from '@clerk/nextjs';
import { PrismaClient } from "@prisma/client";




export default async function Home() {
  const prisma = new PrismaClient();
  const clerk = await prisma.clerk.findMany({});
  const user = await currentUser()

  console.log('data: ',clerk);
  
  
  try {

    const createdCorreo = await prisma.correo_iniciando_estimacion.create({
      data: {
        id_clerk : user?.id || 'Error',
        gmail : user?.emailAddresses[0].emailAddress || 'Error',
        iniciando : true,
      },
    });

  } catch (error) {
    console.error(error);
  }
 


  return (
    <Inicio />
  )
}
