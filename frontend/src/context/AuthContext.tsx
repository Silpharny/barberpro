import Router from "next/router"
import { destroyCookie, setCookie } from "nookies"
import { createContext, ReactNode, useState } from "react"
import { api } from "../services/apiClient"

interface AuthContextData {
  user: UserProps
  isAuthenticated: boolean
  signIn: (data: SignInProps) => Promise<void>
}

interface UserProps {
  id: string
  name: string
  email: string
  address: string | null
  subscriptions?: SubscriptionProps | null
}

interface SubscriptionProps {
  id: string
  status: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

interface SignInProps {
  email: string
  password: string
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function SignOut() {
  try {
    destroyCookie(undefined, "@barber.token", {
      path: "/",
    })
    Router.push("/login")
  } catch (error) {
    console.log(error)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      })

      const { id, name, address, subscriptions, token } = response.data

      setCookie(undefined, "@barber.token", response.data.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      })

      setUser({
        id,
        name,
        email,
        address,
        subscriptions,
      })

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      Router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
