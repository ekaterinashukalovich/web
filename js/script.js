document.addEventListener('DOMContentLoaded', function() {
    renderTable();

    const addBtn = document.getElementById('addStudentBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            window.location.href = 'form.html';
        });
    }
});

function renderTable() {
    const students = getStudents();
    const tableBody = document.getElementById('studentsTableBody');
    const emptyMessage = document.getElementById('emptyMessage');
    const table = document.getElementById('studentsTable');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (students.length === 0) {
        if (table) table.style.display = 'none';
        if (emptyMessage) emptyMessage.style.display = 'block';
        return;
    }

    if (table) table.style.display = 'table';
    if (emptyMessage) emptyMessage.style.display = 'none';

    students.forEach(function(student) {
        const row = document.createElement('tr');

        const fioCell = document.createElement('td');
        fioCell.textContent = `${student.surname} ${student.name} ${student.patronymic || ''}`.trim();

        const groupCell = document.createElement('td');
        groupCell.textContent = student.group;

        const isuCell = document.createElement('td');
        isuCell.textContent = student.isu;

        const dormCell = document.createElement('td');
        dormCell.textContent = getDormitoryName(student.dormitory);

        const roomCell = document.createElement('td');
        roomCell.textContent = student.roomnum || '—';

        const dateCell = document.createElement('td');
        dateCell.textContent = student.date || '—';

        const foreignCell = document.createElement('td');
        foreignCell.textContent = student.foreignstud ? 'Да' : 'Нет';

        const actionsCell = document.createElement('td');
        actionsCell.className = 'actions-cell';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редактировать';
        editBtn.className = 'btn btn-edit';
        editBtn.addEventListener('click', function() {
            window.location.href = `form.html?id=${student.id}`;
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.addEventListener('click', function() {
            handleDelete(student.id);
        });

        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(fioCell);
        row.appendChild(groupCell);
        row.appendChild(isuCell);
        row.appendChild(dormCell);
        row.appendChild(roomCell);
        row.appendChild(dateCell);
        row.appendChild(foreignCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

function handleDelete(id) {
    const confirmed = confirm('Вы уверены, что хотите удалить этого студента?');
    if (confirmed) {
        deleteStudent(id);
        renderTable();
    }
}

function getDormitoryName(code) {
    const dormitoryNames = {
        'studcity': 'Студгородок',
        'lensoveta': 'Ленсовета',
        'alpiyka': 'Альпийка',
        'belka': 'Белка',
        'msg': 'МСГ',
        'another': 'Другое'
    };
    return dormitoryNames[code] || code;
}