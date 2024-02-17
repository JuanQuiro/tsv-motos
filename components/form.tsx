'use client'
import { Toaster, toast } from 'sonner'

import { Checkbox, input } from '@nextui-org/react'
import { PrismaClient, Prisma } from '@prisma/client'
import { useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'


import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './input'
import Heading from './heading'

import { CldUploadWidget } from 'next-cloudinary';

import Select from './select'
import { countryArray, Paises, PreciosSalarios, Estado } from '@/lib/data'

import { Button, Link } from '@nextui-org/react'

import { useStore } from '@/store/user'
import {
  enviarClerk,
  enviarForm,
  rifDocumento,
  sendContactForm,
  usuarioCorreo
} from '@/lib/api'

type Inputs = z.infer<typeof FormDataSchema>

const UploadWidget = (open : any, update : any) => {
 
  open()

  console.log(update)
}

const steps = [
  {
    id: 'Paso 1',
    name: 'Informacion Necesaria',
    fields: ['Ingresos', 'Yummy']
  },
  {
    id: 'Paso 2',
    name: 'Informacion Personal',
    fields: [
      'Cedula',
      'CedulaDocumento',
      'PrimerNombre',
      'SegundoNombre',
      'PrimerApellido',
      'SegundoApellido'
    ]
  },
  {
    id: 'Paso 3',
    name: 'Dirrecion',
    fields: ['Dirrecion', 'Estado']
  },
  {
    id: 'Paso 4',
    name: 'Terminos y Condiciones',
    fields: ['CloseToHome']
  }
]

export default function Form() {
  const { user } = useUser()

  const [data, setData] = useState({
    id: '',
    Ingresos: '',
    Yummy: false,
    Extranjero: false,
    Cedula: '',
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Dirrecion: '',
    Estado: '',
    Pais: '',
    name: '',
    email: '',
    subject: '',
    message: '',
    // Documentos - 01
    CedulaDocumento: '',
    cedulaPersonaDocumento: '',
    // Documentos - 02
    dashboardYummy: '',
    // Documentos - 03
    RifDocumento: ''
  })

  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep
  const formRef = useRef<HTMLFormElement>(null)
  const [isChecked, setIsChecked] = useState(false)

  const [isResource, setResource] = useState(undefined)


  const [isLoading, setIsLoading] = useState(false)
  const [file, setfile] = useState(null)
  const router = useRouter()

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleClick = async () => {
    setIsLoading(!isLoading)
    console.log('Finalizando fomrulario envio de data [DEBUG]')
    console.log('Mi data es :', data)

    try {
      console.log('USUARIO ES', user)
      data.id = user?.id || 'ID ERROR'
      data.email = user?.externalAccounts[0].emailAddress || 'EMAIL ERROR'

      console.log(data.RifDocumento, data.CedulaDocumento, data.dashboardYummy)
      console.log(data.RifDocumento)

      const formData = new FormData()
      formData.append('file', data.RifDocumento)

      
      await enviarForm(data)
      await enviarClerk(user)
    } catch (err) {
      console.log('Error en la logica')
    }

    router.push('/documentos')
  }

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.preventDefault()
      formRef.current.submit()
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: any = async (data: {
    name: string
    email: string
    subject: string
    message: string
    Ingresos: string
    Yummy: boolean
    Extranjero: boolean
    Cedula: string
    PrimerNombre: string
    SegundoNombre: string
    PrimerApellido: string
    SegundoApellido: string
    Dirrecion: string
    Estado: string
    Pais: string
    // Documentos - 01
    CedulaDocumento: any
    CedulaPersonaDocumento: any
    // Documentos - 02
    yummyDocumento: any
    // Documentos - 03
    RifDocumento: any
    // dashboard
    dashboardYummy: any
  }) => {
    console.log('data is ', data)

    // reset form

    setData({
      Ingresos: data.Ingresos,
      Yummy: data.Yummy,
      Extranjero: data.Extranjero,
      Cedula: data.Cedula,
      Dirrecion: data.Dirrecion,
      email: data.email,
      Estado: data.Estado,
      message: data.message,
      name: data.name,
      Pais: data.Pais,
      PrimerApellido: data.PrimerApellido,
      PrimerNombre: data.PrimerNombre,
      SegundoApellido: data.SegundoApellido,
      SegundoNombre: data.SegundoApellido,
      subject: data.subject,
      id: '',
      CedulaDocumento: data.CedulaDocumento,
      cedulaPersonaDocumento: data.CedulaPersonaDocumento,
      RifDocumento: data.RifDocumento,
      dashboardYummy: data.dashboardYummy
    })

    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    console.log('Form errors: ', errors)

     // @ts-ignore
    if (errors.Yummy?.Yummy?.message === 'Yummy debe ser true') {
      toast('Debe ser parte de Yummy')
    }

    // @ts-ignore
    if (errors.PrimerNombre?.PrimerNombre?.message === 'Primer Nombre solo debe contener letras') {
      toast('Primer nombre solo debe contener letras')
    }

     // @ts-ignore
     if (errors.SegundoNombre?.SegundoNombre?.message === 'Segundo Nombre solo debe contener letras') {
      toast('Segundo nombre solo debe contener letras')
    }

     // @ts-ignore
     if (errors.PrimerApellido?.PrimerApellido?.message === 'Primer Apellido solo debe contener letras') {
      toast('Primer Apellido solo debe contener letras')
    }

    // @ts-ignore
    if (errors.SegundoApellido?.PrimerApellido?.message === 'Segundo Apellido solo debe contener letras') {
      toast('Segundo Apellido solo debe contener letras')
    }

   

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        //alert('here');
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0)
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
      // Scroll to the top of the page
      window.scrollTo(0, 0)
    }
  }


  return (
    <>
    <Toaster />
    <section className='absolute inset-0 mt-36 flex flex-col  p-12'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='opd-border group flex w-full flex-col border-l-4 border-sky-600  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='opd-border flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='opd-link text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='opd-text text-sm font-medium'>
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='opd-link text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='opd-text text-sm font-medium'>
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <br />
      {/* Form */}
      <form ref={formRef} className='' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Informacion Necesaria'>
              Proporcione más detalles sobre usted.
            </Heading>
            <div className='mt-6 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              <Select
                id='Ingresos'
                label='Sus ingresos son :'
                register={register}
                options={PreciosSalarios}
                error={errors.Ingresos?.message}
              />

              <Input
                id='Yummy'
                label='¿Usted pertenece a Yummy?'
                type='checkbox'
                register={register}
                error={errors.Yummy?.message}
              />

            </div>
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Informacion Personal'>
              Proporcione más detalles sobre la propiedad solicitada.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-4'>
              {/* Cedula Identidad */}
              <Input
              type='number'
                id='Cedula'
                label='Cedula Identidad'
                register={register}
                error={errors.Cedula?.message}
              />
              
              <Input
              type='text'
              pattern="[A-Za-z]+"
                id='PrimerNombre'
                label='Primer Nombre'
                register={register}
                error={errors.PrimerNombre?.message}
              />
              <Input
                id='SegundoNombre'
                label='Segunda Nombre'
                register={register}
                error={errors.SegundoNombre?.message}
              />
              <Input
                id='PrimerApellido'
                label='Primer Apellido'
                register={register}
                error={errors.PrimerApellido?.message}
              />
              <Input
                id='SegundoApellido'
                label='Segundo Apellido'
                register={register}
                error={errors.SegundoApellido?.message}
              />

            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Dirrecion'>
              Proporcine informacion sobre su dirrecion
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              {/* Pais */}
              <Select
              defaultValueData='Venezuela'
                id='Pais'
                label='Su pais de residencia es :'
                register={register}
                options={Paises}
                error={errors.Pais?.message}
              />

              {/* Estado */}
              <Select
              defaultValueData='Distrito Capital'
                id='Estado'
                label='Estado :'
                register={register}
                options={Estado}
                error={errors.Estado?.message}
              />

              {/* Dirrecion */}
              <Input
                id='Dirrecion'
                label='Dirrecion'
                register={register}
                error={errors.Dirrecion?.message}
              />

              <Input
                id='Extranjero'
                label='¿Es extranjero?'
                type='checkbox'
                register={register}
                error={errors.Extranjero?.message}
              />
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Terminos y condiciones'>
              Lee los terminos y condiciones
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2'>
              <p className='mb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consequat, risus id lacinia scelerisque, arcu urna ultrices
                urna, vitae convallis dolor arcu a eros. Sed eleifend purus in
                pharetra euismod. Duis vitae magna sed ante vehicula consequat
                id non felis. Quisque euismod nec mauris ut efficitur.
              </p>
              <p className='mb-2'>
                Fusce pharetra, nibh at ultrices tristique, ipsum metus iaculis
                arcu, sed tristique sapien ante eu ex. Nulla facilisi. Ut
                fringilla, velit vitae facilisis ullamcorper, lacus dui sodales
                nunc, ut cursus lacus turpis at lacus. Fusce ac urna arcu. Nulla
                facilisi. Morbi fermentum lacinia tortor, eu congue libero
                venenatis ac.
              </p>
              <p className='mb-2'>
                Vestibulum ut pretium ipsum. Aliquam sagittis enim a dui semper,
                id pharetra nisi lobortis. Donec vitae tellus non nisi feugiat
                fringilla et non enim. Suspendisse potenti. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas.
              </p>
              <Checkbox
                defaultSelected={isChecked}
                radius='sm'
                onChange={handleCheckboxChange}
              >
                Estoy de acuerdo con los términos y condiciones
              </Checkbox>
              <Button
                isDisabled={!isChecked}
                color='primary'
                onClick={handleClick}
                isLoading={isLoading}
              >
                Enviar
              </Button>
            </div>
          </motion.div>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          {currentStep !== steps.length - 1 && (
            <button
              type='button'
              onClick={prev}
              disabled={currentStep === 0}
              className=' bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Anterior
            </button>
          )}
          {currentStep !== steps.length - 1 && (
            <button
              type='button'
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className=' bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset disabled:cursor-not-allowed disabled:opacity-50'
            >
              {currentStep === steps.length - 2 ? 'Finalizar' : 'Continuar'}
            </button>
          )}
        </div>
      </div>
    </section>
    </>
  )
}
