import { supabaseAdmin } from "../config/supabase.js";

export const getStockMovements = async () => {
  const { data, error } = await supabaseAdmin
    .from("stock_movements")
    .select(
      `
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
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const getStockBalances = async () => {
  const { data, error } = await supabaseAdmin.from("stock_movements").select(`
      farm_id,
      inventory_item_id,
     movement_type,
adjustment_direction,
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
      (movement.movement_type === "adjustment" &&
        movement.adjustment_direction === "increase")
    ) {
      balance.quantity_in += Number(movement.quantity);
    } else {
      balance.quantity_out += Number(movement.quantity);
    }

    balance.current_stock = balance.quantity_in - balance.quantity_out;
  }

  return Array.from(balances.values());
};

export interface CreateStockIssueData {
  farm_id: string;
  inventory_item_id: string;
  quantity: number;
  movement_date?: string;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
}

export const createStockIssue = async (issueData: CreateStockIssueData) => {
  const { data, error } = await supabaseAdmin.rpc("create_stock_issue", {
    p_farm_id: issueData.farm_id,
    p_inventory_item_id: issueData.inventory_item_id,
    p_quantity: issueData.quantity,
    p_movement_date: issueData.movement_date ?? null,
    p_reference_type: issueData.reference_type ?? null,
    p_reference_id: issueData.reference_id ?? null,
    p_notes: issueData.notes ?? null,
  });

  if (error) throw new Error(error.message);

  return data;
};


export interface CreateStockAdjustmentData {
  farm_id: string;
  inventory_item_id: string;
  quantity: number;
  adjustment_direction: "increase" | "decrease";
  reason: string;
  movement_date?: string;
}

export const createStockAdjustment = async (
  adjustmentData: CreateStockAdjustmentData
) => {
  const { data, error } = await supabaseAdmin.rpc(
    "create_stock_adjustment",
    {
      p_farm_id: adjustmentData.farm_id,
      p_inventory_item_id: adjustmentData.inventory_item_id,
      p_quantity: adjustmentData.quantity,
      p_adjustment_direction: adjustmentData.adjustment_direction,
      p_reason: adjustmentData.reason,
      p_movement_date: adjustmentData.movement_date ?? null,
    }
  );

  if (error) throw new Error(error.message);

  return data;
};

