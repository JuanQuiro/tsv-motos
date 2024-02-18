import { PrismaClient } from '@prisma/client';
import Formulario from "../../components/formario-documentos";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Image from 'next/image';
const { getMonitor } = require("consulta-dolar-venezuela");


const prisma = new PrismaClient()

const App =  async () => {
  const { price } = await getMonitor("BCV", "lastUpdate").then((data: any) => {
    console.log(data,'sas',data.bcv);
    return data.bcv
  });

  const { userId } = auth()
  const allData = await prisma.clerk.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })
  console.log('[ALLDATA]',allData);
  

  //if (allData[0]?.estado_formulario == 'Finalizar') return redirect('/dashoard-tvs')
  //if (!allData[0]?.estado_formulario) return redirect('/')

  return (
    <>
    <div className="grid grid-cols-4">
    <Card className=" mx-2 mt-2">
      
      <div className="grid mt-2 grid-cols-2">
      <Card className="m-4 my-0 col-span-2">
      <CardBody>
        
      <Image
      width={300}
      height={150}
      alt="NextUI hero Image"
      src="/Logo-TVS.png"
    />
      </CardBody>
    </Card>

    
  
    
    <Card className="m-4 my-0 mt-10 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Nueva Aplicacion</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto ">Firma Contrato</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Pago de Inicial</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Retiro de Unidades</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Historial de Pagos</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Citas de Taller</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Atencion al Cliente</p>
      </CardBody>
    </Card>

    <Card className="m-4 my-0 mt-3 text-center	col-span-2">
      <CardBody>
        <p className="mx-auto">Shop / Respuestos</p>
      </CardBody>
    </Card>


      </div>
      <CardFooter>
      </CardFooter>
    </Card>
    
    <Card className=" mx-3 col-span-3">
      <div className=' grid grid-cols-4 '>

    <Card className="mx-4 my-3 col-span-3">
      <CardBody className='bg-black/10 '>
        <p className="mx-auto">
          <span className="text-red-600">Tienes casos por atender : </span>
           <span className='text-black'>
             1 Aplicacion, 2 Firmas, 1 Pago de Inicial, 6 Pagos de mensualidades.
            </span>
        </p>
      </CardBody>


    </Card>
    <Card className='col-span-1'>
      <CardBody className='bg-black/10'>
        <p className="mx-auto">
          Tasa BCV del dia 
        </p>
        <p className="mx-auto">
          {price}
        </p>
      </CardBody>
    </Card>
      </div>
    <div className="grid grid-cols-3">

      <div className="col-span-3">
      <p className="text-center text-lg my-3 underline font-semibold mx-auto">
        Estado Del Usuario
      </p>
      </div>

    <div className="mx-6">
      <Card className="grid p-5 place-items-center">
       1 - Registrado (1)
        </Card>
    </div>

    <div className="mx-6">
      <Card className="grid p-5 py-3 place-items-center">
        2 - Aplicantes (1)
        </Card>
    </div>

    <div className="mx-6">
      <Card className="grid p-5 py-3 place-items-center">
      3 - Aprobados (00)
        </Card>
    </div>

    <div className="mx-6">
      <Card className="grid my-6 place-items-center p-5 py-3">
        4 - En Proceso (00)
      </Card>
    </div>

    <div className="mx-6">
      <Card className="grid my-6 place-items-center p-5 py-3">
        5 - Garantia (00)
      </Card>
    </div>

    <div className="mx-6">
      <Card className="grid my-6 place-items-center p-5 py-3">
        6 - Finalizados (00) 
      </Card>
    </div>

    <div className="grid my-6 col-span-3  place-items-center">
      <h3 className="col-span-3 text-center text-lg underline font-semibold">Historial de actividad Global</h3>
      <div className="grid grid-cols-2 col-span-3 gap-3">
      <Card className="p-4 my-3 text-center">
        14/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Retiro de la unidad
      </Card>

      <Card className="p-4 my-3 text-center">
        12/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Pago de Inicial
      </Card>

      <Card className="p-4 my-3 text-center">
        11/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Verificacion y Aprobacion
      </Card>

      <Card className="p-4 my-3 text-center">
        10/2/2024 
      </Card>
      <Card className="p-4 my-3 text-center">
        Apertura de cuenta
      </Card>
      </div>
    </div>

    </div>

    </Card>
    </div>
    
    </>
  );
};

export default App