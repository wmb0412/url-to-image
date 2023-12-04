export const getInvalidParams = (message = '无效的参数') => ({
  code: 10001,
  message,
});
export const userTokenInvalid = {
  code: 10002,
  message: 'token无效',
};
