import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

const ScoreBoard = () => {
  const [usersAndScores, setUsersAndScores] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('score', 0)
        .order('score', { ascending: true });

      setUsersAndScores(profiles);
    };

    fetchUsers();

    const profiles = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
          console.log('Change received!', payload);
          fetchUsers();
        }
      )
      .subscribe();
  }, []);

  return (
    <div
      className='rounded-lg shadow-2xl bg-opacity-30 backdrop-filter backdrop-blur-3xl bg-white w-72 fixed top-20 left-8 p-6'
      style={{ direction: 'rtl' }}
    >
      <div className='flex flex-col'>
        <p className='text-right mb-8 text-xl'>تابلوی امتیازات</p>

        <div className='flex justify-between mb-4'>
          <h2 className='text-lg font-bold'>نام کاربری</h2>
          <h2 className='text-lg font-bold'>راندها</h2>
        </div>

        <div className='flex flex-col'>
          {usersAndScores.map((user) => (
            <div key={user.id} className='flex justify-between items-end'>
              <p>{user.username}</p>
              <p>{user.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
