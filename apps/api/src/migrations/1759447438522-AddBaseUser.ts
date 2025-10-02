import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseUser1759447438522 implements MigrationInterface {
    name = 'AddBaseUser1759447438522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
