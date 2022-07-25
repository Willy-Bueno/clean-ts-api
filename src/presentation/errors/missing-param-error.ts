export class MissingParamError extends Error {
  constructor (public readonly field: string) {
    super()
    this.message = `Missing param: ${field}`
  }
}
