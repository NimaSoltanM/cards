import Link from 'next/link';

export default () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <h1 className='bg-lime-500'>
        ایمیل تایید شد، میتونید از سایت استفاده کنید🥳
      </h1>
      <Link href='/auth/login' className='text-blue-600'>
        صفحه ورود
      </Link>
    </div>
  );
};
