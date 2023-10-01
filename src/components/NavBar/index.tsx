'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import {
	TbArrowBigLeftFilled,
	TbPlayerPauseFilled,
	TbPlayerPlayFilled,
} from 'react-icons/tb';

interface Props {
	inGameLayout?: boolean;
	paused?: boolean;
	togglePause?: () => void;
}
const NavBar: FC<Props> = ({ inGameLayout, paused, togglePause }) => {
	const [showRules, setShowRules] = useState(false);

	return (
		<nav className="relative flex justify-between gap-4 items-center p-8">
			<div className="flex items-center gap-4">
				{inGameLayout && (
					<Link href="/">
						<TbArrowBigLeftFilled className="h-12 w-10 text-purple-900 hover:text-purple-400 cursor-pointer transition-all duration-300 ease-in-out" />
					</Link>
				)}
				<div className="">
					<h1 className="font-bold text-white text-4xl">Odd One Out</h1>
				</div>
			</div>
			<div className="flex justify-between items-center gap-4">
				{inGameLayout && (
					<button onClick={() => togglePause?.()}>
						{paused ? (
							<TbPlayerPlayFilled className="h-12 w-10 text-purple-900 hover:text-purple-400 cursor-pointer transition-all duration-300 ease-in-out" />
						) : (
							<TbPlayerPauseFilled className="h-12 w-10 text-purple-900 hover:text-purple-400 cursor-pointer transition-all duration-300 ease-in-out" />
						)}
					</button>
				)}
				<button
					className="py-3 px-6 text-white bg-purple-900 rounded-sm text-xl font-bold cursor-pointer hover:bg-purple-400 transition-all duration-300 ease-in-out"
					onClick={() => {
						setShowRules(!showRules);
						if ((!paused && !showRules) || (paused && showRules)) {
							togglePause?.();
						}
					}}
				>
					{!showRules ? 'Rules' : 'Close'}
				</button>
			</div>
			{showRules && (
				<div className="absolute top-full right-8 bg-purple-900 w-96 p-8 text-white font-light">
					<p>
						Just pick the odd picture out before the time runs out. If you get 1
						wrong, you lose. Get all 10 correct to win the game!
					</p>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
