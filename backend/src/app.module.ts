import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';
import { ConditionsModule } from './conditions/conditions.module';

const CONFIG_MODULE_OPTIONS = {
  envFilePath: '.env.development',
};

const mongooseFactory = (configService: ConfigService) => {
  const host = configService.get('APP_HOST');
  const user = configService.get('DB_USER');
  const pass = configService.get('DB_PASS');
  const port = configService.get('DB_PORT');
  const name = configService.get('DB_NAME');

  return {
    uri: `mongodb://${user}:${pass}@${host}:${port}`,
    dbName: name
  }
};

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
      ],
      useFactory: mongooseFactory,
      inject: [ConfigService]
    }),
    CasesModule,
    ConditionsModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
