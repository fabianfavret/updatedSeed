"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourses1673523366347 = void 0;
class createCourses1673523366347 {
    constructor() {
        this.name = 'createCourses1673523366347';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`Courses\` (\`guidTurma\` varchar(38) NOT NULL, \`guidDiscipline\` varchar(38) NOT NULL, \`guidCourse\` varchar(38) NOT NULL, PRIMARY KEY (\`guidTurma\`, \`guidDiscipline\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`ALTER TABLE \`Syncs\` CHANGE \`to\` \`to\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'`);
        await queryRunner.query(`DROP TABLE \`Courses\``);
    }
}
exports.createCourses1673523366347 = createCourses1673523366347;
//# sourceMappingURL=1673523366347-createCourses.js.map