import { data } from "../utils/data.js";

const getProducts = (req, res) => {
  try {
    const prods = data;
    return res.status(200).json(prods);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

const getSingleProduct = (req, res) => {
  try {
    const { prodid } = req.body;
    const product = data.find((prod) => prod.id === parseInt(prodid));
    if (product) {
      return res.status(200).json(product);
    }
    return res
      .status(200)
      .json({ error: true, errorMsg: "Product Not Found." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, errorMsg: "Internal Server Error!" });
  }
};

export { getProducts, getSingleProduct };
