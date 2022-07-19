import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation('field')
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return an MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('field'))
  })
})
