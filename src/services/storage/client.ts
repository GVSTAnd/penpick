import NodeCache from 'node-cache';
import { StorageImplementation } from './interfaces';

export class CacheStorageClient implements StorageImplementation {
    private static instance: CacheStorageClient;
    private controller: NodeCache = new NodeCache({ stdTTL: 3600, checkperiod: 7200 });

    constructor() {
        if (CacheStorageClient.instance) {
            return CacheStorageClient.instance;
        }
        CacheStorageClient.instance = this;
    }

    getValue(key: string): string {
        return this.controller.get(key) || '';
    }

    setValue(key: string, value: string): void {
        this.controller.set(key, value);
    }
}
