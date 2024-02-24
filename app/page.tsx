import Inicio from "@/components/page/Inicio";
import { currentUser } from '@clerk/nextjs';
import { PrismaClient } from "@prisma/client";



export default async function Home() {

  
  const prisma = new PrismaClient()
  const user = currentUser()

  console.log('data: ',{prisma}, {user});
  
  /*
  try {

    const createdCorreo = await prisma.correo_iniciando_estimacion.create({
      data: {
        id_clerk,
        gmail,
        iniciando,
      },
    });

  } catch (error) {
    console.error(error);
  }
 */


  return (
    <Inicio />
  )
}
