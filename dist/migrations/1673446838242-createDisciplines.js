"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDisciplines1673446838242 = void 0;
class createDisciplines1673446838242 {
    constructor() {
        this.name = 'createDisciplines1673446838242';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Disciplines\` (\`guidHub\` varchar(38) NOT NULL, \`guidTng\` varchar(38) NOT NULL, PRIMARY KEY (\`guidHub\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`DROP TABLE \`Disciplines\``);
    }
}
exports.createDisciplines1673446838242 = createDisciplines1673446838242;
//# sourceMappingURL=1673446838242-createDisciplines.js.map