import { useState, useEffect } from 'react';
import SingleCard from '@/components/SingleCard';
import { Button } from '@nextui-org/react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';
import ScoreBoard from '@/components/ScoreBoard';

export default function Cards() {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.replace('/auth/login');
    } else {
      setUser(data.user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);

  let cardImages = [
    { src: '/static/img/helmet-1.png', matched: false },
    { src: '/static/img/potion-1.png', matched: false },
    { src: '/static/img/ring-1.png', matched: false },
    { src: '/static/img/scroll-1.png', matched: false },
    { src: '/static/img/shield-1.png', matched: false },
    { src: '/static/img/sword-1.png', matched: false },
  ];

  const shuffleCards = () => {
    let shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setPlayerWon(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            return card.src === choiceOne.src
              ? { ...card, matched: true }
              : card;
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let matchedElements = [];

    cards.map((card) => {
      matchedElements.push(card.matched);
    });

    if (matchedElements.length > 0) {
      let checker = (arr) => arr.every((v) => v === true);
      setPlayerWon(checker(matchedElements));
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const saveScore = async () => {
      if (playerWon) {
        let { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.log(error.message);
        }

        const profile = profiles[0];

        if (profile.score === 0) {
          await supabase
            .from('profiles')
            .update({ score: turns })
            .eq('user_id', user.id);

          console.log('new turnes submited');
        } else if (profile.score > turns) {
          await supabase
            .from('profiles')
            .update({ score: turns })
            .eq('user_id', user.id);
        }
      }
    };

    saveScore();
  }, [playerWon]);

  return (
    <div className='min-h-screen'>
      <div className='app mx-auto max-w-3xl'>
        <div className='flex justify-center'>
          <Button
            className='mt-4 bg-gradient-to-r from-slate-800 to-indigo-800'
            onClick={shuffleCards}
          >
            New Game
          </Button>
        </div>

        <div className='card-grid sm:mx'>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p className='text-center text-2xl mt-4'>
          Rounds = <span className='text-indigo-600 font-bold'>{turns}</span>
        </p>
        {playerWon ? <p>All cards have been matched!</p> : null}
      </div>

      <ScoreBoard />
    </div>
  );
}
