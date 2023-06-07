import { DefaultService } from 'src/defaults/defatul.service';
import { SyncProcessInterface } from 'src/interfaces/api.interface';
import { TurmaAlunoEventHubInterface } from 'src/interfaces/hub.interface';
export declare class SchoolGroupUserService extends DefaultService {
    private readonly groupRepository;
    private readonly tangerineService;
    constructor();
    private _create;
    private _delete;
    sync(params: {
        events: TurmaAlunoEventHubInterface[];
        schoolGuid: string;
    }): Promise<SyncProcessInterface>;
}
