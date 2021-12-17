/******商品放大镜效果******/
class Big {
    constructor() {
        this.box1 = document.querySelector('.pic');
        this.box2 = document.querySelector('#big');
        this.mouse = document.querySelector('.mouse');
        this.img1 = document.querySelector('.pic>img');
        this.img2 = document.querySelector('#big>img');
        this.li = document.querySelectorAll('.picList>li')
        //console.log(this.li);
        // console.log(this.box1,this.box2,this.mouse,this.img1,this.img2,this.li);
        this.init();
    }
    init() {
        this.switch();
        this.over();
        this.out();
        this.move();
    }
    //点击换图
    switch () {
        let that = this;
        for (let i = 0; i < this.li.length; i++) {
            this.li[i].onclick = function () {
                //当点击li时，把li下面img路径赋给img1，img2
                //console.log(this.children[0]);
                that.img1.src = this.children[0].src;
                that.img2.src = this.children[0].src;
            }
        }
    }
    //当鼠标移入时，mouse和box2出现
    over() {
        this.box1.onmouseover = () => {
            this.mouse.style.display = 'block';
            this.box2.style.display = 'block';
        }
    }
    //当鼠标移出是隐藏
    out() {
        this.box1.onmouseout = () => {
            this.mouse.style.display = '';
            this.box2.style.display = '';
        }
    }
    //当鼠标移入到box1时让mouse进行跟随
    move() {
        this.box1.onmousemove = (e) => {
            e = e || window.event;
            //console.log(e.clientX,e.clientY);
            //获取鼠标坐标
            var x = e.clientX - this.box1.offsetLeft - 145- this.mouse.offsetWidth / 2;
            var y = e.clientY - this.box1.offsetTop -85 - this.mouse.offsetHeight /2
            //console.log(x,y);
            //做边界判断，让mouse只能在box1里移动
            if (x < 0) {
                x = 0
            } else if (x > this.box1.offsetWidth - this.mouse.offsetWidth) {
                x = this.box1.offsetWidth - this.mouse.offsetWidth
            }
            if (y < 0) {
                y = 0
            } else if (y > this.box1.offsetHeight - this.mouse.offsetHeight) {
                y = this.box1.offsetHeight - this.mouse.offsetHeight
            }
            //给mouse位置进行赋值
            this.mouse.style.left = x + 'px';
            this.mouse.style.top = y + 'px';
            //console.log(x, y);

            //计算鼠标移动比
            let w = x / (this.box1.offsetWidth - this.mouse.offsetWidth);
            let h = y / (this.box1.offsetHeight - this.mouse.offsetHeight);

            this.img2.style.left = -w * (this.img2.offsetWidth - this.box2.offsetWidth) + 'px'
            this.img2.style.top = -h * (this.img2.offsetHeight - this.box2.offsetHeight) + 'px'
        }

    }
}
new Big;