import { IsString } from 'class-validator';

export class CreateCaseDto {
    @IsString()
    readonly content: string;
}
