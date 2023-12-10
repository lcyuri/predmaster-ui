import axios from 'axios';
import { API_HOST, SETTINGS_API } from '../constants/apiUrl';

export const getSettings = async (clientId: string): Promise<any> => {
  try {
    const url = API_HOST + SETTINGS_API + `?clientId=${clientId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('getSettings - ', error);
    handleError(error);
  }
}

const handleError = (error: any) => {
  if (error.response?.status === 404) {
    throw new Error('Configuração não encontrada.');
  } else {
    throw new Error('Erro carregar configuracoes.');
  }
}