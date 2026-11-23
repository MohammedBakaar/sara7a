export const ApplicationError = ({
  message = "Application Error",
  cause = 500,
}) => {
  throw new Error(message, { cause });
};

export const NotFoundException = (message = "Not Found") => {
  ApplicationError({ message, cause: 404 });
};

export const BadRequestError = (message = "Bad Request") => {
  ApplicationError({ message, cause: 400 });
};

export const UnauthorizedException = (message = "Unauthorized") => {
  ApplicationError({ message, cause: 401 });
};

export const ForbiddenException = (message = "Forbidden") => {
  ApplicationError({ message, cause: 403 });
};

export const ConflictException = (message = "Conflict") => {
  ApplicationError({ message, cause: 409 });
};

export const InternalServerError = (message = "Internal Server Error") => {
  ApplicationError({ message, cause  : 500});
};
