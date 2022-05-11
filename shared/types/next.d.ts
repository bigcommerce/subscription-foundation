import { NextApiRequest as BaseNextApiRequest } from "next";

interface NextApiRequest extends BaseNextApiRequest {
  data?: RequestData;
}
