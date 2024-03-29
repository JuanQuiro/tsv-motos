export const sendContactForm = async data =>
  fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  }).then(res => {
    if (!res.ok) throw new Error('Error al mandar msj al correo - YUMMY')
    return res.json()
  })

export const enviarForm = async info =>
  fetch('/api/enviarForm', {
    method: 'POST',
    body: JSON.stringify(info),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  }).then(res => {
    if (!res.ok) throw new Error('Error al mandar data formulario')
    return res.json()
  })

export const enviarClerk = async info =>
  fetch('/api/enviarClerk', {
    method: 'POST',
    body: JSON.stringify(info),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  }).then(res => {
    if (!res.ok) throw new Error('Error al mandar data clerk')
    return res.json()
  })

export const usuarioCorreo = async info =>
  fetch('/api/usuarioCorreo', {
    method: 'POST',
    body: JSON.stringify(info),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  }).then(res => {
    if (!res.ok) throw new Error('Error al mandar al correo - usuario')
    return res.json()
  })

export const rifDocumento = async info =>
  fetch('/api/rifDocumento', {
    method: 'POST',
    body: info
  }).then(res => {
    if (!res.ok) throw new Error('Error al documento a cloudinary')
    return res.json()
  })
