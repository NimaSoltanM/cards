import { Navbar, Text } from '@nextui-org/react';
import { Layout } from './Layout.js';
import { AcmeLogo } from './AcmeLogo.js';
import AuthControl from './AuthControl.jsx';
import { useRouter } from 'next/router';
import Link from 'next/link.js';

export default function App() {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <Layout>
      <Navbar isBordered variant='sticky'>
        <Navbar.Toggle showIn='xs' />
        <Navbar.Brand
          css={{
            '@xs': {
              w: '12%',
            },
          }}
        >
          <Link href='/'>
            <AcmeLogo />
            <Text b color='inherit' hideIn='xs'>
              ACME
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn='xs' variant='highlight'>
          <Navbar.Link
            isActive={router.pathname === '/'}
            onClick={() => handleClick('/')}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            isActive={router.pathname === '/games/cards'}
            onClick={() => handleClick('/games/cards')}
          >
            Games
          </Navbar.Link>
        </Navbar.Content>
        <AuthControl />
      </Navbar>
    </Layout>
  );
}
