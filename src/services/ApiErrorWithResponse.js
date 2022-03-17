class ApiErrorWithResponse extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export default ApiErrorWithResponse;
