class Reg {
    constructor() {
        this.input = document.querySelectorAll('.txt1');
        this.btn = document.querySelector('.txt2');
        //console.log(this.input, this.btn);
        this.regular();
        // this.click();
    }
    //input框正则
    regular() {
        let name = this.input[0].value;
        let password = this.input[1].value;
        let confirm = this.input[2].value;
        //手机号正则  
        let telReg = /^1[3-9]\d{9}$/;
        //邮箱正则
        let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        //密码正则
        let pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        //当input失去焦点时判断input值是否满足条件
        name.onblur = () => {
            if (!telReg.test(name) || !emailReg.test(name)) {
                alert('请输入正确的 邮箱/手机号 格式!')
            } else {
                this.click();
            }
        }
        //密码框
        password.onblur = () => {
            
        }
        
    }
    //当点击注册时先获取input数据
    click() {
        this.btn.onclick = async () => {
            let name = this.input[0].value;
            let password = this.input[1].value;
            let confirm = this.input[2].value;
            //console.log(confirm,password,name);

            //发送ajax之前先判断是否有值为空，没有就不发送，终止代码
            if (!name.trim() || !password.trim() || !confirm.trim()) return;

            //先发送ajax获取json里的数据，查看是否有存在的name，存在则终止代码
            let data = await axios.get('http://localhost:3000/userInformation', {})
            //console.log(data);
            // .then(function ({data}) {
            //console.log(data);
            if (data.data.some(user => {
                    //console.log(user.name);
                    if (name == user.name) {
                        return true
                    }

                })) {
                alert('该用户已存在');
            } else {
                axios.post('http://localhost:3000/userInformation', {
                        name: name,
                        password: password,
                        confirm: confirm
                    })
                    .then(function (response) {
                        alert('注册成功')
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
}
new Reg;