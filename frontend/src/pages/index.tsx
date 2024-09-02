import { Flex, Text } from "@chakra-ui/react"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>BarberPro - Sistema Completo</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        justify="center"
        align="center"
      >
        <Text color="white">BarberPro - Sistema Completo</Text>
      </Flex>
    </>
  )
}
