import { ServerTest } from './server/server'
export function foo(): string {
  const test = new ServerTest()
  return 'bar'
}
