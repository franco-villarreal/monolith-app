import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:  [
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRootAsync({ useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      database: configService.get('MYSQL_DATABASE_NAME'),
      username: configService.get('MYSQL_USER'),
      password: configService.get('MYSQL_PASSWORD'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    inject: [ConfigService],
    imports:[ConfigModule]}),
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
