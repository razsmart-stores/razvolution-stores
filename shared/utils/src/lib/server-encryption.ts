// RUTA: shared/utils/src/lib/server-encryption.ts
/**
 * @file server-encryption.ts
 * @description Utilidad de élite ISOMÓRFICA para encriptación simétrica.
 *              v6.1.0 (Strict Compliance): Alineado con la regla 'noPropertyAccessFromIndexSignature'
 *              para un acceso a 'process.env' de máxima seguridad de tipos.
 * @version 6.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { webcrypto as crypto } from "crypto";

// --- Configuración Soberana ---
// --- [INICIO DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v6.1.0] ---
// Se utiliza la notación de corchetes para cumplir con la regla 'noPropertyAccessFromIndexSignature'.
const ENCRYPTION_KEY = process.env['SUPABASE_JWT_SECRET'];
// --- [FIN DE CORRECCIÓN DE CUMPLIMIENTO ESTRICTO v6.1.0] ---
const IV_LENGTH = 12;
const SALT = "lia-sovereign-salt-for-derivation";
const ITERATIONS = 100000;
const DIGEST = "SHA-512";
const ALGORITHM = "AES-GCM";

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length < 32) {
  throw new Error(
    "CRÍTICO: La variable de entorno 'SUPABASE_JWT_SECRET' es insegura o no está definida."
  );
}

// --- Motor de Criptografía Universal (basado en Web Crypto API) ---

/**
 * @internal
 * @description Deriva una clave criptográfica segura a partir de la variable de entorno.
 * @returns {Promise<CryptoKey>} La clave derivada lista para encriptar/desencriptar.
 */
const getDerivedKey = async (): Promise<CryptoKey> => {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(ENCRYPTION_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(SALT),
      iterations: ITERATIONS,
      hash: DIGEST,
    },
    keyMaterial,
    { name: ALGORITHM, length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

/**
 * @function encryptServerData
 * @description Encripta una cadena de texto utilizando el algoritmo soberano.
 * @param {string} text El texto plano a encriptar.
 * @returns {Promise<string>} Una cadena hexadecimal que representa el texto encriptado (IV + ciphertext).
 * @throws {Error} Si el proceso de encriptación falla.
 */
export const encryptServerData = async (text: string): Promise<string> => {
  try {
    const key = await getDerivedKey();
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const encrypted = await crypto.subtle.encrypt(
      { name: ALGORITHM, iv },
      key,
      new TextEncoder().encode(text)
    );
    const finalBuffer = new Uint8Array(iv.length + encrypted.byteLength);
    finalBuffer.set(iv, 0);
    finalBuffer.set(new Uint8Array(encrypted), iv.length);
    return Buffer.from(finalBuffer).toString("hex");
  } catch (error) {
    throw new Error(
      `La encriptación de datos del servidor falló: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

/**
 * @function decryptServerData
 * @description Desencripta una cadena hexadecimal utilizando el algoritmo soberano.
 * @param {string} hex La cadena hexadecimal encriptada (IV + ciphertext).
 * @returns {Promise<string>} El texto plano original.
 * @throws {Error} Si el proceso de desencriptación falla.
 */
export const decryptServerData = async (hex: string): Promise<string> => {
  try {
    const key = await getDerivedKey();
    const data = Buffer.from(hex, "hex");
    const iv = data.slice(0, IV_LENGTH);
    const encrypted = data.slice(IV_LENGTH);
    const decrypted = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv },
      key,
      encrypted
    );
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error(
      `La desencriptación de datos del servidor falló: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
