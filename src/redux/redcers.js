import { combineReducers } from 'redux';

const initialState = {
  tasks: [],
  user: null,
  categories: []
};

const tasksReducer = (state = initialState.tasks, action) => {
  switch(action.type) {
    case 'SET_TASKS':
      return action.tasks;
    case 'ADD_TASK':
      return [...state, action.task];
    case 'UPDATE_TASK':
      return state.map(task => task.id === action.task.id ? action.task : task);
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.taskId);
    default:
      return state;
  }
};

const userReducer = (state = initialState.user, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

const categoriesReducer = (state = initialState.categories, action) => {
  switch(action.type) {
    case 'SET_CATEGORIES':
      return action.categories;
    case 'ADD_CATEGORY':
      return [...state, action.category];
    default:
      return state;
  }
};

export default combineReducers({
  tasks: tasksReducer,
  user: userReducer,
  categories: categoriesReducer
});
