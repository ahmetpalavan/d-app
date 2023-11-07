import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { ADD_DATA_BEGIN, ADD_DATA_FAILURE, ADD_DATA_SUCCESS, ADD_UPLOAD, DELETE_UPLOAD, SET_UPLOADS } from "../types/types";

export const addDataToFirestore = (data: any) => async (dispatch: any) => {
  dispatch({ type: ADD_DATA_BEGIN });
  try {
    const docRef = await addDoc(collection(firestore, "data"), data);
    dispatch({
      type: ADD_DATA_SUCCESS,
      payload: docRef.id,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document to Firestore: ", error);
    dispatch({
      type: ADD_DATA_FAILURE,
      payload: error,
    });
  }
};

export const addUpload = (upload: any) => ({
  type: ADD_UPLOAD,
  payload: upload,
});

export const deleteFromToFirestore = (id: string) => async (dispatch: any) => {
  dispatch({ type: DELETE_UPLOAD, payload: id });
  try {
    const docRef = doc(firestore, "data", id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document from Firestore: ", error);
    dispatch({
      type: ADD_DATA_FAILURE,
      payload: error,
    });
  }
};

export const setUploads = (uploads: any) => ({
  type: SET_UPLOADS,
  payload: uploads,
});
