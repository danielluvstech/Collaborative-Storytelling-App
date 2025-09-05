import { apiRequest } from "../../api/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Example: delete a story
export const deleteStory = createAsyncThunk<
  { storyId: number },
  number,
  { state: RootState }
>("stories/deleteStory", async (storyId, { getState }) => {
  const token = getState().auth.accessToken;
  await apiRequest(`/api/stories/${storyId}`, { method: "DELETE" }, token || undefined);
  return { storyId };
});

type Story = { id: number; title: string; content: string };

interface StoriesState {
  items: Story[];
}

const initialState: StoriesState = { items: [] };

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteStory.fulfilled, (state, action) => {
      state.items = state.items.filter((s) => s.id !== action.payload.storyId);
    });
  },
});

export default storiesSlice.reducer;
