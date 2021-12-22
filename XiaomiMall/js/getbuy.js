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
        this.box1RealTop = this.getRealPosition(this.box1, 'Top')
        this.box1RealLeft = this.getRealPosition(this.box1, 'Left')
    }
    getRealPosition = (ele, key) => {
        if (ele.parentElement) {
            const realPostion = ele.parentElement ?.tagName === 'BODY' ? 0 : ele[`offset${key}`]
            // if (key === 'Top') {
            //     console.log(realPostion, ele, ele.parentElement.tagName, ele.offsetParent)

            // }
            return this.getRealPosition(ele.parentElement, key) + realPostion
        }
        return ele[`offset${key}`]

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
            //console.log('box:', this.box1RealLeft, this.box1RealTop);
            //console.log('box1', this.box1.offsetLeft, this.box1.offsetTop, )
            //获取鼠标坐标
            let x = e.pageX - this.box1RealLeft - this.mouse.offsetWidth / 2;
            let y = e.pageY - this.box1RealTop - this.mouse.offsetHeight / 2
            //console.log('M:', e.clientX, e.clientY)
            //console.log(x, y)
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
setTimeout(() => {
    new Big;
}, 100);
/*******渲染商品信息******/
//获取地址中的id，发送ajax获取json数据中对应id的商品数据，渲染到页面中
async function render() {
    //先拿到地址栏中的id
    let href = location.href;
    //console.log(href);
    let arr = href.split('?')[1];
    //console.log(arr);
    let id = arr.split('=')[1];
    //console.log(id);
    //发送ajax，渲染页面
    let data = await axios.get({
        url: './data/goodsList2.json'
    })
    //console.log(data);
    let content = document.querySelector("#content")
    //console.log(body);
    //console.log(content);
    let html = '';
    data.forEach(goods => {
        //console.log(goods.images[0]);
        //console.log(goods.id);
        if (goods.id == id) {
            html += `            <div class="getbuy-middle ">
                <div class="w">
                    <ul>
                        <li>${goods.title}</li>
                        <li>|</li>
                        <li>${goods.name}</li>
                    </ul>
                    <div class="get-buy-right fr">
                        <ul>
                            <li>概述</li>
                            <li>|</li>
                            <li>参数</li>
                            <li>|</li>
                            <li>相机研发揭秘</li>
                            <li>|</li>
                            <li>F码通道</li>
                            <li>|</li>
                            <li>咨询客服</li>
                            <li>|</li>
                            <li>用户评价</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 放大镜 -->
            <div class="w bigDade">
                <div id="loupe">
                    <div class="pic">
                        <img src="${goods.images[0]}" alt="">
                        <div class="mouse"></div>
                    </div>
                    <ul class="picList">
                        <li><img src="${goods.images[0]}" alt=""></li>
                        <li><img src="${goods.images[1]}" alt=""></li>
                        <li><img src="${goods.images[2]}" alt=""></li>
                        <li><img src="${goods.images[3]}" alt=""></li>
                        <li><img src="${goods.images[4]}" alt=""></li>
                    </ul>
                    <div id="big">
                        <img src="${goods.images[0]}" alt="">
                    </div>
                </div>
                <div class="getbuy-middle-right">
                    <div class="getbuy-middle-box1">
                        <h3>${goods.name}</h3>
                        <p>${goods.desc}</p>
                        <em>小米自营</em><br>
                        <em class="goodPrice">${goods.price_max}</em>
                    </div>
                    <div class="getbuy-middle-box2">
                        <h4>选择颜色</h4>
                        <span>陶瓷黑</span>
                        <span>透明版</span>
                        <span>亮银版</span>
                    </div>
                    <div class="getbuy-middle-box3">
                        <h4>选择版本</h4>
                        <span>8G+256G</span>
                        <span>8G+128G</span>
                        <span>12G+256G</span>
                    </div>
                    <div class="buy-box1">
                        <button class="buy-button" id="${goods.id}" onclick="addCart(${goods.id},1)">加入购物车</button>
                        <button class="buy-like">我喜欢</button>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="footer-top w">
                    <ul>
                        <li><img src="img/icon01_03.png" alt=""><em>预约维修服务</em></li>
                        <li>|</li>
                        <li><img src="img/icon01_05.png" alt="">七天无理由退货</li>
                        <li>|</li>
                        <li><img src="img/icon01_07.png" alt="">15天免费换货</li>
                        <li>|</li>
                        <li><img src="img/icon01_09.png" alt="">满99元包邮</li>
                        <li>|</li>
                        <li><img src="img/icon01_09.png" alt="">520余家售后网点</li>
                    </ul>
                </div>
                <div class="footer-middle w">
                    <!-- 帮助中心 -->
                    <dl>
                        <dt>帮助中心</dt>
                        <dd>账户管理</dd>
                        <dd>购物指南</dd>
                        <dd>订单操作</dd>
                    </dl>
                    <dl>
                        <dt>服务支持</dt>
                        <dd>售后政策</dd>
                        <dd>自助服务</dd>
                        <dd>相关下载</dd>
                    </dl>
                    <dl>
                        <dt>线下门店</dt>
                        <dd>小米之家</dd>
                        <dd>服务网点</dd>
                        <dd>授权体验店</dd>
                    </dl>
                    <dl>
                        <dt>关于小米</dt>
                        <dd>了解小米</dd>
                        <dd>加入小米</dd>
                        <dd>投资者关系</dd>
                        <dd>企业社会责任</dd>
                        <dd>廉洁举报</dd>
                    </dl>
                    <dl>
                        <dt>关注我们</dt>
                        <dd>新浪微博</dd>
                        <dd>官方微信</dd>
                        <dd>联系我们</dd>
                        <dd>公益基金会</dd>
                    </dl>
                    <dl>
                        <dt>特色服务</dt>
                        <dd>F码通道</dd>
                        <dd>礼物码</dd>
                        <dd>防伪查询</dd>
                    </dl>
                    <div class="footer-middle-right ">
                        <div class="spacer">
                        </div>
                        <h2>400-100-5678</h2>
                        <p>8:00-18:00 (仅收市话费)</p>
                        <a href="#">人工客服</a>
                        <em>关注小米<img data-lazy-src="img/img_03.png" alt=""><img data-lazy-src="img/img_04.png"
                                alt=""></em>
                    </div>
                </div>
            </div>`
        }
    });
    content.innerHTML = html;
}
render();



/********加入购物车*********/
function addCart(id, num) {
    //console.log(111,id,num);
    //先获取local里的数据，查看购物车是否已有数据
    let cartGoods = localStorage.getItem('cart')
    //判断有没有
    if (cartGoods) { //如有
        //解析当前数据
        cartGoods = JSON.parse(cartGoods);
        //遍历数据
        for (let attr in cartGoods) {
            //存在则修改数量
            attr == id && (num = num + cartGoods[attr]);
        }
        //修改数量，不存则添加
      cartGoods[id] = num;
      localStorage.setItem('cart', JSON.stringify(cartGoods))
    } else {
        //如果没有数据
      cartGoods = { [id]: num };
      localStorage.setItem('cart', JSON.stringify(cartGoods))
    }
    
    location.href = './cart.html';
}
