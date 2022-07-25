export class InvalidParamError extends Error {
  constructor (public readonly field: string) {
    super()
    this.message = `Invalid param: ${field}`
  }
}
