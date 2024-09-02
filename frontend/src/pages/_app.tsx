import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"

import { AuthProvider } from "@/context/AuthContext"
import { extendTheme } from "@chakra-ui/react"

const colors = {
  barber: {
    900: "#12131b",
    400: "#1b1c29",
    100: "#c6c6c6",
  },
  button: {
    cta: "#fba931",
    default: "#fff",
    gray: "#dfdfdf",
    danger: "#ff4040",
  },
  orange: {
    900: "#fba931",
  },
}

const theme = extendTheme({ colors })

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
