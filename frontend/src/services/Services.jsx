import axios from "axios";
import { enqueueSnackbar } from "notistack";

const API_URL = "http://127.0.0.1:8000/api"; // Backend URL


export const getDocuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/documents`);
    return response.data;
  } catch (error) {
    enqueueSnackbar(error.message,{variant:"error"});
    console.log(error);
  }
  
};
export const getDocumentsByName = async (search = "") => {
  try {
     const response = await axios.get(`${API_URL}/documents?search=${search}`);
     return response.data;
  } catch (error) {
    enqueueSnackbar(error.message, { variant: "error" });
    console.log(error);
  }
 
};
export const getDocumentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/documents/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
};

export const createDocument = async (document) => {
  try {
     const response = await axios.post(`${API_URL}/documents`, document);
     return response.data;
  } catch (error) {
    console.log(error);
  }
 
};

export const deleteDocument = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/documents/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  
};
