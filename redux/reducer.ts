import { ADD_DATA_BEGIN, ADD_DATA_SUCCESS, ADD_DATA_FAILURE, DataActionTypes, ADD_UPLOAD, DELETE_UPLOAD, SET_UPLOADS } from "./types";

interface DataState {
  loading: boolean;
  error: Error | null;
  data: string[];
}

const initialState: DataState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (state: DataState = initialState, action: DataActionTypes): DataState => {
  switch (action.type) {
    case ADD_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_UPLOAD:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case DELETE_UPLOAD:
      return {
        ...state,
        loading: false,
        data: state.data.filter((upload) => upload !== action.payload),
      };
    case SET_UPLOADS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case ADD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case ADD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
