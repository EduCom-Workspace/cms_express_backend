class NovaCrypt {
    secureKey: number;
    salt: number;

    constructor(SECURE_KEY: number, SALT: number) {
        if (typeof SECURE_KEY !== "number" || typeof SALT !== "number") {
            throw new Error("Both SECURE_KEY and SALT must be numbers.");
        }
        this.secureKey = SECURE_KEY;
        this.salt = SALT === 0 ? 9 : SALT; // Use a default salt value if SALT is 0
    }

    encrypt(content: string): string {
        let encryptedContent = '';
        for (let i = 0; i < content.length; i++) {
            const genSpecCode = (content.charCodeAt(i) + (this.secureKey * this.salt) + this.salt) % 256;
            encryptedContent += String.fromCharCode(genSpecCode);
        }
        return encryptedContent;
    }

    decrypt(encryptedContent: string): string {
        let decryptedContent = '';
        for (let i = 0; i < encryptedContent.length; i++) {
            let decSpecCode = (encryptedContent.charCodeAt(i) - this.salt - (this.secureKey * this.salt)) % 256;
            if (decSpecCode < 0) {
                decSpecCode += 256; // Handle negative values
            }
            decryptedContent += String.fromCharCode(decSpecCode);
        }
        return decryptedContent;
    }
}

export default NovaCrypt;
