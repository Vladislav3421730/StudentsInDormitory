document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginResult = document.getElementById('login-result');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const requestBody = {
            username,
            password
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => Promise.reject(text));
            }
            return response.json();
        })
        .then(userData => {
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userData', JSON.stringify(userData));
            loginResult.textContent = 'Успешный вход!';
            loginResult.style.color = 'blue';
            setTimeout(() => {
                window.location.href = '/html/account.html';
                loginResult.textContent = '';
            }, 1000);
        })
        .catch(error => {
            loginResult.textContent = error;
            loginResult.style.color = 'red';
            setTimeout(() => {
                loginResult.textContent = '';
            }, 1000);
        });
    });
});
