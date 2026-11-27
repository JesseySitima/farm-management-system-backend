import { supabaseAdmin } from "../config/supabase.js";

export interface CreateProductCollectionData {
  farm_id: string;
  product_id: string;
  livestock_id?: string;
  livestock_flock_id?: string;
  collection_date?: string;
  quantity: number;
  rejected_quantity?: number;
  quality_grade?: string;
  notes?: string;
}

export const createProductCollection = async (
  collectionData: CreateProductCollectionData
) => {
  const {
    farm_id,
    product_id,
    livestock_id,
    livestock_flock_id,
  } = collectionData;

  if (livestock_id && livestock_flock_id) {
    throw new Error(
      "Select either an individual animal or a livestock flock, not both"
    );
  }

  // Validate farm
  const { data: farm, error: farmError } = await supabaseAdmin
    .from("farms")
    .select("id")
    .eq("id", farm_id)
    .eq("is_active", true)
    .single();

  if (farmError || !farm) {
    throw new Error("Farm not found or inactive");
  }

  // Validate product
  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("id", product_id)
    .eq("is_active", true)
    .single();

  if (productError || !product) {
    throw new Error("Product not found or inactive");
  }

  // Validate individual animal, if selected
  if (livestock_id) {
    const { data: livestock, error: livestockError } = await supabaseAdmin
      .from("livestock")
      .select("id")
      .eq("id", livestock_id)
      .eq("farm_id", farm_id)
      .eq("status", "active")
      .single();

    if (livestockError || !livestock) {
      throw new Error(
        "Selected livestock not found, inactive, or does not belong to this farm"
      );
    }
  }

  // Validate flock, if selected
  if (livestock_flock_id) {
    const { data: flock, error: flockError } = await supabaseAdmin
      .from("livestock_flocks")
      .select("id")
      .eq("id", livestock_flock_id)
      .eq("farm_id", farm_id)
      .eq("status", "active")
      .single();

    if (flockError || !flock) {
      throw new Error(
        "Selected flock not found, inactive, or does not belong to this farm"
      );
    }
  }

  const { data, error } = await supabaseAdmin
    .from("product_collections")
    .insert({
      farm_id,
      product_id,
      livestock_id: livestock_id ?? null,
      livestock_flock_id: livestock_flock_id ?? null,
      collection_date: collectionData.collection_date,
      quantity: collectionData.quantity,
      rejected_quantity: collectionData.rejected_quantity ?? 0,
      quality_grade: collectionData.quality_grade ?? null,
      notes: collectionData.notes ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const getProductCollections = async () => {
  const { data, error } = await supabaseAdmin
    .from("product_collections")
    .select(`
      *,
      farms (
        id,
        name,
        farm_code
      ),
      products (
        id,
        name,
        product_code,
        unit_of_measure
      ),
      livestock (
        id,
        animal_code,
        breed,
        sex
      ),
      livestock_flocks (
        id,
        flock_code,
        breed,
        total_quantity
      )
    `)
    .order("collection_date", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};