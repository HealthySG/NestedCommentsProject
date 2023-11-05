import { configureStore } from "@reduxjs/toolkit";
import {commentreducer} from "./slices/commentsSlice";

const store=configureStore({
    reducer:{
        comment:commentreducer
    }
});
export {store,commentreducer};