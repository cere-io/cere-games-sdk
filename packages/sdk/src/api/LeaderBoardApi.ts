export type LeaderBoardRecord = {
  walletId: string;
  score: number;
  gameId: string;
};

export type LeaderBoard = LeaderBoardRecord[];

export type LeaderBoardApiOptions = {
  baseUrl: string;
  gameId: string;
};

export class LeaderBoardApi {
  constructor(private options: LeaderBoardApiOptions) {}

  private createEndpoint(path: string) {
    return new URL(path, this.options.baseUrl);
  }

  async getData() {
    const endpoint = this.createEndpoint(`/leader-board/game-id/${this.options.gameId}`);
    const response = await fetch(endpoint);
    const data: LeaderBoard = await response.json();

    return data.map(({ score, walletId }, index) => ({
      score,
      rank: index + 1,
      address: walletId,
    }));
  }

  async saveScore(walletAddress: string, score: number) {
    const endpoint = this.createEndpoint('/leader-board');
    const payload: LeaderBoardRecord = {
      score,
      walletId: walletAddress,
      gameId: this.options.gameId,
    };

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }
}
