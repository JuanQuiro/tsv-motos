import { NextResponse } from 'next/server'
import path from 'path'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'draptkllp',
  api_key: '717414486826329',
  api_secret: 'AMVu-s_WZepYanwaTbMpX92rIMk'
})

export default async function rifDocumento(req) {
  const data = await req.formData()
  console.log(data)
  
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}
