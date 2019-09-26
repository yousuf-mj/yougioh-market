import { expect } from 'chai';
import { APIGatewayProxyResult } from 'aws-lambda';
import sinon from 'sinon';

import { all } from '../../../src/handlers/ygodeck/get';
import * as ygoApi from '../../../src/services/ygoDeckApi';

import ApiGatewayProxyEventFactory from '../../ApiGatewayProxyEventFactory';

describe('Ygo Deck API', () => {
    it('should return all cards', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allCardsMock.json');
        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'GET',
            '/ygodeck/all'
        );

        const stub = sinon.stub(ygoApi, 'default').resolves({
            data: mockResponse
        });

        const result: APIGatewayProxyResult = (await all(
            apiGatewayEventMock,
            null,

            null
        )) as APIGatewayProxyResult;

        // expect(result.body).to.be.an('Array');
        stub.restore();
        sinon.assert.called(stub);
        expect(result.statusCode).to.equal(200);
    });

    afterEach(() => {});
});
