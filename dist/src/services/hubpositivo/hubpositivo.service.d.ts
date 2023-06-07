import { DefaultService } from 'src/defaults/defatul.service';
export declare enum HUBPOSITIVO_URL {
    GET_SCHOOL = "/data/schools",
    GET_SCHOOL_EVENT = "/data/{org_id}"
}
export declare class HubPositivoService extends DefaultService {
    private readonly config;
    private readonly httpService;
    private readonly utils;
    constructor();
    private _getAxiosConfig;
    get(params: {
        url: HUBPOSITIVO_URL;
        path?: any;
        query?: any;
    }): Promise<any>;
}
