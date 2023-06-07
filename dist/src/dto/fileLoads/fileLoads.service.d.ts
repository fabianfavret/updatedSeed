export declare class FileLoadsService {
    private readonly logger;
    private readonly httpService;
    private readonly editorURL;
    processExcelFile(token?: string): Promise<any[]>;
    private _getAxiosConfig;
    get(params: {
        url: string;
        path?: any;
        query?: any;
        accessToken?: string;
    }): Promise<any>;
    post(params: {
        url: string;
        path?: any;
        payload?: any;
    }): Promise<any>;
    patch(params: {
        url: string;
        path?: any;
        payload?: any;
        accessToken?: string;
    }): Promise<any>;
    getFullURL(params: {
        baseURL: string;
        url: string;
        path?: any;
        query?: any;
    }): string;
}
