import { DefaultService } from 'src/defaults/defatul.service';
import { SchoolTangerineInterface } from 'src/interfaces/tangerine.interface';
export declare class SchoolService extends DefaultService {
    private readonly tangerineService;
    constructor();
    private _create;
    sync(params: {
        payload: SchoolTangerineInterface;
    }): Promise<void>;
}
