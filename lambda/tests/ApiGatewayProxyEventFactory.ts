import { APIGatewayProxyEvent } from 'aws-lambda';

export default class ApiGatewayProxyEventFactory {
    public static create(method: string, path: string): APIGatewayProxyEvent {
        const apiGatewayEventMock: APIGatewayProxyEvent = {
            body: '',
            headers: {},
            httpMethod: method,
            isBase64Encoded: false,
            path,
            pathParameters: {},
            queryStringParameters: {},
            stageVariables: {},
            requestContext: {
                accountId: '',
                apiId: '',
                httpMethod: '',
                identity: {
                    accessKey: null,
                    accountId: null,
                    apiKey: null,
                    caller: null,
                    cognitoAuthenticationProvider: null,
                    cognitoAuthenticationType: null,
                    cognitoIdentityId: null,
                    cognitoIdentityPoolId: null,
                    sourceIp: '',
                    user: null,
                    userAgent: null,
                    userArn: null
                },
                stage: '',
                requestId: '',
                requestTimeEpoch: 1,
                resourceId: '',
                resourcePath: ''
            },
            resource: ''
        };

        return apiGatewayEventMock;
    }
}
