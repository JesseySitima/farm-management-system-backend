
import { supabaseAdmin } from "../config/supabase.js";

export interface StockReceiptItemData {
  inventory_item_id: string;
  quantity: number;
  unit_cost?: number;
}

export interface CreateStockReceiptData {
  farm_id: string;
  supplier_id: string;
  received_date?: string;
  supplier_reference?: string;
  notes?: string;
  items: StockReceiptItemData[];
}

export const createStockReceipt = async (
  receiptData: CreateStockReceiptData
) => {
  const { data, error } = await supabaseAdmin.rpc(
    "create_stock_receipt",
    {
      p_farm_id: receiptData.farm_id,
      p_supplier_id: receiptData.supplier_id,
      p_received_date: receiptData.received_date ?? null,
      p_supplier_reference: receiptData.supplier_reference ?? null,
      p_notes: receiptData.notes ?? null,
      p_items: receiptData.items,
    }
  );

  if (error) throw new Error(error.message);

  return data;
};

export const getStockReceipts = async () => {
  const { data, error } = await supabaseAdmin
    .from("stock_receipts")
    .select(`
      *,
      farms (
        id,
        name,
        farm_code
      ),
      suppliers (
        id,
        name,
        supplier_code
      ),
      stock_receipt_items (
        *,
        inventory_items (
          id,
          name,
          item_code,
          unit_of_measure
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};
