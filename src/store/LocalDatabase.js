import Dexie from 'dexie';

export const db = new Dexie('datastore');
db.version(2).stores({
    assetData: '++id,assetData',
    dataInfo: '++id,dataInfo',
});
