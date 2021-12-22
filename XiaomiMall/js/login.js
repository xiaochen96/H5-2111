class login {
    constructor() {
        this.input = document.querySelectorAll('.banner-box-con input')
        //console.log(this.input[0], this.input[1], this.input[2]);
        this.onclick();
    }
    onclick() {
        //console.log(this.input[2]);
        let name = this.input[0];
        let password = this.input[1];
        this.input[2].onclick = async () => {
            //console.log(11);
            let data = await axios.get('http://localhost:3000/userInformation', {})
            //console.log(data.data);
            if (data.data.some(user => {
                    //console.log(user.name);
                    if (name.value == user.name && password.value == user.password) {
                        return true;
                    }
                })) {
                alert('登录成功!');
                location.href = './index.html';
            } else {
                alert('用户名和密码错误或者该用户名不存在!')
            }
        }
    }
}
new login;