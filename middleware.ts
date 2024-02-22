import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
  publicRoutes: ["/", "/somos", "/api/contact", "/contacto", "/api/yummy", '/api/enviarForm', "/api/enviarClerk","/api/usuarioCorreo", "/api/documento", "/api/documentos"],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
