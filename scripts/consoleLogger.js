document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message || '(не заполнено)');
        const timestamp = Date().toLocaleString();
        console.log('Время отправки:', timestamp);
    });
});