import { supabaseAdmin } from "../config/supabase.js";

export interface CreateLivestockData {
  farm_id: string;
  species_id: string;
  animal_code: string;
  breed?: string;
  sex?: "male" | "female" | "unknown";
  date_of_birth?: string;
  acquisition_date?: string;
  acquisition_type?: string;
  notes?: string;
}

export const createLivestock = async (
  livestockData: CreateLivestockData
) => {
  const { data, error } = await supabaseAdmin
    .from("livestock")
    .insert(livestockData)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getLivestock = async () => {
  const { data, error } = await supabaseAdmin
    .from("livestock")
    .select(`
      *,
      species (
        id,
        name,
        code,
        management_type
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};