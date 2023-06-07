export interface GuidArrayInterface {
    guid: string[];
}
export interface SchoolYearInterface {
    guid: string;
    school_year: string;
    school_guid: string;
}
export interface DisciplineInterface {
    guidHub?: string;
    guidTng?: number;
}
export interface CourseInterface {
    guidTurma?: string;
    guidDiscipline?: string;
    guidCourse?: string;
}
export interface SyncProcessInterface {
    insert: number;
    update: number;
    delete: number;
}
