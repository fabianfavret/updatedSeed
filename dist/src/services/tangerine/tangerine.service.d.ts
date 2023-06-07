import { DefaultService } from 'src/defaults/defatul.service';
export declare enum TANGERINE_URL {
    GET_SCHOOL = "/schools",
    POST_SCHOOL = "/schools",
    GET_DISCIPLINE = "/disciplines",
    GET_USER = "/users",
    POST_USER = "/users",
    PUT_USER = "/users/{guid}",
    DELETE_USER = "/users/{guid}",
    GET_LICENSE_SCHOOL = "/licenses/schools",
    POST_LICENSE_SCHOOL = "/licenses/schools",
    PUT_LICENSE_SCHOOL = "/licenses/schools/{guid}",
    GET_SCHOOL_USER = "schools/{guid}/users",
    POST_SCHOOL_USER = "/schools/{guid}/users",
    POST_SCHOOL_GROUP_USERS = "/front/school-admin/{schoolGuid}/groups/{groupGuid}/users",
    DELETE_SCHOOL_GROUP_USERS = "/front/school-admin/{schoolGuid}/groups/{groupGuid}/users",
    GET_EDUCATION_YEAR = "/education-years",
    GET_SCHOOL_GROUP = "/front/school-admin/{guid}/groups",
    POST_SCHOOL_GROUP = "/front/school-admin/{guid}/groups",
    PUT_SCHOOL_GROUP = "/front/school-admin/{guid}/groups",
    DELETE_SCHOOL_GROUP = "/front/school-admin/{guid}/groups",
    POST_LINK_USERS_COURSE = "/front/courses/{courseGuid}/users",
    DELETE_LINK_USERS_COURSE = "/front/courses/{courseGuid}/users",
    PUT_OWNER_USERS_COURSE = "/front/courses/{courseGuid}/users/owner",
    POST_COURSE = "/front/courses",
    GET_COURSE = "/lms/courses",
    DELETE_COURSE = "/lms/courses/{guid}",
    POST_COURSE_USER = "/front/courses/{courseGuid}/users",
    GET_COURSE_USER = "/front/courses/{courseGuid}/users"
}
export declare class TangerineService extends DefaultService {
    private readonly config;
    private readonly httpService;
    private readonly utils;
    constructor();
    private _getAxiosConfig;
    get(params: {
        url: TANGERINE_URL;
        path?: any;
        query?: any;
    }): Promise<any>;
    post(params: {
        url: TANGERINE_URL;
        path?: any;
        payload?: any;
    }): Promise<any>;
    put(params: {
        url: TANGERINE_URL;
        path?: any;
        payload?: any;
    }): Promise<any>;
    delete(params: {
        url: TANGERINE_URL;
        path?: any;
        payload?: any;
    }): Promise<any>;
}
