'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import albumImg from '@/app/lplayer/temp/album.jpg';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';

const RecordPlayer = () => {
  const { isPlaying } = useAudioPlayerStore();

  const [rotation, setRotation] = useState(0);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const rotationSpeed = 360 / 15;

  const animate = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = (time - previousTimeRef.current) / 1000;
      setRotation((prev) => (prev + rotationSpeed * deltaTime) % 360);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
        previousTimeRef.current = null;
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <LPContainer>
      <LPDisc
        style={{
          transform: `rotateX(10deg) rotateZ(${rotation}deg)`,
          transition: isPlaying ? 'none' : 'transform 0.7s ease-out',
        }}
      >
        <Image
          src={albumImg}
          alt="Album Cover"
          width={320}
          height={320}
          className="rounded-full object-cover"
          sizes="320px"
        />
        <CenterPin />
        <InnerRing1 />
        <InnerRing2 />
      </LPDisc>

      <ToneArm isPlaying={isPlaying}>
        <Needle />
        <NeedleGlow />
      </ToneArm>
    </LPContainer>
  );
};

const LPContainer = styled.div`
  perspective: 800px;
  width: 320px;
  height: 320px;
  border-radius: 9999px;
  background: linear-gradient(to bottom right, #2b2b2b, #1a1a1a);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
  position: relative;
`;

const LPDisc = styled.div`
  overflow: hidden;
  border-radius: 9999px;
  box-shadow:
    inset 0 0 40px rgba(0, 0, 0, 0.6),
    0 8px 15px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 0, 0, 0.7);
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%);
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  position: relative;
  width: 320px;
  height: 320px;
  transition: transform 0.7s ease-out;
`;

const CenterPin = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 20;
  width: 80px;
  height: 80px;
  margin-left: -40px;
  margin-top: -40px;
  border-radius: 9999px;
  background: radial-gradient(circle at center, #9c6b4c 0%, #66332f 60%, #3b1d1a 100%);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.8),
    inset 0 4px 6px rgba(255, 255, 255, 0.15);
  border: 3px solid #4b2a21;
  transform: rotate(-15deg);
`;

const InnerRing1 = styled.div`
  position: absolute;
  inset: 16px;
  border-radius: 9999px;
  border: 4px solid #111;
  opacity: 0.35;
  box-shadow: inset 0 0 10px #000;
`;

const InnerRing2 = styled.div`
  position: absolute;
  inset: 40px;
  border-radius: 9999px;
  border: 2px solid #444;
  opacity: 0.25;
  box-shadow: inset 0 0 5px #222;
`;

const ToneArm = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  z-index: 30;
  border-radius: 6px;
  height: 140px;
  width: 10px;
  right: -48px;
  top: 58px;
  background: linear-gradient(135deg, #bbb 0%, #666 60%, #444 90%);
  box-shadow:
    0 6px 15px rgba(0, 0, 0, 0.6),
    inset 0 2px 5px rgba(255, 255, 255, 0.3);
  transform-origin: top left;
  filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.3));
  transition: all 0.7s ease-in-out;
  transform: ${({ isPlaying }) =>
    isPlaying ? 'rotate(45deg) translateZ(25px)' : 'rotate(10deg) translateZ(0)'};
`;

const Needle = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -6px;
  width: 12px;
  height: 24px;
  border-radius: 3px;
  background: linear-gradient(180deg, #444 0%, #111 100%);
  box-shadow:
    0 0 10px rgba(0, 0, 0, 0.7),
    inset 0 1px 4px rgba(255, 255, 255, 0.2);
`;

const NeedleGlow = styled.div`
  position: absolute;
  bottom: -6px;
  left: 50%;
  margin-left: -2px;
  width: 4px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  filter: blur(1px);
`;

export default RecordPlayer;
