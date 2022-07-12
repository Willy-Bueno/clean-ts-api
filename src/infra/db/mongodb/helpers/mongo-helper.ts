import { Collection, MongoClient, WithId, Document, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    /* c8 ignore start */
    if (!this.client) {
      await MongoClient.connect(this.uri)
    }
    /* c8 ignore end */
    return this.client.db().collection(name)
  },

  async findById (collection: Collection<Document>, id: ObjectId): Promise<WithId<Document>> {
    return await collection.findOne({ _id: id })
  },

  map (collection: WithId<Document>): any {
    const { _id, ...accounWithoutId } = collection
    return Object.assign({}, accounWithoutId, { id: _id.toHexString() })
  }
}
