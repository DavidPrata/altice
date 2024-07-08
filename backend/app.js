import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

// Countries
app.get("/countries", async (req, res) => {
  const fileContent = await fs.readFile("./data/countries.json");
  const countriesData = JSON.parse(fileContent);
  res.status(200).json({ countries: countriesData });
});

function generateUniqueId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// formData
app.post("/forms", async (req, res) => {
  const newForm = { ...req.body, id: generateUniqueId() };

  console.log(newForm);

  try {
    const fileContent = await fs.readFile("./data/form-data.json", "utf8");
    const formsData = JSON.parse(fileContent);

    formsData.push(newForm);

    console.log("data: ", formsData);

    await fs.writeFile(
      "./data/form-data.json",
      JSON.stringify(formsData, null, 2)
    );
    res
      .status(201)
      .json({ message: "Form submitted successfully", form: newForm });
  } catch (error) {
    console.error("Error writing to formData.json:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while submitting the form" });
  }
});

// countries
app.get("/forms", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/form-data.json");
    const countriesData = JSON.parse(fileContent);
    res.status(200).json(countriesData);
  } catch (error) {
    console.error("Error reading formData.json:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching formData" });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
