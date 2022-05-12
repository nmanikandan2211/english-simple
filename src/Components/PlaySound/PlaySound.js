import React from 'react'
import useSound from 'use-sound';


const PlaySound = () => {
  const [play] = useSound("asset/sounds/yes.mp3");

  return <button onClick={play}>Boop!</button>;
};

export default PlaySound;