import { Module } from "@nestjs/common";
import { PublicationController } from "./publication.controller";
import { PublicationService } from "./publication.service";

@Module({
  imports: [],
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
