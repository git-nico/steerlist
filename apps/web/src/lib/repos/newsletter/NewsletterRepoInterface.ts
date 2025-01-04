export interface UsersNewsletterRepoInterface {
	subscribe: (email: string) => Promise<void>;
}
