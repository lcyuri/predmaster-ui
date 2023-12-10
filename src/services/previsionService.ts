import axios from 'axios';
import { API_HOST, PREVISION_API,  } from '../constants/apiUrl';

export const getPrevision = async (clientId: string): Promise<any> => {
  try {
    const url = API_HOST + PREVISION_API + `?clientId=${clientId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('getPrevision - ', error);
    handleError(error);
  }
}

const handleError = (error: any) => {
  if (error.response?.status === 404) {
    throw new Error('Previsão não encontrado.');
  } else {
    throw new Error('Erro ao carregar previsões.');
  }
}