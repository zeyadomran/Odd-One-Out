'use client';
import { GameStateContext } from '@/context/GameStateContext';
import { GameStateActions } from '@/functions/GameStateReducer';
import { FC, useContext, useEffect, useState } from 'react';

interface Props {
	duration: number;
}
const NavBar: FC<Props> = ({ duration }) => {
	const [time, setTime] = useState(0);
	const [timeOver, setTimeOver] = useState(false);
	const { state, dispatch } = useContext(GameStateContext);

	useEffect(() => {
		const interval = setInterval(() => {
			if (time === duration - 1) {
				setTimeOver(true);
			}
			setTime(time + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [time, duration]);

	useEffect(() => {
		if (timeOver) {
			dispatch({ type: GameStateActions.GAME_OVER });
		}
	}, [timeOver, dispatch]);

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between items-center">
				<p className="text-white">Timer</p>
				<p
					className={`${
						Math.floor((time / duration) * 100) >= 80
							? 'text-red-400'
							: Math.floor((time / duration) * 100) <= 25
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
						Math.floor((time / duration) * 100) >= 80
							? 'bg-red-400'
							: Math.floor((time / duration) * 100) <= 25
							? 'bg-green-400'
							: 'bg-white'
					} transition-all duration-1000 ease-in-out`}
					style={{
						width: timeOver
							? '0'
							: 100 - Math.floor((time / duration) * 100) + '%',
					}}
				></div>
			</div>
		</div>
	);
};

export default NavBar;
