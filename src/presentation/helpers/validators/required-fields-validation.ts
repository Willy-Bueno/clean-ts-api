import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldsValidation implements Validation {
  constructor (private readonly field: string) {}

  validate (input: any): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
