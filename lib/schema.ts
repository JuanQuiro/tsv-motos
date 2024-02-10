import { z } from 'zod'

export const FormDataSchema = z.object({
  Ingresos: z.string().min(1, 'Ingreso es requerido'),
  Yummy: z.boolean(),
  Extranjero: z.boolean(),
  Cedula: z.string().min(2, 'Cedula es requerido'),
  PrimerNombre: z.string().min(2, 'Primer Nombre es requerido'),
  SegundoNombre: z.string().min(2, 'Segundo Nombre es requerido'),
  PrimerApellido: z.string().min(2, 'Primer Apellido es requerido'),
  SegundoApellido: z.string().min(2, 'Segundo Apellido es requerido'),
  Dirrecion: z.string().min(2, 'La dirrecion es requerida'),
  Estado: z.string().min(2, 'El Estado es requerido'),
  Pais: z.string().min(1, 'El Pais es requerido'),
  CedulaDocumento: z.any(),
  dashboardYummy: z.any(),
  rifDocumento: z.any()
})
