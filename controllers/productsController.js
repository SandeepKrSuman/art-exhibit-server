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

export { getProducts };
