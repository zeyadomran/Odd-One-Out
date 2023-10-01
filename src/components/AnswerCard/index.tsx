'use client';

import { FC } from 'react';
interface Props {
	src: string;
	onClick: () => void;
}
const AnswerCard: FC<Props> = ({ src, onClick }) => {
	return (
		<div
			className="bg-purple-900 rounded-sm p-2 w-48 h-48 cursor-pointer hover:bg-purple-400 transition-all duration-500 ease-in-out"
			onClick={() => onClick()}
		>
			<img src={src} className="rounded-sm" />
		</div>
	);
};

export default AnswerCard;
