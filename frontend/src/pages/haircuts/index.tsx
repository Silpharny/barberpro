import { Sidebar } from "@/components/sidebar"
import {
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { IoMdPricetag } from "react-icons/io"

export default function Haircuts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)")

  return (
    <>
      <Head>
        <title>BarberPro - Corte de Cabelo</title>
      </Head>
      <Sidebar>
        <Flex direction="column" justify="flex-start" align="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w={"100%"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent={"flex-start"}
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "xl" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color={"orange.400"}
            >
              Modelo de cortes
            </Heading>
            <Link href="/haircuts/new">
              <Button>Cadastrar novo</Button>
            </Link>
            <Stack ml={"auto"} align={"center"} direction="row">
              <Text color={"white"} fontWeight={"bold"} mr={4}>
                ATIVOS
              </Text>
              <Switch colorScheme="green" size={"lg"} />
            </Stack>
          </Flex>

          <Link href="/haircuts/123" style={{ width: "100%", marginTop: 20 }}>
            <Flex
              cursor="pointer"
              w="100%"
              p={4}
              bg={"barber.400"}
              direction={isMobile ? "column" : "row"}
              rounded={4}
              mb={2}
              align={isMobile ? "flex-start" : "center"}
              justify={"space-between"}
            >
              <Flex
                mb={isMobile ? 2 : 0}
                direction={"row"}
                align={"center"}
                justify={"center"}
              >
                <IoMdPricetag color={"#fba931"} size={28} />
                <Text fontWeight={"bold"} ml={4} noOfLines={2} color={"white"}>
                  Corte completo
                </Text>
              </Flex>
              <Text color={"white"} fontWeight={"bold"}>
                Preço: R$ 25,00
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Sidebar>
    </>
  )
}
