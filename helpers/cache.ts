export default class RedisCache {
  constructor(public tedisClient) {}

  public async setJson(key: string, obj: any, ttl: number = 60): Promise<void> {
    const serializedJson = JSON.stringify(obj);
    await this.tedisClient.setex(key, ttl,serializedJson);
    console.info(`Added ${key} to cache`);
  }

  public async getJson(key: string): Promise<any> {
    const serializedJson = await this.tedisClient.get(key);
    const parsedJson = JSON.parse(serializedJson);
    console.info(`Got ${key} from cache`);
    return parsedJson;
  }

  public async exists(key: string): Promise<boolean> {
    return Boolean(await this.tedisClient.exists(key));
  }
}
