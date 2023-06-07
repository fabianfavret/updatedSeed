import { DefaultService } from 'src/defaults/defatul.service';
import { UsuarioEventHubInterface } from 'src/interfaces/hub.interface';
export declare class SchoolUsersService extends DefaultService {
    private readonly tangerineService;
    constructor();
    private _create;
    sync(params: {
        events: UsuarioEventHubInterface[];
        schoolGuid: string;
    }): Promise<void>;
}
