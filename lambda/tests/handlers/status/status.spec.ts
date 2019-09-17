import { expect } from 'chai';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { status } from '../../../src/handlers/status/status';
import ApiGatewayProxyEventFactory from '../../ApiGatewayProxyEventFactory';

describe('Status', () => {
    it('should return 200 at status health check', async () => {
        const apiGatewayEventMock = ApiGatewayProxyEventFactory.create(
            'GET',
            '/status'
        );

        const result: APIGatewayProxyResult = (await status(
            apiGatewayEventMock,
            null,
            null
        )) as APIGatewayProxyResult;

        expect(result.statusCode).to.equal(200);
    });
});
