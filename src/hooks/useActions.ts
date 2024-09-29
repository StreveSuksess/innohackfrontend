import { projectsActions } from "@/redux/slices/ProjectSlice.ts";
import { userActions } from "@/redux/slices/UserSlice.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


const actions = {
  ...projectsActions,
  ...userActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
