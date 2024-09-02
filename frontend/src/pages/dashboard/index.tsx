import { Flex, Text } from "@chakra-ui/react"
import Head from "next/head"

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Dashboard</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        justify="center"
        align="center"
      >
        <Text color="white">Dashboard</Text>
      </Flex>
    </>
  )
}
