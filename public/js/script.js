document.addEventListener('DOMContentLoaded', function () {

    const isUserLoggedIn = localStorage.getItem('userLoggedIn');
    const authButton = document.getElementById('InputButton');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (authButton && isUserLoggedIn) {
        authButton.textContent = 'Личный кабинет';
        authButton.id.replace('InputButton','AnotherId')
        authButton.classList.replace('btn-success', 'btn-primary');
        authButton.setAttribute('onclick', "location.href = '/html/account.html';");
    } 
    else if(authButton && !isUserLoggedIn) {
        authButton.textContent = 'Войти';
        authButton.id.replace('AnotherId','InputButton')
        authButton.classList.replace('btn-dark', 'btn-success');
    }

    if(userData.role=="admin"){
       const ul=document.getElementById('header-panel')

       const li1=document.createElement('li')
       li1.className="nav-item"
       const a1=document.createElement('a')
       a1.className="nav-link"
       a1.href="/html/users.html"
       a1.textContent="Пользователи"

       const li2=document.createElement('li')
       li2.className="nav-item"
       const a2=document.createElement('a')
       a2.className="nav-link"
       a2.href="/html/applications.html"
       a2.textContent="Заявки"

       li1.appendChild(a1)
       li2.appendChild(a2)

       ul.appendChild(li1)
       ul.appendChild(li2)

    }
    


});