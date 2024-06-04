export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
    isLogin: boolean;
    error: string;
    onBoardedByStrip: boolean;
    stripAccountId: string;
    stripOnBoardingUrl: string;
}
