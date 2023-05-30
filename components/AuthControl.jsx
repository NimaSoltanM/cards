import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient.js';
import SignedInUser from './SignedInUser';
import NotSignedInUser from './NotSignedInUser';

const AuthControl = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return <>{user ? <SignedInUser user={user} /> : <NotSignedInUser />}</>;
};

export default AuthControl;
