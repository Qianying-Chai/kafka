import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import congifIndex from "../pages/Taas/Configure/index";
const store = configureStore({ reducer: reducer });
export default store;
