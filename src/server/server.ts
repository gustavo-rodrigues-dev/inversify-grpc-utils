import 'reflect-metadata'
import { context, contextFunctions } from './context';
import { ServiceDefinition } from "@grpc/proto-loader";
import * as protoLoader from '@grpc/proto-loader'
interface PackageOptions extends protoLoader.Options {
    package?: string;
}

interface GrpcServer {
    packageOptions: PackageOptions,
    ServerOptions: {

    }

}
declare type PackageDefinition = protoLoader.PackageDefinition

function GrpcConfigServer(PROTO_PATH: string, options: PackageOptions) {
  console.log('-- decorator factory invoked --')
  return function(constructor: Function) {
    console.log('-- decorator invoked --')
    const packageDefinition = <PackageDefinition>(
        protoLoader.loadSync(PROTO_PATH, options)
      )

    const services = Object.keys(packageDefinition);
    constructor.prototype.packageDefinition = packageDefinition;
    services.forEach(service => {
      if(!packageDefinition[service].format){
          context.set(service, <ServiceDefinition>packageDefinition[service])
      }
    })
  }
}

function GrpcUnary(service: string, method: string) {
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

@GrpcConfigServer('./proto/hello/service.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
export class ServerTest {
  private packageDefinition!: PackageDefinition
  constructor() {
    console.log(context)
  }
}
