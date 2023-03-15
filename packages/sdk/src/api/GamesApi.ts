export type LeaderBoardRecord = {
  walletId: string;
  score: number;
  gameId: string;
};

export type LeaderBoard = LeaderBoardRecord[];

export type Rank = number;

export type GamesApiOptions = {
  baseUrl: string;
  gameId: string;
};

export class GamesApi {
  constructor(private options: GamesApiOptions) {}

  private createEndpoint(path: string) {
    return new URL(path, this.options.baseUrl);
  }

  async getLeaderboard() {
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

  async getLeaderboardRank(score: number) {
    const endpoint = this.createEndpoint(`/leader-board/games/${this.options.gameId}/scores/${score}`);
    const response = await fetch(endpoint);
    const data: Rank = await response.json();

    return data;
  }

  async saveSessionTX(txHash: string, [ethAddress, cereAddress]: string[]) {
    // TODO: Save the information to the backend

    console.log('Transaction hash', txHash);
    console.log('Ethereum address', ethAddress);
    console.log('Cere address', cereAddress);
  }
}
