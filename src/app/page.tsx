'use client';

import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Selector from '@/components/Selector';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
	const [difficulty, setDifficulty] = useState(1);
	const [scores, setScores] = useState([]);
	useEffect(() => {
		setScores(JSON.parse(localStorage.getItem('scores') ?? '{}')?.data || []);
	}, []);

	return (
		<main className="w-[100vw] h-[100vh] bg-gradient-to-tr from-purple-800 to-blue-800 flex justify-between flex-col">
			<NavBar />
			<div className="p-8 flex justify-center items-center flex-col gap-8">
				<Selector
					label="Difficulty"
					values={[
						{ id: 1, label: '⭐' },
						{ id: 2, label: '⭐⭐' },
						{ id: 3, label: '⭐⭐⭐' },
					]}
					onSelectionChange={(selection) => setDifficulty(selection.id)}
				/>
				<Link
					href={'/game?difficulty=' + difficulty}
					className="py-3 px-6 text-white bg-purple-900 rounded-sm text-lg font-bold cursor-pointer hover:bg-purple-400 transition-all duration-300 ease-in-out select-none"
				>
					Start Challenge
				</Link>
				<div className="p-8 h-full w-96 bg-purple-900 flex flex-col gap-4 items-start justify-start">
					<p className="text-white flex-bold text-2xl select-none">
						Scoreboard
					</p>
					<div className="flex flex-col gap-2 w-full max-h-64 overflow-y-scroll">
						{scores
							.sort((a: any, b: any) => b.score - a.score)
							.map((score: any, index) => (
								<div
									key={index}
									className="flex p-2 px-4 gap-2 justify-between items-center text-white w-full border-2 border-purple-700 rounded sm select-none"
								>
									<div>
										{score.difficulty === 3
											? '⭐⭐⭐'
											: score.diffculty === 2
											? '⭐⭐'
											: '⭐'}
									</div>
									<div>{score.score}</div>
									<div>{new Date(score.date).toLocaleDateString('en')}</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
