
import { supabaseAdmin } from "../config/supabase.js";

export interface CreateInventoryCategoryData {
  name: string;
  description?: string;
}

export const createInventoryCategory = async (
  categoryData: CreateInventoryCategoryData
) => {
  const { data, error } = await supabaseAdmin
    .from("inventory_categories")
    .insert(categoryData)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getInventoryCategories = async () => {
  const { data, error } = await supabaseAdmin
    .from("inventory_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
