const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      params_name,
      name,
      image,
      type,
      brand,
      price,
      discount,
      rating,
      countInStock,
      description,
    } = req.body;

    if (!discount) {
      req.body.discount = 0;
    }
    if (!rating) {
      req.body.rating = 0;
    }

    if (
      !params_name ||
      !name ||
      !image ||
      !type ||
      !brand ||
      !price ||
      !countInStock ||
      !description
    ) {
      return res.status(400).json({
        status: "input ERR",
        message: "input is required",
      });
    }

    const respond = await ProductService.createProductService(req.body);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "ERR",
      message: error,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const params_name = req.params.params_name;
    const respond = await ProductService.getOneProductService(params_name);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "ERR",
      message: error,
    });
  }
};
const getListProduct = async (req, res) => {
  try {
    const query = {
      type: req.params.type,
      brand: req.query.brand,
      range: req.query.range || [0, Infinity],
      limit: req.headers.limit,
      page: req.query.page || 1,
      sortType: req.query.sort_type || "price",
      sort: req.query.sort || "asc",
    };
    const respond = await ProductService.getListProductService(query);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "ERR",
      message: error,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const query = {
      q: req.query.q,
      page: req.query.page || 1,
      limit: req.headers.limit,
    };
    const respond = await ProductService.searchProductService(query);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "ERR",
      message: error,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const productId = req.params.id;
    const respond = await ProductService.updateProductService(productId, data);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "ERR",
      message: error,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const respond = await ProductService.deleteProductService(productId);
    return res.status(200).json(respond);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "ERR",
      message: error,
    });
  }
};

module.exports = {
  createProduct,
  getOneProduct,
  getListProduct,
  searchProduct,
  updateProduct,
  deleteProduct,
};
