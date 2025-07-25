export class Crypto {
	private static characters =
		"abcdefghijkmnopqrsqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

	/**
	 * Creates a password with letters (uppercase & lowercase) and numbers.
	 * @param length password length
	 */
	public static generatePassword(length = 12) {
		let password = "";

		for (let i = 0; i <= length; i++) {
			const index = Math.floor(
				Math.random() * (Crypto.characters.length - 1) + 1,
			);
			password += Crypto.characters[index];
		}

		return password;
	}
}