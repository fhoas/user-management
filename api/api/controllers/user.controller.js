import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import {
  errorHandler
} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export const test = (req, res) => {
  res.json({
    message: "Hello world!",
  });
};

export const updateUser = async (req, res, next) => {
  const role = req.user.role;
  if (req.user._id !== req.params.id && role === "standart") {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, {
        $set: req.body
      }, {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const {
      password,
      ...rest
    } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  if (req.user._id !== req.params.id && req.user.role === "standart")
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await Listing.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    if (req.user.role !== "admin") res.clearCookie("access_token")
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user._id === req.params.id || req.user.role === "admin") {
    try {
      const listings = await Listing.find({
        user: req.params.id,
      });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};


export const getUser = async (req, res, next) => {
  const {
    id
  } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandler(400, 'Invalid User ID!'));
  }

  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(404, 'User not found!'));

    const {
      password,
      ...rest
    } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.user._id
      }
    }).populate({
      path: 'listings',
      select: 'name description createdAt'
    });
    return res.status(200).json(users)
  } catch (error) {
    next(error);
  }
}