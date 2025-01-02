import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export enum ArticleStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({ nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'authorId' })
    author: User;

    @Column({ type: 'enum', enum: ArticleStatus, default: ArticleStatus.PENDING })
    status: ArticleStatus;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'approvedById' })
    approvedBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
