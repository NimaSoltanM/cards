import { supabase } from '@/lib/supabaseClient';
import { Button, Loading, Text, Container, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default () => {
  const [profile, setProfile] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const getUserName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id);

    setProfile(profiles[0]);
    console.log(profiles[0]);
  };

  useEffect(() => {
    getUserName();
  }, []);

  if (!profile) {
    return (
      <div className='flex justify-center items-center mt-40'>
        <Loading type='points' />
      </div>
    );
  }

  const changeUserNameHandler = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ username: newUserName })
      .eq('id', profile.id);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('User name updated successfully');
    location.reload();
  };

  return (
    <Container>
      <div className='flex items-center justify-center mt-20'>
        <div className='shadow-2xl rounded-lg p-8 border border-gray-200 w-96'>
          <div className='flex flex-col space-y-10'>
            <Text size='$3xl' weight='bold'>
              Edit Profile
            </Text>
            <Input
              clearable
              underlined
              labelPlaceholder='New User name'
              initialValue={profile.username}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <Button
              shadow
              className='bg-[#0072F5]'
              auto
              disabled={!newUserName}
              onClick={changeUserNameHandler}
            >
              Submit
            </Button>
          </div>

          {success && <p className='text-green-500'>{success}</p>}
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </Container>
  );
};
