import type { FastifyReply } from "fastify";

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export class HttpResponse {
  public static ok<T>(response: FastifyReply, data: T){
    return response.status(HttpStatusCode.OK).send(data);
  }

  public static created<T>(response: FastifyReply, data: T){
    return response.status(HttpStatusCode.CREATED).send(data);
  }

  public static noContent<T>(response: FastifyReply){
    return response.status(HttpStatusCode.NO_CONTENT);
  }
}