  const { NextResponse } = require("next/server");
  import {v2 as cloudinary} from 'cloudinary';
  import { writeFile } from 'fs/promises';
  import { auth } from '@clerk/nextjs';
  import { PrismaClient } from '@prisma/client';
  import { v4 as uuidv4 } from 'uuid';
  import { join } from 'path';
  import { promises as fs } from 'fs';



  cloudinary.config({ 
    cloud_name: 'ddvavjm3j', 
    api_key: '885457736781271', 
    api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4',
    secure: true,
  });


  const prisma = new PrismaClient()

export const POST = async (req : any) => {
  const userId = await req.json()

  //console.log('clerk ID =', userId);
  

  try {
    const user2 = await prisma.clerk.update({
      where: { id_clerk: userId || 'ERROR' },
      data: { estado_formulario: 'Finalizar', estado_proceso: 'Aplicante' },
    });
  } catch (error) {
    console.error('Error al actualizar el usuario en la tabla clerk:', error);
  }
  
  try {
    const user3 = await prisma.documentos.update({
      where: { id_clerk: 'ERROR' },
      data: { id_clerk: 'aplicante' },
    });
  } catch (error) {
    console.error('Error al actualizar el usuario en la tabla documentos:', error);
  }
  
  return NextResponse.redirect(new URL('/finalizar', req.url))
  };
