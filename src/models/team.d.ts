export type Team = {
  team_id?: number;
  club_id?: number;
  team_type: string;
  team_name: string;
  textfield1: string;
  textfield2: string;
  textfield3: string;
  team_image: string;
  team_image_logo: string;
  players?: TeamPlayer[];
};

export type TeamPlayer = {
  player_id: number;
  player_shirtnumber: string;
  player_firstname: string;
  player_lastname: string;
};


export type LineupTeamId = {
  teamId?: number;
 
};

export type TeamName = {
  teamName?: string;
};