$('[name=LoginButton]').click(function () {
    $('#ErrorMessage').hide();
    if ($('#UserName').val() == '' || $('#Password').val() == '') {
        $('#ErrorMessage').show();
        $('#ErrorMessage').html('Lütfen tüm alanları doldurun.');
    }
    else {
        $.ajax({
            url: '/g/Login',
            type: 'POST',
            data: $('#LoginForm').serialize(),
            success: function (response) {
                if (response.Status) {
                    location.href = '/';
                }
                else {
                    $('#ErrorMessage').show();
                    $('#ErrorMessage').html(response.Message);
                }
            }
        });
    }
});
$('[name=RegisterButton]').click(function () {
    $('#RegisterErrorMessage').hide();
    if ($('#RegisterUserName').val() == '' || $('#RegisterEmail').val() == '' || $('#RegisterPassword').val() == '' || $('#RegisterPasswordAgain').val() == '') {
        $('#RegisterErrorMessage').show();
        $('#RegisterErrorMessage').html('Lütfen tüm alanları doldurun.');
    }
    else if ($('#RegisterPassword').val() != $('#RegisterPasswordAgain').val()) {
        $('#RegisterErrorMessage').show();
        $('#RegisterErrorMessage').html('Şifreler eşleşmiyor.');
    }
    else if ($('#RegisterPassword').val().length < 6) {
        $('#RegisterErrorMessage').show();
        $('#RegisterErrorMessage').html('Şifre en az 6 karakter olmalı.');
    }
    else {
        $.ajax({
            url: '/g/Register',
            type: 'POST',
            data: $('#RegisterForm').serialize(),
            success: function (response) {
                if (response.Status) {
                    location.href = '/';
                }
                else {
                    $('#RegisterErrorMessage').show();
                    $('#RegisterErrorMessage').html(response.Message);
                }
            }
        });
    }
});
$('[name=Buy]').click(function () {
    Swal.fire({
        text: 'Satın almak istediğinize emin misiniz?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `Evet`,
        denyButtonText: `Hayır`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/g/Buy?id=' + $(this).attr('data-id'),
                dataType: 'json',
                success: function (response) {
                    if (response.Status) {
                        Swal.fire('', 'Başarıyla satın alındı.', 'success').then((result) => { if (result.isConfirmed) { location.href = '/'; } });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            text: response.Message
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        text: 'İşlem başarısız.'
                    });
                }
            });
        }
    });
});
$('#ProfileSave').click(function () {
    Swal.fire({
        text: 'Kaydetmek istediğinize emin misiniz?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `Evet`,
        denyButtonText: `Hayır`,
    }).then((result) => {
        if (result.isConfirmed) {
            if ($('#ProfileEmail').val() == '' || $('#ProfilePassword').val() == '') {
                Swal.fire('', 'Lütfen tüm alanları doldurun.', 'error');
            }
            else {
                $.ajax({
                    type: 'POST',
                    url: '/g/ProfileSave',
                    data: { Email: $('#ProfileEmail').val(), Password: $('#ProfilePassword').val(), NewPassword: $('#ProfileNewPassword').val(), NewPasswordAgain: $('#ProfileNewPasswordAgain').val() },
                    dataType: 'json',
                    success: function (response) {
                        if (response.Status) {
                            Swal.fire('', 'Başarıyla kaydedildi.', 'success').then((result) => { if (result.isConfirmed) { location.href = '/'; } });
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: response.Message
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            text: 'İşlem başarısız.'
                        });
                    }
                });
            }
        }
    });
});
$('#ProfileSignOut').click(function () {
    location.href = '/Logout';
});
$('#AddBalancePay').click(function () {
    Swal.fire({
        text: $('#BuyAmount').val() + ' TL bakiye yüklemek istediğinize emin misiniz?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `Evet`,
        denyButtonText: `Hayır`,
    }).then((result) => {
        if (result.isConfirmed) {
            if ($('#BuyAmount').val() == '' || $('#BuyName').val() == '' || $('#BuySurname').val() == '' || $('#BuyEmail').val() == '') {
                Swal.fire('', 'Lütfen tüm alanları doldurun.', 'error');
            }
            else {
                $.ajax({
                    type: 'POST',
                    url: '/g/Pay',
                    data: { BuyName: $('#BuyName').val(), BuySurname: $('#BuySurname').val(), BuyAmount: $('#BuyAmount').val(), BuyEmail: $('#BuyEmail').val() },
                    dataType: 'json',
                    success: function (response) {
                        if (response.Status) {
                            location.href = response.Message;
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: response.Message
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            text: 'İşlem başarısız.'
                        });
                    }
                });
            }
        }
    });
});
$('[name=hwid-reset]').click(function () {
    let name = $(this).attr('data-name');
    Swal.fire({
        text: name + ` adlı üyenin HWID'sini sıfırlamak istediğinize emin misiniz?`,
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `Evet`,
        denyButtonText: `Hayır`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/g/HwIdReset?Id=' + $(this).attr('data-id'),
                dataType: 'json',
                success: function (response) {
                    if (response.Status) {
                        Swal.fire('', name + ` adlı üyenin HWID'si başarıyla sıfırlandı.`, 'success');
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            text: response.Message
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        text: 'İşlem başarısız.'
                    });
                }
            });
        }
    });
});
$('[name=ban-user]').click(function () {
    let name = $(this).attr('data-name');
    Swal.fire({
        text: name + ` adlı üyeyi banlamak/ban kaldırmak istediğinize emin misiniz?`,
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `Evet`,
        denyButtonText: `Hayır`,
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/g/UserBan?Id=' + $(this).attr('data-id'),
                dataType: 'json',
                success: function (response) {
                    if (response.Status) {
                        Swal.fire('', name + ` adlı üye başarıyla banlandı/ban kaldırıldı.`, 'success').then((result) => { if (result.isConfirmed) { location.href = '/'; } });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            text: response.Message
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        text: 'İşlem başarısız.'
                    });
                }
            });
        }
    });
});
$('[name=user-variable-edit]').click(function () {
    let name = $(this).attr('data-name');
    let id = $(this).attr('data-id');
    Swal.fire({
        title: name + ' kullanıcısının yetkisini düzenle',
        input: 'select',
        inputOptions: {
            '0': 'Üye',
            '1': 'Admin',
            '2': 'Moderatör'
        },
        inputPlaceholder: 'Yetki seçin',
        showDenyButton: true,
        denyButtonText: `Hayır`,
        confirmButtonText: `Kaydet`,
        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
                if (value !== '') {
                    resolve();
                } else {
                    resolve('Lütfen bir yetki seçin.');
                }
            });
        }
    }).then(function (result) {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/g/UserVariableEdit?Id=' + id + '&Variable=' + result.value,
                dataType: 'json',
                success: function (response) {
                    if (response.Status) {
                        Swal.fire('', name + ` adlı üyenin yetkileri başarıyla güncellendi.`, 'success').then((result) => { if (result.isConfirmed) { location.href = '/'; } });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            text: response.Message
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        text: 'İşlem başarısız.'
                    });
                }
            });
        }
    });
});