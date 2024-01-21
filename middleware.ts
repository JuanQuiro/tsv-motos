import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
  publicRoutes: ["/", "/somos", "/api/contact", "/contacto", "/api/yummy"],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
