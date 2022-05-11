import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

// Validation Configuration Options
export const FORBID_UNKNOWN_PROPERTIES = {
  skipMissingProperties: false,
  whitelist: true,
  forbidNonWhitelisted: true
};

export const DEFAULT_VALIDATION_CONFIGURATION = {
  skipMissingProperties: false
};

const convertString = (data: any): string => {
  const keys = Object.keys(data);

  return keys.reduce((res, key) => `${res}${res ? ", " : ""}${data[key]}`, "");
};

const getErrorMessage = (data: any, nowKey = ""): string => {
  try {
    if (!(data instanceof Array) && !(data instanceof Object)) return "";
    const keys = Object.keys(data);

    if (!keys.length) return "";
    if (nowKey == "constraints") return convertString(data);
    return keys.reduce((res, key) => {
      const errMsg = getErrorMessage(data[key], key);

      if (errMsg) return `${res}${res ? ", " : ""}${errMsg}`;
      else return res;
    }, "");
  } catch (e) {
    console.log(e);
  }
};

const getErrorObject = (data: any): any => {
  try {
    if (data instanceof Array) {
      return data.reduce((pre, val) => {
        return {
          ...pre,
          ...getErrorObject(val)
        };
      }, {});
    }
    if (data?.["property"] && Object.keys(data?.["constraints"] ?? {}).length)
      return { [data.property]: Object.values(data.constraints) };
    if (data?.["property"] && data?.["children"]?.length)
      return { [data.property]: getErrorObject(data.children) };
  } catch (e) {
    console.log(e);
  }
  return {};
};

export const setDataToRequest = (req, _, next): void => {
  req.data = {};
  next();
};

export const validatePathMiddleware = (
  type: any,
  skipMissingProperties = false
) => {
  return (req, res, next): any => {
    validate(plainToInstance(type, req.params), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          return res.status(404).send({
            errors: {
              status: 404,
              code: "NOTFOUNDERROR",
              message: getErrorObject(errors)
            }
          });
        } else {
          next();
        }
      })
      .catch(error => next(error));
  };
};

export const validateBodyMiddleware = (
  type: any,
  options = DEFAULT_VALIDATION_CONFIGURATION
) => {
  return (req, res, next): any => {
    const bodyData = plainToInstance(type, req?.body ?? {});

    validate(bodyData, options).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        return res.status(400).send({
          errors: {
            status: 400,
            code: "INVALID_REQUEST_BODY",
            message: getErrorMessage(errors)
          }
        });
      } else {
        req.data.body = bodyData;
        next();
      }
    });
  };
};

export const validateParamMiddleware = (
  type: any,
  skipMissingProperties = false
) => {
  return (req, res, next): any => {
    const paramsData = plainToInstance(type, req?.params ?? {}) as typeof type;

    validate(paramsData, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          return res.status(400).send({
            errors: {
              status: 400,
              code: "INVALID_REQUEST_PARAM",
              message: getErrorMessage(errors)
            }
          });
        } else {
          req.data.params = paramsData;
          next();
        }
      }
    );
  };
};
export const validateQueryMiddleware = (
  type: any,
  skipMissingProperties = false
) => {
  return (req, res, next): any => {
    const queryData = plainToInstance(type, req?.query ?? {}) as typeof type;

    validate(queryData, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          return res.status(400).send({
            errors: {
              status: 400,
              code: "INVALID_REQUEST_QUERY",
              message: getErrorMessage(errors)
            }
          });
        } else {
          req.data.query = queryData;
          next();
        }
      }
    );
  };
};
