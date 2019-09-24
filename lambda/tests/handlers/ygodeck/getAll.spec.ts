import { expect } from 'chai';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { getAll } from '../../../src/handlers/ygodeck/get';
import ApiGatewayProxyEventFactory from '../../ApiGatewayProxyEventFactory';

describe('Ygo Deck API', () => {
    it('should return all cards', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allCardsMock.json');
        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'GET',
            '/ygodeck/all'
        );

        apiGatewayEventMock.body = JSON.stringify(mockResponse);

        const result: APIGatewayProxyResult = (await getAll(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        expect(result.body).to.be.an('Array');
    });
});
