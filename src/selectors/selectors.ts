import {AppRootStateType} from '../bll/store';

export const selectTheme = (state: AppRootStateType) => state.theme.theme
export const selectPackName = (state: AppRootStateType) => state.cards.packName
export const selectCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectPageForCards = (state: AppRootStateType) => state.cards.params.page
export const selectPageCountForCards = (state: AppRootStateType) => state.cards.params.pageCount
export const selectCardQuestion = (state: AppRootStateType) => state.cards.params.cardQuestion
export const selectCardAnswer = (state: AppRootStateType) => state.cards.params.cardAnswer
export const selectUser_id = (state: AppRootStateType) => state.profile.user._id
export const selectCardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPageForPacks = (state: AppRootStateType) => state.packs.params.page
export const selectPageCountForPacks = (state: AppRootStateType) => state.packs.params.pageCount
export const selectPackNameForSearch = (state: AppRootStateType) => state.packs.params.packName