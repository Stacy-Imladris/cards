import {RootState} from './store';

export const selectTheme = (state: RootState) => state.theme.theme

export const selectIsInitialized = (state: RootState): boolean => state.profile.isInitialized
export const selectUserId = (state: RootState) => state.profile.user._id
export const selectProfileEditMode = (state: RootState) => state.profile.editMode
export const selectProfileUserName = (state: RootState) => state.profile.user.name
export const selectProfileUser = (state: RootState) => state.profile.user
export const selectProfileIsFetching = (state: RootState) => state.profile.isFetching

export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn
export const selectLoginError = (state: RootState) => state.login.error
export const selectLoginIsLoading = (state: RootState) => state.login.isLoading

export const selectRegistrationToLogin = (state: RootState) => state.registration.toLogIn
export const selectRegistrationError = (state: RootState) => state.registration.error
export const selectRegistrationIsLoading = (state: RootState) => state.registration.isLoading

export const selectRecoveryCheck = (state: RootState) => state.recovery.check
export const selectRecoveryError = (state: RootState) => state.recovery.error
export const selectRecoveryIsLoading = (state: RootState) => state.recovery.isLoading

export const selectNewPasswordToLogin = (state: RootState) => state.newPassword.toLogIn
export const selectNewPasswordError = (state: RootState) => state.newPassword.error
export const selectNewPasswordIsLoading = (state: RootState) => state.newPassword.isLoading

export const selectPackName = (state: RootState) => state.cards.packName
export const selectCardsTotalCount = (state: RootState) => state.cards.cardsTotalCount
export const selectPageForCards = (state: RootState) => state.cards.params.page
export const selectPageCountForCards = (state: RootState) => state.cards.params.pageCount
export const selectCardQuestion = (state: RootState) => state.cards.params.cardQuestion
export const selectCardAnswer = (state: RootState) => state.cards.params.cardAnswer
export const selectCards = (state: RootState) => state.cards.cards
export const selectCardsQuestion = (state: RootState) => state.cards.params.cardQuestion
export const selectCardsAnswer = (state: RootState) => state.cards.params.cardAnswer
export const selectSortCards = (state: RootState) => state.cards.params.sortCards
export const selectPackId = (state: RootState) => state.cards.params.cardsPack_id

export const selectCardPacksTotalCount = (state: RootState) => state.packs.cardPacksTotalCount
export const selectPageForPacks = (state: RootState) => state.packs.params.page
export const selectPageCountForPacks = (state: RootState) => state.packs.params.pageCount
export const selectPackNameForSearch = (state: RootState) => state.packs.params.packName
export const selectPacks = (state: RootState) => state.packs.packs
export const selectPackUserId = (state: RootState) => state.packs.params.user_id
export const selectSortForPacks = (state: RootState) => state.packs.params.sortPacks
export const selectMinCardsCount = (state: RootState) => state.packs.minCardsCount
export const selectMaxCardsCount = (state: RootState) => state.packs.maxCardsCount
export const selectMinForCards = (state: RootState) => state.packs.params.min
export const selectMaxForCards = (state: RootState) => state.packs.params.max
export const selectPacksType = (state: RootState) => state.packs.packsType

export const selectAppStatus = (state: RootState) => state.app.status
export const selectAppError = (state: RootState) => state.app.error
export const selectAppIsLoading = (state: RootState) => state.app.isLoading

export const selectLearnCards = (state: RootState) => state.learn.cards
export const selectRandomCard = (state: RootState) => state.learn.randomCard