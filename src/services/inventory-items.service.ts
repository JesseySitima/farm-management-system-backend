
import { supabaseAdmin } from "../config/supabase.js";

export interface CreateInventoryItemData {
  name: string;
  category_id: string;
  unit_of_measure: string;
  minimum_stock_level?: number;
  description?: string;
}

export const createInventoryItem = async (
  itemData: CreateInventoryItemData
) => {
  const { data, error } = await supabaseAdmin
    .from("inventory_items")
    .insert(itemData)
    .select(`
      *,
      inventory_categories (
        id,
        name
      )
    `)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getInventoryItems = async () => {
  const { data, error } = await supabaseAdmin
    .from("inventory_items")
    .select(`
      *,
      inventory_categories (
        id,
        name
      )
    `)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
