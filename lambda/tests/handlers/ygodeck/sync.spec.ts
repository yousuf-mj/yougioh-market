import { expect } from 'chai';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as sinon from 'sinon';
import * as knex from 'knex';
import * as mockDb from 'mock-knex';

import { all, sets, card } from '../../../src/handlers/ygodeck/sync';
import * as ygoApi from '../../../src/services/ygoDeckApi';

import * as SetRepository from '../../../src/repositories/SetRespository';
import * as CardRespository from '../../../src/repositories/CardRespository';
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

    it('should sync all cards and sets into the database', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allCardsMock.json');
        const stub = sinon.stub(ygoApi, 'default').resolves({
            data: mockResponse
        });

        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'POST',
            '/ygodeck/sync/card'
        );

        const create = sinon.stub(CardRespository, 'create').resolves(true);

        const response: APIGatewayProxyResult = (await card(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        stub.restore();
        sinon.assert.called(stub);
        create.restore();

        expect(response.statusCode).to.equal(200);
    });
});
