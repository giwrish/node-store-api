const Product = require("../model/product");

const getAllProductsStatic = async (req, res) => {
  console.log(req.query);
  const search = "tab";

  const products = await Product.find()
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(5);
  res.status(200).json({ products, total: products.length });
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const {
    name,
    sort,
    fields,
    limit,
    page,
    numeric_filters: numericFilters
  } = req.query;
  const queryFilter = {
    ...req.query
  };
  name && (queryFilter.name = { $regex: name, $options: "i" });
  console.log(queryFilter);

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$lte"
    };

    const regex = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);

    const options = ["price", "range"];

    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryFilter[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryFilter);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    console.log("sortList ", sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    console.log("fieldsList ", fieldsList);
    result = result.select(fieldsList);
  }

  const pageNum = Number(page) || 1;
  const noOfRecords = Number(limit) || 10;
  const skip = (pageNum - 1) * noOfRecords;

  const products = await result.skip(skip).limit(noOfRecords);

  res.status(200).json({ products, total: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic
};

//FILTERS
