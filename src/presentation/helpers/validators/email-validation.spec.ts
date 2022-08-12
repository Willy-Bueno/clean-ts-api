import { EmailValidator } from '@/presentation/protocols/email-validator'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidation } from './email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makesut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    emailValidatorStub,
    sut
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator retuns false', () => {
    const { sut, emailValidatorStub } = makesut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({
      email: 'any_mail@mail.com'
    })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makesut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({
      email: 'any_mail@mail.com'
    })
    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makesut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
