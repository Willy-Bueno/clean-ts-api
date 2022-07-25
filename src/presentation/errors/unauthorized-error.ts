export class UnauthorizedError extends Error {
  constructor (stack?: string) {
    super()
    this.message = 'Unauthorized'
    this.stack = stack
  }
}
