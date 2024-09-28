import { projectsActions } from "@/redux/slices/ProjectSlice.ts";
import { tasksActions } from "@/redux/slices/TaskSlice.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


const actions = {
  ...projectsActions,
  ...tasksActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
