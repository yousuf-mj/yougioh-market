import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from 'aws-lambda';
import { AxiosResponse } from 'axios';

import Env from '../../Env';
import ygoApi from '../../services/ygoDeckApi';
import { create } from '../../repositories/CardRespository';
import { responseSuccess, responseError } from '../../helpers/response';
import Cards from '../../types/Cards';

export const all: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const results: AxiosResponse = await ygoApi(Env.ygoEndpoint);

        const message = { success: true, results: results.data };

        return responseSuccess(message, 200);
    } catch (error) {
        console.log(error);

        return responseError(error, 400);
    }
};

export const card: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const { name, type, description, archetype } = JSON.parse(event.body);
        const cardData: Cards = {
            name,
            type,
            description,
            archetype
        };
        const createNew = await create(cardData);

        if (!createNew) {
            return Promise.reject({ error: 'Unable to create a new Card' });
        }

        const message = { success: true };

        return responseSuccess(message, 200);
    } catch (error) {
        console.log(error);

        return responseError(error, 400);
    }
};
