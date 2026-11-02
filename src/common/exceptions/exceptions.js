export const ApplicationError = ({
  message = "Application Error",
  cause = 500,
}) => {
  throw new Error(message, { cause });
};

export const NotFoundException = ({ message = "Not Found", cause = 404 }) => {
  ApplicationError({ message, cause });
};

export const BadRequestError = ({ message = "Bad Request", cause = 400 }) => {
  ApplicationError({ message, cause });
};

export const UnauthorizedException = ({
  message = "Unauthorized",
  cause = 401,
}) => {
  ApplicationError({ message, cause });
};

export const ForbidenException = ({ message = "Forbidden", cause = 403 }) => {
  ApplicationError({ message, cause });
};

export const ConflictException = ({ message = "Conflict", cause = 409 }) => {
  ApplicationError({ message, cause });
};

export const InternalServerError = ({
  message = "Internal Server Error",
  cause = 500,
}) => {
  ApplicationError({ message, cause });
};
