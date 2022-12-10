


 var userData = {
    lng: 105.764922,

    lat: 20.962093,

    nearly: true,

    district: '',

    province: '',

    districtText: '',

    provinceText: ''
}

var apiData = {};
// var config={domain:"https://api.cafedenam.com/OneF/BrandAwareness/public-api/",SecretKey:["77beaa7294514482b44762105c563e3d","l6H4DM4tWUCusr+p0hJf1vB1iR+TCMamwaQ8nYYQg3Y="],CompanyCode:"MSC",BrandCodes:"cafedenam",};
var config = {
    // domain: "http://m-optimize-public.apps.cloudhub.com.vn/onef/BrandAwareness/public-api/",
    domain: "https://mvui.masandistribution.vn/onef/BrandAwareness/public-api/",
    SecretKey: ["4d2adc2749dd4da7a79514e41ce5c481", "lZvLSWcQ7WYkn0Ny//3S3dDh23Wly9+CyhLJbO2ioQg="],
    CompanyCode: "MSC",
    BrandCodes: ["meatdeli"],
};
function API(d) {
    this.config = d;
    var c = new HMACClient(this.config.SecretKey[0], this.config.SecretKey[1]);
    this.Send = function(h, b, g, a) {
        c.Send(this.config.domain + h, b, g, a)
    }
}
var api = new API(config);


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
function calculateDistance(origin , des, callback){
    // var origin1 = new google.maps.LatLng(pos1.lat, pos1.lng);
    // var origin2 = 'Ho Chi Minh';
    // var destinationA = new google.maps.LatLng(pos2.lat, pos2.lng);
    // var destinationB = new google.maps.LatLng(pos2.lat, pos2.lng);
    // let service = new google.maps.DistanceMatrixService();

    let result = null;
    // for(let i = 0; i < des.length; i += 25){
    //     let desT = des.slice(i,i+25);

    //     service.getDistanceMatrix(
    //     {
    //         origins: origin,
    //         destinations: desT,
    //         travelMode: 'DRIVING',
    //         // transitOptions: TransitOptions,
    //         // drivingOptions: DrivingOptions,
    //         // unitSystem: UnitSystem,
    //         avoidHighways: true,
    //         avoidTolls: true,
    //     }, callbackFun.bind({des:desT}));
    // }

    for(let i = 0, length = des.length; i < length; i++){
        des[i].destination = {
            distance: {text: "", value: Math.round(getDistanceFromLatLonInKm(userData.lat, userData.lng, des[i].lat,des[i].lng) * 10)/10},
            duration: {text: "", value: 0}
        }
    }
    des.sort((a1 , a2) => a1.destination.distance.value - a2.destination.distance.value)
    
    let j = 0;
    
    callback(des);    

    function callbackFun(response, status){
           console.log(response)
        
         if (response.rows.length > 0) j += response.rows[0].elements.length
            for(let i = 0; i < this.des.length; i++){
                if(response.rows.length > 0 && response.rows[0].elements[i].status === 'OK'){
                    this.des[i].destination = response.rows[0].elements[i]
                }else{
                    j++;
                    this.des[i].destination = {
                        distance: {text: "", value: Math.round(getDistanceFromLatLonInKm(userData.lat, userData.lng, this.des[i].lat,this.des[i].lng) * 10)/10},
                        duration: {text: "", value: 0}
                    }
                }
            }
            if(j === des.length){
                callback(des)
            } 

        //     try{
           
        // }catch(e){
        //     console.log(e);
        // }



        // result.rows[0].elements = result.rows[0].elements.concat(response.rows[0].elements)
        // result.des = result.des.concat(this.des)
        

        // for(let i = 0; i < this.des.length; i++){
        //     this.des[i].destination = result.rows[0].elements[i]
        // }

        
    }
}
function searchTemplate(query){

    let $html = $($('#template2').html());
    $html.find('.address').css({flex:1});
    $html.find('.viewmap').attr('href',"https://www.google.com/maps/search/?api=1&query=" + query.lat +',' + query.lng)
    $html.find('.address p').html(query.OutletAddress)


    $html.find('.phone strong').after(query.OutletPhone)
    $html.find('.phone').attr('href','tel: ' + query.OutletPhone)
    if (query.destination.distance.text != "") $html.find('.km').html(query.destination.distance.text.replace(' ',''))
    else $html.find('.km').html(query.destination.distance.value + "km")
    return $html.prop('outerHTML');

    // return `<div class="item">
    //             <div class="address">
    //             <p>${query.OutletAddress} </p>
                
    //             <div class="phonebox">
    //                 <div class="phone"><strong>Äiá»‡n thoáº¡i: </strong>(+84)908307121</div>
    //                 <div class="viewmap">Xem báº£n Ä‘á»“</div>
    //             </div>

    //             <div class="phone"><div class="icon ct"><i class="fa fa-phone"></i></div></div>
    //             </div>
    //             <a class="icon"  target="_blank" href="">
    //                 <span>${query.destination.distance.text.replace(' ','')}</span>
    //                 <div ><i class="fa fa-location-arrow"></i></div>
    //             </a>
                
    //         </div>`
}




if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position) {
     userData.lat = position.coords.latitude
     userData.lng = position.coords.longitude
     search({length:10})
 }, function() {
    userData.nearly = false
    $('.filter-w .province ul li:first').click();
    search()
 });
}else{
    userData.nearly = false
    $('.filter-w .province ul li:first').click();
    search()
}


function search(params = {}, callback){

    callback = callback || function(a) {
        $('.filter-stores .result-list .inner .list').empty()


        let resultHead = $('.filter-stores .input-w .p-result');


        

        let num = a ? a.Result.length : 0;
        resultHead.find('.search-num').text(num)


        if(num === 0){
            $('.filter-stores .result-list .inner .note').show()
        }

        let textQuery = '';
        if(userData.nearly) {
            resultHead.find('.search-num').text(params.length);
            textQuery = ' '+ $('#nealyText').val();
            userData.nearly = false
        }
        else if(params.query) textQuery = ' ' + params.query
        else if(userData.districtText) textQuery = at_lang + ' ' + userData.districtText + ', ' + userData.provinceText
        else if(userData.provinceText) textQuery = at_lang + ' ' + userData.provinceText;

        resultHead.find('.search-text').text(textQuery) 

       if(a){
         $('.filter-stores .result-list .inner .note').hide()
            
            a.Result.map(e => {
            let arr = e.Location.split(',')
            e.lat = parseFloat(arr[0])
            e.lng = parseFloat(arr[1])
           })


           calculateDistance(
            [{lat: userData.lat,lng:userData.lng}] , 
            a.Result, 
            (res) => {
                if(res){
                    $('.filter-stores .result-list .inner .note').hide()
                    // res.sort((a1 , a2) => a1.destination.distance.value - a2.destination.distance.value)
                    if(params.length){
                        res = res.slice(0,params.length)
                    }
                    let list = '';
                    for(let i in res){
                        list += searchTemplate(res[i])
                    }


                    
                    $('.filter-stores .result-list .inner .list').html(list).append(
                        $('#template1').html())
                }

            })

       }else{
            $('.filter-stores .result-list .inner .note').show()
       }

        
       
    }

    api.Send("Outlet/GetAll", {

      "PageSize": 1000,

      "CompanyCode": "MSC",

      "query": params.query ? params.query : (userData.district ?  'VietNam_' + userData.province + '_' + userData.district : "VietNam_" + userData.province),

      "Filters": "",

      "BrandCodes": ["meatdeli"],

      "Longitude": userData.lng,

      "Latitude": userData.lat,       // truyá»n long-lat cá»§a user táº¡i thá»i Ä‘iá»ƒm search

      "Distance": "3000km"              //truyá»n bĂ¡n kĂ­nh mong muá»‘n, Ä‘Æ¡n vá»‹ nĂªn lĂ  â€œkmâ€

    }, callback , function(e, f, a) {
        console.log(e, f, a)
    });
}

$(document).ready(() => {
     $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
      }
      $.fn.fakeScrollBar = function(){
        this.removeClass('fake-scrollbar').removeAttr('style')
        this.scrollTop(0)
        
        let scrollHeight = this.get(0).scrollHeight;
        let height = this.height();
        
        if(scrollHeight > height){
          let rate = scrollHeight - height;
          let scrollBarHeight = height / scrollHeight * height;
          let offset = height - scrollBarHeight;

          let scrollTop = this.scrollTop() + (this.scrollTop()/rate)*offset;
          this.addClass('fake-scrollbar').attr('style','--scrollHeight:'+scrollHeight+'px;--scrollbar-height:' + scrollBarHeight + 'px;--scrollbar-top:'+ scrollTop  +'px');
          this.scroll(() => {
            let scrollTop = this.scrollTop() + (this.scrollTop()/rate)*offset;
            if(scrollTop <= scrollHeight - scrollBarHeight){
              this.addClass('fake-scrollbar').attr('style','--scrollHeight:'+scrollHeight+'px;--scrollbar-height:' + scrollBarHeight + 'px;--scrollbar-top:' + scrollTop  + 'px');
            }

          })
        }else{
            this.removeClass('fake-scrollbar').removeAttr('style')
        }
      }



    $('.filter-st .body ul').each((i,e) => {
        $(e).fakeScrollBar();
    })

    // $(document).on('click','.filter-st body ul li', function(){
    //     $('.filter-st .body ul').fakeScrollBar();
    // })



    if($('.storespage').length > 0){
        let timeoutSearch;

        $('.selectbox.province ul').empty();
        for(let i in address){
            console.log(address[i])
            let classN = ''
            if(i == 0){
                classN = 'active';
            }
            $('.selectbox.province ul').append('<li class="'+classN+'" data-query="'+address[i].value+'">'+address[i].province+'</li>')
        }

        $('.filter-stores .bleft .input input').keyup(function(e) {
            if(e.keyCode === 13){
                
            }
            let value = this.value.trim();
            if(value.length >= 3){
                $('.filter-stores .bleft .input').addClass('has-loading')
                if(timeoutSearch) clearTimeout(timeoutSearch)

                timeoutSearch = setTimeout(function(){
                    search({query:value})
                    $('.filter-stores .bleft .input').removeClass('has-loading')
                },1000)
            }
        })


        $('body').on('click','.filter-st.province ul li', function(){
            

            let value = $(this).data('query')
            if(userData.province === value) return;
            $('.filter-st.district .head .inner span').html($('#districtText').val())


            userData.province = value
            userData.provinceText = $(this).text()

            let province = address.find(e => e.value === value)


            $('.filter-st.district ul').empty()
            if(province){
                let list = ''
                for(let i in province.district){
                    list += `<li data-query="${province.district[i].value}">${province.district[i].text}</li>`
                }
                $('.filter-st.district ul').html(list)
            }

            userData.district = ''
            userData.districtText = ''
            search()
            $('.filter-st.district ul').each((i,e) => {
                console.log('demo')
                $(e).fakeScrollBar();
            })


        })
        $('body').on('click','.filter-st.district ul li', function() {
            userData.district = $(this).data('query')
            userData.districtText = $(this).text()
            search()
        })


        $('.btn-nearme').click(function(e){
            e.preventDefault();
            userData.nearly = true
            userData.district = ''
            userData.province = ''
            $('.filter-stores .bleft .input input').val('')
            $('.selectbox.province .head .inner span').html($('#provinceText').val())
            $('.selectbox.district .head .inner span').html($('#districtText').val())
            $('.selectbox.district ul').empty();
            search({length:10})
        })
    }
    
   
})