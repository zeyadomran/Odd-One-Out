'use client';

import { FC, useState } from 'react';
import {
	TbSquareChevronLeftFilled,
	TbSquareChevronRightFilled,
} from 'react-icons/tb';

interface Props {
	label: string;
	values: { id: number; label: string }[];
	onSelectionChange: (selection: { id: number; label: string }) => void;
}
const Selector: FC<Props> = ({ label, values, onSelectionChange }) => {
	const [selection, setSelection] = useState(0);

	const changeSelection = (forward: boolean) => {
		let newSelection = (selection + (forward ? 1 : -1)) % values.length;
		newSelection = newSelection < 0 ? values.length - 1 : newSelection;
		setSelection(newSelection);
		onSelectionChange(values[newSelection]);
	};

	return (
		<div className="flex flex-col justify-between items-start w-48 gap-2">
			<p className="text-white select-none">{label}</p>
			<div className="flex justify-between items-center w-full bg-purple-900 p-2 rounded-sm">
				<div onClick={() => changeSelection(false)}>
					<TbSquareChevronLeftFilled className="w-6 h-6 text-purple-400 hover:text-purple-700 cursor-pointer transition-all duration-200 ease-in-out" />
				</div>
				<p className="text-lg select-none">{values[selection]?.label}</p>
				<div onClick={() => changeSelection(true)}>
					<TbSquareChevronRightFilled className="w-6 h-6 text-purple-400 hover:text-purple-700 cursor-pointer transition-all duration-200 ease-in-out" />
				</div>
			</div>
		</div>
	);
};

export default Selector;
