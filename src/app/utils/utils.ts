export class Utils {

    static generateUniqueID(): string {
        const timestamp = Date.now().toString(36);
        const randomNum = Math.random().toString(36).slice(2);
        return `${timestamp}-${randomNum}`;
    }
}