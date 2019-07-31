import {
  GrpcContextItem,
  IGrpcContext,
  GrpcContextMap,
  GrpcContextHandleMap,
  RequestType,
  ResponseType,
} from './index'
import { ServiceDefinition } from '@grpc/proto-loader'
import { handleCall } from 'grpc'

class GrpcContext implements IGrpcContext {
  private static instance: GrpcContext
  private context: GrpcContextMap
  private serviceDefinition: Map<string, ServiceDefinition>
  private constructor() {
    this.context = {}
    this.serviceDefinition = new Map()
  }
  static getInstance() {
    if (!GrpcContext.instance) {
      GrpcContext.instance = new GrpcContext()
    }
    return GrpcContext.instance
  }

  addServiceDefinition(
    service: string,
    serviceDefinition: ServiceDefinition
  ): void {
    this.serviceDefinition.set(service, serviceDefinition)
  }
  addContext(
    service: string,
    method: string,
    call: handleCall<RequestType, ResponseType>
  ): void {
    const serviceDefinition = this.serviceDefinition.get(service)
    if (!serviceDefinition) {
      throw new Error('invalid Service')
    }
    if (!serviceDefinition[method]) {
      throw new Error('invalid method')
    }
    if (!serviceDefinition[method].originalName) {
      throw new Error(`the method ${method} is not a unary request`)
    }

    this.context[service] = {
      serviceDefinition: <ServiceDefinition>serviceDefinition,
      handleFunctions: call,
    }
  }
}
