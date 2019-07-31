import { ServiceDefinition } from "@grpc/proto-loader";
import { handleCall } from 'grpc';

export type RequestType = object;
export type ResponseType = object;

export interface GrpcContextItem {
    serviceDefinition: ServiceDefinition;
    handleFunctions: handleCall<RequestType, ResponseType>
}

export interface GrpcContextMap {
    [service: string]: GrpcContextItem
}

export interface GrpcContextHandleMap {
    [service: string]: handleCall<RequestType, ResponseType>
}

export interface IGrpcContext {
    addServiceDefinition(service: string, serviceDefinition: ServiceDefinition): void
    addContext(service: string, method: string, call: handleCall<RequestType, ResponseType>): void
}