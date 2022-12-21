import { z } from "zod";
const isProduction = () => process.env.NODE_ENV === "production";
const isDevelopment = () => process.env.NODE_ENV === "development";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

export enum HTTPStatusCode {
  OK = 200,
}

interface RequestOptionsType {
  method: string;
  mode?: "no-cors" | "cors" | "same-origin";
  cache?: "no-cache" | "reload" | "force-cache" | "only-if-cached" | "default";
  credentials?: "same-origin" | "include" | "omit";
  headers: { [key: string]: string };
  redirect?: "follow" | "manual" | "error";
  referrerPolicy?: ReferrerPolicy;
  body?: string | FormData;
  signal?: AbortSignal;
}

export default function api<Request, Response>({
  method,
  path,
  requestSchema,
  responseSchema,
}: {
  query: Record<string, string>;
  method: HTTPMethod;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
}): (data: Request) => Promise<Response> {
  return function (requestData: Request) {
    requestSchema.parse(requestData);

    async function apiCall() {
      const response = await fetch({
        baseURL: process.env.API_URL,
        method,
        url: path,
        [method === HTTPMethod.GET ? "params" : "data"]: requestData,
      });

      if (process.env.NODE_ENV === "production") {
        responseSchema.safeParseAsync(response.data).then((result) => {
          if (!result.success) {
            // TODO: Send error to sentry or other error reporting service
          }
        });

        return response.data as Response;
      }

      return responseSchema.parse(response.data);
    }

    return apiCall();
  };
}

export const apiHelper = () => {};
