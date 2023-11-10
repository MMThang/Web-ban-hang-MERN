const Product = require("../models/ProductModel");

const createProductService = (newProduct) => {
  return new Promise(async (resolve, reject) => {
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
      } = newProduct;

      const checkProduct = await Product.findOne({
        name,
      });

      if (checkProduct !== null) {
        reject({
          status: "replica ERR",
          message: "product is already existed",
        });
      }

      if (
        price < 0 ||
        discount < 0 ||
        discount > 100 ||
        rating < 0 ||
        countInStock < 0
      ) {
        reject({
          status: "value ERR",
          message: "invalid value",
        });
      }

      const createProduct = await Product.create({
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
      });

      if (createProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createProduct,
        });
      } else {
        reject({
          status: "create product ERR",
          message: "create product failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getOneProductService = (params_name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        params_name,
      });

      if (checkProduct === null) {
        reject({
          status: "not found ERR",
          message: "product is not existed",
        });
      }

      if (checkProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: checkProduct,
        });
      } else {
        reject({
          status: "get one product ERR",
          message: "get one product failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getListProductService = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sortObj = {};
      sortObj[query.sortType] = query.sort;
      const totalProduct = await Product.count({ type: query.type });
      const allProduct = await Product.find({ type: query.type });

      const listProduct = await Product.find({
        type: query.type,
        brand: query.brand,
        price: {
          $gte: query.range[0],
          $lte: query.range[1],
        },
      })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit)
        .sort(sortObj);

      const outOfStockProduct = await Product.find({
        countInStock: 0,
      })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit);

      const brandFromUseQuery = [];
      let min = allProduct[0].price;
      let max = allProduct[0].price;
      for (let i = 0; i < allProduct.length; i++) {
        brandFromUseQuery.push(allProduct[i].brand);
        if (min > allProduct[i].price) {
          min = allProduct[i].price;
        }
        if (max < allProduct[i].price) {
          max = allProduct[i].price;
        }
      }
      const brandList = brandFromUseQuery.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      if (listProduct === null) {
        reject({
          status: "not found ERR",
          message: "product is not existed",
        });
      }

      if (listProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: listProduct,
          outOfStock: outOfStockProduct,
          totalProduct,
          brands: brandList,
          priceRange: [min, max],
          currentPage: parseInt(query.page),
          totalPage: Math.ceil(totalProduct / parseInt(query.limit)),
        });
      } else {
        reject({
          status: "get list product ERR",
          message: "get list product failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const searchProductService = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count({
        $text: { $search: query.q },
      });

      const listProduct = await Product.find({
        $text: { $search: query.q },
      })
        .skip((query.page - 1) * query.limit)
        .limit(query.limit);

      if (listProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: listProduct,
          totalProduct,
          currentPage: parseInt(query.page),
          totalPage: Math.ceil(totalProduct / parseInt(query.limit)),
        });
      } else {
        reject({
          status: "get list product ERR",
          message: "get list product failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProductService = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });

      if (checkProduct === null) {
        reject({
          status: "not found ERR",
          message: "product is not existed",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true,
      });
      if (updateProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: updateProduct,
        });
      } else {
        reject({
          status: "update product ERR",
          message: "update product failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProductService = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId,
      });

      if (checkProduct === null) {
        reject({
          status: "not found ERR",
          message: "product is not existed",
        });
      }

      const deleteProduct = await Product.findByIdAndDelete(productId);
      if (deleteProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: deleteProduct,
        });
      } else {
        reject({
          status: "delete product ERR",
          message: "delete product failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProductService,
  getOneProductService,
  getListProductService,
  searchProductService,
  updateProductService,
  deleteProductService,
};
