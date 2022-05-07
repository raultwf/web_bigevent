$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        'repwd': function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '输入两次密码不一致！';
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var url = '/api/reguser';
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post(url, data, function(res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录。');
            $('#link_login').click();
        })
    })

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgzMCwidXNlcm5hbWUiOiJhYTk5OSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjUxODI1NTIyLCJleHAiOjE2NTE4NjE1MjJ9.ODfRaLRdvIJLSzpnW683epILC3mYqYoCkKpVJrX_Px0
    $('#form_login').submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: data,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                // console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        })
    })
})