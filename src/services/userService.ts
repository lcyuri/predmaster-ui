import axios from 'axios';
import { API_HOST, USER_API } from '../constants/apiUrl';

export const getUser = async (username: string, password: string): Promise<any> => {
  try {
    const url = API_HOST + USER_API + `?username=${username}&password=${password}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('getUser - ', error);
    handleError(error);
  }
}

const handleError = (error: any) => {
  if (error.response?.status === 404) {
    throw new Error('Usuário não encontrado.');
  } else {
    throw new Error('Erro ao entrar na aplicação.');
  }
}