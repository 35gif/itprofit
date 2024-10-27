export class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async sendForm(data) {
        try {
            const response = await fetch(`${this.baseUrl}/api/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async ping() {
        try {
            const response = await fetch(`${this.baseUrl}/api/ping`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}