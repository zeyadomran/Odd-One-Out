export interface GameState {
	difficulty: 1 | 2 | 3;
	timePerRound: number;
	numberOfRounds: number;
	round: number;
	score: 0;
	gameWin: boolean;
	paused: boolean;
	gameOver: boolean;
}
