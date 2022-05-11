import "reflect-metadata";
import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import nc, { NextConnect } from "next-connect";
import exceptionHandler from "../exceptions/handler";
import { prismaClient } from "../prisma";
import {
  validateBodyMiddleware,
  validateQueryMiddleware,
  validateParamMiddleware,
  setDataToRequest
} from "../middlewares/validation";
import Cors from 'cors'
import runMiddleware from "@/backend/middlewares/run-middleware";

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
})
/** The HTTP request types. */
export enum RequestType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS"
}

/** The API route handler. */
type ApiRouteHandler = NextConnect<NextApiRequest, NextApiResponse>;

/**
 * Controller class that provides default Next.js API route handling.
 */
export abstract class ApiRouteController {
  //#region Properties

  public body: BodyRequest;
  public query: QueryRequest;
  public params: ParamsRequest;

  protected middlewares: Array<any> = [];
  protected requestTypes: Array<RequestType> = [];

  //#endregion

  //#region Public Methods

  /**
   * Appends a middleware function or handler.
   * @param handler The middleware function or handler.
   */
  public addMiddleware(handler: any): this {
    this.middlewares.push(handler);
    return this;
  }

  /**
   * Configures the request controller to handle the specified
   * request type.
   * @param type {RequestType} The request type.
   */
  public addRequestType(type: RequestType): this {
    this.requestTypes.push(type);
    return this;
  }

  /**
   * Returns the Next.js API route handler.
   */
  public getRouteHandler(): ApiRouteHandler {
    let handler = nc<NextApiRequest, NextApiResponse>();
    handler = this.setUpMiddleware(handler);
    handler = this.setupHandlers(handler);
    return handler;
  }

  //#endregion

  //#region Protected Methods

  /**
   * The method that executes a request.
   * @param req {NextApiRequest} The request object.
   * @param res {NextApiResponse} The response object.
   */
  protected abstract run(
    req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void>;

  /**
   * The method that executes before the request run method.
   * @param req {NextApiRequest} The original request object.
   */
  protected beforeRun(_req?: NextApiRequest): Promise<void> {
    return Promise.resolve();
  }

  /**
   * The method that executes after the request run method.
   * @param req {NextApiRequest} The original request object.
   */
  protected afterRun(_req?: NextApiRequest): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Configures the controller middlewares for the route handler.
   */
  protected setUpMiddleware(handler: ApiRouteHandler): ApiRouteHandler {
    if (this.body) {
      this.middlewares.unshift(validateBodyMiddleware(this.body.constructor));
    }
    if (this.query) {
      this.middlewares.unshift(validateQueryMiddleware(this.query.constructor));
    }
    if (this.params) {
      this.middlewares.unshift(
        validateParamMiddleware(this.params.constructor)
      );
    }
    this.middlewares.unshift(setDataToRequest);
    return this.middlewares.reduce(
      (handler: ApiRouteHandler, middleware: any) => handler.use(middleware),
      handler
    );
  }

  /**
   * Configures the request handlers for the given route handler.
   */
  protected setupHandlers(handler: ApiRouteHandler): ApiRouteHandler {
    return this.requestTypes.reduce(
      (handler: ApiRouteHandler, type: RequestType) => {
        const func = async (req: NextApiRequest, res: NextApiResponse<any>) => {
          try {
             // Run the middleware for cors
            await runMiddleware(req, res, cors);
            this.body = req.body;
            this.query = req.query;
            this.params = req.data.params;
            await this.beforeRun(req);
            const result = await this.run(req, res);
            await this.afterRun(req);
            await prismaClient.$disconnect();
            return result;
          } catch (error) {
            exceptionHandler(error, req, res);
          }
        };
        switch (type) {
          case RequestType.GET:
            return handler.get(func);

          case RequestType.POST:
            return handler.post(func);

          case RequestType.PUT:
            return handler.put(func);

          case RequestType.DELETE:
            return handler.delete(func);

          case RequestType.PATCH:
            return handler.patch(func);
          
          case RequestType.OPTIONS:
            return handler.options(func);

          default:
            return handler;
        }
      },
      handler
    );
  }

  //#endregion
}