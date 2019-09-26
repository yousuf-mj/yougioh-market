import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from 'aws-lambda';
import axios, { AxiosResponse } from 'axios';
import Env from '../../Env';
import ygoApi from '../../services/ygoDeckApi';

import { responseSuccess, responseError } from '../../helpers/response';

export const all: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const results: AxiosResponse = await ygoApi(Env.ygoDeck.url, {
            params: { name: 'Dark Magician' }
        });

        const message = { success: true, results: results.data };

        return responseSuccess(message, 200);
    } catch (error) {
        console.log(error);

        return responseError(error, 400);
    }
};
