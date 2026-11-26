import { supabaseAdmin } from "../config/supabase.js";

export interface CreateFarmData {
  name: string;
  farm_code: string;
  description?: string;
  location: string;
  district?: string;
  region?: string;
  size?: number;
  size_unit?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
}

export const createFarm = async (farmData: CreateFarmData) => {
  const { data, error } = await supabaseAdmin
    .from("farms")
    .insert(farmData)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getFarms = async () => {
  const { data, error } = await supabaseAdmin
    .from("farms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};