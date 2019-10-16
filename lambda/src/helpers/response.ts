export const responseSuccess = (
    data: object = {},
    statusCode: number = 200
) => {
    return {
        statusCode,
        body: JSON.stringify(data)
    };
};

export const responseError = (data: object = {}, statusCode: number = 500) => {
    return {
        statusCode,
        body: JSON.stringify(data)
    };
};
