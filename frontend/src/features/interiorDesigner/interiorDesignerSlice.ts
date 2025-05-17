import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { InteriorProject, InteriorItem } from '../../types/interiorDesigner';

interface InteriorDesignerState {
  projects: InteriorProject[];
  currentProject: InteriorProject | null;
  selectedItem: InteriorItem | null;
  loading: boolean;
  error: string | null;
  mode: 'view' | 'edit' | 'create';
  availableStyles: string[];
  availableLayouts: string[];
}

const initialState: InteriorDesignerState = {
  projects: [],
  currentProject: null,
  selectedItem: null,
  loading: false,
  error: null,
  mode: 'view',
  availableStyles: [
    'Скандинавский',
    'Современный',
    'Минимализм',
    'Классический',
    'Лофт',
    'Прованс',
    'Эко-стиль',
    'Хай-тек'
  ],
  availableLayouts: [
    'Студия',
    'Однокомнатная',
    'Двухкомнатная',
    'Трехкомнатная',
    'Четырехкомнатная',
    'Пентхаус',
    'Частный дом'
  ]
};

const interiorDesignerSlice = createSlice({
  name: 'interiorDesigner',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<InteriorProject[]>) {
      state.projects = action.payload;
    },
    setCurrentProject(state, action: PayloadAction<InteriorProject | null>) {
      state.currentProject = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<InteriorItem | null>) {
      state.selectedItem = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setMode(state, action: PayloadAction<'view' | 'edit' | 'create'>) {
      state.mode = action.payload;
    },
    addItemToProject(state, action: PayloadAction<InteriorItem>) {
      if (state.currentProject) {
        state.currentProject.items.push(action.payload);
      }
    },
    updateItem(state, action: PayloadAction<InteriorItem>) {
      if (state.currentProject) {
        const index = state.currentProject.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.currentProject.items[index] = action.payload;
        }
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      if (state.currentProject) {
        state.currentProject.items = state.currentProject.items.filter(item => item.id !== action.payload);
      }
    },
    clearCurrentProject(state) {
      state.currentProject = null;
      state.selectedItem = null;
    }
  },
});

export const {
  setProjects,
  setCurrentProject,
  setSelectedItem,
  setLoading,
  setError,
  setMode,
  addItemToProject,
  updateItem,
  removeItem,
  clearCurrentProject
} = interiorDesignerSlice.actions;

export const selectInteriorDesigner = (state: RootState) => state.interiorDesigner;
export const selectProjects = (state: RootState) => state.interiorDesigner.projects;
export const selectCurrentProject = (state: RootState) => state.interiorDesigner.currentProject;
export const selectSelectedItem = (state: RootState) => state.interiorDesigner.selectedItem;
export const selectInteriorDesignerLoading = (state: RootState) => state.interiorDesigner.loading;
export const selectInteriorDesignerError = (state: RootState) => state.interiorDesigner.error;
export const selectMode = (state: RootState) => state.interiorDesigner.mode;
export const selectAvailableStyles = (state: RootState) => state.interiorDesigner.availableStyles;
export const selectAvailableLayouts = (state: RootState) => state.interiorDesigner.availableLayouts;

export default interiorDesignerSlice.reducer;
