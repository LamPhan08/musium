const User = require('../models/User.js');

const getuser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      return res.send(user);
    } catch (error) {
      res.status(500).send("Unable to get user");
    }
  };

  const updateprofile = async (req, res) => {
    const id = req.params.id

    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body},
            { new: true}
        );

        res
        .status(200)
        .json({
            success: true,
            message: "Successfully updated",
            data: updateUser
        });
        
    } catch (error) {
        res
        .status(500)
        .json({
            success: false,
            message: "Failed to update"
        });
    }
  };

  module.exports = {updateprofile, getuser}
  