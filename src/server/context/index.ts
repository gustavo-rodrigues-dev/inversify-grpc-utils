import { ServiceDefinition } from '@grpc/proto-loader'
import { handleCall, load, Server } from 'grpc'

export type RequestType = object
export type ResponseType = object

export interface GrpcContextItem {
  serviceDefinition: ServiceDefinition
  handleFunctions: handleCall<RequestType, ResponseType>
}

export interface GrpcContextMap {
  [service: string]: GrpcContextItem
}

export interface GrpcContextHandleMap {
  [service: string]: handleCall<RequestType, ResponseType>
}

export type MapMethhodServer = Map<string, handleCall<RequestType, ResponseType>>
export type MapServerService = Map<string, MapMethhodServer>

export interface GrpcServerContext {
  setServer(options?: object): void;
  getServer(): Server;
  addService(service: string): void;
  getService(service: string): MapMethhodServer;
  addHandle(service: string, method: string, handle: handleCall<RequestType, ResponseType>): void;
  getHandle(service: string, method: string): handleCall<RequestType, ResponseType>;
  addServiceDefinition(
    service: string,
    serviceDefinition: ServiceDefinition
  ): void
  load():void;
}

export interface IGrpcContext {
  addServiceDefinition(
    service: string,
    serviceDefinition: ServiceDefinition
  ): void
  addContext(
    service: string,
    method: string,
    call: handleCall<RequestType, ResponseType>
  ): void
}
