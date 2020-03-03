import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from 'aws-lambda';

import Env from '../../Env';
import ygoApi from '../../services/ygoDeckApi';
import { responseSuccess, responseError } from '../../helpers/response';

import { create as createCards } from '../../repositories/CardRepository';
import {
    createBulk as createBulkSets,
    findAll
} from '../../repositories/SetRespository';

import CardResponse from '../../types/CardResponse'
import Set from '../../types/Set'

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

        const createNew = await createBulkSets(setData);

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

        const c = allCards.data.forEach(async item => {
            await cardSingle(item);
        });

        // const setIds = await findSetsInfo(setData);

        const message = { success: true };

        return responseSuccess(message, 200);
    } catch (error) {
        console.log(error);

        return responseError(error, 400);
    }
};

const findSetsInfo = async setData => {
    console.log(setData);
};

const cardSingle = async (cardData: CardResponse) => {
    const sets = cardData.card_sets;

    const {name, type, desc, archetype } = cardData;
    const cardPayload: Cards = {
        name, 
        type, 
        description: desc, 
        archetype
    };

    const setResponse = sets.forEach(async item => {
        return await setSingle(item)
    })

    try{
        const cardResult = await createCards(cardPayload);

    }
};

const setSingle = async set => {

}
