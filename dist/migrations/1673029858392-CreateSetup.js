"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSetup1673029858392 = void 0;
class CreateSetup1673029858392 {
    constructor() {
        this.name = 'CreateSetup1673029858392';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Syncs\` (\`guid\` varchar(38) NOT NULL, \`usuario\` int NOT NULL DEFAULT 0, \`turma\` int NOT NULL DEFAULT 0, \`disciplinaProfesor\` int NOT NULL DEFAULT 0, \`responsabeAluno\` int NOT NULL DEFAULT 0, \`disciplina\` int NOT NULL DEFAULT 0, \`periodo\` int NOT NULL DEFAULT 0, \`type\` enum ('initial', 'periodical') NOT NULL, \`from\` timestamp NULL, \`to\` timestamp NOT NULL, \`finishedAt\` timestamp NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`Syncs\``);
    }
}
exports.CreateSetup1673029858392 = CreateSetup1673029858392;
//# sourceMappingURL=1673029858392-CreateSetup.js.map