import { SyncEntity } from './sync.entity';
export declare class SchoolEntity {
    guid: string;
    name: string;
    createdAt: Date;
    syncs: SyncEntity[];
}
