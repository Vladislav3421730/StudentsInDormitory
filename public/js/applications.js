document.addEventListener('DOMContentLoaded', function () {

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData || userData.role != "admin") {
        const body = document.getElementsByTagName('body')[0]
        body.innerHTML = ''
        const h1 = document.createElement('h1')
        h1.className = "m-2"
        h1.textContent = "Доступ запрещён"
        body.appendChild(h1)
    }


    async function fetchApplications() {
        try {
            const response = await fetch('/applications');
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const applications = await response.json();
            populateTable(applications);
            AddUsersToRejecSelect(applications)
        } catch (error) {
            console.error('Ошибка при получении заявок:', error);
        }
    }



    async function fetchDormitories() {
        try {
            const response = await fetch('/dormitories');
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при получении списка общежитий:', error);
        }
    }

    function populateTable(applications) {
        const tableBody = document.getElementById('dormitory-table-body');
        tableBody.innerHTML = '';

        applications.forEach((application, index) => {
            const tr = document.createElement('tr');

            const tdIndex = document.createElement('td');
            tdIndex.textContent = index + 1;
            tr.appendChild(tdIndex);

            const tdFirstName = document.createElement('td');
            tdFirstName.textContent = application.user.firstName;
            tr.appendChild(tdFirstName);

            const tdLastName = document.createElement('td');
            tdLastName.textContent = application.user.lastName;
            tr.appendChild(tdLastName);

            const tdAge = document.createElement('td');
            tdAge.textContent = application.user.age;
            tr.appendChild(tdAge);

            const tdApplicationDate = document.createElement('td');
            tdApplicationDate.textContent = new Date(application.applicationDate).toLocaleDateString();
            tr.appendChild(tdApplicationDate);

            const tdStatus = document.createElement('td');
            tdStatus.textContent = application.user.settlementStatus;
            tr.appendChild(tdStatus);

            const tdDormitory = document.createElement('td');
            if (application.dormitory) {
                tdDormitory.textContent = application.dormitory.name;
                tr.appendChild(tdDormitory);
            } else {
                const button = document.createElement('button');
                button.className = 'btn btn-outline-success mt-1 mb-1';
                button.textContent = 'Заселить';
                button.dataset.applicationId = application._id;
                button.addEventListener('click', async () => {
                    const dormitories = await fetchDormitories();
                    populateDormitorySelect(dormitories);
                    openModal(application._id);
                });
                tdDormitory.appendChild(button);
                tr.appendChild(tdDormitory);
            }
            tableBody.appendChild(tr);
        });
    }

    function populateDormitorySelect(dormitories) {
        const dormitorySelect = document.getElementById('dormitory-select');
        dormitorySelect.innerHTML = '';

        dormitories.forEach(dormitory => {
            const option = document.createElement('option');
            option.value = dormitory._id;
            option.textContent = dormitory.name;
            dormitorySelect.appendChild(option);
        });
    }

    async function AddUsersToRejecSelect(applications){
        const dormitorySelectReject = document.getElementById('reject-dormitory');
        dormitorySelectReject.innerHTML = '';

        const optionSelected=document.createElement('option')
        optionSelected.selected=true
        optionSelected.textContent="Здесь вы можете выселить студента"
        dormitorySelectReject.appendChild(optionSelected)


        applications.forEach(application => {
            if(application.user.settlementStatus=="Заселён") {
            const option = document.createElement('option');
            option.value = application.user._id
            option.textContent = application.user.lastName;
            dormitorySelectReject.appendChild(option);
            }
        });
    }

    function openModal(applicationId) {
        const confirmButton = document.getElementById('confirm-settlement');

        const windowInnerWidth = document.documentElement.clientWidth;
        const scrollbarWidth = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth);

        const bodyElementHTML = document.getElementsByTagName("body")[0];
        const modalBackground = document.getElementsByClassName("modalBackground")[0];
        const modalClose = document.getElementsByClassName("modalClose")[0];
        const modalActive = document.getElementsByClassName("modalActive")[0];
        
        function bodyMargin() {
            bodyElementHTML.style.marginRight = "-" + scrollbarWidth + "px";
        }

        bodyMargin();

        modalBackground.style.display = "block";

        if (windowInnerWidth >= 1366) {
            bodyMargin();
        }
        modalActive.style.left = "calc(50% - " + (175 - scrollbarWidth / 2) + "px)";

        modalClose.addEventListener("click", function () {
            modalBackground.style.display = "none";
            if (windowInnerWidth >= 1366) {
                bodyMargin();
            }
        });

        modalBackground.addEventListener("click", function (event) {
            if (event.target === modalBackground) {
                modalBackground.style.display = "none";
                if (windowInnerWidth >= 1366) {
                    bodyMargin();
                }
            }
        });

        const newConfirmButton = confirmButton.cloneNode(true);
        confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);

        newConfirmButton.addEventListener('click', () => {
            const selectedDormitoryId = document.getElementById('dormitory-select').value;
            settleStudent(applicationId, selectedDormitoryId);
        });
    }

    async function settleStudent(applicationId, dormitoryId) {
        try {
            const response = await fetch('/settle-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ applicationId, dormitoryId })
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            location.reload();
        } catch (error) {
            console.error('Ошибка при заселении студента:', error);
            alert('Ошибка при заселении студента.');
        }
    }

    document.getElementById('reject-dormitory').addEventListener('change',async()=>{
        const userId =  document.getElementById('reject-dormitory').value
        try {
            const response = await fetch('/reject-dormitory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
    
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
    
            const result = await response.text();
            if (userData && userData.id === userId) {
                userData.status = 'Заявка принята';
                localStorage.setItem('userData', JSON.stringify(userData));
            }
    
            location.reload();
        } catch (error) {
            console.error('Ошибка при выселении студента:', error);
            alert('Ошибка при выселении студента. Попробуйте снова позже.');
        }

    })

    fetchApplications();
});
