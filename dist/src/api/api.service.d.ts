import { DefaultService } from 'src/defaults/defatul.service';
export declare class ApiService extends DefaultService {
    private readonly schoolRepository;
    private readonly hubService;
    constructor();
    addSchool(params: {
        guids: string[];
    }): Promise<void>;
}
