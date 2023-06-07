"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1672326889195 = void 0;
class migrations1672326889195 {
    constructor() {
        this.name = 'migrations1672326889195';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Sync\` (\`guid\` varchar(38) NOT NULL, \`usuario\` int NOT NULL DEFAULT 0, \`turma\` int NOT NULL DEFAULT 0, \`disciplinaProfesor\` int NOT NULL DEFAULT 0, \`responsabeAluno\` int NOT NULL DEFAULT 0, \`disciplina\` int NOT NULL DEFAULT 0, \`periodo\` int NOT NULL DEFAULT 0, \`beginAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`finishedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Task\` (\`guid\` varchar(38) NOT NULL, \`type\` enum ('all', 'user') NOT NULL DEFAULT 'all', \`syncId\` varchar(38) NULL, \`beginAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`finishedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`Task\``);
        await queryRunner.query(`DROP TABLE \`Sync\``);
    }
}
exports.migrations1672326889195 = migrations1672326889195;
//# sourceMappingURL=1672326889195-migrations.js.map