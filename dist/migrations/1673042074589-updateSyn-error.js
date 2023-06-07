"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSynError1673042074589 = void 0;
class updateSynError1673042074589 {
    constructor() {
        this.name = 'updateSynError1673042074589';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` ADD \`error\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` DROP COLUMN \`error\``);
    }
}
exports.updateSynError1673042074589 = updateSynError1673042074589;
//# sourceMappingURL=1673042074589-updateSyn-error.js.map