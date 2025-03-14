const mongoose = require("mongoose");
require("dotenv").config();
const { ObjectId } = mongoose.Types;

// Import Models
const Users = require("../models/users.model");
const Advertisement = require("../models/advertisement.model");
const Categories = require("../models/advertisementCategories.model");
const Status = require("../models/advertisementStatus.model");
const Types = require("../models/advertisementTypes.model");
const Cities = require("../models/cities.model");
const Cityarea = require("../models/cityarea.model");
const Countries = require("../models/countries.model");
const Provinces = require("../models/provinces.model");
const Roles = require("../models/roles.model");


async function initializeDatabase() {
  try {
    // Clear existing data (optional)
    await Users.deleteMany();
    await Advertisement.deleteMany();
    await Categories.deleteMany();
    await Status.deleteMany();
    await Types.deleteMany();
    await Cities.deleteMany();
    await Cityarea.deleteMany();
    await Countries.deleteMany();
    await Provinces.deleteMany();
    await Roles.deleteMany();

    console.log("Existing data cleared.");

    // Pre-generate ObjectIDs to prevent duplication issues
    const countryId = new ObjectId();
    const provincePunjabId = new ObjectId();
    const provinceSindhId = new ObjectId();
    const cityLahoreId = new ObjectId();
    const cityKarachiId = new ObjectId();
    const cityAreaDHAId = new ObjectId();
    const cityAreaGulbergId = new ObjectId();
    const cityAreaJoharId = new ObjectId();
    const cityAreaCliftonId = new ObjectId();
    const roleAdminId = new ObjectId();
    const roleUserId = new ObjectId();

    // Insert independent data first
    await Roles.insertMany([
      { _id: roleAdminId, name: "Admin" },
      { _id: roleUserId, name: "User" },
    ]);

    await Countries.create({ _id: countryId, name: "Pakistan", code: 92 });

    await Provinces.insertMany([
      { _id: provincePunjabId, name: "Punjab", countryid: countryId },
      { _id: provinceSindhId, name: "Sindh", countryid: countryId },
    ]);

    await Cities.insertMany([
      { _id: cityLahoreId, name: "Lahore", provincesid: provincePunjabId },
      { _id: cityKarachiId, name: "Karachi", provincesid: provinceSindhId },
    ]);

    await Cityarea.insertMany([
      { _id: cityAreaDHAId, name: "DHA", cityid: cityLahoreId },
      { _id: cityAreaGulbergId, name: "Gulberg", cityid: cityLahoreId },
      { _id: cityAreaJoharId, name: "Johar Town", cityid: cityLahoreId },
      { _id: cityAreaCliftonId, name: "Clifton", cityid: cityKarachiId },
    ]);

    const categorySedan = await Categories.create({ name: "Sedan", image: "sedan.jpg", quantity: 50 });
    const categorySUV = await Categories.create({ name: "SUV", image: "suv.jpg", quantity: 30 });
    const categoryHatchback = await Categories.create({ name: "Hatchback", image: "hatchback.jpg", quantity: 80 });

    const statusActive = await Status.create({ name: "Active" });
    const statusPending = await Status.create({ name: "Pending" });

    const typeNew = await Types.create({ name: "New" });
    const typeUsed = await Types.create({ name: "Used" });

    // Insert Users
    const userAli = await Users.create({
      name: "Ali",
      email: "ali@example.com",
      password: "hashedpass",
      birthdate: "1990-05-15",
      contact: [923001234567],
      image: "ali.jpg",
      roles: roleUserId,
    });

    // Insert Advertisements
    await Advertisement.create({
      name: "Honda Civic 2020",
      price: 3500000,
      description: "A well-maintained sedan",
      startson: new Date(),
      endson: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      postedbyid: userAli._id,
      statusid: statusActive._id,
      typeid: typeUsed._id,
      categoryid: categorySedan._id,
      cityid: cityAreaDHAId,
    });

    console.log("Database initialized successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error initializing database:", error);
    mongoose.connection.close();
  }
}

// exports initialization
 module.exports = initializeDatabase;
