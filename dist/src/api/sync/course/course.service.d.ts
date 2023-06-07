import { DefaultService } from 'src/defaults/defatul.service';
import { SyncProcessInterface } from 'src/interfaces/api.interface';
import { DisciplinaProfesorEventHubInterface } from 'src/interfaces/hub.interface';
export declare class CourseService extends DefaultService {
    private readonly courseRepository;
    private readonly groupRepository;
    private readonly disciplineService;
    private readonly tangerineService;
    private readonly utilsService;
    constructor();
    private _create;
    private _update;
    private _delete;
    sync(params: {
        events: DisciplinaProfesorEventHubInterface[];
        schoolGuid: string;
    }): Promise<SyncProcessInterface>;
}
