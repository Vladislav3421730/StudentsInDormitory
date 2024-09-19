document.addEventListener('DOMContentLoaded', function () {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const users = []
    if (!userData || userData.role != "admin") {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = ''
        const h1 = document.createElement('h1')
        h1.className = "m-2"
        h1.textContent = "Доступ запрещён"
        body.appendChild(h1)
    }

    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('dormitory-table-body');
            tbody.innerHTML = '';
            const select = document.getElementById("make-admin-select")
            select.innerHTML='';
            const selectDelete=document.getElementById("delete-user")
            selectDelete.innerHTML=''

            const optionSelected = document.createElement('option')
            optionSelected.selected = true
            optionSelected.textContent = "Здесь вы можете сделать пользователя admin"
            select.appendChild(optionSelected)

            const optionSelectedForDeleting = document.createElement('option')
            optionSelectedForDeleting.selected = true
            optionSelectedForDeleting.textContent = "Здесь вы можете удалить пользователя"
            selectDelete.appendChild(optionSelectedForDeleting)


            data.forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.course}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.settlementStatus}</td>
            `;
                tbody.appendChild(row);
                users.push(user)
                if (user.role == "user") {
                    const option = document.createElement('option')
                    option.value = `${user._id}`
                    option.textContent = `${user.username}`
                    select.appendChild(option)
                  
                    const option2 = document.createElement('option')
                    option2.value = `${user._id}`
                    option2.textContent = `${user.username}`
                    selectDelete.appendChild(option2)
                }
            });
        })
        .catch(error => {
            console.error('Error fetching dormitories:', error);
        });

    document.getElementById("make-admin-select").addEventListener('change', async () => {
        const userId = document.getElementById("make-admin-select").value

        try {
            const response = await fetch('/make-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
    
            const result = await response.text();
            alert(result);
            location.reload()
        } catch (error) {
            console.error('Ошибка при изменении роли пользователя:', error);
            alert('Ошибка при изменении роли пользователя.');
        }
    })

    document.getElementById("delete-user").addEventListener('change',async()=>{
        const userId = document.getElementById("delete-user").value

        try {
            const response = await fetch('/delete-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
    
            const result = await response.text();
            alert(result);
            location.reload()
        } catch (error) {
            console.error('Ошибка удалении пользователя:', error);
            alert('Ошибка удалении пользователя.');
        }
    })

});