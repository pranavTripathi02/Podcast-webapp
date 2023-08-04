// const { StatusCodes } = require('http-status-codes');
const ErrorHandlerMiddleware = (err: any, _req: any, res: any, next: any) => {
  console.error('from ErrorHandler: ', err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Error please try again later',
  };
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

export default ErrorHandlerMiddleware;
