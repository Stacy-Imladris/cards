import {AppRootStateType} from './store';

export const selectTheme = (state: AppRootStateType) => state.theme.theme

export const selectIsInitialized = (state: AppRootStateType) => state.profile.isInitialized
export const selectUser_id = (state: AppRootStateType) => state.profile.user._id
export const selectProfileEditMode = (state: AppRootStateType) => state.profile.editMode
export const selectProfileUserName = (state: AppRootStateType) => state.profile.user.name
export const selectProfileUser = (state: AppRootStateType) => state.profile.user
export const selectProfileIsFetching = (state: AppRootStateType) => state.profile.isFetching

export const selectIsLoggedIn = (state: AppRootStateType) => state.login.isLoggedIn
export const selectLoginError = (state: AppRootStateType) => state.login.error
export const selectLoginIsLoading = (state: AppRootStateType) => state.login.isLoading

export const selectRegistrationToLogin = (state: AppRootStateType) => state.registration.toLogIn
export const selectRegistrationError = (state: AppRootStateType) => state.registration.error
export const selectRegistrationIsLoading = (state: AppRootStateType) => state.registration.isLoading

export const selectRecoveryCheck = (state: AppRootStateType) => state.recovery.check
export const selectRecoveryError = (state: AppRootStateType) => state.recovery.error
export const selectRecoveryIsLoading = (state: AppRootStateType) => state.recovery.isLoading

export const selectNewPasswordToLogin = (state: AppRootStateType) => state.newPassword.toLogIn
export const selectNewPasswordError = (state: AppRootStateType) => state.newPassword.error
export const selectNewPasswordIsLoading = (state: AppRootStateType) => state.newPassword.isLoading

export const selectPackName = (state: AppRootStateType) => state.cards.packName
export const selectCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectPageForCards = (state: AppRootStateType) => state.cards.params.page
export const selectPageCountForCards = (state: AppRootStateType) => state.cards.params.pageCount
export const selectCardQuestion = (state: AppRootStateType) => state.cards.params.cardQuestion
export const selectCardAnswer = (state: AppRootStateType) => state.cards.params.cardAnswer
export const selectCards = (state: AppRootStateType) => state.cards.cards
export const selectCardsQuestion = (state: AppRootStateType) => state.cards.params.cardQuestion
export const selectCardsAnswer = (state: AppRootStateType) => state.cards.params.cardAnswer
export const selectSortCards = (state: AppRootStateType) => state.cards.params.sortCards
export const selectPackId = (state: AppRootStateType) => state.cards.params.cardsPack_id

export const selectCardPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPageForPacks = (state: AppRootStateType) => state.packs.params.page
export const selectPageCountForPacks = (state: AppRootStateType) => state.packs.params.pageCount
export const selectPackNameForSearch = (state: AppRootStateType) => state.packs.params.packName
export const selectPacks = (state: AppRootStateType) => state.packs.packs
export const selectPackUserId = (state: AppRootStateType) => state.packs.params.user_id
export const selectSortForPacks = (state: AppRootStateType) => state.packs.params.sortPacks
export const selectMinCardsCount = (state: AppRootStateType) => state.packs.minCardsCount
export const selectMaxCardsCount = (state: AppRootStateType) => state.packs.maxCardsCount
export const selectMinForCards = (state: AppRootStateType) => state.packs.params.min
export const selectMaxForCards = (state: AppRootStateType) => state.packs.params.max
export const selectPacksType = (state: AppRootStateType) => state.packs.packsType

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppError = (state: AppRootStateType) => state.app.error
export const selectAppIsLoading = (state: AppRootStateType) => state.app.isLoading

export const selectLearnCards = (state: AppRootStateType) => state.learn.cards
export const selectRandomCard = (state: AppRootStateType) => state.learn.randomCard