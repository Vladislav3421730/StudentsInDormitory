document.addEventListener('DOMContentLoaded', () => {

    const Dormitories = []

    fetch('/dormitories')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('dormitory-table-body');
            tbody.innerHTML = '';
            const dormitorySelect = document.getElementById('delete-select');
            dormitorySelect.innerHTML = '';
            if (userData && userData.role == "admin"){
            dormitorySelect.style.display="inline-block"
            const optionSelected = document.createElement('option');
            optionSelected.textContent="Для удаления общежитий"
            optionSelected.selected=true
            dormitorySelect.appendChild(optionSelected)
            }
            data.forEach((dormitory, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td>${dormitory.name}</td>
                    <td>${dormitory.address}</td>
                    <td>${dormitory.numberOfResidents}</td>
                `;
                tbody.appendChild(row);
                Dormitories.push(dormitory)

                const option = document.createElement('option');
                option.value = dormitory._id;
                option.textContent = dormitory.name;
                dormitorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching dormitories:', error);
        });

    document.getElementById('sort-select').addEventListener('change', () => {

        const tbody = document.getElementById('dormitory-table-body');
        tbody.innerHTML = '';
        const sortBy=document.getElementById("sort-select").value

        Dormitories.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'address') {
                return a.address.localeCompare(b.address);
            } else if (sortBy === 'numberOfResidents') {
                return a.numberOfResidents - b.numberOfResidents;
            }
        });

        Dormitories.forEach((dormitory, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${dormitory.name}</td>
                <td>${dormitory.address}</td>
                <td>${dormitory.numberOfResidents}</td>
            `;
            tbody.appendChild(row);
        });

    });

    document.getElementById('delete-select').addEventListener('change',async ()=>{
        const id=document.getElementById('delete-select').value
        const requestBody = {
            id
        }
        try {
            const response = await fetch('/delete-dormitory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            location.reload()
        } catch (error) {
            console.error('Ошибка при добавлении общежития:', error);
            alert(`${error}`);
        }
    })



    const AddDormitoryButton = document.getElementById("Add-dormitory")
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.role == "admin") {
        AddDormitoryButton.style.display = "block"
        document.getElementsByClassName("card-header ")[0].textContent = "Добавление общежитий"
        document.getElementById("add-info").innerHTML = ''
        document.getElementsByClassName("card-body")[0].innerHTML = ''
        document.getElementsByClassName("card-body")[0].innerHTML = ' \
        <form id="add-dormitory-form"> \
        <div class="form-group mb-2"> \
            <label for="Name">Название</label> \
            <input type="text" class="form-control mt-1" id="Name" placeholder="Введите название общежития"required> \
        </div> \
        <div class="form-group mb-2"> \
            <label for="adress">Адрес</label> \
            <input type="text" class="form-control mt-1" id="adress" placeholder="Введите адрес" required> \
        </div> \
        <div class="form-group mb-2"> \
            <label for="amount">Количество проживающих</label> \
            <input type="number" min="0" max="10000" step="1" class="form-control mt-1" id="amount" placeholder="Количество проживающих" required> \
        </div> \
        <button class="btn btn-success" type="submit" >Ок</button> \
    </form> \
        '
        ViewModelaWindow(AddDormitoryButton)
    }



    document.getElementById('add-dormitory-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const name = document.getElementById("Name").value
        const address = document.getElementById("adress").value
        const numberOfResidents = document.getElementById("amount").value

        const requestBody = {
            name,
            address,
            numberOfResidents
        }

        try {
            const response = await fetch('/add-dormitory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            location.reload()
            document.getElementById('add-dormitory-form').reset();
        } catch (error) {
            console.error('Ошибка при добавлении общежития:', error);
            alert(`${error}`);
        }
    });

});