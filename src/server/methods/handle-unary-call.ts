import ServerContext from '../context/context';
import { handleCall } from 'grpc';

export function GrpcHandleUnaryCall(service: string, method: string) {
  return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const instance = ServerContext.getInstance();
    instance.addService(service);
    instance.addHandle(service, method, <handleCall<object, object>>descriptor.value);
  }
}
