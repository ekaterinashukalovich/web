document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("student-form");
    const messageContainer = document.getElementById("message");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");

    const params = new URLSearchParams(location.search);
    const studentId = params.get("id");
    const isEditMode = studentId !== null;

    let currentStudent = null;

    if (isEditMode) {
        currentStudent = getStudentById(studentId);
        if (!currentStudent) {
            showMessage(messageContainer, "Студент не найден", "error");
            form.style.display = "none";
            return;
        }
        formTitle.textContent = "Редактировать студента";
        submitBtn.textContent = "Сохранить";
        document.title = "Редактировать студента";

        form.elements.fullName.value = currentStudent.fullName || "";
        form.elements.group.value = currentStudent.group || "";
        form.elements.isuId.value = currentStudent.isuId || "";
        form.elements.dormitory.value = currentStudent.dormitory || "";
        form.elements.room.value = currentStudent.room || "";
        form.elements.checkIn.value = currentStudent.checkIn || "";
        form.elements.isForeign.checked = !!currentStudent.isForeign;
        form.elements.notes.value = currentStudent.notes || "";
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearAllFieldErrors(form);
        showMessage(messageContainer, "", "success");

        const data = {
            fullName: form.elements.fullName.value.trim(),
            group: form.elements.group.value.trim(),
            isuId: form.elements.isuId.value.trim(),
            dormitory: form.elements.dormitory.value.trim(),
            room: form.elements.room.value.trim(),
            checkIn: form.elements.checkIn.value,
            isForeign: form.elements.isForeign.checked,
            notes: form.elements.notes.value.trim()
        };

        const errors = validateStudent(data);
        const hasAny = hasErrors(errors);

        if (hasAny) {
            showFieldErrors(form, errors);
            showMessage(messageContainer, "Проверьте поля формы", "error");
            return;
        }

        if (isEditMode) {
            updateStudent(studentId, data);
        } else {
            createStudent(data);
        }

        location.href = "index.html?saved=1";
    });

    function clearAllFieldErrors(formEl) {
        const spans = formEl.querySelectorAll(".field-error");
        for (let i = 0; i < spans.length; i++) {
            spans[i].textContent = "";
        }
        const inputs = formEl.querySelectorAll("input, textarea");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("input-error");
        }
    }

    function showFieldErrors(formEl, errors) {
        const keys = Object.keys(errors);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const message = errors[key];
            if (message === null) continue;

            const span = formEl.querySelector('[data-error-for="' + key + '"]');
            if (span) span.textContent = message;

            const input = formEl.elements[key];
            if (input) input.classList.add("input-error");
        }
    }
});