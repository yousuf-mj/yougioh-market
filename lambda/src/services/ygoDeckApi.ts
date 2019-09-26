import axios, { AxiosResponse } from 'axios';

export default async (url: string, filters?: any): Promise<AxiosResponse> => {
    // const params = filters || null;
    console.log(url);

    return await axios.get(url, filters);
};
