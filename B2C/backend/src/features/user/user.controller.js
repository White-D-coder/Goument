const userService = require('./user.service');

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user._id);
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return next(error);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const addresses = await userService.addAddress(req.user._id, req.body);
    return res.status(200).json({
      success: true,
      data: addresses
    });
  } catch (error) {
    return next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const addresses = await userService.updateAddress(
      req.user._id,
      req.params.addressId,
      req.body
    );
    return res.status(200).json({
      success: true,
      data: addresses
    });
  } catch (error) {
    return next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const addresses = await userService.deleteAddress(req.user._id, req.params.addressId);
    return res.status(200).json({
      success: true,
      data: addresses
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  addAddress,
  updateAddress,
  deleteAddress
};
