import { writable } from 'svelte/store';

const createAuthStore = () => {
    const { subscribe, set, update } = writable({
        isLoggedIn: false,
        username: null,
    });

    return {
        subscribe,
        checkSession: async () => {
            try {
                // Fetch to check the session status from the backend
                const res = await fetch('http://localhost:8080/api/session', {
                    credentials: 'include' // This is essential for sending the session cookie
                });
                const data = await res.json();
                if (data.isLoggedIn) {
                    set({
                        isLoggedIn: true,
                        username: data.username
                    });
                } else {
                    set({
                        isLoggedIn: false,
                        username: null
                    });
                }
            } catch (error) {
                console.error('Failed to check session status:', error);
                set({
                    isLoggedIn: false,
                    username: null
                });
            }
        },
        login: async (username, password) => {
            const res = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // This is essential for receiving the session cookie
            });

            if (res.ok) {
                // Backend automatically sets the session cookie
                update(state => ({
                    ...state,
                    isLoggedIn: true,
                    username: username
                }));
                return true;
            } else {
                console.error('Login failed');
                return false;
            }
        },
        logout: async () => {
            const res = await fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                credentials: 'include' // This is essential for sending the session cookie
            });

            if (res.ok) {
                set({
                    isLoggedIn: false,
                    username: null
                });
            } else {
                console.error('Logout failed');
            }
        },
    };
};

export default createAuthStore();
