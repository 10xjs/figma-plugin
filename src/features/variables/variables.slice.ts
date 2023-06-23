import type { PayloadAction } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Variable } from '~/schema';

const variablesAdapter = createEntityAdapter<Variable>();

export const variablesSlice = createSlice({
  name: 'variables',
  initialState: variablesAdapter.getInitialState(),
  reducers: {
    variablesReceived: (
      state,
      action: PayloadAction<{
        variables: Variable[];
      }>
    ) => {
      variablesAdapter.setMany(state, action.payload.variables);
    },
  },
});

export const variablesSelectors = variablesAdapter.getSelectors();
