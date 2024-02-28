  const { NextResponse } = require("next/server");
  import {v2 as cloudinary} from 'cloudinary';
  import { PrismaClient } from '@prisma/client';




  cloudinary.config({ 
    cloud_name: 'ddvavjm3j', 
    api_key: '885457736781271', 
    api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4',
    secure: true,
  });


  const prisma = new PrismaClient()

  export const POST = async (req : any) => {
    const data = await req.formData();
    const images = ['image'];
    const uploadedImages = [] as any;


    const userId = data.get('user');
    //console.log('userId',userId);


    
  
    for (const imageField of images) {
      const image = await data.get(imageField);
  
      if (!image) {
        continue;
      }
  
      const fileBuffer = await image.arrayBuffer();
      const mime = image.type;
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
        const imageUrl = result;
  
        await uploadedImages.push(imageUrl);
        //console.log(uploadedImages);

        
        
      } catch (error) {
        console.log("server err", error);
      }
    }
  
    
    
  try {
    const user = await prisma.rechazados_yummy.create({
      data: {
        id_clerk : userId || 'Error', 
        razon_rechazo : uploadedImages[0].url,
        rechazo: true
      },
    })
  } catch (error) {
    console.log('error en rechazado');
  }

  const image = uploadedImages[0].url
   //console.log('clerk ID =', userId);
  

   
  return NextResponse.json({ msj: 'Bien cargo', status : 200, url : image })
  };
