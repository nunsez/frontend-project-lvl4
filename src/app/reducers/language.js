/* eslint-disable no-param-reassign */

import 'regenerator-runtime/runtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import i18n from '../utils/i18n.js';

// prettier-ignore
export const setLanguage = createAsyncThunk(
  'setLanguage',
  async ({ language }) => {
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
