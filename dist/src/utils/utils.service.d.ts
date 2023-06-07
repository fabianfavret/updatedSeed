import { PapelHubType } from 'src/types/hub.type';
import { RoleTangerineType } from 'src/types/tangerine.type';
export declare class UtilsService {
    clearUrlPath(url: string): string;
    getTangerineRol(papel: PapelHubType): RoleTangerineType;
    getTimezone(): string;
    getYYYYMMDDDateFormat(date: Date, includeTime?: boolean): string;
    getFullURL(params: {
        baseURL: string;
        url: string;
        path?: any;
        query?: any;
    }): string;
    isObj1ContainedObj2(params: {
        obj1: any;
        obj2: any;
    }): boolean;
}
