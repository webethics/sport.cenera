export type GetTypesReqResponse = {
  type_name: 'team_type' | 'club_sportstype' | 'user_type';
  values: string[];
}[];

export type UploadImageReqResult = {
  filename: string;
};
