import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { CreatePublicationDTO } from "./dto/create-publication.dto";

@Controller("api/publication")
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post("save")
  @HttpCode(201)
  async publicationSave(@Body() body: CreatePublicationDTO) {
    return this.publicationService.publicationSave({ ...body });
  }
}
