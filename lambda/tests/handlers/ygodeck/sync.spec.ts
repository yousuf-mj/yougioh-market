import { expect } from 'chai';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as sinon from 'sinon';

import { syncAll, sets } from '../../../src/handlers/ygodeck/sync';
import * as ygoApi from '../../../src/services/ygoDeckApi';

import * as SetRepository from '../../../src/repositories/SetRespository';
import * as CardRepository from '../../../src/repositories/CardRepository';
import ApiGatewayProxyEventFactory from '../../ApiGatewayProxyEventFactory';

describe('Ygo Sync', () => {
    it('should sync the database with all sets', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allSets.json');
        const stub = sinon.stub(ygoApi, 'default').resolves({
            data: mockResponse
        });

        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'POST',
            '/ygodeck/sync/sets'
        );

        const createBulkSets = sinon
            .stub(SetRepository, 'createBulk')
            .resolves(true);

        const response: APIGatewayProxyResult = (await sets(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        stub.restore();
        sinon.assert.called(stub);
        createBulkSets.restore();

        expect(response.statusCode).to.equal(200);
    });

    it.only('should sync all cards and sets into the database', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allCardsMock.json');
        const stub = sinon.stub(ygoApi, 'default').resolves({
            data: mockResponse
        });

        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'POST',
            '/ygodeck/sync/cards'
        );

        const create = sinon.stub(CardRepository, 'create').resolves(true);
        const setBulk = sinon.stub(SetRepository, 'createBulk').resolves(true);

        const response: APIGatewayProxyResult = (await syncAll(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        stub.restore();
        create.restore();
        setBulk.restore();

        sinon.assert.called(stub);
        sinon.assert.called(create);
        sinon.assert.called(setBulk);

        expect(response.statusCode).to.equal(200);
    });

    it('should sync a card into the database', () => {});
});
