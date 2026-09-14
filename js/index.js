document.addEventListener("DOMContentLoaded", function () {
    const messageContainer = document.getElementById("message");
    const tableContainer = document.getElementById("table-container");

    const students = getAllStudents();
    renderStudentsTable(tableContainer, students);

    const params = new URLSearchParams(location.search);
    if (params.get("saved") === "1") {
        showMessage(messageContainer, "Сохранено", "success");
    }
    if (params.get("deleted") === "1") {
        showMessage(messageContainer, "Студент удалён", "success");
    }
});