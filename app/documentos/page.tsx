import { PrismaClient } from '@prisma/client';
import Formulario from "../../components/formario-documentos";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient()

const App =  async () => {
  const { userId } : { userId: string | null } = auth();
  
  const allData = await prisma.clerk.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  if (allData?.estado_formulario === 'Finalizar') return redirect('/dashoard-tvs')
  if (allData?.estado_formulario === null || allData?.estado_formulario === undefined) {
    return redirect('/')
  } 


  return (
    <div className="grid pt-4 justify-items-center">
      <Formulario userId={userId} />
    </div>
  );
};

export default App