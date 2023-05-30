import { supabase } from '@/lib/supabaseClient';
import { Navbar, Link, Text, Avatar, Dropdown } from '@nextui-org/react';
import { useRouter } from 'next/router';

const SignedInUser = ({ user }) => {
  const router = useRouter();

  const collapseItems = ['games'];

  const logOutHandler = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) {
      alert('یه چیزی شد که اونچه باید میشد ، نشد');
    }

    router.reload();
  };

  const settingHandler = () => {
    router.replace('/profile');
  };

  return (
    <>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end',
          },
        }}
      >
        <Dropdown placement='bottom-right'>
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as='button'
                color='gradient'
                size='md'
                src='/static/img/avatar.jpg'
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label='User menu actions'
            color='warning'
            onAction={(actionKey) => {
              if (actionKey === 'logout') {
                logOutHandler();
              }

              if (actionKey === 'profile') {
                settingHandler();
              }
            }}
          >
            <Dropdown.Item key='profile' css={{ height: '$18' }}>
              <Text b color='inherit' css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color='inherit' css={{ d: 'flex' }}>
                {user.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key='logout' withDivider color='error'>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse disableAnimation>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor='warning'
            css={{
              color: index === collapseItems.length - 1 ? '$error' : '',
            }}
            isActive={index === 2}
          >
            <Link
              color='inherit'
              css={{
                minWidth: '100%',
              }}
              href='/games/cards'
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </>
  );
};

export default SignedInUser;
