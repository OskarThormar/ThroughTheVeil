<script>
    import authStore from '../../../util/authStore.js';
    import { navigate } from 'svelte-routing';

    let username = '';
    let password = '';
    let loginError = false;

    async function handleLogin(event) {
        event.preventDefault();
        loginError = false;

        const success = await authStore.login(username, password);
        if (success) {
            navigate('/', { replace: true });
        } else {
            loginError = true;
        }
    }
</script>

<div class="flex items-center justify-center h-full px-4">
    {#if $authStore.isLoggedIn}
        <div class="p-6 max-w-4xl mx-auto text-white rounded-xl shadow-lg mt-10">
            <h1 class="text-4xl font-extrabold text-center text-indigo-400 mb-6">
                Welcome, {$authStore.username}!
            </h1>
        </div>
    {:else}
        <!-- Login Form -->
        <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
            <h2 class="text-3xl font-bold text-white text-center mb-6">Login</h2>
            <form on:submit={handleLogin}>
                <div class="mb-6">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-300">Your username</label>
                    <input type="text" id="username" bind:value={username} class="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="admin" required>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-300">Your password</label>
                    <input type="password" id="password" bind:value={password} class="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                </div>
                {#if loginError}
                    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                        <span class="font-medium">Error!</span> Invalid username or password.
                    </div>
                {/if}
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Log In
                </button>
            </form>
        </div>
    {/if}
</div>
