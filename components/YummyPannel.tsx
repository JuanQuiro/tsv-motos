'use client'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Checkbox, user } from "@nextui-org/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
//import SvgComponent from "./svgYummy";
const { getMonitor } = require("consulta-dolar-venezuela");





export default function App({ allData, price, imagenes, Iniciados }: any) {
  const router = useRouter()
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null) as any;
  const [infoUser, setInfoUser] = useState({}) as any;
  const [isChecked, setIsChecked] = useState(false)
  const [filteredDocuments, setFilteredDocuments] = useState(false) as any

  
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
    const usuario = estado;
    console.log(usuario);
  
    setSelectedButtonInfo('Informacion');
    setInfoUser(usuario);
    console.log('user',infoUser);
    
    
  };

  const handleClick = async () => {
    toast('Usuario Aceptado')
  }

  const handleClickDeclinar = async () => {
    router.push('/declinar')
  }

  
  // Función
  function buscarAlldata(Iniciado: any[], Alldata: any[]) {
    const correosIniciado = Iniciado.map((data: { gmail: any; }) => data.gmail);
    const correosAlldata = Alldata.map((data: { gmail: any; }) => data.gmail);
  
    const resultados = [];
  
    for (let i = 0; i < Alldata.length; i++) {
      const objetoAlldata = Alldata[i];
      if (objetoAlldata.estado_formulario === 'Finalizar') {
        resultados.push(objetoAlldata);
      } else {
        const correo = objetoAlldata.gmail;
        if (!correosIniciado.includes(correo)) {
          resultados.push(objetoAlldata);
        }
      }
    }
  
    return resultados;
  }

let filtradoAplicado = buscarAlldata(Iniciados,allData)
const totalDocumentos = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Aplicante').length;
const totalAprobados = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'aplicantes').length;
const totalProceso = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Proceso').length;
const totalGarantia = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Garantia').length;
const totalFinalizado = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Finalizados').length;
//console.log('Filtrados=',filtradoAplicado,'Iniciados =',Iniciados, 'allData =', allData );

useEffect(() => {

  if (infoUser) {
    const filteredDocuments = imagenes.filter((doc: { id_clerk: any; }) => doc.id_clerk === infoUser.id_clerk);
    console.log('DOCUMENTO',filteredDocuments);
    setFilteredDocuments(filteredDocuments)
  }

}, [infoUser]);

// Ejemplo de uso
  return (
    <>
          <Toaster />
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
                    1 - Registrado ({Iniciados.length})
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


                  {filtradoAplicado.map((element: any, index: any) => (
                      <div className="grid grid-cols-3 col-span-3 gap-3" key={index+500}>
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
                            {element.estado_proceso  ? '': 'Usuario No ha iniciado proceso'}
                          </div>
                        </Card>
                      </div>
                    ))}

                </div>

              </div>

            </Card>
          </Card>
        )}

        {((selectedButton === 'aplicaciones') && (selectedButtonInfo === null)) && (

          <Card className="mx-3 mt-3 col-span-3">
            <div className="grid grid-cols-3 gap-3">
              <h3 className="col-span-3 mx-auto text-lg mx-4">Historial de aplicaciones:</h3>

              {allData.filter((item: { estado_proceso: any; }) => item.estado_proceso === 'Aplicante').length > 0 ? (
                allData.filter((item: { estado_proceso: any; }) => item.estado_proceso === 'Aplicante').map((element: any, index: any) => (
                  <>
                    <Card key={index + 2} className="p-4 my-3 text-center">
                      <div className="text-xl">{element.fecha}</div>
                    </Card>
                    <Card key={index + index} className="p-4 my-3 text-center">
                      <div>{element.username} ({element.id_clerk})</div>
                    </Card>

                    <button  key={index + index} onClick={() => handleButtonInfo(element)}>
                      <Card className="p-4 my-3 cursor-pointer text-center">
                        <div className='text-center  text-xl'>Informacion</div>
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

        {((selectedButton === 'aplicaciones') && (selectedButtonInfo === 'Informacion') && (infoUser)) && (

          <Card className="mx-3 mt-3 col-span-3">
            <div className="grid gap-3">

            <Button onClick={() => handleButtonInfo(null)} className="w-3 absolute right-0 top-0" color="danger">
  <p>◀</p>
</Button>
              <Card className="mx-auto mt-5">
                <CardBody className="">

                  <p>Informacion de la aplicacion</p>

                </CardBody>
              </Card>
              <div className="grid grid-cols-2 gap-5 place-items-center">

                <Card className="p-5">
                  <p>Info Input de Usuario</p>
                  <p>Nombre : {infoUser.username}</p>
                  <p>Fecha de Ingreso : {infoUser.fecha}</p>
                  <p>Estado Proceso : {infoUser.estado_formulario}</p>
                </Card>

                <div>

                <Card className="p-5">
                  <p>Capture de Dashboard</p>
                  <div className="mx-auto">

                    <Image
                      src={filteredDocuments[0]?.dashoard_yummy }
                      width={100}
                      height={100}
                      alt="Picture of the author"
                    />
                  </div>
                </Card>


                <Card className="p-5">
                  <p>Capture de Dashboard</p>
                  <div className="mx-auto">

                    <Image
                      src={filteredDocuments[0]?.persona_cedula}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                    />
                  </div>
                </Card>
                      </div>

                <div className="col-span-2">
                  <Checkbox
                    defaultSelected={isChecked}
                    radius='sm'
                    onChange={handleCheckboxChange}
                  >
                    Estoy de acuerdo con los términos y condiciones
                  </Checkbox>
                  <div className="grid grid-cols-2 items-center">

                    <Button
                      className="mx-auto mt-3"
                      onClick={handleClick}
                      isDisabled={!isChecked}
                      color='danger'
                    >
                      Declinar
                    </Button>

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

