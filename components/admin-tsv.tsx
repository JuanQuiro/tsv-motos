'use client'
import { PrismaClient } from '@prisma/client';
//import Formulario from "../../components/formario-documentos";
import { redirect, useRouter } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, useDisclosure, Checkbox, Modal, Image, Input } from "@nextui-org/react";
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

import { MuiFileInput } from "mui-file-input";
import { Controller, useForm } from "react-hook-form";


import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';



const { getMonitor } = require("consulta-dolar-venezuela");


const schema = z.object({
  dirrecionCita: z.string().min(2, 'El teléfono emisor es requerido'),
  fechaPago: z.string().min(1, 'La fecha de pago es requerida'),
  montoPagar: z.string().min(1, 'La fecha de pago es requerida'),
  horaCita: z.string().min(1, 'La fecha de pago es requerida'),
});

const prisma = new PrismaClient()

const App = ({ allData, price, imagenes, Iniciados, dataFormulario, DocsFirmas }: any) => {
  const [filteredDocuments, setFilteredDocuments] = useState(false) as any
  const router = useRouter()
  const [selectedButton, setSelectedButton] = useState(null);
  const [inputValue, setInputValue] = useState('')
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null) as any;
  const [infoUser, setInfoUser] = useState({}) as any;
  const [infoUserFirma, setInfoUserFirma] = useState(null) as any;
  const [infoUserFirmaImg, setInfoUserFirmaImg] = useState(null) as any;

  const [infoUserRetiro, setinfoUserRetiro] = useState(null) as any;

  const [formulario, setFormulario] = useState({}) as any;
  const [isChecked, setIsChecked] = useState(false)
  const [isAplicacion, setIsAplicacion] = useState(false)
  const [id_users, setIdUsers] = useState('') as any


  type Inputs = z.infer<typeof schema>

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(schema)
  })

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

  function findObjectById(array: any[], id_clerk: any) {
    return array.find((obj: { id_clerk: any; }) => obj.id_clerk === id_clerk);
  }

  let filtradoAplicado = buscarAlldata(Iniciados, allData)
  const totalDocumentos = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Aplicante').length;
  const totalAprobados = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'aplicantes').length;
  const totalProceso = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Proceso').length;
  const totalGarantia = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Garantia').length;
  const totalFinalizado = filtradoAplicado.filter(aplicante => aplicante.estado_proceso === 'Finalizados').length; // infoUserRetiro


  const aprobadoYummys = allData.filter((aplicante: any) => aplicante.aprobacion_yummy === true);
  const allAprobados = allData.filter((aplicante: any) => aplicante.aprobacion_tvs === true);
  const allFirma = allData.filter((aplicante: any) => aplicante.firma_mandada === true);

  console.log('all probados', allFirma);


  const handleButtonClick = (buttonName: any) => {
    console.log(buttonName);

    if (selectedButton === buttonName) {
      setSelectedButton(null); // Deseleccionar el botón si ya estaba seleccionado
    } else {
      setSelectedButton(buttonName);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: <i>Usuario Aceptado</i>,
      icon: "success",
      inputValue,
      preConfirm: () => {
        setInputValue(Swal.getInput()?.value || '')
      },
    })
  }

  const showSwalFirma = () => {
    withReactContent(Swal).fire({
      title: <i>Firma aceptada</i>,
      icon: "success",
      inputValue,
      preConfirm: () => {
        setInputValue(Swal.getInput()?.value || '')
      },
    })
  }


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }


  const handleButtonInfo = (estado: any) => {
    const usuario = estado;

    const formularioCLiente = findObjectById(dataFormulario, usuario.id_clerk)
    setFormulario(formularioCLiente)

    setIdUsers(usuario.id_clerk)

    setSelectedButtonInfo('Informacion');
    setInfoUser(usuario);
    console.log('user', formularioCLiente);


  };

  const handleButtonInfoFirma = (estado: any) => {
    const usuario = estado;

    setInfoUserFirma(usuario)


  };

  


  const handleButtonInfoRetiro = (estado: any) => {
    const usuario = estado;
    setinfoUserRetiro(usuario)
  };

  const handleButtonInfoBack = () => {

    setSelectedButtonInfo(null);


  };

  const handleButtonInfoBackFirma = () => {
    setInfoUserFirma(null)
  };

  const handleButtonInfoBackPago = () => {
    setinfoUserRetiro(null)
  };

  function buscarAceptacionYummy(array: any, id_clerk: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id_clerk === id_clerk) {
        return array[i];
      }
    }
    return null; // Si no se encuentra ningún objeto con el id_clerk proporcionado
  }

  const handleClick = async () => {
    showSwal()

    const response = await fetch('/api/aceptarTvs', {
      method: 'POST',
      body: JSON.stringify(infoUser.id_clerk),
    });


    const result = await response.json();
    const status = result?.status

    console.log(status);


    if (status === 200) {
      //const userAceptacion =buscarAceptacionYummy(allAprobados,infoUser.id_clerk)
      //console.log('aceptacion',userAceptacion);

      onClose()
      toast('Aceptacion Creada - Re');
      
      router.refresh()
    }
    if (status === 400) {
      onClose()
      toast('Error al crear aceptacion')
      router.refresh()
    }



  }

  const handleClickFirma = async () => {
    showSwalFirma()

    const response = await fetch('/api/aceptarFirma', {
      method: 'POST',
      body: JSON.stringify(infoUserFirma.id_clerk),
    });


    const result = await response.json();
    const status = result?.status

    console.log({ status }, { result });


    if (status === 200) {
      //const userAceptacion =buscarAceptacionYummy(allAprobados,infoUser.id_clerk)
      //console.log('aceptacion',userAceptacion);

      onClose()
      toast('Firma Aceptada')
      router.refresh()
    }
    if (status === 400) {
      onClose()
      toast('Error al crear aceptacion de firma')
      router.refresh()
    }



  }

  const handleClickDeclinar = async () => {
    onOpen();

    //router.push('/declinar')
  }


  useEffect(() => {

    if (infoUser) {
      const filteredDocuments = imagenes.filter((doc: { id_clerk: any; }) => doc.id_clerk === infoUser.id_clerk);
      console.log('DOCUMENTO', filteredDocuments);
      setFilteredDocuments(filteredDocuments)
      //const objeto = findObjectById(dataFormulario,id_clerk)
    }

  }, [infoUser]);

  useEffect(() => {
    const infoUserFirmaImg = DocsFirmas.filter((firmas: any) => firmas.id_clerk === infoUserFirma?.id_clerk);
    setInfoUserFirmaImg(infoUserFirmaImg[0]?.firma);
    console.log({ infoUserFirmaImg });

  }, [infoUserFirma]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      file: null,
    },
  });


  const onSubmit = (data: any) => {


    const apiResolver = async () => {
      const formData = new FormData()
      formData.append('image', data.file)
      formData.append('user', infoUser.id_clerk)




      const fetchResponse = await fetch('/api/rechazo', {
        method: 'POST',
        body: formData
      });

      const result = await fetchResponse.json();
      const status = result.status

      console.log(status);


      if (status === 200) {
        onClose()
        toast('Rechazo Creado')
        router.refresh()
      }
      if (status === 400) {
        onClose()
        toast('Error al crear rechazo')
        router.refresh()
      }


    }




    const response = apiResolver()
    console.log(response);

  };

  const onSubmit2 = async (data: any) => {
    data.user = infoUserRetiro.id_clerk
    //console.log({data});
    const currentDateTime = data.fechaPago.toLocaleString()

    console.log({ currentDateTime });
    data.fechaPago = currentDateTime

    const fetchResponse2 = await fetch('/api/pago-cita', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const result2 = await fetchResponse2.json();
    const status2 = result2.status

    console.log(status2);


    if (status2 === 200) {
      onClose()
      toast('Pago Creado')
      router.refresh();
    }
    if (status2 === 400) {
      onClose()
      toast('Error al crear pago')
      router.refresh()
    }



  };
  //console.log(req);

  //if (allData[0]?.estado_formulario == 'Finalizar') return redirect('/dashoard-tvs')
  //if (!allData[0]?.estado_formulario) return redirect('/')

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
                  src="/Logo-TVS.png"
                />
              </CardBody>
            </Card>




            <Button
              className={`m-4 my-0 mt-10 text-center col-span-2  ${selectedButton === 'aplicaciones' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('aplicaciones')}
            >
              <CardBody>
                <p className="mx-auto">Nueva Aplicacion</p>
              </CardBody>
            </Button>


            <><Button
              className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'aprobados' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('aprobados')}
            >
              <CardBody>
                <p className="mx-auto">Aprobados</p>
              </CardBody>
            </Button><Button
              className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'inicial' ? 'bg-black text-white' : ''}`}
              onClick={() => handleButtonClick('inicial')}
            >
                <CardBody>
                  <p className="mx-auto">Firmas de Contrato</p>
                </CardBody>
              </Button><Button
                className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'retiroInicial' ? 'bg-black text-white' : ''}`}
                onClick={() => handleButtonClick('retiroInicial')}
              >
                <CardBody>
                  <p className="mx-auto">Pago de Inicial</p>
                </CardBody>
              </Button><Button
                className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'retiroUnidad' ? 'bg-black text-white' : ''}`}
                onClick={() => handleButtonClick('retiroUnidad')}
              >
                <CardBody>
                  <p className="mx-auto">Registro de Unidad</p>
                </CardBody>
              </Button><Button
                className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'historialPagos' ? 'bg-black text-white' : ''}`}
                onClick={() => handleButtonClick('historialPagos')}
              >
                <CardBody>
                  <p className="mx-auto">Retiro de Unidades</p>
                </CardBody>
              </Button><Button
                className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'citasTaller' ? 'bg-black text-white' : ''}`}
                onClick={() => handleButtonClick('citasTaller')}
              >
                <CardBody>
                  <p className="mx-auto">Citas de Taller</p>
                </CardBody>
              </Button><Button
                className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'atencionCliente' ? 'bg-black text-white' : ''}`}
                onClick={() => handleButtonClick('atencionCliente')}
              >
                <CardBody>
                  <p className="mx-auto">Atencion al Cliente</p>
                </CardBody>
              </Button><Button
                className={`m-4 my-0 mt-5 text-center col-span-2  ${selectedButton === 'shopRepuestos' ? 'bg-black text-white' : ''}`}
                onClick={() => handleButtonClick('shopRepuestos')}
              >
                <CardBody>
                  <p className="mx-auto">Shop / Respuestos</p>
                </CardBody>
              </Button></>



          </div>
          <CardFooter>
          </CardFooter>
        </Card>

        {(selectedButton === null) && (
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
                <div className="grid grid-cols-3 col-span-3 gap-3">

                  {filtradoAplicado.map((element: any, index: any) => (
                    <div className="grid grid-cols-3 col-span-3 gap-3" key={index + 500}>
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
                          {element.estado_proceso ? '' : 'Usuario No ha iniciado proceso'}
                        </div>
                      </Card>
                    </div>
                  ))}



                </div>
              </div>

            </div>


          </Card>

        )
        }

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

                    <button key={index + index} onClick={() => handleButtonInfo(element)}>
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

              <Button onClick={() => handleButtonInfoBackPago()} className="w-3 absolute right-0 top-0" color="danger">
                <p>◀</p>
              </Button>
              <Card className="mx-auto mt-5">
                <CardBody className="">

                  <p>Informacion de la aplicacion</p>

                </CardBody>
              </Card>
              <div className="grid grid-cols-2 gap-5 place-items-center">

                <Card className="p-5">
                  <p>Informacion de Usuario</p>
                  <p>Nombre : {infoUser.username}</p>
                  <p>Fecha de Ingreso : {infoUser.fecha}</p>
                  <p>Estado Proceso : {infoUser.estado_formulario}</p>
                  <p>Id Clerk : {infoUser.id_clerk}</p>
                  <p>Ingresos de Usuario : {formulario.Ingresos}</p>
                  <p>Nacionalidad : {formulario.Extranjero ? 'Extranjero' : 'No es extranjero'}</p>
                  <p>Dirrecion : {formulario.Dirrecion}</p>
                  <p>Pais donde recide : {formulario.Pais}</p>
                </Card>

                <div>

                  <Card className="p-5">
                    <p>Capture de Dashboard Yummy</p>
                    <div className="mx-auto">

                      <Image
                        src={filteredDocuments[0]?.dashoard_yummy}
                        width={100}
                        height={100}
                        alt="Dashoard de yummy"
                      />
                    </div>
                  </Card>


                  <Card className="p-5">
                    <p>Capture de persona Cedula</p>
                    <div className="mx-auto">

                      <Image
                        src={filteredDocuments[0]?.persona_cedula}
                        width={100}
                        height={100}
                        alt="Persona Cedula"
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
                      onClick={handleClickDeclinar}
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

        {selectedButton === 'aprobados' && (
          <Card className="mx-3 mt-3 col-span-3">

            <h3 className='mx-auto mt-5 text-xl'>Aprobados</h3>

            {allFirma.map((element: any, index: any) => (
              <div className="grid grid-cols-3 col-span-3 gap-3" key={index + 500}>
                <Card key={index + 2} className="p-4 my-3 text-center">
                  <div>{element.fecha}</div>
                </Card>
                <Card key={index + index} className="p-4 my-3 text-center">
                  <div>{element.username} ({element.id_clerk})</div>
                </Card>

                <Card key={index + index} className="p-4 my-3 text-center">
                  <div className='text-center'>
                    {element.aprobacion_tvs === true ? 'aprobado TVS' : ''}
                    {element.aprobacion_tvs === true && element.aprobacion_yummy === true ? <hr /> : ''}
                    {element.aprobacion_yummy === true ? 'aprobado Yummy' : ''}
                  </div>
                </Card>
              </div>
            ))}
          </Card>
        )}

        {selectedButton === 'inicial' && (infoUserFirma === null) && (
          <Card className="mx-3 mt-3 col-span-3">


            <h3 className='mx-auto mt-5 text-xl'>Firma</h3>

            {allFirma.map((element: any, index: any) => (
              <div className="grid grid-cols-3 col-span-3 gap-3" key={index + 500}>
                <Card key={index + 2} className="p-4 my-3 text-center">
                  <div>{element.fecha}</div>
                </Card>
                <Card key={index + index} className="p-4 my-3 text-center">
                  <div>{element.username} ({element.id_clerk})</div>
                </Card>

                <button key={index + index} onClick={() => handleButtonInfoFirma(element)}>
                  <Card className="p-4 my-3 cursor-pointer text-center">
                    <div className='text-center  text-xl'>Informacion</div>
                  </Card>
                </button>
              </div>
            ))}

          </Card>
        )}

        {((selectedButton === 'inicial') && (infoUserFirma)) && (
          <Card className="mx-3 mt-3 col-span-3">
            <div className="grid gap-3">

              <Button onClick={() => handleButtonInfoBackFirma()} className="w-3 absolute right-0 top-0" color="danger">
                <p>◀</p>
              </Button>
              <Card className="mx-auto mt-5">
                <CardBody className="">

                  <p>Informacion de la firma</p>

                </CardBody>
              </Card>
              <div className="grid grid-cols-2 gap-5 place-items-center">

                <div className='col-span-2'>

                  <Image
                    width={300}
                    height={150}
                    alt="NextUI hero Image"
                    src={infoUserFirmaImg}
                  />
                </div>


                <div className="col-span-2">
                  <Checkbox
                    defaultSelected={isChecked}
                    radius='sm'
                    onChange={handleCheckboxChange}
                  >
                    Confirmo que el usuario a firmado correctamente
                  </Checkbox>
                  <div className="grid grid-cols-2 items-center">


                    <Button
                      className="mx-auto mt-3"
                      onClick={handleClickFirma}
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

        {selectedButton === 'retiroInicial' && (infoUserRetiro) && (
          <Card className="mx-3 mt-3 col-span-3">
            <div className="grid gap-3">

              <Button onClick={() => handleButtonInfoBackFirma()} className="w-3 absolute right-0 top-0" color="danger">
                <p>◀</p>
              </Button>
              <Card className="mx-auto mt-5">
                <CardBody className="">

                  <p>Informacion del pago Inicial</p>

                </CardBody>
              </Card>
              <div className='mx-auto'>
                <span>Por favor, ingrese los datos para agendar la cita</span>
              </div>
              <div className="grid gap-5 place-items-center">

                <form className='gap-3 grid' onSubmit={handleSubmit2(onSubmit2)}>

                  <div>
                    <Input
                      classNames={{
                        label: "border-none",
                        input: [
                          "border-none",
                        ],
                        innerWrapper: "border-none",
                        inputWrapper: [
                          "border-none",
                        ],
                      }}
                      label='Dirrecion de la cita'
                      id="dirrecionCita"
                      type="text"
                      {...register2("dirrecionCita")}
                    />
                    {errors.dirrecionCita && <span>{errors.dirrecionCita.message}</span>}
                  </div>

                  <div>
                    <Input
                      classNames={{
                        label: "border-none",
                        input: [
                          "border-none",
                        ],
                        innerWrapper: "border-none",
                        inputWrapper: [
                          "border-none",
                        ],
                      }}
                      label='Monto a pagar'
                      id="montoPagar"
                      type="text"
                      {...register2("montoPagar")}
                    />
                    {errors.montoPagar && <span>{errors.montoPagar.message}</span>}
                  </div>


                  <div>
                    <Input
                      classNames={{
                        label: "border-none",
                        input: [
                          "border-none",
                        ],
                        innerWrapper: "border-none",
                        inputWrapper: [
                          "border-none",
                        ],
                      }}
                      label='Hora para la cita'
                      id="horaCita"
                      type="text"
                      {...register2("horaCita")}
                    />
                    {errors.horaCita && <span>{errors.horaCita.message}</span>}
                  </div>


                  <div>
                    <Input
                      classNames={{
                        label: "border-none",
                        input: [
                          "border-none",
                        ],
                        innerWrapper: "border-none",
                        inputWrapper: [
                          "border-none",
                        ],
                      }}
                      id="fechaPago"
                      type="date"
                      {...register2("fechaPago")}
                    />
                    {errors.fechaPago && <span>{errors.fechaPago.message}</span>}
                  </div>

                  <div className="pt-5 grid place-items-center">

                    <Button className=" bg-black text-white" type="submit">
                      Enviar
                    </Button>
                  </div>
                </form>

              </div>

            </div>
          </Card>
        )}

        {selectedButton === 'retiroInicial' && (infoUserRetiro === null) && (
          <Card className="mx-3 mt-3 col-span-3">
            

            <h3 className='mx-auto flex mt-5 text-xl'>Pago Inicial</h3>
              {allFirma.map((element: any, index: any) => (
                <div className="grid grid-cols-3 col-span-3 gap-3" key={index + 500}>
                  <Card key={index + 2} className="p-4 my-3 text-center">
                    <div>{element.fecha}</div>
                  </Card>
                  <Card key={index + index} className="p-4 my-3 text-center">
                    <div>{element.username} ({element.id_clerk})</div>
                  </Card>

                  <button key={index + index} onClick={() => handleButtonInfoRetiro(element)}>
                      <Card className="p-4 my-3 cursor-pointer text-center">
                        <div className='text-center  text-xl'>Informacion</div>
                      </Card>
                    </button>
                </div>
              ))}

          </Card>
        )}

        {selectedButton === 'retiroUnidad' && (
          <Card className="mx-3 mt-3 col-span-3">
            {/* Código del componente cuando el botón "Aceptados" está seleccionado */}
          </Card>
        )}





      </div>


      <Modal
        size={'md'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Informacion de Rechazo</ModalHeader>
              <ModalBody>


                <div className="grid  items-center">

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Inserte la razon de rechazo</h3>
                    <Controller
                      control={control}
                      rules={{
                        validate: (value: any) => value instanceof File,
                      }}
                      render={({ field, fieldState }) => {
                        return (
                          <MuiFileInput
                            inputProps={{ accept: '.png, .jpg' }}

                            {...field}
                            placeholder="Inserte la razon de rechazo"
                            helperText={fieldState.invalid ? "Dato es invalido" : ""}
                            error={fieldState.invalid}
                          />
                        );
                      }}
                      name='file'
                    />

                    <div className="pt-5 grid ">

                      <Button className=" bg-black text-white" type="submit">
                        Enviar
                      </Button>
                    </div>
                  </form>
                </div>


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default App