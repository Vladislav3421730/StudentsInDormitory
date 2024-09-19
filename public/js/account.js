document.addEventListener('DOMContentLoaded', function () {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const fullName = `${userData.firstname} ${userData.lastName}`;

    document.getElementById('full-name').textContent = fullName;
    document.getElementById('login').textContent = userData.username;
    document.getElementById('email').textContent = userData.email;
    document.getElementById('status').textContent = userData.status;

    document.getElementById('edit-firstname').value = userData.firstname;
    document.getElementById('edit-lastname').value = userData.lastName;
    document.getElementById('edit-username').value = userData.username;
    document.getElementById('edit-email').value = userData.email;
    document.getElementById('edit-age').value = userData.age;
    document.getElementById('edit-course').value = userData.course;

    if(userData.status=="Не подавал заявку"){
        const button=document.createElement('button')
        button.className="btn btn-success"
        button.style.marginTop="10px"
        button.textContent="Подать заявку"
        button.id="add-application"
        document.getElementById("use-button-application").appendChild(button)
    }

   

    const logOutBtn = document.getElementById('log-out');
    const editBtn = document.getElementById('edit-btn');
    const editForm = document.getElementById('edit-form');

    logOutBtn.addEventListener('click', () => {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userData');
        window.location.href = '/html/index.html'
    });


   

    editBtn.addEventListener('click', () => {
        editForm.style.display = 'block';
        document.getElementById('margin-top-footer').style.marginTop="0px"
    });

    document.getElementById('cancel-changes').addEventListener('click',function(){
        editForm.style.display = 'none';
        document.getElementById('margin-top-footer').style.marginTop="105px"
    })

    document.querySelector('#edit-form button[type="submit"]').addEventListener('click', async () => {
        const firstName = document.getElementById('edit-firstname').value;
        const lastName = document.getElementById('edit-lastname').value;
        const username = document.getElementById('edit-username').value;
        const email = document.getElementById('edit-email').value;
        const age = document.getElementById('edit-age').value;
        const course = document.getElementById('edit-course').value;
    
        const requestBody = {
            firstName,
            lastName,
            username,
            email,
            age,
            course,
            oldUsername: userData.username
        };
    
        try {
            const response = await fetch('/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (response.ok) {
                const updatedUserData = {
                    ...JSON.parse(localStorage.getItem('userData')),
                    firstName,
                    lastName,
                    username,
                    email,
                    age,
                    course
                };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                location.reload();
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            alert('Ошибка при обновлении профиля.');
        }
    });
    

    document.getElementById("add-application").addEventListener('click',async ()=>{
        const requestBody = {
            userId: userData.id
        };
        try {
            const response = await fetch('/create-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (response.ok) {
                userData.status = 'Заявка принята';
                localStorage.setItem('userData', JSON.stringify(userData));
                location.reload();
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            alert('Ошибка при обновлении профиля.');
        }
    })


});
