import "reflect-metadata";
import * as protoLoader from '@grpc/proto-loader';

declare type PackageOptions = protoLoader.Options;

function GrpcConfigServer(PROTO_PATH: string, options: PackageOptions) {
    console.log('-- decorator factory invoked --');
    return function (constructor: Function) {
        console.log('-- decorator invoked --');
        constructor.prototype.packageDefinition = protoLoader.loadSync(
            PROTO_PATH,
            options
        );
    }
}

@GrpcConfigServer(
    './proto/hello/service.proto', 
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
export class ServerTest {
    private packageDefinition?: PackageOptions;
    constructor(){
        console.log(this.packageDefinition)
    }
}
