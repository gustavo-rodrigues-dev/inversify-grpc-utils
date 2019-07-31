import { ServiceDefinition } from "@grpc/proto-loader";

export const context: Map<string, ServiceDefinition> = new Map();
export let contextFunctions = {};