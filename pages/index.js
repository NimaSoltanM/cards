import { Text } from '@nextui-org/react';

export default function Home() {
  return (
    <div className='m-16'>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
        }}
        weight='bold'
      >
        Nothing special
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $purple600 -20%, $pink600 100%',
        }}
        weight='bold'
      >
        Comes
      </Text>
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $yellow600 -20%, $red600 100%',
        }}
        weight='bold'
      >
        To Mind !
      </Text>
    </div>
  );
}
