import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum AppealStatus {
  PENDING = "pending",
  IN_PROGRESS = "В процессе",
  COMPLETED = "Завершено",
  CANCELED = "Отменено",
}

@Entity()
export class Appeal {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "enum", enum: AppealStatus, default: AppealStatus.PENDING })
  status: AppealStatus;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;
  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;

  @Column({ type: "text", nullable: true })
  resolution: string;
}
