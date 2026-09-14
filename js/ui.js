function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function formatDate(iso) {
    if (!iso) return "";
    const date = new Date(iso);
    if (isNaN(date.getTime())) return iso;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return day + "." + month + "." + year;
}

function showMessage(container, text, type) {
    clearElement(container);
    if (!text) return;
    const div = document.createElement("div");
    div.classList.add("message");
    if (type === "error") div.classList.add("message-error");
    if (type === "success") div.classList.add("message-success");
    div.textContent = text;
    container.appendChild(div);
}

function renderStudentsTable(container, students) {
    clearElement(container);

    if (students.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("empty-message");
        empty.textContent = "Пока нет ни одного студента. Добавьте первого.";
        container.appendChild(empty);
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("table-wrapper");

    const table = document.createElement("table");
    table.classList.add("students-table");

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    const headers = ["ФИО", "Группа", "ИСУ", "Общежитие", "Комната", "Дата заселения", "Иностранец", "Действия"];
    for (let i = 0; i < headers.length; i++) {
        const th = document.createElement("th");
        th.textContent = headers[i];
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const row = document.createElement("tr");

        const fullNameCell = document.createElement("td");
        fullNameCell.textContent = student.fullName;
        row.appendChild(fullNameCell);

        const groupCell = document.createElement("td");
        groupCell.textContent = student.group;
        row.appendChild(groupCell);

        const isuCell = document.createElement("td");
        isuCell.textContent = student.isuId;
        row.appendChild(isuCell);

        const dormCell = document.createElement("td");
        dormCell.textContent = student.dormitory;
        row.appendChild(dormCell);

        const roomCell = document.createElement("td");
        roomCell.textContent = student.room;
        row.appendChild(roomCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(student.checkIn);
        row.appendChild(dateCell);

        const foreignCell = document.createElement("td");
        foreignCell.textContent = student.isForeign ? "Да" : "Нет";
        row.appendChild(foreignCell);

        const actionsCell = document.createElement("td");
        actionsCell.classList.add("actions-cell");

        const dossierLink = document.createElement("a");
        dossierLink.href = "dossier.html?id=" + encodeURIComponent(student.id);
        dossierLink.textContent = "Досье";
        dossierLink.classList.add("btn", "btn-small");
        actionsCell.appendChild(dossierLink);

        const editLink = document.createElement("a");
        editLink.href = "form.html?id=" + encodeURIComponent(student.id);
        editLink.textContent = "Изменить";
        editLink.classList.add("btn", "btn-small");
        actionsCell.appendChild(editLink);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Удалить";
        deleteBtn.classList.add("btn-small", "btn-cancel");
        deleteBtn.dataset.id = student.id;
        deleteBtn.addEventListener("click", function () {
            if (confirm("Точно удалить " + student.fullName + "?")) {
                deleteStudent(student.id);
                location.reload();
            }
        });
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    wrapper.appendChild(table);
    container.appendChild(wrapper);
}

function renderStudentDossier(container, student) {
    clearElement(container);

    if (!student) {
        const notFound = document.createElement("p");
        notFound.classList.add("empty-message");
        notFound.textContent = "Студент не найден.";
        container.appendChild(notFound);
        return;
    }

    const card = document.createElement("div");
    card.classList.add("dossier-card");

    const title = document.createElement("h2");
    title.textContent = student.fullName;
    card.appendChild(title);

    const fields = [
        ["Группа", student.group],
        ["ИСУ", student.isuId],
        ["Общежитие", student.dormitory],
        ["Комната", student.room],
        ["Дата заселения", formatDate(student.checkIn)],
        ["Иностранец", student.isForeign ? "Да" : "Нет"],
        ["Заметки", student.notes || "—"]
    ];

    const list = document.createElement("dl");
    list.classList.add("dossier-fields");
    for (let i = 0; i < fields.length; i++) {
        const dt = document.createElement("dt");
        dt.textContent = fields[i][0];
        const dd = document.createElement("dd");
        dd.textContent = fields[i][1];
        list.appendChild(dt);
        list.appendChild(dd);
    }
    card.appendChild(list);

    container.appendChild(card);
}