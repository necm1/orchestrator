import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { OrmModule } from '@orchestrator/api-orm';
import { driverConfig } from './constants';

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
        OrmModule,
        GraphQLModule.forRoot(driverConfig),
    ],
    controllers: [AppController],
})
export class AppModule {}
