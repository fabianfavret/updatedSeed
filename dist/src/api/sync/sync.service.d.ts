import { DefaultService } from 'src/defaults/defatul.service';
import { SyncTypeEnum } from 'src/entities/sync.entity';
export declare class SyncService extends DefaultService {
    private readonly syncRepository;
    private readonly schoolRepository;
    private readonly hubService;
    private readonly utilsService;
    private readonly schoolService;
    private readonly userService;
    private readonly disciplineService;
    private readonly schoolYearService;
    private readonly schoolUsersService;
    private readonly schoolGroupService;
    private readonly schoolGroupUserService;
    private readonly courseService;
    constructor();
    private _createSync;
    sync(type: SyncTypeEnum): Promise<void>;
}
