import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: appConfig.host,
      port: appConfig.port,
      username: appConfig.username,
      password: appConfig.password,
      database: appConfig.database,
    }),
    AuthModule
  ],
})
export class AppModule { }
