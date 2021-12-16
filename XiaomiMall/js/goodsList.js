class Goods{
    constructor() {
        //获取元素
        this.list = document.querySelector('#list');
        this.getGoods();
    }
    //获取商品信息追加到页面中
    async getGoods() {
        //直接发送ajax获取json数据
        let data = await axios.get({
            url: './data/goodsList2.json'
        })
        //console.log(data);//拿到所有数据为一个数组
        //遍历数组拿到里面的数据
        let html = '';
        data.forEach(goods => {
            //console.log(goods.image);//就已经获取到name等数据了，直接拼接html结构
            html += `   <div class="goods">
            <a href="#"><img src="${goods.image}" alt=""></a>
            <h3 class="title">
                <a href="#">${goods.name}</a>
            </h3>
            <p class="desc">${goods.desc}</p>
            <p class="price">
                <strong>${goods.price}</strong>元<span>起</span><del>${goods.del}元</del>
            </p>
        </div>`
        });
        console.log(html);
        this.list.innerHTML = html;
    }

}
new Goods;