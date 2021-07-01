const requestState = {
  processing: {
    requestProcessing: true,
    requestResolved: false,
    requestFailed: false
  },
  resolved: {
    requestProcessing: false,
    requestResolved: true,
    requestFailed: false
  },
  failed: {
    requestProcessing: false,
    requestResolved: false,
    requestFailed: true
  },
  reset: {
    requestProcessing: false,
    requestResolved: false,
    requestFailed: false
  }
};

export default requestState;
