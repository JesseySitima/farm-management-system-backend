
import { supabaseAdmin } from "../config/supabase.js";

export const getStockMovements = async () => {
  const { data, error } = await supabaseAdmin
    .from("stock_movements")
    .select(`
      *,
      farms (
        id,
        name,
        farm_code
      ),
      inventory_items (
        id,
        name,
        item_code,
        unit_of_measure
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getStockBalances = async () => {
  const { data, error } = await supabaseAdmin
    .from("stock_movements")
    .select(`
      farm_id,
      inventory_item_id,
      movement_type,
      quantity,
      farms (
        id,
        name,
        farm_code
      ),
      inventory_items (
        id,
        name,
        item_code,
        unit_of_measure,
        minimum_stock_level
      )
    `);

  if (error) throw new Error(error.message);

  const balances = new Map<string, any>();

  for (const movement of data ?? []) {
    const key = `${movement.farm_id}_${movement.inventory_item_id}`;

    if (!balances.has(key)) {
      balances.set(key, {
        farm_id: movement.farm_id,
        inventory_item_id: movement.inventory_item_id,
        farm: movement.farms,
        inventory_item: movement.inventory_items,
        quantity_in: 0,
        quantity_out: 0,
        current_stock: 0,
      });
    }

    const balance = balances.get(key);

    if (
      movement.movement_type === "receipt" ||
      movement.movement_type === "adjustment"
    ) {
      balance.quantity_in += Number(movement.quantity);
    } else {
      balance.quantity_out += Number(movement.quantity);
    }

    balance.current_stock =
      balance.quantity_in - balance.quantity_out;
  }

  return Array.from(balances.values());
};
