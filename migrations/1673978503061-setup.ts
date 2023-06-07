import { MigrationInterface, QueryRunner } from "typeorm";

export class setup1673978503061 implements MigrationInterface {
    name = 'setup1673978503061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Courses\` (\`guidTurma\` varchar(38) NOT NULL, \`guidDiscipline\` varchar(38) NOT NULL, \`guidCourse\` varchar(38) NOT NULL, PRIMARY KEY (\`guidTurma\`, \`guidDiscipline\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Disciplines\` (\`guidHub\` varchar(38) NOT NULL, \`guidTng\` varchar(38) NOT NULL, PRIMARY KEY (\`guidHub\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Schools\` (\`guid\` varchar(38) NOT NULL, \`name\` varchar(200) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Syncs\` (\`guid\` varchar(38) NOT NULL, \`usuario\` varchar(255) NULL, \`turma\` varchar(255) NULL, \`turmaAluno\` varchar(255) NULL, \`disciplinaProfesor\` varchar(255) NULL, \`disciplina\` varchar(255) NULL, \`periodo\` varchar(255) NULL, \`type\` enum ('initial', 'periodical') NOT NULL, \`from\` timestamp NULL, \`to\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`state\` enum ('pending', 'stopped', 'finished') NOT NULL DEFAULT 'pending', \`error\` text NULL, \`finishedAt\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`schoolGuid\` varchar(38) NOT NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Groups\` (\`guid\` varchar(38) NOT NULL, \`periodoGuid\` varchar(38) NOT NULL, \`educationYearGuid\` varchar(38) NOT NULL, \`name\` varchar(200) NOT NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` ADD CONSTRAINT \`sincs_schools_fk\` FOREIGN KEY (\`schoolGuid\`) REFERENCES \`Schools\`(\`guid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Syncs\` DROP FOREIGN KEY \`sincs_schools_fk\``);
        await queryRunner.query(`DROP TABLE \`Groups\``);
        await queryRunner.query(`DROP TABLE \`Syncs\``);
        await queryRunner.query(`DROP TABLE \`Schools\``);
        await queryRunner.query(`DROP TABLE \`Disciplines\``);
        await queryRunner.query(`DROP TABLE \`Courses\``);
    }

}
