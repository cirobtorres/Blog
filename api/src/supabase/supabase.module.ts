import { Global, Module } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CLIENT } from "../utils/constants";

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_CLIENT,
      useFactory: () => {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_API_SECRET_KEY;
        return createClient(supabaseUrl, supabaseKey);
      },
    },
  ],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
