import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Pratheek Enterprises Portal',
  description: 'Subagent Management Portal for Vi, Airtel, and Jio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ 
          margin: 0, 
          fontFamily: 'system-ui, -apple-system, sans-serif', 
          backgroundColor: '#f3f4f6', 
          color: '#111827' 
        }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
