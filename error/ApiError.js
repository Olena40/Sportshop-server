export const badRequest = (status, message) => {
  return new ApiError(404, message);
};

export const internal = (message) => {
  return new ApiError(500, message);
};

export const forbidden = (message) => {
  return new ApiError(403, message);
};
