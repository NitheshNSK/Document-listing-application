import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Backend URL


export const getDocuments = async () => {
  const response = await axios.get(`${API_URL}/documents`);
  return response.data;
};
export const getDocumentsByName = async (search = "") => {
  const response = await axios.get(`${API_URL}/documents?search=${search}`);
  return response.data;
};
export const getDocumentById = async (id) => {
  const response = await axios.get(`${API_URL}/documents/${id}`);
  return response.data;
};

export const createDocument = async (document) => {
  const response = await axios.post(`${API_URL}/documents`, document);
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await axios.delete(`${API_URL}/documents/${id}`);
  return response.data;
};
