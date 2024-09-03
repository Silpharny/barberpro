import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import { ReactNode } from "react"
import { IconType } from "react-icons"
import { FiClipboard, FiMenu, FiScissors, FiSettings } from "react-icons/fi"

interface LinkItemProps {
  name: string
  icon: IconType
  link: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Agenda", icon: FiScissors, link: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, link: "/haircuts" },
  { name: "Minha Conta", icon: FiSettings, link: "/profile" },
]

export function Sidebar({ children }: { children: ReactNode }) {
  const { onClose, onOpen, isOpen } = useDisclosure()

  return (
    <Box minH="100vh" bg="barber.900">
      <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }}>
        <Box>{children}</Box>
      </SidebarContent>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="barber.400"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.600", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDir="row">
            <Text
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Barber
            </Text>
            <Text
              color="button.cta"
              fontSize="2xl"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Pro
            </Text>
          </Flex>
        </Link>
        <CloseButton
          color="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItems key={link.name} icon={link.icon} route={link.link}>
          {link.name}
        </NavItems>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactNode
  route: string
}

const NavItems = ({ icon, children, route, ...rest }: NavItemProps) => {
  return (
    <Link style={{ textDecoration: "none" }} href={route}>
      <Flex
        align="center"
        color={"white"}
        p={4}
        mx={4}
        borderRadius={"lg"}
        role="group"
        cursor="pointer"
        _hover={{ bg: "gray.900", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      color={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        color={"white"}
        _hover={{ bg: "gray.900" }}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex flexDir={"row"}>
        <Text ml="4" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Barber
        </Text>
        <Text
          ml="1"
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="button.cta"
        >
          Pro
        </Text>
      </Flex>
    </Flex>
  )
}
