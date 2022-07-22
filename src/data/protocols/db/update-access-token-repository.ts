export interface UpdateAccessTokenRepository {
  updateAccessToken: (id: unknown, token: string) => Promise<void>
}
