import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
  publicRoutes: ["/", "/somos", "/api/contact", "/contacto", "/api/yummy", '/api/enviarForm', "/api/enviarClerk","/api/usuarioCorreo", "/api/documento", "/api/documentos","/api/validacion", "/api/validacionyummy", "/api/usuario-correo", "/api/rechazo","/api/aceptar", "/api/aceptarTvs", '/api/firma-update',"/api/aceptarFirma"]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
