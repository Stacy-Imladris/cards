import {
    packsActions,
    PacksActionTypes,
    SortOrderType,
    SortValuesType
} from '../bll/packs-reducer';
import {Dispatch} from 'redux';

export const setSortValuesToStore = (dispatch: Dispatch<PacksActionTypes>, sortValue: SortOrderType, sortField: SortValuesType) => {
    dispatch(packsActions.setSortParameters(sortValue + sortField))
}