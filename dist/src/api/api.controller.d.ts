import { DefaultController } from 'src/defaults/default.controller';
import { AddSchoolApiDTO } from 'src/dto/api.dto';
export declare class ApiController extends DefaultController {
    private readonly apiService;
    constructor();
    addSchool(body: AddSchoolApiDTO): Promise<any>;
}
