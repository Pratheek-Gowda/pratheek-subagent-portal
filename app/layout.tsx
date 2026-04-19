import { 
  ClerkProvider, 
  SignInButton, 
  SignedIn, 
  SignedOut, 
  UserButton 
} from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #eee' }}>
            <strong>Pratheek Enterprises</strong>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main style={{ padding: '20px' }}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
