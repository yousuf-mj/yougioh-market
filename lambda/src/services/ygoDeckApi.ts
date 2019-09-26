import axios, { AxiosResponse } from 'axios';

export default async (url: string, filters?: any): Promise<AxiosResponse> => {
    const params = filters || null;

    return await axios.get(url, params);
};
