import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateSetup1673029858392 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
