'use client';

import NavBar from '@/components/NavBar';
import Timer from '@/components/Timer';
import { GameStateContext } from '@/context/GameStateContext';
import { useContext } from 'react';

export default function Game() {
	const { state, dispatch } = useContext(GameStateContext);

	return (
		<main className="w-[100vw] h-[100vh] bg-gradient-to-tr from-purple-800 to-blue-800">
			<NavBar inGameLayout={true} />
			<div className="flex flex-col justify-between items-center px-8">
				<div className="self-end">
					<Timer duration={state?.timePerRound} />
				</div>
				{state.gameOver && <div>Game Over</div>}
			</div>
		</main>
	);
}
