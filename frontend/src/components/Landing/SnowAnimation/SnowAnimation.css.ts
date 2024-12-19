// https://codepen.io/alphardex/details/dyPorwJ
import { keyframes, style } from '@vanilla-extract/css';

const getRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateAnimation = () => {
  const randomX = Math.random() * 100;
  const randomOffset = getRandomValue(-100, 100);
  const randomXEnd = randomX + randomOffset;
  const randomXEndYoyo = randomX + randomOffset / 2;
  const randomYoyoTime = getRandomValue(30000, 80000) / 100000;
  const randomYoyoY = randomYoyoTime * 100;
  const randomScale = Math.random();

  const fallDuration = `${getRandomValue(10, 30)}s`;
  const fallDelay = `-${Math.random() * 30}s`;

  const animationKeyframes = keyframes({
    [`${randomYoyoTime * 100}%`]: { transform: `translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale})` },
    to: { transform: `translate(${randomXEndYoyo}vw, 100vh) scale(${randomScale})` },
  });

  return {
    animation: `${animationKeyframes} ${fallDuration} ${fallDelay} linear infinite`,
    transform: `translate(${randomX}vw, -10px) scale(${randomScale})`,
    opacity: Math.random(),
  };
};

const createAnimations = (total: number) => Array.from({ length: total }, generateAnimation);

export const Layout = style({
  overflow: 'hidden',

  width: '100vw',
  height: '100vh',
});

export const SnowFlakes = createAnimations(200).map((animation) =>
  style({
    position: 'absolute',

    width: '10px',
    height: '10px',

    background: 'white',
    borderRadius: '50%',

    ...animation,
  }),
);
