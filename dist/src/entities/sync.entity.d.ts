import { SchoolEntity } from './school.entity';
export declare enum SyncTypeEnum {
    INITIAL = "initial",
    PERIODICAL = "periodical"
}
export declare enum SyncStateEnum {
    PENDING = "pending",
    STOPPED = "stopped",
    FINISHED = "finished"
}
export declare class SyncEntity {
    guid: string;
    school: SchoolEntity;
    usuario?: string;
    turma?: string;
    turmaAluno?: string;
    disciplinaProfesor?: string;
    disciplina?: string;
    periodo?: string;
    type: SyncTypeEnum;
    from?: Date;
    to: Date;
    state?: SyncStateEnum;
    error?: string;
    finishedAt?: Date;
    createdAt: Date;
}
