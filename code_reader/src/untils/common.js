import store from '../redux/store'
import {clearUserInfo} from '../redux/userSlice'

export const logout = () => {
    store.dispatch(clearUserInfo());
    localStorage.removeItem('token');
}