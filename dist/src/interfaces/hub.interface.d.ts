import { ObjectHubType, OperacaoHubType, PapelHubType } from 'src/types/hub.type';
export interface QueryGetEventsHubInteface {
    min_date?: string;
    max_date?: string;
    only?: ObjectHubType;
    expect?: ObjectHubType;
    user_id?: string;
}
export interface SchoolHubInterface {
    nome: string;
    cnpj: string;
    endereco: string;
    code: string;
}
export interface GetSchoolHubInterface {
    escolas?: SchoolHubInterface[];
}
export interface GetSchoolEventsHubInterface {
    dados: {
        nome_escola: string;
        cnpj_escola: string;
        app_name: string;
        dat: SchoolEventsHubInterface;
    };
}
export interface UsuarioHubInterface {
    id: string;
    codigo_usuario: string;
    papel: PapelHubType;
    nome_usuario?: string;
}
export interface UsuarioEventHubInterface {
    operacao: OperacaoHubType;
    obj: UsuarioHubInterface;
}
export interface PeriodHubInterface {
    id: string;
    codigo: string;
    status: string;
    titulo: string;
    inicio: Date;
    fim: Date;
    timestamp: Date;
    chave_registro: number;
}
export interface PeriodEventHubInterface {
    operacao: OperacaoHubType;
    obj: PeriodHubInterface;
}
export interface TurmaEventHubInterface {
    operacao: OperacaoHubType;
    obj: TurmaHubInterface;
}
export interface TurmaHubInterface {
    id: string;
    nome_turma: string;
    codigo_turma: string;
    codigo_periodo: string;
    nome_serie: string;
    timestamp: Date;
    chave_registro: number;
}
export interface TurmaAlunoEventHubInterface {
    operacao: OperacaoHubType;
    obj: TurmaAlunoHubInterface;
}
export interface TurmaAlunoHubInterface {
    id_aluno: string;
    codigo_aluno: string;
    id_turma: string;
    codigo_turma: string;
    inicio_periodo: Date;
    fim_periodo: Date;
    codigo_periodo: string;
    timestamp: Date;
    chave_registro: number;
}
export interface DisciplineHubInterface {
    id: string;
    name: string;
    code: string;
    nome_disciplina_base: string;
    mec: string;
    ccc: string;
    timestamp: Date;
    chave_registro: number;
}
export interface DisciplineEventHubInterface {
    operacao: OperacaoHubType;
    obj: DisciplineHubInterface;
}
export interface SchoolEventsHubInterface {
    usuario: UsuarioEventHubInterface[];
    turma: TurmaEventHubInterface[];
    disciplinaProfessor: DisciplinaProfesorEventHubInterface[];
    turmaAluno: TurmaAlunoEventHubInterface[];
    responsavelAluno: any[];
    disciplina: DisciplineEventHubInterface[];
    periodo: PeriodEventHubInterface[];
}
export interface DisciplinaProfesorEventHubInterface {
    operacao: OperacaoHubType;
    obj: DisciplinaProfesorHubInterface;
}
export interface DisciplinaProfesorHubInterface {
    id_professor: string;
    codigo_professor: string;
    id_turma: string;
    codigo_turma: string;
    id_disciplina: string;
    nome_disciplina: string;
    inicio_periodo: Date;
    fim_periodo: Date;
    codigo_periodo: string;
    timestamp: Date;
    chave_registro: number;
}
