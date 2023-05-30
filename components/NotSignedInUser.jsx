import { Navbar, Button } from '@nextui-org/react';
import Link from 'next/link';

const NotSignedInUser = () => {
  return (
    <Navbar.Content>
      <Navbar.Link color='inherit' href='/auth/login'>
        Login
      </Navbar.Link>
      <Navbar.Item>
        <Button
          auto
          type='primary'
          as={Link}
          href='/auth/signup'
          className='bg-slate-500'
        >
          Sign Up
        </Button>
      </Navbar.Item>
    </Navbar.Content>
  );
};

export default NotSignedInUser;
