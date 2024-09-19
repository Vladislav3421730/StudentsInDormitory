document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const requestBody = {
        firstName,
        lastName,
        username,
        email,
        age,
        course,
        password,
        confirmPassword
    };
    console.log(requestBody)
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const resultElement = document.getElementById('registration-result');

        if (response.ok) {
            const result = await response.text();
            resultElement.textContent = result;
            resultElement.style.color = 'blue';
            setTimeout(() => {
                window.location.href = '/html/index.html';
            }, 2000);
        } else {
            const error = await response.text();
            resultElement.textContent = error;
            resultElement.style.color = 'red';
        }
    } catch (error) {
        const resultElement = document.getElementById('registration-result');
        resultElement.textContent = 'Ошибка при регистрации пользователя.';
        resultElement.style.color = 'red';
    }
});
