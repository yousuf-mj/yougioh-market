import { expect } from 'chai';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as sinon from 'sinon';

import { all, card } from '../../../src/handlers/ygodeck/sync';
import * as ygoApi from '../../../src/services/ygoDeckApi';

import ApiGatewayProxyEventFactory from '../../ApiGatewayProxyEventFactory';

describe('Ygo Deck API', () => {
    it('should return all cards', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allCardsMock.json');
        const stub = sinon.stub(ygoApi, 'default').resolves({
            data: mockResponse
        });

        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'GET',
            '/ygodeck/getAll'
        );

        const response: APIGatewayProxyResult = (await all(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        const result = JSON.parse(response.body);

        stub.restore();
        sinon.assert.called(stub);
        expect(result.results).to.be.an('Array');
        expect(response.statusCode).to.equal(200);
    });
});
