function success(req, res, statusCode, body) {
  let obj = {
    error: false,
    status: statusCode || 200,
    body: body || "",
  };

  res.send(obj);
}

function error(req, res, statusCode, body) {
  let obj = {
    error: true,
    status: statusCode || 500,
    body: body || "Internal Server Error",
  };

  res.send(obj);
}

module.exports = {
  error,
  success,
};
