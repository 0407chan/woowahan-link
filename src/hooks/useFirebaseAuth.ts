import { message } from 'antd'
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import FirebaseAuthClient from '../model/firebase-auth-client'
import { AuthUser } from '../types/user'

function formatAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email || undefined,
    photoURL: user.photoURL || undefined,
    displayName: user.displayName || undefined
  }
}

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwner, setOwner] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const clear = () => {
    setAuthUser(null)
    setLoading(false)
  }

  const signOut = () => {
    FirebaseAuthClient.getInstance().Auth.signOut().then(clear)
  }

  async function signInWithGoogle(redirect?: string): Promise<AuthUser> {
    const provider = new GoogleAuthProvider()
    try {
      const signInResult = await signInWithPopup(
        FirebaseAuthClient.getInstance().Auth,
        provider
      )

      if (!signInResult.user.email?.includes('woowahan.com')) {
        signOut()
        message.warn(
          '앗, 우아한 형제들 구성원이 아니시군요! 계정을 확인해주세요.'
        )
        throw new Error(
          '앗, 우아한 형제들 구성원이 아니시군요! 계정을 확인해주세요.'
        )
      }
      const formattedUser = formatAuthUser(signInResult.user)
      setAuthUser(formattedUser)
      return formattedUser
    } catch (err) {
      return Promise.reject(err)
    }
  }

  useEffect(() => {
    // listen for Firebase state change
    const unsubscribe =
      FirebaseAuthClient.getInstance().Auth.onAuthStateChanged(authStateChanged)
    // getRedirectResultPostProcess();

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (authUser === null) return
    async function getTokenId() {
      const tokenId =
        await FirebaseAuthClient.getInstance().Auth.currentUser?.getIdToken()
      setToken(tokenId ?? null)
    }
    getTokenId()
  }, [authUser])

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
    isOwner,
    token
  }
}
