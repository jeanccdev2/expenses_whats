import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class LogsWebhooks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  function_name: string;

  @Column("text")
  body: string;

  @Column("text")
  response: string;

  @Column({ default: false })
  is_error: boolean;
}
