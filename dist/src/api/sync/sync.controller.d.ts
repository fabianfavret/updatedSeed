import { DefaultController } from 'src/defaults/default.controller';
export declare class SyncController extends DefaultController {
    private readonly service;
    constructor();
    periodicSync(): Promise<any>;
}
