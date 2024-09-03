import { Button, Center, Flex, Input, Text } from "@chakra-ui/react"
import Head from "next/head"
import Image from "next/image"
import logoImg from "../../../public/images/logo.svg"

import { AuthContext } from "@/context/AuthContext"
import { canSSRGuest } from "@/utils/canSSRGuest"
import Link from "next/link"
import { useContext, useState } from "react"

export default function Register() {
  const { signUp } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister() {
    if (!name || !email || !password) {
      alert("Preencha todos os campos!")
      return
    }

    await signUp({ name, email, password })
  }

  return (
    <>
      <Head>
        <title>BarberPro - Registrar</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        justify="center"
        align="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              width={240}
              src={logoImg}
              alt="Logo"
              quality={100}
              objectFit="fill"
            />
          </Center>
          <Input
            placeholder="Nome da barbearia"
            type="text"
            variant="filled"
            size="lg"
            mb={4}
            backgroundColor="barber.400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="email@email.com"
            type="email"
            variant="filled"
            size="lg"
            mb={4}
            backgroundColor="barber.400"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            backgroundColor="button.cta"
            color="gray.900"
            size="lg"
            mb={6}
            _hover={{ bg: "#ffb13e" }}
            onClick={handleRegister}
          >
            Acessar
          </Button>
          <Center mt={2}>
            <Link href="/login">
              <Text cursor="pointer" color="gray.200" fontSize="sm" mb={6}>
                Já possui uma conta? <strong>Entrar</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})
