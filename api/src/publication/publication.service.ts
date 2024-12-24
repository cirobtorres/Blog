import { Inject, Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "../utils/constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreatePublicationDTO } from "./dto/create-publication.dto";
import { slugify } from "../utils/functions";

@Injectable()
export class PublicationService {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient
  ) {}

  async publicationSave({
    title,
    sub_title,
    content,
  }: {
    title: string;
    sub_title: string;
    content: string;
  }) {
    const { data, error } = await this.supabaseClient
      .from("publication")
      .insert([
        {
          title,
          slug: slugify(title),
          sub_title,
          content,
        },
      ])
      .select()
      .single();
    return data;
  }
}
