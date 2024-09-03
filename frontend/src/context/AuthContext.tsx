import Router from "next/router"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/apiClient"

interface AuthContextData {
  user: UserProps
  isAuthenticated: boolean
  signIn: (data: SignInProps) => Promise<void>
  signUp: (data: SignUpProps) => Promise<void>
  logoutUser: () => Promise<void>
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

type SignUpProps = {
  name: string
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

  useEffect(() => {
    const { "@barber.token": token } = parseCookies()

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email, address, subscriptions } = response.data

          setUser({
            id,
            name,
            email,
            address,
            subscriptions,
          })
        })
        .catch(() => {
          SignOut()
        })
    }
  }, [])

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

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      })
      Router.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@barber.token", {
        path: "/",
      })
      setUser(null)
      Router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
