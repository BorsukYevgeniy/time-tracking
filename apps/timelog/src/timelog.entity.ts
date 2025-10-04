import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Timelog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column()
  userId: number;
}
