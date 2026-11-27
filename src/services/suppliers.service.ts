
import { supabaseAdmin } from "../config/supabase.js";

export interface CreateSupplierData {
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
}

export const createSupplier = async (
  supplierData: CreateSupplierData
) => {
  const { data, error } = await supabaseAdmin
    .from("suppliers")
    .insert(supplierData)
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getSuppliers = async () => {
  const { data, error } = await supabaseAdmin
    .from("suppliers")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
