const User = require('./user.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const getUserById = async (id) => {
  const user = await User.findById(id).select('-passwordHash -refreshTokens');
  if (!user) {
    throw new APIError(404, 'User not found.');
  }
  return user;
};

const addAddress = async (userId, addressData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new APIError(404, 'User not found.');
  }

  user.addresses.push(addressData);
  await user.save();
  return user.addresses;
};

const updateAddress = async (userId, addressId, addressData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new APIError(404, 'User not found.');
  }

  const address = user.addresses.id(addressId);
  if (!address) {
    throw new APIError(404, 'Address record not found.');
  }

  address.set(addressData);
  await user.save();
  return user.addresses;
};

const deleteAddress = async (userId, addressId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new APIError(404, 'User not found.');
  }

  const address = user.addresses.id(addressId);
  if (!address) {
    throw new APIError(404, 'Address record not found.');
  }

  address.deleteOne();
  await user.save();
  return user.addresses;
};

module.exports = {
  getUserById,
  addAddress,
  updateAddress,
  deleteAddress
};
