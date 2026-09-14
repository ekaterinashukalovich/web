function getAllCookies() {
    const cookiesString = document.cookie;
    const cookies = {};

    if (!cookiesString) {
        return cookies;
    }

    const cookiePairs = cookiesString.split('; ');

    cookiePairs.forEach(pair => {
        const [name, value] = pair.split('=');
        cookies[name] = decodeURIComponent(value);
    });

    return cookies;
}

function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const cookieString = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;

    document.cookie = cookieString;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function generateId() {
    const cookies = getAllCookies();
    const lastId = cookies['last_id'] || '0';
    const newId = (parseInt(lastId) + 1).toString();
    setCookie('last_id', newId);
    return newId;
}

function getStudents() {
    const cookies = getAllCookies();
    const studentsList = cookies['students_list'];

    if (!studentsList) {
        return [];
    }

    const ids = studentsList.split(',');
    const students = [];

    ids.forEach(id => {
        const studentData = cookies[`student_${id}`];
        if (studentData) {
            students.push(JSON.parse(studentData));
        }
    });

    return students;
}

function saveStudent(student) {
    const cookies = getAllCookies();
    let studentsList = cookies['students_list'] || '';
    let ids = studentsList ? studentsList.split(',') : [];

    if (student.id) {
        setCookie(`student_${student.id}`, JSON.stringify(student));
    } else {
        student.id = generateId();
        setCookie(`student_${student.id}`, JSON.stringify(student));
        ids.push(student.id);
        setCookie('students_list', ids.join(','));
    }
}

function deleteStudent(id) {
    deleteCookie(`student_${id}`);

    const cookies = getAllCookies();
    let studentsList = cookies['students_list'] || '';
    let ids = studentsList ? studentsList.split(',') : [];

    ids = ids.filter(sid => sid !== id);

    if (ids.length > 0) {
        setCookie('students_list', ids.join(','));
    } else {
        deleteCookie('students_list');
    }
}

function getStudentById(id) {
    const cookies = getAllCookies();
    const studentData = cookies[`student_${id}`];

    if (studentData) {
        return JSON.parse(studentData);
    }

    return null;
}

function clearAllStudents() {
    const cookies = getAllCookies();

    deleteCookie('students_list');
    deleteCookie('last_id');

    Object.keys(cookies).forEach(name => {
        if (name.startsWith('student_')) {
            deleteCookie(name);
        }
    });
}