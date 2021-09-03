import * as actions from "../actionTypes";

export const fetchSetUserInfo = (user) => {
  return {
      type: actions.FETCH_SET_USER_INFO,
      payload: user
  }
}

export const removeUserInfo = () => {
  return {
    type: actions.REMOVE_USER_INFO
  }
}

