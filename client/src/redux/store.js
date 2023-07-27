import { createStore } from 'redux';
import reducers from './reducer';

//store공간을 생성한 다음 reducer가 반환된 전역 데이터 저장
const store = createStore(reducers);
export default store;
