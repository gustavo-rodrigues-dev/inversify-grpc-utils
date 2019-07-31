import { context } from "../context";

export function GrpcHandleUnaryCall(service: string, method: string) {
    console.log('-- decorator factory invoked --')
    return function(constructor: Function) {
      const methods = context.get(service);
      if(!methods){
        throw new Error('Unexpected Service');
      }

      if(!methods[method]){
        throw new Error(`Unexpected method at ${service}`);
      }

      if(methods[method].requestStream || methods[method].responseStream){
        throw new Error(`the method ${method} is not a unary request`);
      }
      if(!methods[method].originalName){
        throw new Error(`the method ${method} is not a unary request`);
      }
    }
  }