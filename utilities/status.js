function createNewStatus(
  status = true,
  message = "Operation was made successfully",
  data = {},
  ...extraData
) {
  return { status, message, data, extraData };
}

module.exports = createNewStatus;
