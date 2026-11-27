import { supabaseAdmin } from "../config/supabase.js";

export interface CreateProductData {
  name: string;
  unit_of_measure: string;
  description?: string;
}

export const createProduct = async (productData: CreateProductData) => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      name: productData.name,
      unit_of_measure: productData.unit_of_measure,
      description: productData.description ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getProducts = async () => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};