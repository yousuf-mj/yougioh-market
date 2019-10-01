import { expect } from 'chai';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as sinon from 'sinon';
import * as knex from 'knex';
import * as mockDb from 'mock-knex';

import { all, sets } from '../../../src/handlers/ygodeck/sync';
import * as ygoApi from '../../../src/services/ygoDeckApi';

import ApiGatewayProxyEventFactory from '../../ApiGatewayProxyEventFactory';

describe('Ygo Sync', () => {
    let db;

    beforeEach(() => {
        db = knex({
            client: 'mysql2'
        });

        mockDb.mock(db);
    });

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

    it('should sync the database with all sets', async () => {
        const mockResponse = require('../../fixtures/ygodeck/allSets.json');
        const stub = sinon.stub(ygoApi, 'default').resolves({
            data: mockResponse
        });

        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'POST',
            '/ygodeck/sync/sets'
        );

        const response: APIGatewayProxyResult = (await sets(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        stub.restore();
        sinon.assert.called(stub);
        expect(response.statusCode).to.equal(200);
    });

    afterEach(() => {
        mockDb.unmock(db);
    });
});
