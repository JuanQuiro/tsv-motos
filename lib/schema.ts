import { z } from 'zod'

export const FormDataSchema = z.object({
  Ingresos: z.string().min(1, 'Ingreso es requerido'),
  Yummy: z.boolean(),
  Extranjero: z.boolean(),
  Cedula: z.string().min(1, 'Cedula es requerido'),
  PrimerNombre: z.string().min(1, 'Primer Nombre es requerido'),
  SegundoNombre: z.string().min(0, 'Segundo Nombre es requerido'),
  PrimerApellido: z.string().min(1, 'Primer Apellido es requerido'),
  SegundoApellido: z.string().min(1, 'Segundo Apellido es requerido'),
  Dirrecion: z.string().min(1, 'Segundo Apellido es requerido'),
  Pais: z.string().min(1, 'Pais es requerido'),
})
