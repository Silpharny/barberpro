import { Sidebar } from "@/components/sidebar"
import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { FiChevronLeft } from "react-icons/fi"

interface HaircutProps {
  subscription: boolean
  count: number
}

export default function Haircuts({ subscription, count }: HaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)")

  return (
    <>
      <Head>
        <title>BarberPro - Novo corte de cabelo</title>
      </Head>
      <Sidebar>
        <Flex direction="column" justify="flex-start" align="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w={"100%"}
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href={"/haircuts"}>
              <Button
                p={4}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                mr={4}
              >
                <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>
            <Heading
              fontSize={isMobile ? "xl" : "3xl"}
              color={"orange.900"}
              mt={4}
              mb={4}
              mr={4}
            >
              Modelos de cortes
            </Heading>
          </Flex>

          <Flex
            maxW={"700px"}
            bg={"barber.400"}
            w={"100%"}
            direction={"column"}
            align={"center"}
            justifyContent={"center"}
            pt={8}
            pb={8}
          >
            <Heading
              fontSize={isMobile ? "22px" : "3xl"}
              color={"white"}
              mt={4}
              mb={4}
              mr={4}
            >
              Cadastrar Modelo
            </Heading>
            <Input
              placeholder="Nome do corte ex.: Corte Completo"
              size={"lg"}
              type="text"
              w={"85%"}
              color={"white"}
              bg={"gray.900"}
              mb={3}
              isDisabled={!subscription && count >= 3}
            />
            <Input
              placeholder="Valor do corte ex.: R$ 20,00"
              size={"lg"}
              type="number"
              w={"85%"}
              color={"white"}
              bg={"gray.900"}
              mb={4}
              isDisabled={!subscription && count >= 3}
            />
            <Button
              w={"85%"}
              size={"lg"}
              color={"gray.900"}
              mb={6}
              bg={"button.cta"}
              _hover={{ bg: "#ffb13e" }}
              isDisabled={!subscription && count >= 3}
            >
              Cadastrar
            </Button>
            {!subscription && count >= 3 && (
              <Flex direction={"row"} align={"center"} justify={"center"}>
                <Text color={"white"}>Você atingiu seu limite de cortes.</Text>
                <Link href="/planos">
                  <Text
                    color={"#31fb6a"}
                    cursor={"pointer"}
                    ml={1}
                    fontWeight={"bold"}
                  >
                    Seja Premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get("/haircuts/check")
    const count = await apiClient.get("/haircut/count")

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }
})
