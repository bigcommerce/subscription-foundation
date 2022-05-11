interface BodyRequest {
  [key: string]: any;
}
interface QueryRequest {
  [key: string]: any;
}
interface ParamsRequest {
  [key: string]: any;
}

type RequestData = {
  body?: BodyRequest;
  params?: ParamsRequest;
  query?: QueryRequest;
};
