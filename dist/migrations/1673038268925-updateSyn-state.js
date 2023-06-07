"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSynState1673038268925 = void 0;
class updateSynState1673038268925 {
    constructor() {
        this.name = 'updateSynState1673038268925';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` ADD \`state\` enum ('pending', 'started', 'stopped', 'finished') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` DROP COLUMN \`state\``);
    }
}
exports.updateSynState1673038268925 = updateSynState1673038268925;
//# sourceMappingURL=1673038268925-updateSyn-state.js.map