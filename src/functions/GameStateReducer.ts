import { GameState } from '@/types/GameState';
import { ReducerAction } from 'react';

export enum GameStateActions {
	GAME_START = 'GAME_START',
}

export const InitGameState: GameState = {
	view: 'start',
};

export const GameStateReducer = (state: any, action: any) => {
	switch (action.type) {
		case GameStateActions.GAME_START:
			return {
				...state,
				view: 'game',
			};
	}
};
