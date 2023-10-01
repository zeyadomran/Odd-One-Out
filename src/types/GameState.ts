export interface GameState {
	difficulty: 'easy' | 'medium' | 'hard';
	timePerRound: number;
	round: number;
	score: number;
	playerName: string;
	paused: boolean;
	gameOver: boolean;
}
