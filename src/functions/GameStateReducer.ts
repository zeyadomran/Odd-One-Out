import { GameState } from '@/types/GameState';
import { ReducerAction } from 'react';

export enum GameStateActions {
	GAME_START = 'GAME_START',
	GAME_PAUSE = 'GAME_PAUSE',
	GAME_OVER = 'GAME_OVER',
}

export const InitGameState: GameState = {
	difficulty: 'easy',
	timePerRound: 60,
	round: 0,
	score: 0,
	playerName: '',
	paused: false,
	gameOver: false,
};

export const GameStateReducer = (state: any, action: any): GameState => {
	switch (action.type) {
		case GameStateActions.GAME_OVER:
			return {
				...state,
				gameOver: true,
			};
	}
	return state;
};
