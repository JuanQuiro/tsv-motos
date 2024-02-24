'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Checkbox } from "@nextui-org/react";
import Image from 'next/image';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useState } from "react";
const { getMonitor } = require("consulta-dolar-venezuela");


const elements = [
  { date: '14/2/2024', content: 'Retiro de la unidad' },
  { date: '12/2/2024', content: 'Luis Martinez' },
  { date: '12/2/2024', content: 'Pago de Inicial' },
  { date: '11/2/2024', content: 'Verificacion y Aprobacion' },
];


export default function App({ allData, price, imagenes, Iniciados }: any) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null);
  const [isChecked, setIsChecked] = useState(false)

  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleButtonClick = (buttonName: any) => {
    if (selectedButton === buttonName) {
      setSelectedButton(null); // Deseleccionar el botón si ya estaba seleccionado
    } else {
      setSelectedButton(buttonName);
    }
  };

  const handleButtonInfo = (estado: any) => {
    //console.log('sas', estado);

    setSelectedButtonInfo(estado)
    
  };
  const handleClick = async () => {
    console.log('Finalizando fomrulario envio de data [DEBUG]')
  }

  
  // Función
function buscarAlldata(Iniciado : any, Alldata : any) {
  const correosIniciado = Iniciado.map(((data: { gmail: any; }) => data.gmail));
  const correosAlldata = Alldata.map((data: { gmail: any; }) => data.gmail);

  const resultados = [];

  for (let i = 0; i < Iniciado.length; i++) {
    const correo = correosIniciado[i];

    if (correosAlldata.includes(correo)) {
      const objetoAlldata = Alldata.find((data: any) => data.gmail === correo);
      if (objetoAlldata) {
        resultados.push(objetoAlldata);
      }
    } else {
      resultados.push(Iniciado[i]);
    }
  }

  return resultados;
}
let filtradoAplicado = buscarAlldata(Iniciados,allData)
const totalDocumentos = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'aplicantes').length;
const totalAprobados = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'aplicantes').length;
const totalProceso = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Proceso').length;
const totalGarantia = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Garantia').length;
const totalFinalizado = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Finalizados').length;
console.log('Filtrados=',filtradoAplicado);

// Ejemplo de uso
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





            <Button
              className={`m-4 my-0 mt-10 text-center col-span-2 ${selectedButton === 'aplicaciones' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('aplicaciones')}
            >
              <CardBody>
                <p className="mx-auto">Aplicaciones</p>
              </CardBody>
            </Button>

            <Button
              className={`m-4 my-0 mt-3 text-center col-span-2 ${selectedButton === 'aceptados' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('aceptados')}
            >
              <CardBody>
                <p className="mx-auto">Aceptados</p>
              </CardBody>
            </Button>

            <Button
              className={`m-4 my-0 mt-3 text-center col-span-2 ${selectedButton === 'rechazos' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('rechazos')}
            >
              <CardBody>
                <p className="mx-auto">Rechazos</p>
              </CardBody>
            </Button>

            <Button
              className={`m-4 my-0 mt-3 text-center col-span-2 ${selectedButton === 'mensajes' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('mensajes')}
            >
              <CardBody>
                <p className="mx-auto">Mensajes</p>
              </CardBody>
            </Button>


            <Button className="bg-purple-300 m-4 my-0 mt-10 text-center	col-span-2">
              <CardBody>
                <p className="mx-auto">Soporte MotoStudio</p>
              </CardBody>
            </Button>

          </div>
          <CardFooter>
          </CardFooter>
        </Card>



        {/* Aquí se muestra el componente dependiendo del estado seleccionado */}
        {selectedButton === null && (
          <Card className="mx-3 mt-3 col-span-3">
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
                      {price === 0 ? 'Actualizando Precio' : price}
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
                    1 - Registrado (0{Iniciados.length})
                  </Card>
                </div>

                <div className="mx-6">
                  <Card className="grid p-5 py-3 place-items-center">
                    2 - Aplicantes ({totalDocumentos})
                  </Card>
                </div>

                <div className="mx-6">
                  <Card className="grid p-5 py-3 place-items-center">
                    3 - Aprobados ({totalAprobados})
                  </Card>
                </div>

                <div className="mx-6">
                  <Card className="grid my-6 place-items-center p-5 py-3">
                    4 - En Proceso ({totalProceso})
                  </Card>
                </div>

                <div className="mx-6">
                  <Card className="grid my-6 place-items-center p-5 py-3">
                    5 - Garantia ({totalGarantia})
                  </Card>
                </div>

                <div className="mx-6">
                  <Card className="grid my-6 place-items-center p-5 py-3">
                    6 - Finalizados ({totalFinalizado})
                  </Card>
                </div>

                <div className="grid my-6 col-span-3  place-items-center">
                  <h3 className="col-span-3 text-center text-lg underline font-semibold">Historial de actividad Global</h3>
                  <div className="grid grid-cols-3 col-span-3 gap-3">


                  {filtradoAplicado.map((element: any, index: any) => (
                      <>
                        <Card key={index + 2} className="p-4 my-3 text-center">
                          <div>{element.fecha}</div>
                        </Card>
                        <Card key={index + index} className="p-4 my-3 text-center">
                          <div>{element.username} ({element.id_clerk})</div>
                        </Card>

                        <Card key={index + index} className="p-4 my-3 text-center">
                          <div className='text-center'>
                            {element.estado_proceso === 'documentos' ? 'En Documentos' : ''}
                            {element.estado_proceso === 'Aplicante' ? 'Aplicante' : ''}
                            {element.estado_proceso === 'aprobado' ? 'aprobado' : ''}
                          </div>
                        </Card>
                      </>
                    ))}

                  </div>
                </div>

              </div>

            </Card>
          </Card>
        )}

        {((selectedButton === 'aplicaciones') && (selectedButtonInfo === null)) && (

          <Card className="mx-3 mt-3 col-span-3">
            <div className="grid grid-cols-3 gap-3">
              <h3 className="col-span-3 mx-auto text-lg mx-4">Historial de aplicaciones:</h3>

              {allData.filter((item: { estado_proceso: any; }) => item.estado_proceso === 'aplicante').length > 0 ? (
                allData.filter((item: { estado_proceso: any; }) => item.estado_proceso === 'aplicante').map((element: any, index: any) => (
                  <>
                    <Card key={index + 2} className="p-4 my-3 text-center">
                      <div className="text-xl">{element.fecha}</div>
                    </Card>
                    <Card key={index + index} className="p-4 my-3 text-center">
                      <div>{element.username} ({element.id_clerk})</div>
                    </Card>

                    <button key={index + index} onClick={() => handleButtonInfo('informacion')}>
                      <Card className="p-4 my-3 cursor-pointer text-center">
                        <div className='text-center  text-xl'>Info.</div>
                      </Card>
                    </button>
                  </>
                ))
              ) : (
                <h3 className="mx-auto col-span-3 text-xl text-red-600">No se ha encontrado ningun aplicante</h3>
              )}

            </div>
          </Card>
        )}

        {((selectedButton === 'aplicaciones') && (selectedButtonInfo === 'informacion')) && (

          <Card className="mx-3 mt-3 col-span-3">
            <div className="grid gap-3">

              <Card className="mx-auto mt-5">
                <CardBody className="">
                  <p>Informacion de la aplicacion</p>

                </CardBody>
              </Card>
              <div className="grid grid-cols-2 gap-5 place-items-center">

                <Card className="p-5">
                  <p>Info Input de Usuario</p>
                  <p>Mas de 400$</p>
                </Card>

                <Card className="p-5">
                  <p>Capture de Dashboard</p>
                  <div className="mx-auto">

                    <Image
                      src={imagenes[0].dashoard_yummy}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                    />
                  </div>
                </Card>

                <Card className="p-5">
                  <p>Info Input de Usuario</p>
                  <p>CI : 30391154</p>
                  <p>Nombre : juanquiroz</p>
                  <p>Edad : 21</p>
                </Card>

                <Card className="p-5">
                  <p>Capture de Dashboard</p>
                  <div className="mx-auto">

                    <Image
                      src={imagenes[0].dashoard_yummy}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                    />
                  </div>
                </Card>

                <div className="col-span-2">
                  <Checkbox
                    defaultSelected={isChecked}
                    radius='sm'
                    onChange={handleCheckboxChange}
                  >
                    Estoy de acuerdo con los términos y condiciones
                  </Checkbox>
                  <div className="grid items-center">

                    <Button
                      className="mx-auto mt-3"
                      onClick={handleClick}
                      isDisabled={!isChecked}
                      color='primary'
                    >
                      Enviar
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        )}

        {selectedButton === 'aceptados' && (
          <Card className="mx-3 mt-3 col-span-3">
            {/* Código del componente cuando el botón "Aceptados" está seleccionado */}
          </Card>
        )}

        {selectedButton === 'rechazos' && (
          <Card className="mx-3 mt-3 col-span-3">
            {/* Código del componente cuando el botón "Rechazos" está seleccionado */}
          </Card>
        )}

        {selectedButton === 'mensajes' && (
          <Card className="mx-3 mt-3 col-span-3">
            {/* Código del componente cuando el botón "Mensajes" está seleccionado */}
          </Card>
        )}

      </div>

    </>
  );
};
