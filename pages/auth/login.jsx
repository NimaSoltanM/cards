import { useState } from 'react';
import { Button, Container, Input, Text } from '@nextui-org/react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate email using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSuccess('');
    } else if (data) {
      setSuccess('Login successful!');
      setError('');
      location.replace('/');
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
              Login Now
            </Text>
            <Input
              labelPlaceholder='Email'
              bordered
              value={email}
              onChange={handleEmailChange}
            />
            <Input.Password
              labelPlaceholder='Password'
              bordered
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              className='bg-gradient-to-r from-blue-800 to-purple-800'
              type='submit'
            >
              Login
            </Button>
            {error && <Text color='error'>{error}</Text>}
            {success && <Text color='success'>{success}</Text>}
          </form>
        </div>
      </div>
    </Container>
  );
}
