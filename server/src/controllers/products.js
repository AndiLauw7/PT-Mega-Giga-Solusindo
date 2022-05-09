const { product, user, cat, vendor } = require("../../models");

exports.addProduct = async (req, res) => {
  try {
    console.log(req.user);
    const data = {
      name: req.body.name,
      image: req.file.filename,
      price: req.body.price,
      qty: req.body.qty,
      iduser: req.user.id,
      idcat: req.body.idcat,
      idvendor: req.body.idvendor,
    };

    let newProduct = await product.create(data);
    console.log(newProduct);
    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: cat,
          as: "cat",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: vendor,
          as: "vendor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.send({
      status: "success...",
      data: {
        ...productData,
        image: process.env.PATH_FILE + productData.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: cat,
          as: "cat",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: vendor,
          as: "vendor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return { ...item, image: process.env.PATH_FILE + item.image };
    });
    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: cat,
          as: "cat",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: vendor,
          as: "vendor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await product.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // let { idcat } = req.body;
    // idcat = await idcat.split(",");
    // let { idvendor } = req.params;
    // idvendor = await idvendor.split(",");

    let data = {
      name: req?.body?.name,
      image: req?.file?.filename,
      price: req?.body?.price,
      qty: req?.body?.qty,
      iduser: req?.user?.id,
      idcat: req?.cat?.idcat,
      idvendor: req?.vendor?.idvendor,
    };

    // let productCategoryData = [];
    // if (categoryId != 0 && categoryId[0] != "") {
    //   productCategoryData = categoryId.map((item) => {
    //     return { idcat: parseInt(item) };
    //   });
    // }

    // if (productCategoryData.length != 0) {
    //   await productCategory.bulkCreate(productCategoryData);
    // }

    // let productVendorId = [];
    // if (categoryId != 0 && categoryId[0] != "") {
    //   productVendorId = categoryId.map((item) => {
    //     return { idvendor: parseInt(item) };
    //   });
    // }

    // if (productVendorId.length != 0) {
    //   await productVendorId.bulkCreate(productVendorId);
    // }
    await product.update(data, {
      where: {
        id,
      },
    });

    let productData = await product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: cat,
          as: "cat",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: vendor,
          as: "vendor",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
    });

    res.send({
      status: "success",
      data: {
        id,
        data,
        productData,
        // productCategoryData,
        // productVendorId,
        image: req?.file?.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
