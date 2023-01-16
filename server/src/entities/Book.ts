import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
    @Field((_type) => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    text!: string;

    @Field()
    @CreateDateColumn()
    createAt: Date;

    @Field()
    @UpdateDateColumn()
    updateAt: Date;
}
