import { RoleTangerineType } from 'src/types/tangerine.type';
export interface SchoolTangerineInterface {
    guid?: string;
    name?: string;
    address?: string;
}
export interface UserTangerineInterface {
    guid?: string;
    username?: string;
    password?: string;
    name: string;
    role: RoleTangerineType;
}
export interface UserInCourseTangerineInterface {
    person_guid: string;
    is_owner: number;
    role_guid: RoleTangerineType;
    role_name: string;
    name: string;
    lastname: string;
    avatar: string;
    email: string;
    username: string;
    is_active: number;
}
export interface GetUserInCourseTangerineInterface {
    users: UserInCourseTangerineInterface[];
}
export interface GetUserTangerineInterface {
    users: UserTangerineInterface[];
}
export interface GetCourseUserTangerineInterface {
    users: UserTangerineInterface[];
}
export interface GetSchoolTangerineInterface {
    schools: SchoolTangerineInterface[];
}
export interface SchoolYearTangerineInterface {
    guid: string;
    name: string;
    expired_at?: Date;
    is_active?: boolean;
    school_year: string;
    school_guid: string;
}
export interface getSchoolYearTangerineInterface {
    data: SchoolYearTangerineInterface[];
}
export interface GetEducationYearTangerineInterface {
    guid: string;
    education_level_guid: string;
    year: string;
    code: string;
    order: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
export interface SchoolGroupsTangerineInterface {
    guid: string;
    school_guid: string;
    school_name: string;
    name: string;
    code: string;
    is_active: boolean;
    school_year_guid: string;
    school_year_name: string;
    education_year_guid: string;
    education_year_name: string;
    education_level_guid: string;
    education_level_name: string;
}
export interface GetSchoolGroupsTangerineInterface {
    schoolGroups: SchoolGroupsTangerineInterface[];
}
export interface DisciplineTangerineInterface {
    guid: string;
    country_guid: string;
    discipline_id: string;
    code: string;
    discipline: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
export interface GetCourseTangerineInterface {
    courses: CourseTangerineInterface[];
}
export interface CourseTangerineInterface {
    guid: string;
    name: string;
    code: string;
    is_active: boolean;
    has_blueberry: boolean;
    type: string;
    program_guid: string;
    education_year_guid: string;
    education_discipline_guid: string;
}
