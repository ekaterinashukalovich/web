const INDEX_KEY = "students_index";
const PREFIX = "student_";

function generateId() {
    return "s_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
}

function getIndex() {
    const raw = getCookie(INDEX_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
}

function setIndex(array) {
    setCookie(INDEX_KEY, JSON.stringify(array));
}

function getAllStudents() {
    const ids = getIndex();
    const result = [];
    for (let i = 0; i < ids.length; i++) {
        const student = getStudentById(ids[i]);
        if (student) result.push(student);
    }
    return result;
}

function getStudentById(id) {
    const raw = getCookie(PREFIX + id);
    if (!raw) return null;
    return JSON.parse(raw);
}

function createStudent(data) {
    const id = generateId();
    const student = Object.assign({ id: id }, data);
    setCookie(PREFIX + id, JSON.stringify(student));
    const ids = getIndex();
    ids.push(id);
    setIndex(ids);
    return student;
}

function updateStudent(id, data) {
    const existing = getStudentById(id);
    if (!existing) return null;
    const updated = Object.assign({}, existing, data, { id: id });
    setCookie(PREFIX + id, JSON.stringify(updated));
    return updated;
}

function deleteStudent(id) {
    deleteCookie(PREFIX + id);
    const ids = getIndex();
    const filtered = ids.filter(function (item) { return item !== id; });
    setIndex(filtered);
}