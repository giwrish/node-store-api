const notFound = (req, res) => {
  res.status(404).json({ status: "Not Found", status_code: 404 });
};

module.exports = notFound;
