import { useState } from 'react';
import { Button, Container, Input, Text } from '@nextui-org/react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== cPassword) {
      setError('Passwords do not match');
      return;
    }

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      setSuccess('ثبت نام با موفقیت انجام شد ، ایمیل خود را تایید کنید');
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: data.user.id,
            username,
            score: 0,
          },
        ]);

      if (profileError) {
        setError(profileError.message);
      }
    }
  };

  return (
    <Container>
      <div className='flex items-center justify-center mt-20'>
        <div className='shadow-2xl rounded-lg p-8 border border-gray-200 w-96'>
          <form onSubmit={handleFormSubmit} className='flex flex-col gap-10'>
            <Text
              size='$3xl'
              css={{
                textGradient: '45deg, $purple600 -20%, $pink600 100%',
              }}
              weight='bold'
            >
              Signup Now
            </Text>
            <Input
              labelPlaceholder='Username'
              bordered
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              labelPlaceholder='Email'
              bordered
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              labelPlaceholder='Password'
              bordered
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input.Password
              labelPlaceholder='Confirm password'
              bordered
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <Button
              className='bg-gradient-to-r from-blue-800 to-purple-800'
              type='submit'
            >
              Signup
            </Button>
            {error && <Text color='error'>{error}</Text>}
            {success && <Text color='success'>{success}</Text>}
          </form>
        </div>
      </div>
    </Container>
  );
}
