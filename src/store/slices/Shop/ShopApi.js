import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../../axios';

export const getAllShop = createAsyncThunk('shop/getAllShop', async (pageNum, thunkAPI) => {
  // alert('getAllShop');
  try {
    const config = {
      method: 'get',
      url: `shop/product-list?page=${pageNum}`,
    };

    const response = await instance(config);
    console.log(response, 88888888888);
    // alert(333);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getCategoryShop = createAsyncThunk('shop/getCategoryShop', async (_, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: 'shop/product-category',
    };

    const response = await instance(config);
    console.log(response, 777777777);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getMuseumNames = createAsyncThunk('shop/getMuseumNames', async (_, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: 'museum-list',
    };

    const response = await instance(config);
    console.log(response, 666666666);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getSearchesShop = createAsyncThunk(
  'shop/getSearchesShop',
  async (searchText, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `shop/product-list?name=${searchText}`,
      };

      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const getFilteredShop = createAsyncThunk(
  'shop/getFilteredShop',
  async ({ category, museum }, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `shop/product-list?museum_id=${museum}&product_category_id=${category}`,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const getSingleDataShop = createAsyncThunk(
  'shop/getSingleDataShop',
  async (id, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `shop/product/${id}`,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

/////////////api for send backend product//////////////

export const postShopCardData = createAsyncThunk(
  'shop/postShopCardData',
  async (body, thunkAPI) => {
    try {
      const cardData = {
        type: 'product',
        product_id: body.id,
        quantity: 1,
      };
      const config = {
        method: 'post',
        url: `cart/store`,
        data: cardData,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const postSingleShopCardData = createAsyncThunk(
  'shop/postSingleShopCardData',
  async (body, thunkAPI) => {
    try {
      const singleCardData = {
        type: 'product',
        product_id: body.id,
        quantity: body.productCount,
      };
      const config = {
        method: 'post',
        url: `cart/store`,
        data: singleCardData,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

//////////////////delate product//////////////////////////

export const getDelateProductBasket = createAsyncThunk(
  'shop/getDelateProductBasket',
  async (id, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `cart/item/${id}/delete`,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);
/////////////shop icon click modal open///////////////////////

export const getShopIconBasketDatas = createAsyncThunk(
  'shop/getShopIconBasketDatas',
  async (_, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: 'cart/items',
      };

      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);
