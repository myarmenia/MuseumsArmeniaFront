import { createSlice } from '@reduxjs/toolkit';
import {
  getAllShop,
  getCategoryShop,
  getFilteredShop,
  getMuseumNames,
  getSearchesShop,
  getSingleDataShop,
} from './ShopApi';

const initialState = {
  shopAllData: [],
  loading: true,
  categories: [],
  museumes: [],
  singleShopData: [],
};

export const ShopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    //////
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllShop.fulfilled, (state, action) => {
        state.shopAllData = action.payload;
        state.loading = false;
      })
      .addCase(getCategoryShop.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(getMuseumNames.fulfilled, (state, action) => {
        state.museumes = action.payload.data;
        state.loading = false;
      })
      .addCase(getSearchesShop.fulfilled, (state, action) => {
        state.shopAllData = action.payload;
        state.loading = false;
      })
      .addCase(getFilteredShop.fulfilled, (state, action) => {
        state.shopAllData = action.payload;
        state.loading = false;
      })
      .addCase(getSingleDataShop.fulfilled, (state, action) => {
        state.singleShopData = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllShop.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getAllShop.rejected, (state, action) => {
        console.log('chdarav');
      });
  },
});

export const getAllShopDate = (state) => state.shop.shopAllData;
export const getLoadingShop = (state) => state.shop.loading;
export const getCategories = (state) => state.shop.categories;
export const getMuseumsNames = (state) => state.shop.museumes;
export const getSingleShopDatas = (state) => state.shop.singleShopData;

export const ShopReducer = ShopSlice.reducer;
