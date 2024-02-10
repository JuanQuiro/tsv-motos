import { NextResponse } from 'next/server'
import path from 'path'

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'draptkllp', 
  api_key: '717414486826329', 
  api_secret: 'AMVu-s_WZepYanwaTbMpX92rIMk' 
});

export async function rifDocumento(req) {
  const data = await req.dataRifDocs()
  const image = data.get('image')

  if (!image) {
    return NextResponse.json('error', { status: 400 })
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filePath = path.join(process.cwd(), 'public', image.name)
  await writeFile(filePath,buffer)

  await cloudinary.uploader.upload(filePath)

  return NextResponse.json('exito')
}
