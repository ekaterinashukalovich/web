function validateField(fieldId, errorId, validationFn) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (!field || !error) return true;

    const isValid = validationFn(field.value);

    if (!isValid) {
        field.classList.add('error');
        error.classList.add('visible');
    } else {
        field.classList.remove('error');
        error.classList.remove('visible');
    }

    return isValid;
}

function validateSurname(value) {
    if (!value.trim()) return false;
    if (value.trim().length < 2) return false;
    if (/\d/.test(value)) return false;
    return true;
}

function validateName(value) {
    if (!value.trim()) return false;
    if (value.trim().length < 2) return false;
    if (/\d/.test(value)) return false;
    return true;
}

function validateGroup(value) {
    if (!value.trim()) return false;
    return true;
}

function validateIsu(value) {
    if (!value.trim()) return false;
    if (!/^[0-9]{6}$/.test(value)) return false;
    return true;
}

function validateDormitory(value) {
    if (!value) return false;
    return true;
}

function validateRoomnum(value) {
    if (!value.trim()) return true;
    if (!/^[0-9]+$/.test(value.trim())) return false;
    return true;
}

function validateDate(value) {
    if (!value) return true;
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) return false;
    return true;
}

function validateForm() {
    const isSurnameValid = validateField('surname', 'surnameError', validateSurname);
    const isNameValid = validateField('name', 'nameError', validateName);
    const isGroupValid = validateField('group', 'groupError', validateGroup);
    const isIsuValid = validateField('isu', 'isuError', validateIsu);
    const isDormitoryValid = validateField('dormitory', 'dormitoryError', validateDormitory);
    const isRoomnumValid = validateField('roomnum', 'roomnumError', validateRoomnum);
    const isDateValid = validateField('date', 'dateError', validateDate);

    return isSurnameValid && isNameValid && isGroupValid && isIsuValid && isDormitoryValid && isRoomnumValid && isDateValid;
}

function setupLiveValidation() {
    const fields = [
        { id: 'surname', errorId: 'surnameError', fn: validateSurname },
        { id: 'name', errorId: 'nameError', fn: validateName },
        { id: 'group', errorId: 'groupError', fn: validateGroup },
        { id: 'isu', errorId: 'isuError', fn: validateIsu },
        { id: 'dormitory', errorId: 'dormitoryError', fn: validateDormitory },
        { id: 'roomnum', errorId: 'roomnumError', fn: validateRoomnum },
        { id: 'date', errorId: 'dateError', fn: validateDate }
    ];

    fields.forEach(function(field) {
        const element = document.getElementById(field.id);
        if (element) {
            element.addEventListener('blur', function() {
                validateField(field.id, field.errorId, field.fn);
            });

            element.addEventListener('input', function() {
                if (element.classList.contains('error')) {
                    validateField(field.id, field.errorId, field.fn);
                }
            });
        }
    });
}