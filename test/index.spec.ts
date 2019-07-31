import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { foo } from '../src/index'

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Hello', () => {
  it('Should return foo', () => {
    const result = foo();
    expect(result).to.be.equal('bar')
  })
})
