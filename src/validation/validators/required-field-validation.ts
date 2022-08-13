import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly field: string) {}

  validate (input: any): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
