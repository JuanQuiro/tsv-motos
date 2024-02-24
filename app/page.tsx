import Inicio from "@/components/page/Inicio";
import { currentUser } from '@clerk/nextjs';
import { PrismaClient } from "@prisma/client";




export default async function Home() {
  const prisma = new PrismaClient();
  const clerk = await prisma.clerk.findMany({});
  const user = await currentUser()

  const currentDate = new Date()
  const currentDateTime = currentDate.toLocaleString()

  console.log('data: ',clerk);
  
  
  try {

    if (user?.id != null && user?.emailAddresses[0].emailAddress != null) {
    const createdCorreo = await prisma.correo_iniciando_estimacion.create({
      data: {
        id_clerk : user.id,
        gmail : user.emailAddresses[0].emailAddress,
        iniciando : true,
        fecha: currentDateTime,
      },
    });
  }
  } catch (error) {
    console.error('Usuario ya creado o error al crearlo');
  }
 


  return (
    <Inicio />
  )
}
