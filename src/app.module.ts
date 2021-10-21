import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphdemoModule } from './graphdemo/graphdemo.module';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { LessonResolver } from './lesson/lesson.resolver';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({ envFilePath: [`.env.stage.${process.env.STAGE}`] }),

    // BlogModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',

          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
        }
      }
    }),



    // TypeOrmModule.forRoot({

    //   type: 'sqlite',


    //   database: ':memory:',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true

    // }),


    // }),
    // AuthModule,
    // GraphdemoModule,
    LessonModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
