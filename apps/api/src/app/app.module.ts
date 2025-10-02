import {
    ClassSerializerInterceptor,
    Module,
    ValidationPipe,
} from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { OrmModule } from '@orchestrator/api-orm';
import { AuthModule } from '@orchestrator/api-auth';

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
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        AppResolver,
    ],
})
export class AppModule {}
