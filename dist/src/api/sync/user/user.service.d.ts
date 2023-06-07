import { DefaultService } from 'src/defaults/defatul.service';
import { SyncProcessInterface } from 'src/interfaces/api.interface';
import { UsuarioEventHubInterface } from 'src/interfaces/hub.interface';
export declare class UserService extends DefaultService {
    private readonly tangerineService;
    private readonly utilsService;
    constructor();
    private _create;
    private _update;
    private _delete;
    sync(params: {
        events: UsuarioEventHubInterface[];
    }): Promise<SyncProcessInterface>;
}
