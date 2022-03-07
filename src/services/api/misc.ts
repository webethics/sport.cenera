import axios from 'axios';

import configs from '@cenera/configs';
import { GetTypesReqResponse, UploadImageReqResult } from './types';

const getTypes = (access_token: string) => {
  return axios.post<GetTypesReqResponse>(`${configs.app.api}/getTypes`, {
    access_token,
  });
};

const uploadImage = (image: any) => {
  return axios.post<UploadImageReqResult>(`${configs.app.api}/imageUpload`, image, {
    headers: {
      'Content-Type': 'image/jpeg',
    },
  }); 
};

export const MiscService = {
  getTypes,
  uploadImage,
};
