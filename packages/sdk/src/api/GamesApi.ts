type LeaderBoardRecord = {
  walletId: string;
  score: number;
  gameId: string;
};

type LeaderBoard = LeaderBoardRecord[];
type Rank = number;

export type GamesApiOptions = {
  baseUrl: string;
  gameId: string;
};

export class GamesApi {
  constructor(private options: GamesApiOptions) {}

  private createEndpoint(path: string) {
    return new URL(path, this.options.baseUrl);
  }

  private post<T = any>(endpoint: string | URL, payload: T) {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
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

    await this.post<LeaderBoardRecord>(endpoint, {
      score,
      walletId: walletAddress,
      gameId: this.options.gameId,
    });
  }

  async getLeaderboardRank(score: number) {
    const endpoint = this.createEndpoint(`/leader-board/games/${this.options.gameId}/scores/${score}`);
    const response = await fetch(endpoint);
    const data: Rank = await response.json();

    return data;
  }

  async saveSessionTX(txHash: string, [ethAddress, cereAddress]: string[]) {
    const endpoint = this.createEndpoint('/leader-board/create-order');

    await this.post(endpoint, {
      txHash,
      cereWalletId: cereAddress,
    });
  }
}
