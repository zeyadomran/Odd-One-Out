export interface GameState {
	difficulty: 1 | 2 | 3;
	timePerRound: number;
	numberOfRounds: number;
	round: number;
	score: number;
	gameWin: boolean;
	paused: boolean;
	gameOver: boolean;
}
