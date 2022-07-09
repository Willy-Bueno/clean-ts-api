import { Collection, MongoClient, WithId, Document, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
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
