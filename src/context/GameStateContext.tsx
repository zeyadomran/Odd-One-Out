import { GameStateReducer, InitGameState } from '@/functions/GameStateReducer';
import { GameState } from '@/types/GameState';
import { createContext, useReducer } from 'react';

export const GameStateContext = createContext<{
	state?: GameState;
	dispatch?: Function;
}>({
	state: undefined,
	dispatch: undefined,
});

export const GameStateProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(GameStateReducer, InitGameState);
	return (
		<GameStateContext.Provider value={{ state, dispatch }}>
			{children}
		</GameStateContext.Provider>
	);
};
