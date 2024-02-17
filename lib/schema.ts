import { z } from 'zod'

const isOnlyLetters = (str: string) => /^[A-Za-z]+$/.test(str);


export const FormDataSchema = z.object({
  Ingresos: z.string().min(1, 'Ingreso es requerido'),
  Yummy: z.boolean().refine(async value => value === true, {
    message: 'Yummy debe ser true',
    path: ['Yummy'],
  }),
  Extranjero: z.boolean(),
  Cedula: z.string().min(2, 'Cedula es requerido'),
  PrimerNombre: z.string().min(2, 'Primer Nombre es requerido').refine((value) => isOnlyLetters(value), {
    message: 'Primer Nombre solo debe contener letras',
    path: ['PrimerNombre'],
  }),
  SegundoNombre: z.string().min(2, 'Segundo Nombre es requerido').refine((value) => isOnlyLetters(value), {
    message: 'Segundo Nombre solo debe contener letras',
    path: ['SegundoNombre'],
  }),
  PrimerApellido: z.string().min(2, 'Primer Apellido es requerido').refine((value) => isOnlyLetters(value), {
    message: 'Primer Apellido solo debe contener letras',
    path: ['PrimerApellido'],
  }),
  SegundoApellido: z.string().min(2, 'Segundo Apellido es requerido').refine((value) => isOnlyLetters(value), {
    message: 'Segundo Apellido solo debe contener letras',
    path: ['SegundoApellido'],
  }),
  Dirrecion: z.string().min(2, 'La dirrecion es requerida').refine((value) => isOnlyLetters(value), {
    message: 'La dirrecion solo debe contener letras',
    path: ['Dirrecion'],
  }),
  Estado: z.string().min(2, 'El Estado es requerido'),
  Pais: z.string().min(1, 'El Pais es requerido'),
  CedulaDocumento: z.any(),
  dashboardYummy: z.any(),
  RifDocumento: z.any()
})
