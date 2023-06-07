import { DefaultService } from 'src/defaults/defatul.service';
import { DisciplineEntity } from 'src/entities/discipline.entity';
import { DisciplineInterface, SyncProcessInterface } from 'src/interfaces/api.interface';
import { DisciplineEventHubInterface } from 'src/interfaces/hub.interface';
export declare class DisciplineService extends DefaultService {
    private readonly disciplineRepository;
    private readonly tangerineService;
    private readonly utilsService;
    constructor();
    private _create;
    private _update;
    private _delete;
    sync(params: {
        events: DisciplineEventHubInterface[];
    }): Promise<SyncProcessInterface>;
    get(params: DisciplineInterface): Promise<DisciplineEntity>;
}
