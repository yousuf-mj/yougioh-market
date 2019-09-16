const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
};

export const responseSuccess = (
    data: object = {},
    statusCode: number = 200
) => {
    return {
        statusCode,
        headers,
        body: JSON.stringify(data)
    };
};

export const responseError = (data: object = {}, statusCode: number = 500) => {
    return {
        statusCode,
        headers,
        body: JSON.stringify(data)
    };
};
