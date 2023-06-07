"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroups1673529468226 = void 0;
class createGroups1673529468226 {
    constructor() {
        this.name = 'createGroups1673529468226';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Groups\` (\`guid\` varchar(38) NOT NULL, \`periodoGuid\` varchar(38) NOT NULL, \`educationYearGuid\` varchar(38) NOT NULL, PRIMARY KEY (\`guid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`DROP TABLE \`Groups\``);
    }
}
exports.createGroups1673529468226 = createGroups1673529468226;
//# sourceMappingURL=1673529468226-createGroups.js.map