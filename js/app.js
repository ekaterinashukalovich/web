document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const backBtn = document.getElementById('backBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const formTitle = document.getElementById('formTitle');
    const pageTitle = document.getElementById('pageTitle');
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    const params = new URLSearchParams(window.location.search);
    const studentId = params.get('id');
    
    if (studentId) {
        const student = getStudentById(studentId);
        if (student) {
            if (formTitle) formTitle.textContent = 'Редактировать студента';
            if (pageTitle) pageTitle.textContent = 'Редактировать студента';
            fillForm(student);
        } else {
            window.location.href = 'index.html';
        }
    } else {
        if (formTitle) formTitle.textContent = 'Добавить студента';
        if (pageTitle) pageTitle.textContent = 'Добавить студента';
    }
    
    if (form) {
        setupLiveValidation();
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const studentData = collectFormData();
            
            if (studentId) {
                studentData.id = studentId;
            }
            
            saveStudent(studentData);
            window.location.href = 'index.html';
        });
    }
    
    const dossierContainer = document.getElementById('dossierContainer');
    if (dossierContainer) {
        renderDossier();
    }
});

function collectFormData() {
    return {
        surname: document.getElementById('surname').value.trim(),
        name: document.getElementById('name').value.trim(),
        patronymic: document.getElementById('patronymic').value.trim(),
        group: document.getElementById('group').value.trim(),
        isu: document.getElementById('isu').value.trim(),
        dormitory: document.getElementById('dormitory').value,
        roomnum: document.getElementById('roomnum').value.trim(),
        date: document.getElementById('date').value,
        foreignstud: document.getElementById('foreignstud').checked,
        notes: document.getElementById('notes').value.trim()
    };
}

function fillForm(student) {
    document.getElementById('surname').value = student.surname || '';
    document.getElementById('name').value = student.name || '';
    document.getElementById('patronymic').value = student.patronymic || '';
    document.getElementById('group').value = student.group || '';
    document.getElementById('isu').value = student.isu || '';
    document.getElementById('dormitory').value = student.dormitory || '';
    document.getElementById('roomnum').value = student.roomnum || '';
    document.getElementById('date').value = student.date || '';
    document.getElementById('foreignstud').checked = student.foreignstud || false;
    document.getElementById('notes').value = student.notes || '';
}

function renderDossier() {
    const params = new URLSearchParams(window.location.search);
    const studentId = params.get('id');
    
    if (!studentId) {
        window.location.href = 'index.html';
        return;
    }
    
    const student = getStudentById(studentId);
    
    if (!student) {
        window.location.href = 'index.html';
        return;
    }
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = `Досье: ${student.surname} ${student.name}`;
    }
    
    const dossierTitle = document.getElementById('dossierTitle');
    if (dossierTitle) {
        dossierTitle.textContent = `${student.surname} ${student.name} ${student.patronymic || ''}`.trim();
    }
    
    const fields = [
        { id: 'dossierSurname', value: student.surname },
        { id: 'dossierName', value: student.name },
        { id: 'dossierPatronymic', value: student.patronymic || '—' },
        { id: 'dossierGroup', value: student.group },
        { id: 'dossierIsu', value: student.isu },
        { id: 'dossierDormitory', value: getDormitoryName(student.dormitory) },
        { id: 'dossierRoomnum', value: student.roomnum || '—' },
        { id: 'dossierDate', value: student.date || '—' },
        { id: 'dossierForeign', value: student.foreignstud ? 'Да' : 'Нет' },
        { id: 'dossierNotes', value: student.notes || '—' }
    ];
    
    fields.forEach(function(field) {
        const element = document.getElementById(field.id);
        if (element) {
            element.textContent = field.value;
        }
    });
    
    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            window.location.href = `form.html?id=${student.id}`;
        });
    }
    
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
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