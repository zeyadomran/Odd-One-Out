'use client';

import AnswerCard from '@/components/AnswerCard';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Timer from '@/components/Timer';
import { Rounds } from '@/constants/Rounds';
import { GameStateContext } from '@/context/GameStateContext';
import { GameStateActions } from '@/functions/GameStateReducer';
import { useSearchParams } from 'next/navigation';
import { VscDebugRestart } from 'react-icons/vsc';
import { useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { TbArrowBigLeftFilled } from 'react-icons/tb';
import Link from 'next/link';

export default function Game() {
	const [roundTime, setRoundTime] = useState(0);
	const [rounds, setRounds] = useState(_.shuffle(Rounds));
	const { state, dispatch } = useContext(GameStateContext);
	const searchParams = useSearchParams();
	useEffect(() => {
		dispatch({
			type: GameStateActions.SET_DIFFICULTY,
			payload: { difficulty: searchParams.get('difficulty') },
		});
	}, [searchParams, dispatch]);

	useEffect(() => {
		setRounds(_.shuffle(Rounds));
	}, [state.gameOver, state.gameWin]);

	useEffect(() => {
		if (state.gameOver || state.gameWin) {
			const scores = JSON.parse(localStorage.getItem('scores') ?? '{}').data;
			localStorage.setItem(
				'scores',
				JSON.stringify({
					data: [
						...(scores ?? []),
						{
							score: state.score,
							diffculty: state.difficulty,
							date: Date.now(),
						},
					],
				})
			);
		}
	}, [state.gameOver, state.gameWin, state.score, state.difficulty]);

	return (
		<main className="relative w-[100vw] h-[100vh] bg-gradient-to-tr from-purple-800 to-blue-800 flex flex-col justify-between ov">
			<NavBar
				inGameLayout={true}
				paused={state.paused}
				togglePause={() =>
					dispatch({
						type: state.paused
							? GameStateActions.GAME_RESUME
							: GameStateActions.GAME_PAUSE,
					})
				}
			/>
			<div className="flex flex-col justify-start items-center px-8 h-full">
				<div className="flex justify-between items-start w-full">
					<div className="flex flex-col items-start juestify-start gap-4">
						<div className="text-white font-bold text-2xl">
							Round: {state.round + 1}/{state.numberOfRounds}
						</div>
						<div className="text-white font-bold text-2xl">
							Score: {state.score}
						</div>
					</div>
					<div>
						<Timer
							duration={state.timePerRound}
							onTimeChange={(time) => setRoundTime(time)}
						/>
						<div>
							{state.difficulty === 1
								? '⭐'
								: state.difficulty === 2
								? '⭐⭐'
								: '⭐⭐⭐'}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 pt-8">
					{!state.paused &&
						!state.gameWin &&
						!state.gameOver &&
						rounds[state.round]?.map((round, index) => (
							<AnswerCard
								src={round.imageSrc}
								key={state.round + 1 + '' + index}
								onClick={() => {
									if (round.isCorrect) {
										dispatch({
											type: GameStateActions.NEXT_ROUND,
											payload: { time: roundTime },
										});
									} else {
										dispatch({ type: GameStateActions.GAME_OVER });
									}
								}}
							/>
						))}
				</div>
				{state.paused && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-purple-900 flex flex-col justify-start items-center gap-2">
						<h2 className="text-white font-bold text-3xl pb-4">Game Paused</h2>
					</div>
				)}
				{state.gameOver && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-purple-900 flex flex-col justify-start items-center gap-2">
						<h2 className="text-white font-bold text-3xl pb-4">Game Over</h2>
						<p className="text-white text-lg">Score: {state.score}</p>
						<p className="text-white text-lg pb-4">
							Round: {state.round}/{state.numberOfRounds}
						</p>
						<Link
							href="/"
							className="py-3 px-6 text-white bg-purple-700 rounded-sm text-lg font-bold cursor-pointer hover:bg-purple-400 transition-all duration-300 ease-in-out flex items-center gap-2 w-full"
						>
							<TbArrowBigLeftFilled />
							<p>Menu</p>
						</Link>
						<button
							className="py-3 px-6 text-white bg-purple-700 rounded-sm text-lg font-bold cursor-pointer hover:bg-purple-400 transition-all duration-300 ease-in-out flex items-center gap-2 w-full"
							onClick={() => dispatch({ type: GameStateActions.RESTART_GAME })}
						>
							<VscDebugRestart /> <p>Try Again</p>
						</button>
					</div>
				)}
				{state.gameWin && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-purple-900 flex flex-col justify-start items-center gap-2">
						<h2 className="text-white font-bold text-3xl pb-4">Game Win</h2>
						<p className="text-white text-lg">Score: {state.score}</p>
						<p className="text-white text-lg pb-4">
							Round: {state.round + 1}/{state.numberOfRounds}
						</p>
						<Link
							href="/"
							className="py-3 px-6 text-white bg-purple-700 rounded-sm text-lg font-bold cursor-pointer hover:bg-purple-400 transition-all duration-300 ease-in-out flex items-center gap-2 w-full"
						>
							<TbArrowBigLeftFilled />
							<p>Menu</p>
						</Link>
						<button
							className="py-3 px-6 text-white bg-purple-700 rounded-sm text-lg font-bold cursor-pointer hover:bg-purple-400 transition-all duration-300 ease-in-out flex items-center gap-2 w-full"
							onClick={() => dispatch({ type: GameStateActions.RESTART_GAME })}
						>
							<VscDebugRestart /> <p>Play again</p>
						</button>
					</div>
				)}
			</div>
			<Footer />
		</main>
	);
}
