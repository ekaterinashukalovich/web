document.addEventListener("DOMContentLoaded", function () {
    const messageContainer = document.getElementById("message");
    const dossierContainer = document.getElementById("dossier-container");
    const editLink = document.getElementById("edit-link");

    const params = new URLSearchParams(location.search);
    const studentId = params.get("id");

    editLink.style.display = "none";

    if (!studentId) {
        showMessage(messageContainer, "Студент не указан", "error");
        renderStudentDossier(dossierContainer, null);
        return;
    }

    const student = getStudentById(studentId);

    if (!student) {
        showMessage(messageContainer, "Студент не найден", "error");
        renderStudentDossier(dossierContainer, null);
        return;
    }

    document.title = student.fullName + " — Досье";
    editLink.href = "form.html?id=" + encodeURIComponent(student.id);
    editLink.style.display = "";

    renderStudentDossier(dossierContainer, student);
});