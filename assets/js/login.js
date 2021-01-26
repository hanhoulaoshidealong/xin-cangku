$(function () {
    $('#gotoRegi').click(function () {
        //显示注册页面
        $('.regiBox').show()
        //隐藏登录页面
        $('.loginBox').hide()
    })
    //去登陆
    $('#gotoLogin').click(function () {
        //显示注册页面
        $('.regiBox').hide()
        //隐藏登录页面
        $('.loginBox').show()
    })

    let form = layui.form;
    //表单自定义校验规则
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        repass: function (value,item) {
            let pwd =  $('.regiBox [name=password]').val()

            if(value !== pwd){
                return '密码不一致'
            }

        }
      });  

     

      $(".regiBox form").on('submit',function (e) {
          e.preventDefault()
          let data = $(this).serialize()
        

          axios.post('/api/reguser ',data).then((res) => {
             if (res.data.status !== 0) {
                 return layer.msg(res.data.message);                 
             }
               layer.msg('注册成功,请登录')
               $('#gotoLogin').click()
          })
      })

      $(".loginBox form").on('submit',function (e) {
        e.preventDefault()

        let data = $(this).serialize()  

        axios.post('/api/login',data).then((res) => {
           console.log(res); 
           if (res.data.status !== 0) {
               return  layer.msg(res.data.message)
           }

           localStorage.setItem('token',res.data.token)

           layer.msg('登录成功,即将跳转', function(){
            location.href = '/home/index.html'
          }); 
        })
    })
})
