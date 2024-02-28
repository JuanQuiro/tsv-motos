import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

cloudinary.config({ 
  cloud_name: 'ddvavjm3j', 
  api_key: '885457736781271', 
  api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4',
  secure: true,
});

const prisma = new PrismaClient();

export const POST = async (req : Request) => {
  const data = await req.formData();
  const file = data.get('signature')
  const userId = data.get('userId')
  const uploadedImages = [] as any;
 
  console.log(file);
  if (!file) {
    return NextResponse.redirect(new URL('/finalizar', req.url));
  }

  // @ts-ignore
  const fileBuffer = await file?.arrayBuffer();
  // @ts-ignore
      const mime = file?.type;
      const encoding = 'base64';
      const base64Data = Buffer.from(fileBuffer).toString('base64');
      const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  
      try {
        const uploadToCloudinary = () => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload(fileUri, {
                invalidate: true,
              })
              .then((result) => {
                //console.log(result);
                resolve(result);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        };
        const result = await uploadToCloudinary();
        await uploadedImages.push(result);


      }
      catch (error) {
        console.error('Error al actualizar el usuario en la tabla documentos:', error);
      }

      try {
        const user = await prisma.firma.create({
          data: {
            id_clerk : userId || 'Error' as any, 
            firma : uploadedImages[0].url,
          },
        })
      } catch (error) {
        
        console.log('error');
        return NextResponse.json({ msj: 'Error', status : 400 });
      }
  

      return NextResponse.json({ msj: 'Aceptar', status : 200 });
};