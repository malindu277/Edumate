import Purchase from "../models/purchaseSchema.js";

export const createPurchase = async (req, res) => {
  try {
    const purchase = { ...req.body };
    const newPurchase = await Purchase.create(purchase);

    res
      .status(201)
      .json({ message: "Purchase completed successfully", data: newPurchase });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete purchase", error: error.message });
  }
};

export const getAllPurchase = async (req, res) => {
  try {
    await deleteExpiredPurchases();
    const purchases = await Purchase.find().sort({ date: -1 });
    res.status(200).json({ data: purchases });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch purchases", error: error.message });
  }
};

export const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ data: purchase });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch purchase", error: error.message });
  }
};

export const getPurchaseByUid = async (req, res) => {
  try {
    await deleteExpiredPurchases();
    const query = Purchase.find({ userId: req.params.id });

    const purchase = await query.exec();
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ data: purchase });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch purchase", error: error.message });
  }
};

const deleteExpiredPurchases = async () => {
  try {
    const currentDate = new Date();
    const result = await Purchase.deleteMany({
      expiryDate: { $lt: currentDate },
    });
    console.log(`Deleted ${result.deletedCount} expired purchases.`);
  } catch (error) {
    console.error("Error deleting expired purchases:", error);
  }
};

export const updatePurchase = async (req, res) => {
  try {
    const purchase = { ...req.body };

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      purchase,
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json({
      message: "Purchase updated successfully",
      data: updatedPurchase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update purchase", error: error.message });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete purchase", error: error.message });
  }
};
