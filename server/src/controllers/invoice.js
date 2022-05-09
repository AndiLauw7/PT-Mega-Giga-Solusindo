const { invoice, product } = require("../../models");

exports.addInvoice = async (req, res) => {
  try {
    console.log(req.user);
    const data = {
      name: req.body.name,
      status: req.body.status,
      idproduct: req.body.idproduct,
    };

    let newInvoice = await invoice.create(data);
    console.log(newInvoice);
    let invoiceData = await invoice.findOne({
      where: {
        id: newInvoice.id,
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
    });
    invoiceData = JSON.parse(JSON.stringify(invoiceData));

    res.send({
      status: "success...",
      data: {
        ...invoiceData,
        // image: process.env.PATH_FILE + productData.image,
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
