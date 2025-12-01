import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async ({ page = 1, college = null }, { rejectWithValue }) => {
    try {
      const params = { page };
      if (college) params.college = college;
      const response = await api.get('/materials', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch materials');
    }
  }
);

export const uploadMaterial = createAsyncThunk(
  'materials/uploadMaterial',
  async (materialData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', materialData.title);
      formData.append('description', materialData.description || '');
      formData.append('collegeName', materialData.collegeName);
      formData.append('file', materialData.file);

      const response = await api.post('/materials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.material;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to upload material');
    }
  }
);

export const deleteMaterial = createAsyncThunk(
  'materials/deleteMaterial',
  async (materialId, { rejectWithValue }) => {
    try {
      await api.delete(`/materials/${materialId}`);
      return materialId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete material');
    }
  }
);

const initialState = {
  materials: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
  isLoading: false,
  error: null,
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.materials = action.payload.materials;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(uploadMaterial.fulfilled, (state, action) => {
        state.materials.unshift(action.payload);
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.materials = state.materials.filter(m => m._id !== action.payload);
      });
  },
});

export default materialsSlice.reducer;

