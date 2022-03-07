export type Club = {
  club_id?: number;
  club_name: string;
  club_sportstype: string;
  textfield1: string;
  textfield2: string;
  textfield3: string;
  textfield4: string;
  textfield5: string;
  club_image: string;
  club_image_logo: string;
  teams?: { team_id: number; team_name: string; team_type: string }[];
};
