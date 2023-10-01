'use client';
import { GameStateProvider } from '@/context/GameStateContext';
import { ReactNode } from 'react';

export default function GameLayout({ children }: { children: ReactNode }) {
	return <GameStateProvider>{children}</GameStateProvider>;
}
