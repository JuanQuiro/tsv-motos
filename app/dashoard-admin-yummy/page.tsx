import { PrismaClient } from '@prisma/client';
import Formulario from "../../components/formario-documentos";
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Image from 'next/image';
const { getMonitor } = require("consulta-dolar-venezuela");

const elements = [
  { date: '14/2/2024', content: 'Retiro de la unidad' },
  { date: '12/2/2024', content: 'Luis Martinez' },
  { date: '12/2/2024', content: 'Pago de Inicial' },
  { date: '11/2/2024', content: 'Verificacion y Aprobacion' },
];

const prisma = new PrismaClient()

export default async function App() {
  const { userId } = auth()
  const validador = await prisma.admin_yummy.findFirst({
    where: { id_clerk: userId || 'ERROR' },
  })

  console.log('Data :',validador);

  if(validador === null) return redirect('/')

  const { price } = await getMonitor("BCV", "lastUpdate").then((data: any) => {
    //console.log(data,'sas',data.bcv);
    return data.bcv
  });

  const allData = await prisma.clerk.findMany({})

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
      src="/yummy.png"
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
    
    <Card className=" mx-3 mt-3 col-span-3">
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
    <Card className='col-span-1 m-2'>
      <CardBody className='bg-black/10 '>
        <p className="mx-auto ">
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
      <div className="grid grid-cols-3 col-span-3 gap-3">
      {allData.map((element, index) => (
      <>
      <Card key={index+2} className="p-4 my-3 text-center">
          <div>{element.fecha}</div>
        </Card>
        <Card key={index+index} className="p-4 my-3 text-center">
          <div>{element.username} ({element.id_clerk})</div>
        </Card>

        <Card key={index+index} className="p-4 my-3 text-center">
        <div className='text-center'>{element.estado_formulario === 'Finalizar' ? 'Nueva Aplicacion' : ''}</div>
        </Card>
      </>
      ))}
      </div>
    </div>

    </div>

    </Card>
    </div>
    
    </>
  );
};
