import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SupabaseModule } from "./supabase/supabase.module";
import { PublicationModule } from "./publication/publication.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.local",
    }),
    SupabaseModule,
    forwardRef(() => PublicationModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
