export class EmailInUseError extends Error {
  constructor () {
    super()
    this.message = 'The received email is already in use'
  }
}
