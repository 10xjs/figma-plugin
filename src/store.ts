import { configureStore } from '@reduxjs/toolkit';

import { variableCollectionsSlice } from './features/variable-collections/variable-collections.slice';
import { variablesSlice } from './features/variables/variables.slice';

export const store = configureStore({
  reducer: {
    variables: variablesSlice.reducer,
    variableCollections: variableCollectionsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
