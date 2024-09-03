import { Sidebar } from "@/components/sidebar"
import { AuthContext } from "@/context/AuthContext"
import { canSSRAuth } from "@/utils/canSSRAuth"
import { Button, Flex } from "@chakra-ui/react"
import Head from "next/head"
import { useContext } from "react"

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>BarberPro - Dashboard</title>
      </Head>

      <Sidebar>
        <Flex direction="column" justify="center" align="center" h="100vh">
          <Button onClick={logoutUser}>Sair</Button>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  }
})
