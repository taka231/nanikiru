import { ReactNode } from 'react'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import LinkButton from './LinkButton'
import Link from './ChakraNextLink'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { useSession, signIn, signOut } from 'next-auth/react'

import logo from '../assets/images/logo.png'
import { useRouter } from 'next/router'

const Links = ['MANZU', 'PINZU', 'SOUZU']

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

type Props = {
  isPostEdit?: boolean
}

export default function Header(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <>
      <Box boxShadow='md' bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            mr={14}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link href={'/'}>
              {!props?.isPostEdit && (
                <Box mr={{ base: -4, md: 0 }}>
                  <Image src={logo.src} alt='nanikiru' w={120} />
                </Box>
              )}
              {props?.isPostEdit && (
                <Box mr={{ base: 16, md: 0 }}>
                  <Image src={logo.src} alt='nanikiru' w={120} />
                </Box>
              )}
            </Link>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {!session && <Button onClick={() => signIn()}>Sign in</Button>}
            {session && (
              <LinkButton href='/mypage' variant={'solid'} colorScheme={'green'} size={'sm'} mr={2}>
                マイページ
              </LinkButton>
            )}
            {!props?.isPostEdit && session && (
              <LinkButton
                href='/postedit'
                variant={'solid'}
                colorScheme={'blackAlpha'}
                size={'sm'}
                mr={2}
                leftIcon={<AddIcon />}
              >
                投稿
              </LinkButton>
            )}
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={session?.user.image as string} />
              </MenuButton>
              <MenuList>
                {session && (
                  <>
                    <MenuItem onClick={() => router.push('/mypage')}>マイページ</MenuItem>
                    <MenuDivider />
                  </>
                )}
                {session ? (
                  <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                ) : (
                  <MenuItem onClick={() => signIn()}>Sign in</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
