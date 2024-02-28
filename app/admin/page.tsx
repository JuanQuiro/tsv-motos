import Admin from "../../components/admin-client";
import { auth } from '@clerk/nextjs';
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";


const Home = async () => {

  const prisma = new PrismaClient();
  const { userId }: { userId: string | null } = auth();

  const validador = await prisma.admin.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  console.log('VAlIDACION',validador);
  
  if(validador) return redirect('/dashoard-admin')

  return (
    <Admin userId={userId} />
  );
};

export default Home;