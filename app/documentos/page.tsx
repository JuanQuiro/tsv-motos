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

  if (allData?.estado_formulario == 'Finalizar') return redirect('/dashoard-tvs')


  return (
    <div className="grid pt-4 justify-items-center">
      <Formulario />
    </div>
  );
};

export default App