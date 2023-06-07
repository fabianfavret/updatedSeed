import { DefaultService } from 'src/defaults/defatul.service';
import { SyncProcessInterface } from 'src/interfaces/api.interface';
import { TurmaEventHubInterface } from 'src/interfaces/hub.interface';
export declare class SchoolGroupService extends DefaultService {
    private readonly groupRepository;
    private readonly tangerineService;
    constructor();
    private _create;
    private _update;
    private _delete;
    sync(params: {
        events: TurmaEventHubInterface[];
        schoolGuid: string;
    }): Promise<SyncProcessInterface>;
}
