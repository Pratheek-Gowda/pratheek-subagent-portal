import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ fontFamily: 'sans-serif', padding: '20px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>Pratheek Enterprises</strong>
            {/* Show Login button if logged out, Profile icon if logged in */}
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>

          <main style={{ marginTop: '20px' }}>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
