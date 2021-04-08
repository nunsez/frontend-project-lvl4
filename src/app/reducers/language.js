/* eslint-disable no-param-reassign */

import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// prettier-ignore
export const setLanguage = createAsyncThunk(
  'setLanguage',
  async ({ i18n, language }) => {
    await i18n.changeLanguage(language);
  },
);

const languageSlice = createSlice({
  name: 'languageInfo',
  initialState: {
    activeLanguage: null,
    avaibleLanguages: [],
  },
  extraReducers: {
    [setLanguage.fulfilled]: (state, { meta: { arg } }) => {
      state.activeLanguage = arg.language;
    },
  },
});

export default languageSlice.reducer;
