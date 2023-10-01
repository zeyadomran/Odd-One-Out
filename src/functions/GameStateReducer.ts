import { GameState } from '@/types/GameState';

export enum GameStateActions {
	GAME_RESUME = 'GAME_RESUME',
	GAME_PAUSE = 'GAME_PAUSE',
	GAME_OVER = 'GAME_OVER',
	SET_DIFFICULTY = 'SET_DIFFICULTY',
	NEXT_ROUND = 'NEXT_ROUND',
	RESTART_GAME = 'RESTART_GAME',
}

export const InitGameState: GameState = {
	difficulty: 1,
	timePerRound: 60,
	numberOfRounds: 10,
	round: 1,
	score: 0,
	gameWin: false,
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
		case GameStateActions.GAME_PAUSE:
			return {
				...state,
				paused: true,
			};
		case GameStateActions.GAME_RESUME:
			return {
				...state,
				paused: false,
			};
		case GameStateActions.SET_DIFFICULTY:
			const difficulty = +action.payload.difficulty;
			return {
				...state,
				difficulty,
				timePerRound: difficulty === 1 ? 45 : difficulty === 2 ? 30 : 15,
			};
		case GameStateActions.NEXT_ROUND:
			const newScore = Math.floor(
				state.score +
					100 +
					((state.timePerRound - action.payload.time) / state.timePerRound) *
						100 *
						state.difficulty
			);
			if (state.round === state.numberOfRounds) {
				return {
					...state,
					gameWin: true,
					score: newScore,
				};
			} else {
				return {
					...state,
					score: newScore,
					round: state.round + 1,
				};
			}
		case GameStateActions.RESTART_GAME:
			return {
				...state,
				score: 0,
				round: 1,
				gameWin: false,
				gameOver: false,
				paused: false,
			};
	}
	return state;
};
