import type { PayloadAction } from '@reduxjs/toolkit';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { VariableCollection } from '~/schema';

const variableCollectionsAdapter = createEntityAdapter<VariableCollection>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const variableCollectionsSlice = createSlice({
  name: 'variableCollections',
  initialState: variableCollectionsAdapter.getInitialState(),
  reducers: {
    variableCollectionsReceived: (
      state,
      action: PayloadAction<{
        variableCollections: VariableCollection[];
      }>
    ) => {
      variableCollectionsAdapter.setMany(
        state,
        action.payload.variableCollections
      );
    },
  },
});

export const variableCollectionsSelectors =
  variableCollectionsAdapter.getSelectors();
