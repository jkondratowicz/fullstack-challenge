import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @Index({ fulltext: true })
  @Column('text')
  description: string;

  @Column('simple-array')
  co2EstimateReduction: number[];

  @Column({ default: true })
  isActive: boolean;

  @Column()
  owner: string;

  @Column('simple-array')
  listing: string[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
