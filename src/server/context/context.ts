import { ServiceDefinition } from '@grpc/proto-loader';
import { handleCall, Server } from 'grpc';
import { GrpcContextMap, GrpcServerContext, IGrpcContext, RequestType, ResponseType, MapServerService, MapMethhodServer } from './index';
import { context } from '../context';
import { FORMERR } from 'dns';
import { Method } from 'protobufjs';

export default class ServerContext implements GrpcServerContext {
  private static instance: GrpcServerContext;
  private server?: Server;
  private context: MapServerService;
  private constructor() {
    this.context = new Map();
  }

  static getInstance() {
    if (!ServerContext.instance) {
      ServerContext.instance = new ServerContext()
    }
    return ServerContext.instance
  }

  setServer(options?: object): void {
    this.server = new Server(options);
  }

  getServer(): Server{
    if(!this.server){
      throw new Error(`gRPC server is not initialized`);
    }

    return this.server;
  }

  addService(service: string): void {
    if(this.context.has(service)){
      return;
    }
    this.context.set(service, new Map());
    return;
  }
  getService(service: string): MapMethhodServer {
    const serviceContext = this.context.get(service);
    if(!serviceContext){
      throw new Error(`Service ${service} is not defined`);
    }
    return serviceContext;
  }
  addHandle(service: string, method: string, handle: handleCall<RequestType, ResponseType>): void {
    const serviceContext = this.getService(service);
    serviceContext.set(method, handle);
    // passivel de remover this.context.set(service, serviceContext);
  }
  getHandle(service: string, method: string): handleCall<RequestType, ResponseType> {
    const handleContext = this.getService(service).get(method);
    if(!handleContext){
      throw new Error(`Method ${method} is not defined on ${service} Service`);
    }
    return handleContext;
  }
  addServiceDefinition(
    service: string,
    serviceDefinition: ServiceDefinition
  ): void {
    const methods = Object.keys(serviceDefinition);
    const server = this.getServer();
    const handle: any = {};
    for (let index = 0; index < methods.length; index++) {
      const methodName = methods[index];
      const handleMethod = this.getHandle(service, methodName);
      if(handleMethod){ 
        handle[methodName] = this.getHandle(service, methodName);
      }
    }
    console.log(serviceDefinition);
    server.addService(serviceDefinition, handle);
  }
  load():void {}
}
