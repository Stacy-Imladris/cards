import {packsActions, PacksActionTypes} from '../bll/packs-reducer';
import {Dispatch} from 'redux';

export const debounce = (dispatch: Dispatch<PacksActionTypes>, title: string) => {
    dispatch(packsActions.setCurrentPage(1))
    dispatch(packsActions.setTitleForSearch(title))
}