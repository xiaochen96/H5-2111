/******轮播图*****/
//获取元素
let container = document.querySelector('.carousel-inner');
let pic = container.children;
// console.log(pic[2]);
let next = document.querySelector('.container .next');
let prev = document.querySelector('.container .prev');
let circleBtn = document.querySelector('.carousel-btn');
//console.log(next,prev,circleBtn);
//动态创建小圆圈按钮，并给第一个按钮设置背景
function setBtn() {
    //遍历创建li
    for (var i = 0; i < pic.length; i++) {
        var li = document.createElement('li');
        circleBtn.appendChild(li);
    }
    //给第一个小圆圈设置背景
    circleBtn.children[0].className = 'active';
    //把第一张图片复制一张给最后面 表示不仅复制了li标记，还把它里面的图片复制了
    let first = pic[0].cloneNode(true);
    container.appendChild(first);
}
setBtn();
let btn = circleBtn.children;
//点击按钮切换图片
function picSwitching() {
    //点击按钮切换图片并且有动画
    for (let i = 0; i < btn.length; i++) {
        //给每一个小按钮自定义属性
        //console.log(btn[i]);
        btn[i].setAttribute('index', i);
        //绑定点击事件
        btn[i].onclick = function () {
            //获取之前的自定义属性
            let index = this.getAttribute('index');
            //当点击按钮时，把它的下标给到右侧按钮，实现同步操作
            //让下标进行关联
            num = index;
            circle = index;
            //排他思想
            for (let j = 0; j < btn.length; j++) {
                btn[j].className = '';
            }
            this.className = 'active';
            //调用动画函数，每一张图片的宽度就是每次动画要移动的距离
            animation(container, -pic[0].offsetWidth * index, 'left');
        }
    }
}
picSwitching();
//声明一个变量作为改变的下标
var num = 0;
var circle = 0;

//点击右侧按钮让图片进行切换
//使用开关的思路
let flag = true;
next.onclick = function () {
    if (flag) {
        flag = false;
        num++;
        //console.log(num);
        animation(container, -pic[0].offsetWidth * num, 'left', function () {
            //把判断条件放在回调函数，每次动画执行完毕后再进行
            //当num等于最后一张的下标的时候，马上让它跳回第一张
            if (num == pic.length - 1) {
                num = 0;
                container.style.left = 0;
            }
            flag = true;
        })
        circle++;
        if (circle > btn.length - 1) {
            circle = 0;
        }
        for (let j = 0; j < btn.length; j++) {
            btn[j].className = '';
        }
        btn[circle].className = 'active';
    }
}

//点击左侧按钮进行切换
prev.onclick = function () {
    if (flag) {
        flag = false;
        if (num == 0) {
            num = pic.length - 1
            //当跳转到第一张的时候，马上让它回到最后一张
            container.style.left = -pic[0].offsetWidth * num + 'px';
        }
        num--;
        animation(container, -pic[0].offsetWidth * num, 'left', function () {
            flag = true;
        })
        circle--
        if (circle < 0) {
            circle = btn.length - 1;
        }
        for (let j = 0; j < btn.length; j++) {
            btn[j].className = '';
        }
        btn[circle].className = 'active';
    }
}

let timer = null;
//自动轮播动画
function auto() {
    timer = setInterval(function () {
        next.onclick();
    }, 3000)
}
auto();
//当鼠标移入到banner容器里让轮播图动画停止
container.parentNode.onmouseover = function () {
    clearInterval(timer);
}
container.parentNode.onmouseout = function () {
    auto();
}


/*****小米倒计时******/

//获取节点
let hour = document.querySelector('.hour');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');
//console.log(hour, minute, second);
//设置将来的时间
let endDate = new Date('2021/12/25 00:00:00');
//先调用一次，加载页面出来后马上可以显示时间
djs();
//定时器获取动态时间
setInterval(djs, 1000);

function djs() {
    //拿到现在的时间
    let nowDate = new Date();
    //console.log(nowDate);
    //换算成总秒数
    //（未来时间 - 现在时间）得出总毫秒数
    // 除以1000换算成秒数
    let seconds = parseInt((endDate - nowDate) / 1000)
    //小时数
    let h = zero(parseInt(seconds / 3600 % 24));
    //分钟数
    let m = zero(parseInt(seconds / 60 % 60));
    //秒数
    let s = zero(parseInt(seconds % 60));
    //赋值给对应的节点
    hour.innerHTML = h;
    minute.innerHTML = m;
    second.innerHTML = s;
}
//补位封装（数字小于10时前面加上0）
function zero(num) {
    return num < 10 ? num = '0' + num : num
}
/*******header吸顶效果*******/
let header = document.querySelector('.header');
console.log(header);
//滚动事件
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //判断 超出40吸顶
    if (scrollTop >= 40) {
        header.style.position = 'fixed';
        header.style.top = 0;
    } else {
        header.style.position = '';
    }
}