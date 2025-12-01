import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchCertifications = createAsyncThunk(
  'certifications/fetchCertifications',
  async ({ userId = null, page = 1 }, { rejectWithValue }) => {
    try {
      const params = { page };
      if (userId) params.userId = userId;
      const response = await api.get('/certifications', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch certifications');
    }
  }
);

export const createCertification = createAsyncThunk(
  'certifications/createCertification',
  async (certData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', certData.title);
      formData.append('organization', certData.organization);
      formData.append('issueDate', certData.issueDate);
      if (certData.credentialUrl) formData.append('credentialUrl', certData.credentialUrl);
      if (certData.description) formData.append('description', certData.description);
      if (certData.file) formData.append('file', certData.file);

      const response = await api.post('/certifications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.certification;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create certification');
    }
  }
);

export const deleteCertification = createAsyncThunk(
  'certifications/deleteCertification',
  async (certId, { rejectWithValue }) => {
    try {
      await api.delete(`/certifications/${certId}`);
      return certId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete certification');
    }
  }
);

const initialState = {
  certifications: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  isLoading: false,
  error: null,
};

const certificationsSlice = createSlice({
  name: 'certifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCertifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certifications = action.payload.certifications;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCertifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCertification.fulfilled, (state, action) => {
        state.certifications.unshift(action.payload);
      })
      .addCase(deleteCertification.fulfilled, (state, action) => {
        state.certifications = state.certifications.filter(c => c._id !== action.payload);
      });
  },
});

export default certificationsSlice.reducer;

