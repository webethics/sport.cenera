export type GameLineUp = {
  lineup_id?: number;
  lineup_number: number;
  lineup_player1: string;
  lineup_player2: string;
  lineup_player3: string;
  lineup_player4: string;
  lineup_player5: string;
  lineup_player6?: string;
  lineup_player7?: string;
  lineup_player8?: string;
  lineup_player9?: string;
  lineup_player10?: string;
  lineup_player11?: string;
  lineup_player12?: string;
  lineup_player13?: string;
  lineup_player14?: string;
  lineup_player15?: string;
  lineup_player16?: string;
  lineup_player17?: string;
  lineup_player18?: string;
};

export type GameMatchRecord = {
  match_id: number;
  match_team1_name: string;
  match_team1_score: string;
  match_team2_name: string;
  match_team2_score: string;
};

export type GameInfo = {
  club_id?: number;
  team_id?: number;
  game_info_spectators: string;
  game_info_lottery: string;
  game_info_nextgame1: string;
  game_info_nextgame2: string;
  game_info_kioskinfo: string;
  game_info_ticketprice: string;
  game_lineupsystem: string;
  game_message1:string;
  game_message2:string;
  game_lineup?: GameLineUp[];
  matches?: GameMatchRecord[];
};





