import MyRedux  from '@/libs/redux';
import taskReducer from './reducers/taskReducer';

const store = MyRedux.createStore(taskReducer);

export default store;