import { supabaseAdmin } from "../config/supabase.js";

export interface CreateLivestockFlockData {
  farm_id: string;
  species_id: string;
  flock_code: string;
  breed?: string;
  total_quantity: number;
  male_quantity?: number;
  female_quantity?: number;
  purpose?: string;
  date_established?: string;
  notes?: string;
}

export const createLivestockFlock = async (
  flockData: CreateLivestockFlockData
) => {
  const { data, error } = await supabaseAdmin
    .from("livestock_flocks")
    .insert(flockData)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getLivestockFlocks = async () => {
  const { data, error } = await supabaseAdmin
    .from("livestock_flocks")
    .select(`
      *,
      species (
        id,
        name,
        code,
        management_type
      ),
      farms (
        id,
        name,
        farm_code
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};