export type BasicCredential = {
	accessToken: string;
	idToken: string;
	pendingToken?: string;
	providerId: string;
	signInMethod: string;
};
