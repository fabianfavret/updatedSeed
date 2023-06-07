import { DefaultService } from 'src/defaults/defatul.service';
import { SyncProcessInterface } from 'src/interfaces/api.interface';
import { PeriodEventHubInterface } from 'src/interfaces/hub.interface';
export declare class SchoolYearService extends DefaultService {
    private readonly tangerineService;
    private readonly utilsService;
    private readonly config;
    constructor();
    private _create;
    private _update;
    sync(params: {
        events: PeriodEventHubInterface[];
        schoolGuid: string;
    }): Promise<SyncProcessInterface>;
}
