import { Router } from "express";
import authRouter from "./auth.routes.js";
import rolesRouter from "./roles.routes.js";
import usersRouter from "./users.routes.js";
import farmsRouter from "./farms.routes.js";
import speciesRouter from "./species.routes.js";
import livestockRouter from "./livestock.routes.js";
import livestockFlocksRouter from "./livestock-flocks.routes.js";
import inventoryCategoriesRouter from "./inventory-categories.routes.js";
import inventoryItemsRouter from "./inventory-items.routes.js";
import suppliersRouter from "./suppliers.routes.js";
import stockReceiptsRouter from "./stock-receipts.routes.js";
import stockMovementsRouter from "./stock-movements.routes.js";
import productsRouter from "./products.routes.js";
import productCollectionsRouter from "./product-collections.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Farm Management API",
    version: "1.0.0",
  });
});

router.use("/auth", authRouter);
router.use("/roles", rolesRouter);
router.use("/users", usersRouter);
router.use("/farms", farmsRouter);
router.use("/livestock", livestockRouter);
router.use("/livestock-flocks", livestockFlocksRouter);
router.use("/species", speciesRouter);
router.use("/inventory-categories", inventoryCategoriesRouter);
router.use("/inventory-items", inventoryItemsRouter);
router.use("/suppliers", suppliersRouter);
router.use("/stock-receipts", stockReceiptsRouter);
router.use("/stock-movements", stockMovementsRouter);
router.use("/products", productsRouter);
router.use("/product-collections", productCollectionsRouter);

export default router;