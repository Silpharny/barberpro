import { SignOut } from "@/context/AuthContext"
import axios, { AxiosError } from "axios"
import { parseCookies } from "nookies"
import { AuthTokenError } from "./errors/AuthTokenError"

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["@barber.token"]}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (typeof window !== "undefined") {
          // Chamar a função para deslogar o usuário
          SignOut()
          window.location.href = "/login"
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
