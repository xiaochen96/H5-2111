class Reg {
    constructor() {
        this.input = document.querySelectorAll('.txt1');
        this.btn = document.querySelector('.txt2');
        this.tips = document.querySelectorAll('.tips')
        //console.log(this.tips);
        //console.log(this.input, this.btn);
        this.regular();
        // this.click();
    }
    //input框正则判断
    regular() {
        let name = this.input[0];
        let password = this.input[1]
        let confirm = this.input[2];
        //手机号正则  
        let telReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        //邮箱正则
        let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        //密码正则   表示长度为6-16位包含数字+字母，可以包含或不包含特殊符号的密码
        let pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$]{6,16}$/;

        //当input失去焦点时判断input值是否满足条件
        //用户名框
        name.onblur = async () => {
            //console.log(emailReg.test(name.value));
            if (telReg.test(name.value) || emailReg.test(name.value)) {
                //先发送ajax获取json里的数据，查看是否有存在的name，存在则终止代码
                let data = await axios.get('http://localhost:3000/userInformation', {})
                console.log(data);
                
                 if (data.data.some(user => {
                         //console.log(user.name);
                         //console.log(name.value);
                         if (name.value == user.name) {
                             return true;
                         }
                     })) { //用户存在
                     //console.log(this.tips[0]);
                     this.tips[0].innerHTML = '该用户名已存在';
                     this.tips[0].classList.add('block');
                     this.tips[0].style.color = 'red';
                 } else {
                     this.tips[0].innerHTML = '恭喜你，该用户名可用！';
                    //  this.tips[0].classList.add('block');
                     this.tips[0].style.color = 'green';
                     this.tips[0].style.visibility = 'visible';
                    //  return true;
                 }
                // 
            } else {
                //console.log(this.tips);   //每一步记得打印，打印出真相！
                //this.tips.classList.add('block')
                this.tips[0].innerHTML = '*请输入正确的邮箱或手机号格式*';
                this.tips[0].classList.add('block')
                this.tips[0].style.color = 'red';
            }
        }
        name.onfocus = () => {
            this.tips[0].innerHTML = '';
            this.tips[0].classList.remove('block');
        }
        //密码框
        password.onblur = () => {
            if (pwReg.test(password.value)) {
                return true;
            } else {
                this.tips[1].classList.add('block');
            }
        }
        password.onfocus = () => {
            this.tips[1].classList.remove('block');
        }
        //确认密码框
        confirm.onblur = () => {
            if (confirm.value == password.value) {
                return true;
            } else {
                this.tips[2].classList.add('block');
            }
        }
        confirm.onfocus = () => {
            this.tips[2].classList.remove('block');
        }
        //判断三个input框都为真,调用注册方法
        //console.log(this.btn);
        this.btn.onclick = () => {
            console.log(document.querySelector(`.banner-box-con`))
            if (!document.querySelector(`.banner-box-con`).querySelector(`.block`)) {
                this.click();
                //console.log('ok')
            } else {
                console.log('error');
            }
        }

    }
    //当点击注册时先获取input数据
    click() {
        let name = this.input[0].value;
        let password = this.input[1].value;
        let confirm = this.input[2].value;
        //console.log(confirm,password,name);

        //发送ajax之前先判断是否有值为空，没有就不发送，终止代码
        if (!name.trim() || !password.trim() || !confirm.trim()) return;

        //先发送ajax获取json里的数据，查看是否有存在的name，存在则终止代码
        // let data = await axios.get('http://localhost:3000/userInformation', {})
        //console.log(data);
        // .then(function ({data}) {
        //console.log(data);
        // if (data.data.some(user => {
        //         //console.log(user.name);
        //         if (name == user.name) {
        //             return true
        //         }

        //     })) {
        //     alert('该用户已存在');
        // } else {
        axios.post('http://localhost:3000/userInformation', {
                name: name,
                password: password,
                confirm: confirm
            })
            .then(function (response) {
                alert('注册成功')
                location.href = "./login.html"
            })
            .catch(function (error) {
                console.log(error);
            });
        // }

    }
}
new Reg;