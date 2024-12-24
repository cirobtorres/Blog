import { IsString } from "class-validator";

export class CreatePublicationDTO {
  @IsString()
  title: string;

  @IsString()
  sub_title: string;

  @IsString()
  content: string;
}
