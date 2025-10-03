import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { OrmModule } from '@orchestrator/api-orm';
import { driverConfig } from './constants';
import { UserModule } from './module/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';
import { AuthModule } from './module/auth/auth.module';
import * as argon2 from 'argon2';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [
        resolve(__dirname, `../../../.env.graphql-api`),
        resolve(__dirname, `../../../.env.api`),
        resolve(__dirname, '../../../.env'),
      ],
      isGlobal: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
      password: process.env.REDIS_PASSWORD,
      ttl: 3600 * 1000,
      isGlobal: true,
    }),
    OrmModule,
    GraphQLModule.forRoot(driverConfig),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor() {
    argon2.hash('test').then((hash) => console.log(hash));
  }
}
