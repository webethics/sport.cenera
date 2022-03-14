export type User = {
  user_id?: number;
  user_type: ('sysAdmin' | 'clubAdmin' | 'teamAdmin') | string;
  club_id?: number | null;
  team_id?: number | null;
  user_club?: number | null;
  user_team?: number | null;
  user_login: string;
  lastLogin?: string;
};



