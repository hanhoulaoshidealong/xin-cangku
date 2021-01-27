$(function () {
    let form = layui.form;
   
    function getUserInfo() {
        axios.get('/my/userinfo').then((res) => {
            // console.log(res.data.data);
            //给表单赋值
            //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            form.val("form", res.data.data )
        })
    }
    getUserInfo()

    form.verify({
        nickname:function (value) {
            if (value.length > 6) {
                
                return '用户昵称长度需要在1-6个字符'
            }
        }
    })

    // 修改功能
    $('#form').on('submit',function (e) {
        e.preventDefault()
        let data = $(this).serialize()

        // console.log(data);

        axios.post('/my/userinfo',data).then((res) => {
            console.log(res);

            if (res.data.status !== 0) {
                return layer.msg('修改用户信息失败')
            }

            layer.msg('修改用户信息成功')

            window.parent.getUserInfo()
        })

    })

    // 重置功能
    $('#reseBtn').on('click',function (e) {
        e.preventDefault()
        
        getUserInfo()
    })
})