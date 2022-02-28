import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './schemas/case.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }])],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService]
})
export class CasesModule {}
