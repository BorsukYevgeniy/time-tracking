import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '@contracts/users'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.USER })
  role: string;
}
