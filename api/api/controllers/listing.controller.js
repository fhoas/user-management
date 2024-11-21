import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

export const createListing = async (req, res, next) => {
  try {
    const listingData = {
      ...req.body,
      user: req.body.userId || req.user._id,
    };

    const listing = await Listing.create(listingData);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(400, "Invalid listing ID"));
  }
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listig not found!"));
  }
  if (req.user._id !== listing.userRef && req.user.role === "standart") {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);

    return res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(400, "Invalid listing ID"));
  }
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "List not found!"));
  }
  if (req.user._id !== listing.userRef && req.user.role === "standart") {
    return next(errorHandler(401, "You can only update your own listings!"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(errorHandler(400, "Invalid listing ID!"));
  }
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "asc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
