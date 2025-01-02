import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Article],
      synchronize: true, // Turn off in production
      migrations: [__dirname + '/../migrations/*.{js,ts}'],
      ssl: {
        rejectUnauthorized: false, // Disable strict SSL validation
      },
      logging: true, // Enable logging in production
    }),
    TypeOrmModule.forFeature([User, Article]),
    AuthModule,
    UsersModule,
    ArticlesModule, // Register entities in the module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
