import {
    GET_USER_REQUEST_MADE,
    GET_USER_RESOLVED,
    GET_USER_FAILED
  } from '../../constant';
  import requestState from '../../utils/request';
  
  
  const submitGetUserRequestMadeResolver = (state = {}, payload = {}) => {
    return {
      ...state,
      getUserRequestState: {
        ...requestState.processing,
      },
    };
  };
  
  const submitGetUserRequestResolvedResolver= (state = {}, payload) => {
    return {
      ...state,
      getUserRequestState: {
        ...requestState.resolved,
      },
      user: payload.results
    };
  };
  
  const submitGetUserRequestFailedResolver = (state = {}, payload = {}) => {
    return {
      ...state,
      getUserRequestState: {
        ...requestState.failed,
      },
      ...payload,
    };
  };

  const resetState = (state = {}) => {
    return {
      ...state,
      getUserRequestState: {},
      user: {}
    };
  };
  
  const actionToResolverMap = {
    [GET_USER_REQUEST_MADE]: submitGetUserRequestMadeResolver,
    [GET_USER_RESOLVED]: submitGetUserRequestResolvedResolver,
    [GET_USER_FAILED]: submitGetUserRequestFailedResolver,
  };
  
  export default (state = {}, action = {}) => {
    const resolver = actionToResolverMap[action.type];
    return (resolver && resolver(state, action.payload)) || state;
  };
  