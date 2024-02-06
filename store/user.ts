import { create } from 'zustand'

export interface UseStoreInterface {
  Ingresos: string,
  Yummy: boolean,
  Extranjero: boolean,
  Cedula: string,
  PrimerNombre: string,
  SegundoNombre: string,
  PrimerApellido: string,
  SegundoApellido: string,
  Dirrecion: string,
  Estado: string,
  Pais: string,
  name: string,
  email: string,
  subject: string,
  message: string
}

export const useStore = create<UseStoreInterface>(set => ({
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
  message: ''
}))
