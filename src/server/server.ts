import 'reflect-metadata'
import GrpcContext from './context/context'
import { ServiceDefinition } from '@grpc/proto-loader'
import * as protoLoader from '@grpc/proto-loader'
import { GrpcHandleUnaryCall } from './methods/handle-unary-call';
import { handleCall, ServerCredentials } from 'grpc';
import { RequestType, ResponseType } from './context/index';
interface PackageOptions extends protoLoader.Options {
  package?: string
}

interface GrpcServer {
  packageOptions: PackageOptions
  ServerOptions: {}
}
declare type PackageDefinition = protoLoader.PackageDefinition

function GrpcConfigServer(PROTO_PATH: string, options: PackageOptions, bind: string) {
  const instance = GrpcContext.getInstance();
  instance.setServer();
  return function(constructor: Function) {
    const packageDefinition = <PackageDefinition>(
      protoLoader.loadSync(PROTO_PATH, options)
    )

    const services = Object.keys(packageDefinition)
    
    constructor.prototype.packageDefinition = packageDefinition
    services.forEach(service => {
      if (!packageDefinition[service].format) {
        instance.addServiceDefinition(service, <ServiceDefinition>packageDefinition[service])
      }
    })
    instance.getServer().bind(bind, ServerCredentials.createInsecure())
    instance.getServer().start();
  }
}

@GrpcConfigServer('./proto/hello/service.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}, '0.0.0.0:8082')
export class ServerTest {
  private packageDefinition!: PackageDefinition
  constructor() {}
  @GrpcHandleUnaryCall('hello.service.Hello', 'BasicGreat')
  basicGreat(callback:any){
    callback(null, {
      message: callback.name
    })
  }

}
