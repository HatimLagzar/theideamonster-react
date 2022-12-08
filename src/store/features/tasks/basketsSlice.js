import {createSlice} from '@reduxjs/toolkit';

export const basketsSlice = createSlice({
  name: 'baskets',
  initialState: {
    baskets: null,
    selectedBasket: null,
    showWriteNewIdeaForm: false,
    showRecordNewIdeaForm: false,
  },
  reducers: {
    setBaskets: (state, action) => {
      state.baskets = action.payload;
    },
    setSelectedBasket: (state, action) => {
      state.selectedBasket = action.payload;
    },
    setShowWriteNewIdeaForm: (state, action) => {
      state.showWriteNewIdeaForm = action.payload
    },
    setShowRecordNewIdeaForm: (state, action) => {
      state.showRecordNewIdeaForm = action.payload
    },
    setTaskStatus: (state, action) => {
      const task = action.payload;
      if (!state.baskets) {
        return;
      }

      const basket = state.baskets.find(basket => basket.id === task.category_id);
      if (!basket) {
        return;
      }

      basket.tasks = basket.tasks.map(item => {
        if (item.id === task.id) {
          item.done = !task.done
        }

        return item;
      })

      state.selectedBasket = basket;
      state.baskets = state.baskets.map(item => {
        if (item.id === task.category_id) {
          item = basket;
        }

        return item;
      });
    },
    setTaskName: (state, action) => {
      const task = action.payload;
      const basket = state.baskets.find(basket => basket.id === task.category_id);
      basket.tasks = basket.tasks.map(item => {
        if (item.id === task.id) {
          item.name = task.name;
        }

        return item;
      })

      state.selectedBasket = basket;
      state.baskets = state.baskets.map(item => {
        if (item.id === task.category_id) {
          item = basket;
        }

        return item;
      });
    }
  },
});

// Action creators are generated for each case reducer function
export const {setBaskets, setSelectedBasket, setShowWriteNewIdeaForm, setShowRecordNewIdeaForm, setTaskStatus, setTaskName} = basketsSlice.actions;

export default basketsSlice.reducer;
