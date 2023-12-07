import axios, {AxiosResponse} from 'axios';
import {Tache} from '../types/Tache';

const baseUrl = 'http://172.16.255.119:8000/api/taches';

export const fetchTachesFromDB = async () => {
  try {
    return await axios.get(`${baseUrl}`);
  } catch (e) {
    console.log(e);
  }
};
export const addTacheDB = async (tache: Tache) => {
  try {
    return await axios.post(`${baseUrl}`, tache);
  } catch (e) {
    console.log(e);
  }
};

export const updateTacheDB = async (id: number,done: boolean) => {
  try {
    return await axios.put(`${baseUrl}/${id}`, {done});
  } catch (e) {
    console.log(e);
  }
};

export const deleteTacheDB = async (id:number) => {
    try {
      return await axios.delete(`${baseUrl}/${id}`);
    } catch (e) {
      console.log(e);
    }
  };