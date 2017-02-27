$(".btn").find("button").click(function(){
    $(".yhq").hide();
})
   $(".sous").click(function(){
       $(".ssrq").css("display","block");
       $(".box").hide();
       $("#transition").hide()
       $("#wrapper").hide()
       $("#wrapper2").show()
        $("#wrapper2").css("width","100%");
        $(".shop-server").css("left","1.6rem")
         $(".shop-order").css("left","6rem");
    })
    $("#qx").click(function(){
        $(".ssrq").hide();
        $(".box").show();
        $("#transition").show()
       $("#wrapper").show()
       $("#wrapper2").hide()
       $('#search').val("");
       document.getElementById("poder").innerHTML="";
        $(".shop-order").css("left","11rem");
        $(".shop-server").css("left","7rem")
    });

var shop_data={ "id": "cxh","title":"","id": "cxh", }
   // setTimeout(chaxun,2000);

//加入购物车效果
   var shopCar = {
    shoping: function(options) {
        var self = $('.shop-shadow .price i'),
            $shop = $('.shop-gwc'),
            $num = $('.shop-gwc i'),
            add = $('.shop-name i')
        add2= $('.jia');



        var S = {
            init: function() {
                $('.box2').on('click','.jia',this.addShoping);
            },
            addShoping: function(e) {
                  e.stopPropagation();
                var data=$(this).attr("data-spec");
            if(data==1){}else{
                var $target = $(e.target),
              

                // var $target = $('.jia'),
                    
                    x = $target.offset().left,
                    y = $target.offset().top + 10,
                    X = $shop.offset().left + $shop.width() / 2 - $target.width() / 2 + 10,
                    Y = $shop.offset().top;
                $('#floatOrder').remove();
                if ($('#floatOrder').length <= 0) {
                    $('body').append('<div id="floatOrder"></div>');
                    var $obj = $('#floatOrder');
                    var $num = $('#car_num');
                    $obj.css(
                    {
                        'left': x,
                        'top': y
                    }).animate({
                        'left': X,
                        'top': Y - 20,
                        '-webkit-transform': 'rotate(360deg) scale(.1)',
                        'transform': 'rotate(360deg) scale(.1)'
                    }, 500, function() {

                        $num.animate({'-webkit-transform': 'scale(1.5)','transform': 'scale(1.5)'},100,function(){
                            $num.animate({'-webkit-transform': 'scale(1)','transform': 'scale(1)'},100);
                        });
                        num = Number($num.text());
                        /*$num.text(num + 1);*/
                        $obj.animate({
                            'top': Y - 20,
                            'opacity': 0
                        }, 500, function() {
                            $obj.remove();
                        });
                    });

                };
            }

            },

        };

        S.init();
    }
};
if($(".shop-shadow .price i,.add-icon").size()>0){
    shopCar.shoping();
}
else{
     shopCar.shoping();
}

/*购买数量*/


var zj=0;
var buyNum = {

    add:function(){
         var $num = $('.shop-gwc i');

        $(".box2").on("click",".jia",function(){
                num = Number($num.text());
                $num.text(num + 1);
                console.log("sss")
                var bnjia=$(this).prev(".num").val()-"";
                $(this).prev(".num").val(bnjia+1);console.log(bnjia)
                if (bnjia==0) {
                     $(this).prev(".num").prev(".jian").css("display","inline-block")
                }
                var pric=$(this).parent().prev().find(".pric").text();
                zj=zj+Number(pric);
                console.log($(this).parent().prev().find(".title").text())
                document.getElementById("prcnum").innerHTML=zj.toFixed(2);

           var id=$(this).parent().prev().find(".title").attr("data-id");
            var title=$(this).parent().prev().find(".title").text();
            var price=$(this).parent().prev().find(".pric").text();

            console.log(price)
            //storage.setItem(,$(this).parent().prev().find(".title").text());
            var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique,title,price,num)');
                tx.executeSql('INSERT INTO LOGS (id,title,price,num) VALUES ('+id+','+title+','+price+','+1+')');
            });
        });

        $("#wrapper2").on("click",".jia",function(){
            num = Number($num.text());
            $num.text(num + 1);
            $(this).prev(".jian").css("display","inline-block")
            var bnjia=$(this).prev(".num").val()-"";
            $(this).prev(".num").val(bnjia+1);
            if (bnjia==0) {
                console.log(bnjia)
                $(this).prev(".num").prev(".jian").css("display","inline-block")
            }
            var pric=$(this).parent().parent().prev().find(".price").text();
            zj=zj+Number(pric);
            document.getElementById("prcnum").innerHTML=zj.toFixed(2);
        });
        $(".mt_view").on("click",".jia",function(){
            num = Number($num.text());
            $num.text(num + 1);
            $(this).prev(".jian").css("display","inline-block")
            var bnjia=$(this).prev(".num").val()-"";
            $(this).prev(".num").val(bnjia+1);

            if (bnjia==0) {

                $(this).prev(".num").prev(".jian").css("display","inline-block")
            }
            var pric=$(this).parent().prev().find("i").text();
            zj=zj+Number(pric);
            console.log()
            document.getElementById("prcnum").innerHTML=zj.toFixed(2);
        });
        //购物车加
        $(".shop_gwc").on("click",".jia",function(){
            num = Number($num.text());
            $num.text(num + 1);
            $(this).prev(".jian").css("display","inline-block")
            var bnjia=$(this).prev(".num").val()-"";
            $(this).prev(".num").val(bnjia+1);

            if (bnjia==0) {

                $(this).prev(".num").prev(".jian").css("display","inline-block")
            }
            var pric=$(this).parent().prev().find("i").text();
            console.log($(this).parent().prev().find("i").text())
            zj=zj+Number(pric);
            console.log()
            document.getElementById("prcnum").innerHTML=zj.toFixed(2);
        });
    },
    sub:function(){
        $(".box2").on("click",".jian",function(){
            var bnjian=$(this).next(".num").val()-"";
            var $num = $('.shop-gwc i');
            var pro_id=$(this).parent(".add-icon").attr("data-id");
            console.log(pro_id);
            if(bnjian>1){
                $(this).next(".num").val(bnjian-1);  
            }
            else{
                $(this).hide();
                 $(this).next(".num").val("");
            }
            if(bnjian>0){
                 num = Number($num.text());
                 $num.text(num - 1);
                  var pric=$(this).parent().prev().find(".pric").text();
                   zj=document.getElementById("prcnum").innerText;
                zj=zj-Number(pric);
                document.getElementById("prcnum").innerHTML=zj.toFixed(2); ;
            }
        });
        $("#wrapper2").on("click",".jian",function(){
            var bnjian=$(this).next(".num").val()-"";
            var $num = $('.shop-gwc i');
            var pro_id=$(this).parent(".add-icon").attr("data-id");
            console.log(pro_id);
            if(bnjian>1){
                $(this).next(".num").val(bnjian-1);
            }
            else{
                $(this).hide();
                $(this).next(".num").val("");
            }
            if(bnjian>0){
                num = Number($num.text());
                $num.text(num - 1);
                var pric=$(this).parent().parent().prev().find(".price").text();
                zj=document.getElementById("prcnum").innerText;
                zj=zj-Number(pric);
                document.getElementById("prcnum").innerHTML=zj.toFixed(2); ;
            }
        });
        $(".mt_view").on("click",".jian",function(){
            var bnjian=$(this).next(".num").val()-"";
            var $num = $('.shop-gwc i');
            var pro_id=$(this).parent(".add-icon").attr("data-id");
            console.log(pro_id);
            if(bnjian>1){
                $(this).next(".num").val(bnjian-1);
            }
            else{
                $(this).hide();
                $(this).next(".num").val("");
            }
            if(bnjian>0){
                num = Number($num.text());
                $num.text(num - 1);
                var pric=$(this).parent().prev().find("i").text();
                zj=document.getElementById("prcnum").innerText;
                zj=zj-Number(pric);
                document.getElementById("prcnum").innerHTML=zj.toFixed(2); ;
            }
        });
        $(".shop_gwc").on("click",".jian",function(){
            var bnjian=$(this).next(".num").val()-"";
            var $num = $('.shop-gwc i');
            var pro_id=$(this).parent(".add-icon").attr("data-id");
            console.log(pro_id);
            if(bnjian>1){
                $(this).next(".num").val(bnjian-1);
            }
            else{
                $(this).hide();
                $(this).next(".num").val("");
            }
            if(bnjian>0){
                num = Number($num.text());
                $num.text(num - 1);
                var pric=$(this).parent().prev().find("i").text();
                zj=document.getElementById("prcnum").innerText;
                zj=zj-Number(pric);
                document.getElementById("prcnum").innerHTML=zj.toFixed(2); ;
            }
        });
    }
}

//    选择规格
$("#spid2").on("click","span",function(){
    $(this).each(function(){
        $(this).toggleClass('ys');
    });
})
//    关闭规格弹框
$("#spid2").on("click",".close",function(){
    $(".mt_view").css("display","none")
    $('#spid2').empty();
});

//详情页面规格选择事件

$("#spid").on("click","span",function(){
    $(this).each(function(){
        $(this).toggleClass('ys');
    });
})
if($(".jia").size()>0){
   
    buyNum.add();
}
if($(".jian").size()>0){
    buyNum.sub();
}

//商品查询时间
  function chaxun(){

        $('#search').bind('input propertychange', function() {
            //showpro(this.val())


            if( $('#search').val()==""){
             document.getElementById("poder").innerHTML="";
            }else {
                cx();
 
            }
        });

        function cx() {
            $.ajax({
                url: 'js/data.json',
                type: 'GET',
                success: function(res){
                    var list=res.list;
                    var html=''
                    for(var i=0;i<list.length;i++){
                        var e=list[i];
                         var src=' <li> <div class="pic"><img src="'+e.pic_url+'" alt=""></div>\
                                <span class="text">\
                                     <div class="title" style="margin-bottom:0.3rem;"><i>荐</i>'+ e.name+'</div>\
                                    <div class="price">¥'+e.price+'</div>\
                              </span>\
                        <div class="add-icon" data-id="1"><i class="jian"></i><input type="text" class="num" value="" disabled="disabled"><i id="cs"class="jia"></i></div></li>';
                        html=html+src;
                    }
                  document.getElementById("poder").innerHTML=html;
                }
            })
            $("#cs").click(function(){
                alert(123)
            })
        }        
    }
    chaxun();



var Lazy = {
    "Img": null,
    "getY": function(b) {
        var a = 0;
        if (b && b.offsetParent) while (b.offsetParent) a += b.offsetTop, b = b.offsetParent; else b && b.y && (a += b.y);
        return a;
    },
    "getX": function(b) {
        var a = 0;
        if (b && b.offsetParent) while (b.offsetParent) a += b.offsetLeft, b = b.offsetParent; else b && b.x && (a += b.X);
        return a;
    },
    "scrollY": function() {
        var a = document.documentElement;
        return self.pageYOffset || a && a.scrollTop || document.body.scrollTop || 0;
    },
    "scrollX": function() {
        var a = document.documentElement;
        return self.pageXOffset || a && a.scrollLeft || document.body.scrollLeft || 0;
    },
    "windowWidth": function() {
        var a = document.documentElement;
        return self.innerWidth || a && a.clientWidth || document.body.clientWidth;
    },
    "windowHeight": function() {
        var a = document.documentElement;
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight;
    },
    "CurrentHeight": function() {
        return Lazy.scrollY() + Lazy.windowHeight();
    },
    "CurrentWidth": function() {
        return Lazy.scrollX() + Lazy.windowWidth();
    },
    "Load": function(d) {
        Lazy.Init();

        var f = Lazy.CurrentHeight(), b = Lazy.CurrentWidth();
        for (_index = 0; _index < Lazy.Img.length; _index++) {

            var a = Lazy.Img[_index];
            $(a).attr("lazy") == undefined && $(a).attr("lazy", "n");
            if($(a).attr("lazy") == "y") continue;
            /*$(a).bind("error", function() {
             this.id == "subject" ? $(this).attr("src", "") : $(this).attr("src", "http://wap.cmread.com/rbc/p/content/repository/ues/image/s109/nopic.png");
             });*/
            if (d == undefined || d == "" || d == null) {

                var c = Lazy.getY(a), e = Lazy.getX(a);
                //e < b && c < f && (a.src = a.getAttribute("data-src"), $(a).attr("lazy", "y"), a.removeAttribute("data-src"));
                c < f && (a.src = a.getAttribute("data-src"), $(a).attr("lazy", "y"), a.removeAttribute("data-src"));
                $(a).attr("data-rel",e);

            } else if (d == "x") {

                var c = Lazy.getX(a);
                c < b && (a.src = a.getAttribute("data-src"), $(a).attr("lazy", "y"));

            }

        }

    },
    "Init": function() {
        var a = document.querySelectorAll("img[data-src]");
        Lazy.Img = a;
    }
};
var page = {
    "Load": function() {
        if(Lazy.scrollY()+Lazy.windowHeight()==document.body.scrollHeight){
            //alert("底部加载");
        }
    }
};
document.onscroll = function(){Lazy.Load();page.Load();};
setTimeout(function(){Lazy.Load();},100);





