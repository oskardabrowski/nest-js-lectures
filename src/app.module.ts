import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {
        console.log(process.env.STAGE);
        console.log(process.env);
        console.log(process);
        console.log(ConfigService.get<string>('DB_HOST'));
        console.log(ConfigService.get<number>('DB_PORT'));
        console.log(ConfigService.get<string>('DB_USERNAME'));
        console.log(ConfigService.get<string>('DB_PASSWORD'));
        console.log(ConfigService.get<string>('DB_DATABASE'));

        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: ConfigService.get('DB_HOST'),
          port: ConfigService.get('DB_PORT'),
          username: ConfigService.get('DB_USERNAME'),
          password: ConfigService.get('DB_PASSWORD'),
          database: ConfigService.get('DB_DATABASE'),
        }
      }
    }),

    AuthModule
  ],
})
export class AppModule { }
