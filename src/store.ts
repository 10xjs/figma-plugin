import {
  configureStore,
  createActionCreatorInvariantMiddleware,
  Tuple,
} from '@reduxjs/toolkit';

import { variableCollectionsSlice } from './features/variable-collections/variable-collections.slice';
import { variablesSlice } from './features/variables/variables.slice';

/**
 * Middleware that detects if an action creator has been mistakenly dispatched,
 * instead of being called before dispatching.
 *
 * A common mistake is to call dispatch(actionCreator) instead of
 * dispatch(actionCreator()). This tends to "work" as the action creator has the
 * static type property, but can lead to unexpected behaviour.
 *
 * see https://redux-toolkit.js.org/api/actionCreatorMiddleware
 */
const actionCreatorMiddleware = createActionCreatorInvariantMiddleware({
  isActionCreator: (
    action: unknown
  ): action is ((...args: any[]) => any) & { type: unknown } => {
    return typeof action === 'function' && 'type' in action;
  },
});

export const store = configureStore({
  reducer: {
    variables: variablesSlice.reducer,
    variableCollections: variableCollectionsSlice.reducer,
  },
  middleware: new Tuple(actionCreatorMiddleware),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers({
      autoBatch: true,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
