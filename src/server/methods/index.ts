import { handleUnaryCall } from "grpc";

export interface UnaryFunctions {
    [key: string]: handleUnaryCall<any, any>
}