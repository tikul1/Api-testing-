const products = require("../model/productModel");
//to show product list

const productList = async (req, res) => {
  try {
    const list = await products.find();
    res.status(200).json(list);
  } catch (error) {
    res.json({ msg: "An Error occured" + error });
  }
};

//to show single products using id by get method
const ProductById = async (req, res, next) => {
  try {
    const listById = await products.findById(req.params.id);
    res.json(listById);
  } catch (error) {
    res.json({ msg: "An Error occured: " + error });
  }
};

//to add product details

const productAdd = async (req, res) => {
  try {
    const newProduct = await new products({
      productName: req.body.productName,
      productCatagory: req.body.productCatagory,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.json("Error Occured");
  }
};

//to update product details

const productUpdate = async (req, res) => {
  try {
    const productId = await products.findById(req.body.id);
    Object.assign(productId, req.body);
    await productId.save();
    res.json({ msg: `Product updated sucessfully.` });
  } catch (err) {
    res.json({ msg: "An error occured" + err });
  }
};

const productRemove = async (req, res) => {
  try {
    let productId = req.params.id;
    await products.findByIdAndRemove(productId).then((product) => {
      res.json({ msg: "product removed sucessfully", product });
    });
  } catch (err) {
    res.json({ msg: "An error occured: " + err });
  }
};

module.exports = {
  productList,
  ProductById,
  productRemove,
  productUpdate,
  productAdd,
};
