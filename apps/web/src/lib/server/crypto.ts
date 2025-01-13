import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptPromise = promisify(scrypt);

const keyLemgth = 32;
export async function hash(password: string) {
	const salt = randomBytes(16).toString('hex');
	const derivedKey = await scryptPromise(password, salt, keyLemgth);
	return salt + ':' + (derivedKey as Buffer).toString('hex');
}

export async function verify(password: string, hash: string) {
	const [salt, key] = hash.split(':');
	const keyBuffer = Buffer.from(key, 'hex');
	const derivedKey = await scryptPromise(password, salt, keyLemgth);
	return timingSafeEqual(keyBuffer, derivedKey as Buffer);
}

// const password = 'password';
// const hashedPassword = await hash(password);
// console.log(hashedPassword);
// console.log(await verify(password, hashedPassword));
