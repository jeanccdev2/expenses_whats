import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Sales extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "Outros" })
  category?: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: "text", nullable: true, default: null })
  description?: string | null;
}
