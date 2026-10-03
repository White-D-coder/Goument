const { generateSignature } = require('../../shared/utils/cloudinary');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const signUpload = async (req, res, next) => {
  try {
    const { folder } = req.body;
    if (!folder) {
      throw new APIError(400, 'Folder destination is required.');
    }

    // Force base prefix on server-side to prevent namespace pollution
    const fullFolder = `gourmet-gem/${folder}`;
    const signatureDetails = generateSignature({ folder: fullFolder });

    return res.status(200).json({
      success: true,
      data: {
        ...signatureDetails,
        folder: fullFolder
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signUpload
};
