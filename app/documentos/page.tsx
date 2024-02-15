import { PrismaClient } from '@prisma/client';
import Formulario from "../../components/formario-documentos";
import { redirect } from 'next/navigation';

const prisma = new PrismaClient()

const App =  async () => {
  const allData = await prisma.clerk.findMany({});

  if (allData[0]?.estado_formulario == 'Finalizado') return redirect('/dashoard-tvs')
  if (!allData[0]?.estado_formulario) return redirect('/')

  return (
    <div className="grid pt-4 justify-items-center">
      <Formulario />
    </div>
  );
};

export default App