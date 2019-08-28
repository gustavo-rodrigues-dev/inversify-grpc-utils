import { ServiceDefinition } from "@grpc/proto-loader";
import { handleUnaryCall } from "grpc";
export interface UnaryFunctions {
    [key: string]: handleUnaryCall<any, any>
}
export const context: Map<string, ServiceDefinition> = new Map();
export let contextFunctions: UnaryFunctions = {};