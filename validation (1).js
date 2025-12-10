// Switch between Login and Sign Up tabs
function switchTab(tabName) {
    const loginTab = document.getElementById('login');
    const signupTab = document.getElementById('signup');
    const tabButtons = document.querySelectorAll('.tab-button');

    if (tabName === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        tabButtons[0].classList.add('active');
        tabButtons[1].classList.remove('active');
        // Clear any error messages
        document.getElementById('loginForm').reset();
        clearAllErrors('login');
    } else if (tabName === 'signup') {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        tabButtons[1].classList.add('active');
        tabButtons[0].classList.remove('active');
        // Clear any error messages
        document.getElementById('signupForm').reset();
        clearAllErrors('signup');
    }
}

// Clear error messages
function clearAllErrors(type) {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.classList.remove('show');
        element.textContent = '';
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format
function isValidPhone(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Validate Login Form
function validateLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    let isValid = true;

    // Clear previous errors
    clearAllErrors('login');

    // Validate email
    if (!email) {
        showError('loginEmailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('loginPasswordError', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    if (isValid) {
        // Show success message
        document.getElementById('loginSuccess').style.display = 'block';
        document.getElementById('loginForm').reset();
        setTimeout(() => {
            document.getElementById('loginSuccess').style.display = 'none';
        }, 3000);
    }

    return false;
}

// Validate Sign Up Form
function validateSignup(event) {
    event.preventDefault();

    const firstName = document.getElementById('signupFirstName').value.trim();
    const lastName = document.getElementById('signupLastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const termsChecked = document.getElementById('terms').checked;
    let isValid = true;

    // Clear previous errors
    clearAllErrors('signup');

    // Validate first name
    if (!firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Validate last name
    if (!lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('signupEmailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('signupEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    if (!phone) {
        showError('signupPhoneError', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('signupPhoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('signupPasswordError', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('signupPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    // Validate password confirmation
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    // Validate terms acceptance
    if (!termsChecked) {
        showError('termsError', 'You must agree to the terms and conditions');
        isValid = false;
    }

    if (isValid) {
        // Show success message
        document.getElementById('signupSuccess').style.display = 'block';
        document.getElementById('signupForm').reset();
        setTimeout(() => {
            document.getElementById('signupSuccess').style.display = 'none';
            switchTab('login');
        }, 2000);
    }

    return false;
}

// Validate Reservation Form
function validateReservation(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const guests = document.getElementById('guests').value;
    let isValid = true;

    // Clear previous errors
    clearAllErrors('reservation');

    // Validate full name
    if (!fullName) {
        showError('nameError', 'Full name is required');
        isValid = false;
    } else if (fullName.length < 3) {
        showError('nameError', 'Full name must be at least 3 characters');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    if (!phone) {
        showError('phoneError', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate date
    if (!date) {
        showError('dateError', 'Please select a date');
        isValid = false;
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            showError('dateError', 'Please select a future date');
            isValid = false;
        }
    }

    // Validate time
    if (!time) {
        showError('timeError', 'Please select a time');
        isValid = false;
    } else {
        const [hours, minutes] = time.split(':').map(Number);
        if (hours < 11 || (hours >= 23)) {
            showError('timeError', 'Reservations available from 11:00 AM to 11:00 PM');
            isValid = false;
        }
    }

    // Validate number of guests
    if (!guests) {
        showError('guestsError', 'Please select number of guests');
        isValid = false;
    }

    if (isValid) {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('reservationForm').reset();
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 4000);
    }

    return false;
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}
