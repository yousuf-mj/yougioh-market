import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from 'aws-lambda';
import { AxiosResponse } from 'axios';

import Env from '../../Env';
import ygoApi from '../../services/ygoDeckApi';
import { create as createCards } from '../../repositories/CardRespository';
import { createBulk, findAll } from '../../repositories/SetRespository';
import { responseSuccess, responseError } from '../../helpers/response';
import Cards from '../../types/Cards';

export const all: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const t = await findAll();

        return responseSuccess(t, 200);
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
        const createNew = await createCards(cardData);

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

export const sets: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const ygoSets = await ygoApi(Env.ygoSetEndpoint);

        const setData = ygoSets.data.map(item => {
            return { name: item['Set Name'] };
        });

        const createNew = await createBulk(setData);

        if (!createNew) {
            return Promise.reject({ error: 'Unable to sync sets' });
        }

        const message = { success: true };

        return responseSuccess(message, 200);
    } catch (error) {
        console.log(error);

        return responseError(error, 400);
    }
};

export const syncAll: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const allCards = await ygoApi(Env.ygoEndpoint);

        const setData = allCards.data.map(item => {
            return { name: item['Set Name'] };
        });

        const createNew = await createBulk(setData);

        if (!createNew) {
            return Promise.reject({ error: 'Unable to sync sets' });
        }

        const message = { success: true };

        return responseSuccess(message, 200);
    } catch (error) {
        console.log(error);

        return responseError(error, 400);
    }
};
