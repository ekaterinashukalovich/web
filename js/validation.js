function isEmpty(value) {
    return value === null || value === undefined || String(value).trim() === "";
}

function isInteger(value) {
    if (value === "" || value === null || value === undefined) return false;
    const num = Number(value);
    return Number.isInteger(num);
}

function isPositiveIntegerInRange(value, min, max) {
    if (!isInteger(value)) return false;
    const num = Number(value);
    return num >= min && num <= max;
}

function validateFullName(value) {
    if (isEmpty(value)) return "ФИО обязательно для заполнения";
    const trimmed = String(value).trim();
    const words = trimmed.split(/\s+/);
    if (words.length < 2) return "Укажите имя и фамилию";
    if (!/^[А-Яа-яЁёA-Za-z\s\-]+$/.test(trimmed)) return "ФИО может содержать только буквы, пробелы и дефис";
    return null;
}

function validateGroup(value) {
    if (isEmpty(value)) return "Группа обязательна";
    const trimmed = String(value).trim();
    if (trimmed.length < 4 || trimmed.length > 10) return "Длина группы — от 4 до 10 символов";
    return null;
}

function validateIsuId(value) {
    if (isEmpty(value)) return "ИСУ обязателен";
    if (!/^\d{6}$/.test(String(value).trim())) return "ИСУ — ровно 6 цифр";
    return null;
}

function validateDormitory(value) {
    if (isEmpty(value)) return "Номер общежития обязателен";
    if (!isPositiveIntegerInRange(value, 1, 30)) return "Номер общежития — от 1 до 30";
    return null;
}

function validateRoom(value) {
    if (isEmpty(value)) return "Номер комнаты обязателен";
    if (!isPositiveIntegerInRange(value, 1, 9999)) return "Номер комнаты — от 1 до 9999";
    return null;
}

function validateCheckIn(value) {
    if (isEmpty(value)) return "Дата заселения обязательна";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Некорректная дата";
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (date > today) return "Дата заселения не может быть в будущем";
    return null;
}

function validateNotes(value) {
    if (isEmpty(value)) return null;
    if (String(value).length > 500) return "Заметки не должны превышать 500 символов";
    return null;
}

function validateStudent(data) {
    return {
        fullName: validateFullName(data.fullName),
        group: validateGroup(data.group),
        isuId: validateIsuId(data.isuId),
        dormitory: validateDormitory(data.dormitory),
        room: validateRoom(data.room),
        checkIn: validateCheckIn(data.checkIn),
        notes: validateNotes(data.notes)
    };
}

function hasErrors(errors) {
    const keys = Object.keys(errors);
    for (let i = 0; i < keys.length; i++) {
        if (errors[keys[i]] !== null) return true;
    }
    return false;
}