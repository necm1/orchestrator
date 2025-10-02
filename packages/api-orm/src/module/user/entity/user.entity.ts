import {
    Field,
    ObjectType,
    ID,
    HideField,
    GraphQLISODateTime,
} from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    name: string;

    @HideField()
    @Column({ select: false })
    @Exclude()
    password: string;

    @Field(() => GraphQLISODateTime)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    @UpdateDateColumn()
    @Exclude({ toPlainOnly: true })
    updatedAt: Date;
}
