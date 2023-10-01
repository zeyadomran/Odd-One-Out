'use client';
import { GameStateContext } from '@/context/GameStateContext';
import { GameStateActions } from '@/functions/GameStateReducer';
import { FC, useContext, useEffect, useState } from 'react';

interface Props {
	duration: number;
	onTimeChange: (time: number) => void;
}
const NavBar: FC<Props> = ({ duration, onTimeChange }) => {
	const [time, setTime] = useState(0);
	const [percentage, setPercentage] = useState(0);
	const [timeOver, setTimeOver] = useState(false);
	const { state, dispatch } = useContext(GameStateContext);

	useEffect(() => {
		const interval = setInterval(() => {
			if (time === duration) {
				setTimeOver(true);
			} else if (!state.paused && !state.gameOver && !state.gameWin) {
				setTime(time + 1);
				setPercentage(Math.floor(((time + 1) / duration) * 100));
				onTimeChange(time + 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [
		time,
		duration,
		state.paused,
		percentage,
		state.gameOver,
		state.gameWin,
		onTimeChange,
	]);

	useEffect(() => {
		if (timeOver) {
			dispatch({ type: GameStateActions.GAME_OVER });
		}
	}, [timeOver, dispatch]);

	useEffect(() => {
		setTime(0);
	}, [state.round]);

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between items-center">
				<p className="text-white">Timer</p>
				<p
					className={`${
						percentage >= 75 || state.gameOver
							? 'text-red-400'
							: percentage <= 25 || state.gameWin
							? 'text-green-400'
							: 'text-white'
					} font-bold transition-all duration-1000 ease-in-out`}
				>
					{time}/{duration}
				</p>
			</div>
			<div className="h-4 w-80 bg-black rounded-sm flex justify-end">
				<div
					className={`h-full ${
						percentage >= 75 || state.gameOver
							? 'bg-red-400'
							: percentage <= 25 || state.gameWin
							? 'bg-green-400'
							: 'bg-white'
					} transition-all duration-1000 ease-in-out`}
					style={{
						width: timeOver ? '0' : 100 - percentage + '%',
					}}
				></div>
			</div>
		</div>
	);
};

export default NavBar;
