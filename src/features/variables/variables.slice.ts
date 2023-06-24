import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createEntityAdapter,
  createSlice,
  prepareAutoBatched,
} from '@reduxjs/toolkit';

import { Variable } from '~/schema';

const variablesAdapter = createEntityAdapter<Variable>();

export const variablesSlice = createSlice({
  name: 'variables',
  initialState: variablesAdapter.getInitialState(),
  reducers: {
    variablesReceived: {
      reducer: (state, action: PayloadAction<{ variables: Variable[] }>) => {
        variablesAdapter.setMany(state, action.payload.variables);
      },

      prepare: prepareAutoBatched<{ variables: Variable[] }>(),
    },
  },
});

export const variablesSelectors = variablesAdapter.getSelectors();
