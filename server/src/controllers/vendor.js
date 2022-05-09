const { vendor } = require("../../models");

exports.addVendor = async (req, res) => {
  try {
    const newVendor = await vendor.create(req.body);

    res.send({
      status: "success...",
      data: {
        id: newVendor.id,
        name: newVendor.name,
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

exports.updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const newVendor = await vendor.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success...",
      data: {
        id: newVendor.id,
        name: newVendor.name,
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
exports.deletevendor = async (req, res) => {
  try {
    const { id } = req.params;

    await vendor.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete category id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const data = await vendor.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await vendor.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
