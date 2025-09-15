import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/clerk-react'
import React from 'react'

const App = () => {
  return (
    <header>
    <SignedOut>
      <SignInButton mode='modal'/>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
  )
}

export default App