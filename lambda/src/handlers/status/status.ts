import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult
} from 'aws-lambda';

import { responseSuccess } from '../../helpers/response';

export const status: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const message = { success: true };
    return responseSuccess(message, 200);
};
