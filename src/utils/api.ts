import { z } from "zod";
const isDevelopment = process.env.NODE_ENV === "development";

const isSuccessRequest = (response: Response) => {
  return response.status >= 200 && response.status < 300 && response.ok;
};

type Query = Record<string, string | number | Array<string> | undefined>;

type ReturnResponseType = "json" | "blob" | "text";

export enum HTTPStatusCode {
  OK = 200,
}

const errorResponseSchema = z.object({
  status_message: z.string(),
  status_code: z.number(),
  success: z.boolean().optional(),
});

type ErrorResponseType = z.infer<typeof errorResponseSchema>;

type HTTPMethod = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";

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

export function api<ResponseType>({
  method,
  path,
  query,
  responseSchema,
  responseType,
  signal,
}: {
  query?: Query;
  method?: HTTPMethod;
  path: string;
  responseType: ReturnResponseType | null;
  data?: Request;
  responseSchema: z.ZodType<ResponseType>;
  signal?: AbortSignal;
}): Promise<ResponseType> {
  return new Promise(async (resolve, reject) => {
    try {
      const requestOptions: RequestOptionsType = {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      };

      const urlQuery = {
        api_key: process.env.REACT_APP_API_KEY + "",
        ...(query || {}),
      };

      const searchParams = new URLSearchParams();
      Object.entries(urlQuery).forEach(([key, value]: [string, string]) => {
        searchParams.set(key, value);
      });

      const url =
        process.env.REACT_APP_API_URL + path + `?${searchParams.toString()}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const error: ErrorResponseType = await response.json();

        if (isDevelopment) errorResponseSchema.parse(error);

        throw error;
      }

      let data: ResponseType | Blob | string | null = null;

      if (isSuccessRequest(response)) {
        if (responseType === "blob") data = await response.blob();
        else if (responseType === "json") data = await response.json();
        else if (responseType !== null) data = await response.json();
      }

      const schemaResult = responseSchema.parse(data);

      resolve(schemaResult);
    } catch (err: any) {
      let error: Error = {
        name: err?.name || "Unknown",
        message: err?.status_message || err?.message || "Something went wrong",
      };

      reject(error);
    }
  });
}
