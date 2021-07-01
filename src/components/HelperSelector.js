export const HelperSelector = state => ({
    getuserData: () => {
      return { data: state && state.user ? state.user : {}};
    },
    getuserRequestState: () => {
      return state.getuserRequestState || {};
    },
  });
  
  export default HelperSelector;
  