    var swiper;
    var app = new Vue({
        el: '#app',
        data: {
            goods: [],
            carShow:false,
            shopcar:[],
            spec_current:[],
            delivery_price:0,
            start_price:0,
            xq_conter:[],
            enable:{
                class:'qsj',
                text:'去结算'
            },
            opening:'y'
        },
        // 计算值
        computed:{
            // 总打包费
            package_total:function(){
                var all = this.shopcar;
                var total = 0;
                if(all.length){
                    $(all).each(function(index, el) {
                        total += el.num * el.package_price;
                    });
                }
                return total;
            },
            total:function(){
                var all = this.shopcar;
                var total = 0;
                var package_total = 0;
                if(all.length){
                    $(all).each(function(index, el) {
                        total += el.num * el.price;
                        package_total += el.num * el.package_price;
                    });
                }

                if('y'== this.opening){
                    if(total == 0){
                        this.enable.class = '';
                        this.enable.text = '去结算';
                    }else{
                        if((total+package_total)>=this.start_price){
                            this.enable.class = 'qsj';
                            this.enable.text = '去结算';
                        }else{
                            this.enable.class = '';
                            this.enable.text = '起送价￥'+this.start_price;
                        }
                    }
                }else{
                    this.enable.class = '';
                    this.enable.text = '休息中';
                }
                var num=total+package_total

                return  (total+package_total).toFixed(2);
            },
            shopcar_num:function(){
                var all = this.shopcar;
                var num = 0;
                $(all).each(function(index, el) {
                    if(el.num >0){
                        num+=1;
                    }
                });
                return num;
            },
        },
        // 方法
        methods:{
            greet: function (event) {
                $(".masking").toggle();
            },
            // 打开规格弹窗
            spec: function (good) {
                this.spec_current = good;
                if(!this.spec_current.style_id){
                    this.spec_current.style_id = good.prostyle[0].id;
                }
                this.spec_current.num = this.get_spec_bought_num(good.id, this.spec_current.style_id);
                // 和localStorage 合并
                $(".mt_view").toggle();
            },
            // 选择某个规格
            set_spec:function(style,good){
                this.spec_current.style_id = style.id;
                this.spec_current.style_name = style.name;
                this.spec_current.price = style.price;
                this.spec_current.num = this.get_spec_bought_num(good.id, style.id);
                // 获取合并 当前购物车中的 规格商品数量
            },

            close:function (event){
                this.spec_current = [];
                $(".mt_view").toggle();
            },
           // 点击打开详情页面
            details:function(id,goods){
                $(goods).each(function(index,good){

                    if(id==good.id){
console.log(index);
                        swiper = new Swiper('.swiper-container', {
                            direction: 'horizontal',
                            slidesPerView: 1,
                           // initialSlide:index,
                            lazyLoading : true,
                            lazyLoadingInPrevNext : true,
                            lazyLoadingInPrevNextAmount : 2,
                            observer: true,
                            preloadImages: false,
                            prevButton:'.swiper-button-prev',
                            nextButton:'.swiper-button-next',
                            observeParents: true
                        });
                        swiper.slideTo(index)
                    }
                })

                this.xq_conter=goods;
                $(".shop-show").show();
            },
           // 去结算超过起送费，点击实现页面跳转
            jump:function(){
                if('n' == this.opening){
                    return false;
                }
                if(this.enable.class == ''){
                    return false;
                }
                if(app.total>7){
                    location.href='order.html'
                }
            },
            toggleShopCar:function(){
                this.data.carShow = !this.data.carShow;
            },
            get_spec_bought_num:function(good_id,style_id){
                var all = this.shopcar;
                var num = 0;
                $(all).each(function(index, el) {
                    if(el.index.indexOf(el.id+'|'+style_id+'|') !=-1){
                        num+= el.num;
                    }
                });
                return num;
            },
            // 获取规格商品的数量
            get_bought_spec_total_num:function(good_id){
                var all = this.shopcar;
                var spec_num = 0;
                $(all).each(function(index, el) {
                    if(el.id == good_id){
                        spec_num += el.num;
                    }
                });
                return spec_num;
            },
            spec_plus:function(good){
                this.plus(good);
                this.spec_current.num = this.get_spec_bought_num(good.id, this.spec_current.style_id);
            },
            spec_minuse:function(good){
                this.minuse(good);
                this.spec_current.num = this.get_spec_bought_num(good.id, this.spec_current.style_id);
            },
            plus:function(good){
                var id = good.id;
                var style_id = good.style_id || 0;
                var name=good.name||"";
                var attr = good.attr || '';
                var num = parseInt(num)|| 1;
                var all = this.read();
                var price = good.price||0;
                var exist = null;
                var exist_key;
                // 找之前购物车中已有商品 区分商品id、规格和属性
                // console.log($(all))
                $(all).each(function(i,v){
                    // console.log(v)
                    if(v.index == id+'|'+style_id+'|'+attr){
                        exist = v;
                        exist_key = i;
                    }
                });
                if(exist!=null){
                    exist.num += num;
                    all[exist_key] = exist;
                    // console.log(exist)
                }else{
                    all.push({
                        id:id,
                        index : id+'|'+style_id+'|'+attr,
                        name: good.name,
                        price:price,
                        style_id:good.style_id,
                        style_name:good.style_name,
                        package_price:good.package_price,
                        num: num,
                    });
                }
                // console.log(all);
                this.save(all);
                this.merge();
            },
            minuse:function(good){
                var id = good.id;
                var style_id = good.style_id || 0;
                var attr = good.attr || '';
                var num = num || 1;
                var all = this.read();
                var exist = null;
                // 找之前购物车中已有商品 区分商品id、规格和属性
                $(all).each(function(i,v){
                    if(v.index == id+'|'+style_id+'|'+attr){
                        exist = v;
                        exist_key = i;
                    }
                });
                if(exist){
                    exist.num -= num;
                    all[exist_key] = exist;
                    this.save(all);
                    this.merge();
                }
            },
            read: function (key) {
                var key = key || 'shopcar';
                if(key == 'shopcar'){
                    this.shopcar = JSON.parse(localStorage.getItem(key))||[];
                }
                return JSON.parse(localStorage.getItem(key))||[];
            },
            save:function(data, key){
                var key = key || 'shopcar';
                return localStorage.setItem(key, JSON.stringify(data));
            },
            clearCar:function(){
                localStorage.removeItem('shopcar');
                this.shopcar = [];
                this.merge();
            },
            // 合并购物车数量和列表数量
            merge:function(){
                var CarData = this.goods;
                var goods = this.read();
                // alert(goods);
                // console.log('CarData');
                // console.log(CarData);
                $(CarData).each(function(index, el) {
                    // alert(goods);
                    if(goods.length){
                        $(goods).each(function(i, good) {
                            if(good.id == el.id){
                                // alert(good.id);
                                // alert(good.num);
                                // alert(CarData[index].num);
                                CarData[index].num = good.num;
                                // alert(CarData[index].num);
                            }
                        });
                    }else{
                        CarData[index].num = 0;
                    }
                });
                this.goods = CarData;
            }
        },
    });

    $.getJSON('js/data.json', function(res){
        app.goods = res[0].shop;
        app.merge();
        console.log(app.goods);
        //var myscroll = new iScroll("wrapper",{ hScroll:false,useTransition:true,vScrollbar:false});
        // var myscroll = new iScroll("wrapper",{ hScroll:false,useTransition:true,vScrollbar:false});
        //var myscrol2=new iScroll("transition",{ hScroll:false,useTransition:true,vScrollbar:false});
    });
    //    监听滚动
    var liheight;
    setTimeout(function(){
        liheight=$('#trans li').height();
        // 调用懒加载方法
        $("img.lazy").lazyload({
            container: $("#transition")
        });
         // 菜品滚动分类高亮
        $('#transition').scroll(function(){
            var index =($(this).scrollTop()/liheight).toFixed(0);
            var cate_id=$("#trans li").eq(index).data("id");
            $(".box1 li").siblings('li').removeClass('liys');
            $(".box1 li[data-id="+cate_id+"]").addClass("liys")
        });
        //给菜品a标签添加唯一id(cateid)
        $('#trans li a').each(function(index, el) {
            var cate_id = '#'+$(el).data('name');
            if(!$(cate_id).length){
                $(el).attr('id', $(el).data('name'));
            }
        });
    },100);


    //点击分类定位到当前菜品
    $(".box1").on("click","li",function(){
        $(this).each(function () {
            liid=$(this).attr("data-id");
            location.href = 'index2.html#cate_'+liid;
            console.log('#cate_'+liid)
            $(this).siblings('li').removeClass('liys');
            $(this).addClass("liys");
        })
    });

    function hide(id){
        id.click(function(e){
            var oDragHandle = document.getElementById&&document.all ? event.srcElement : e.target;
            if(oDragHandle.id =="masking"){
                $(this).hide();
            }
            if(oDragHandle.id =="mt_view"){
                $(this).hide();
            }
        });
    }
    hide($(".masking"));
    hide($(".mt_view"));

    $(".swiper-close").on("click",function(){
        $(".shop-show").hide();
        var targetId = '#box2_'+$('ul.swiper-wrapper li:eq('+swiper.activeIndex+')').data('id');
        var name=$('ul.swiper-wrapper li:eq('+swiper.activeIndex+')').data('name');
        console.log(name)

        location.hash = targetId;
        $(".box1 li").siblings('li').removeClass('liys');
        $(".box1 li[data-id="+name+"]").addClass("liys")
    });