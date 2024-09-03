import { Sidebar } from "@/components/sidebar"
import { AuthContext } from "@/context/AuthContext"
import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useContext, useState } from "react"

interface UserProps {
  id: string
  name: string
  email: string
  address: string | null
}

interface ProfileProps {
  user: UserProps
  premium: boolean
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext)

  const [name, setName] = useState(user && user?.name)
  const [address, setAddress] = useState(user && user?.address)

  async function handleUpdateProfile() {
    if (!name || !address) {
      return
    }

    try {
      const apiClient = setupAPIClient()
      await apiClient.put("/users", {
        name: name,
        address: address,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>BarberPro - Minha Conta</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Flex
            w={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Heading color={"orange.900"} fontSize={"3xl"} mt={4} mb={4} mr={4}>
              Minha Conta
            </Heading>
          </Flex>
          <Flex
            pt={8}
            pb={8}
            maxW={"700px"}
            w={"100%"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={"barber.400"}
          >
            <Flex direction={"column"} w={"85%"}>
              <Text mb={3} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                Nome da barbearia:
              </Text>
              <Input
                color={"white"}
                w={"100%"}
                bg={"gray.900"}
                placeholder="Nome da sua barbearia"
                size={"lg"}
                mb={6}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Text mb={3} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                Endereço:
                <Input
                  color={"white"}
                  w={"100%"}
                  bg={"gray.900"}
                  placeholder="Endereço da sua barbearia"
                  size={"lg"}
                  mb={6}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Text>
              <Text mb={3} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
                Plano atual:
              </Text>
              <Flex
                direction={"row"}
                w={"100%"}
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                bg={"barber.900"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text
                  color={premium ? "#fba931" : "#4dffb4"}
                  fontSize="lg"
                  p={2}
                >
                  {premium ? "Premium" : "Plano Grátis"}
                </Text>
                <Link href="/planos">
                  <Box
                    bg={"#4dffb4"}
                    rounded={4}
                    color={"barber.900"}
                    fontSize="lg"
                    cursor="pointer"
                    p={1}
                    pr={2}
                    pl={2}
                  >
                    Mudar Plano
                  </Box>
                </Link>
              </Flex>
              <Button
                w={"100%"}
                mt={6}
                mb={6}
                bg={"button.cta"}
                size={"lg"}
                _hover={{ bg: "#ffb13d" }}
                onClick={handleUpdateProfile}
              >
                Salvar
              </Button>
              <Button
                w={"100%"}
                bg={"transparent"}
                borderWidth={2}
                borderColor={"red.500"}
                color={"red.500"}
                size={"lg"}
                _hover={{ bg: "transparent" }}
                onClick={logoutUser}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get("/me")
    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      address: response.data.address,
    }

    return {
      props: {
        user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
})
