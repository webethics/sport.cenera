export type LoginReqParams = {
  email: string;
  password: string;
};

export type LoginReqResult = {
  access_token: string;
  user_id: number;
  user_type: string;
  club_id: number | null;
  team_id: number | null;
  user_login: string;
};
