document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;

        const fullname = document.getElementById('fullname');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const agreement = document.getElementById('agreement');

        const fullnameValue = fullname.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 цифр номера');
            isValid = false;
        }

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: message.value.trim() || '(не заполнено)'
            };

            const formValidEvent = new CustomEvent('formValid', {
                detail: formData
            });
            document.dispatchEvent(formValidEvent);
            form.reset();
        }
    });

    function clearErrors() {
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });

        document.querySelectorAll('.invalid-feedback').forEach(el => {
            el.textContent = '';
        });
    }

    function showError(input, message) {
        input.classList.add('is-invalid');
        let feedback;
        if (input.type === 'checkbox') {
            feedback = input.parentElement.querySelector('.invalid-feedback');
        } else {
            feedback = input.nextElementSibling;
        }
        if (feedback) {
            feedback.textContent = message;
        }
    }

    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('is-invalid');
            const feedback = this.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = '';
            }
        });
    })
}); 