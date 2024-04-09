import Stock from "../models/Stock.model.js";

// Obtengo Stocks
export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.send(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtengo una Stock
export const getStock = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await Stock.findOne({ where: { symbol: symbol } });
    if (!stock) {
      res.send({});
    } else {
      res.send(stock);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
