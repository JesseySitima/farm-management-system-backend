import { supabaseAdmin } from "../config/supabase.js";

export interface CreateSpeciesData {
  name: string;
  code: string;
  management_type: "individual" | "flock";
  description?: string;
}

export const createSpecies = async (
  speciesData: CreateSpeciesData
) => {
  const { data, error } = await supabaseAdmin
    .from("species")
    .insert(speciesData)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getSpecies = async () => {
  const { data, error } = await supabaseAdmin
    .from("species")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};