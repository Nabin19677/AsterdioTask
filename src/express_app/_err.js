export default (err, req, res, next) => {
  if (err.code === 11000) {
    return res.json({
      msg: "Duplicate Key. Check Unique Parameters",
      ...err.keyValue,
    });
  } else {
    return res.json({
      msg: err.message,
    });
  }
};
