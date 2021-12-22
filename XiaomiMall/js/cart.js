/*********购物车*********/
class Cart {
    constructor() {
        this.getGoods();
    }
    /******获取购物车数据*******/
    async getGoods() {
        //先获取购物车'cart'
        let cartGoods = localStorage.getItem('cart');
        // console.log(cartGoods);
        //没有数据终止代码
        if (!cartGoods) return;
        //有数据拿到的是json字符串，转换成字符串格式
        cartGoods = JSON.parse(cartGoods)
        //console.log(cartGoods);  //{2: 7, 3: 6, 6: 1}
        //发送ajax获取商品信息
        let goods = await axios.get({
            url: './data/goodsList2.json'
        })
        //console.log(goods);
        let existsGoods = goods.filter(ele => {
            //console.log(ele);
            //console.log(cartGoods[ele.id]);
            return cartGoods[ele.id]
        });
        this.render(existsGoods, cartGoods)
    }
    /******渲染购物车页面*******/
    render(existsGoods, cartGoods) {
        //console.log(existsGoods, cartGoods);
        //遍历存在的商品信息
        let html = '';
        existsGoods.forEach(goods => {
            console.log(goods);
            html += `                            <div class="item-table J_cartGoods">
                                <div class="item-row clearfix">
                                    <div  class="col col-check">
                                        <input type="checkbox">
                                    </div>
                                    <div  class="col col-img"><a 
                                            href="javascript:void(0)"><img  alt=""
                                                src="${goods.images[0]}"
                                                width="80" height="80"></a></div>
                                    <div  class="col col-name">
                                        <div  class="tags">                                       
                                        </div>
                                        <h3  class="name"><a 
                                                href="javascript:void(0)">${goods.name}</a></h3>                                    
                                    </div>
                                    <div  class="col col-price">${goods.price_max}<p 
                                            class="pre-info">
                                        </p>
                                    </div>
                                <div  class="col col-num">
                                    <div  class="change-goods-num clearfix">
                                        <a href="javascript:void(0)">
                                            <i class="iconfont"></i>
                                        </a>
                                            <input  type="text" autocomplete="off" class="goods-num" value="${cartGoods[goods.id]}">
                                        <a href="javascript:void(0)">
                                            <i class="iconfont"></i>
                                        </a>
                                            <!---->
                                    </div>
                                </div>
                                    <div  class="col col-total">${goods.price_max * cartGoods[goods.id]}<p 
                                            class="pre-info">
                                            <!---->
                                        </p>
                                    </div>
                                    <div  class="col col-action"><a 
                                            href="javascript:void(0);" title="删除" class="del"><i 
                                                class="iconfont"></i></a></div>
                                </div>
                            </div>`
        });
        this.$('.item-box').innerHTML = html;
    }
    /******获取节点的方法******/
    $(ele) {
        return document.querySelector(ele);
    }
    $$(ele) {
        return document.querySelectorAll(ele);
    }
}
new Cart;