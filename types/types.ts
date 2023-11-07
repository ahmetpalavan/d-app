export const ADD_DATA_BEGIN = "ADD_DATA_BEGIN";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const ADD_DATA_FAILURE = "ADD_DATA_FAILURE";
export const ADD_UPLOAD = 'ADD_UPLOAD';
export const DELETE_UPLOAD = 'DELETE_UPLOAD';
export const SET_UPLOADS = 'SET_UPLOADS';

export interface AddDataBeginAction {
  type: typeof ADD_DATA_BEGIN;
}

export interface AddDataSuccessAction {
  type: typeof ADD_DATA_SUCCESS;
  payload: string;
}

export interface AddDataFailureAction {
  type: typeof ADD_DATA_FAILURE;
  payload: Error;
}


export interface AddUploadAction {
  type: typeof ADD_UPLOAD;
  payload: any;
}

export interface DeleteUploadAction {
  type: typeof DELETE_UPLOAD;
  payload: string;
}

export interface SetUploadsAction {
  type: typeof SET_UPLOADS;
  payload: any;
}
export type DataActionTypes = AddDataBeginAction | AddDataSuccessAction | AddDataFailureAction | AddUploadAction | DeleteUploadAction | SetUploadsAction;
