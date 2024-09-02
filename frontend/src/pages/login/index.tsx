import { Button, Center, Flex, Input, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"
import logoImg from "../../../public/images/logo.svg"

import Link from "next/link"
import { useContext, useState } from "react"

import { AuthContext } from "@/context/AuthContext"

export default function Login() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha todos os campos!")
      return
    }

    await signIn({ email, password })
  }

  return (
    <>
      <Head>
        <title>BarberPro - Login</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        justify="center"
        align="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image width={240} src={logoImg} alt="Logo" quality={100} />
          </Center>
          <Input
            placeholder="email@email.com"
            type="email"
            variant="filled"
            size="lg"
            mb={4}
            backgroundColor="barber.400"
            color="white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            size="lg"
            mb={6}
            backgroundColor="barber.400"
            color="white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            backgroundColor="button.cta"
            color="gray.900"
            size="lg"
            mb={6}
            _hover={{ bg: "#ffb13e" }}
            onClick={handleLogin}
          >
            Acessar
          </Button>
          <Center mt={2}>
            <Link href="/register">
              <Text cursor="pointer" color="gray.200" fontSize="sm" mb={6}>
                Não possui uma conta? <strong>Cadastre-se </strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}
