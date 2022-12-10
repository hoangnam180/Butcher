/*
  ERROR CODE:
  1: Sai số điện thoại,
  2: Vượt điểm giới hạn cho số điện thoại, limit
  

*/

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      callback({lat: position.coords.latitude , lng: position.coords.longitude})
    });
  } else { 
    callback()
  }
}


(function ($) {

  $.fn.collapse = function(options) {

        var settings = $.extend({
        }, options);


        this.on('click',function(e){
            e.preventDefault();
            let $this = $(this),
                $sub = $this.next(),
                $parent = settings.$parent || $this.parent();
            
            if($sub.hasClass('slide-show')){
                $parent.find('.active').removeClass('active');
                $parent.find('.slide-show').slideUp(300).removeClass('slide-show');

                
            }else{
               
                $parent.find('.active').removeClass('active');
                $parent.find('.slide-show').slideUp(300).removeClass('slide-show');
                $sub.addClass('slide-show');
                $this.addClass('active');
                $sub.slideDown(300);
            }
        })


        

    }
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


  $.fn.validate = function(options = {}){
        let { fields, error, message, before  } = options;
        let _self = this;

        if(!error){
            error = (note, $input ) => {
                $input.closest('.form-group').addClass('error').append('<div class="error-note">'+note+'</div>')
            }
        }

        fields = fields || {};
        message = message || {};
        before = before || {};
        
        let $value = this.find('[name]');

        let response = {};


        this.find('.form-group.error, .form-group .error').removeClass('error').find('.error-note').remove();
        $value.each((i,el) => {
            let $el = $(el),
                val = $el.val().trim(),
                name = $el.attr('name'),
                tagName = $el.prop('tagName'),
                type = $el.attr('type');
        
            
            

            !fields[name] && (fields[name] = {});
            !message[name] && (message[name] = {});

            if(!message[name].required){
                message[name].required = 'Trường này không được để trống';
            }



            
            
            $el.hasClass('required') && (fields[name].required = true);
            

            if(fields[name].required && !val){
                error(message[name].required,$el);
                return;
            }
            
            if(before[name]){
                val = before[name](val);
            }

            if(pattern = fields[name].pattern){
                message[name].pattern = message[name].pattern || 'Không đúng pattern';
                let test = pattern.test(val);
                if(!test){
                    error(message[name].pattern,$el);
                    return;
                }
            }


            if(type === 'radio' || type === 'checkbox'){
                if($el.is(':checked')){
                    response[name] = val;
                }
            }else{
                response[name] = val;
            }

        })
        return response;
    }


  $.fn.event = function(options){
      for(let i in options){
          // var result = i.match(/(?<={+).*?(?=})/gs);
          var result = i.match(/{.*?}/gs);
          if(result){
              result = result[0].replace(/{|}/gi,'').trim().split(' ');
              let t = i.replace(/{.*?}/gs,'');
              for(let j in result){
                  this.find(t).on(result[j], options[i])
              }
          }else{
              this.find(i).on('click', options[i])
          }
          
      }
  }
}( jQuery ))

$(window).on('load',() => {

  setTimeout(() => {
    $('body').css({'--device-width': window.innerWidth,
          '--device-width-px': window.innerWidth + 'px'})
  },1000)
})

var mapcenter = [105.8209745,21.0282429];


var userData = {
    // lng: 105.764922,

    // lat: 20.962093,
    lng: null,

    lat: null, 
    nearly: true,

    district: '',

    province: '',

    districtText: '',

    provinceText: ''
}





let $control = $('.map .control'),
    $controlLocation = $control.find('.location'),
    marker,
    $popup = $('.map [class^="popup"]'),
    $popupNote = $('.map .popup-note'),
    $popupPointAddress = $('.map .popup-point-address'),
    $popupChooseLocationAgain = $('.map .popup-choose-location-again'),
    $popupListing = $('.map .popup-listing'),
    $popupInfo = $('.map .popup-info'),
    $popupSuccess = $('.map .popup-success'),

    $popupLimitPhone = $('.map .popup-vuot-muc-phone'),
    $popupLimitSession = $('.map .popup-vuot-muc-session'),
    $popupLimit0 = $('.map .popup-limit-0'),
    $popupTerm = $('.popup-term'),
    $popupFirst = $('.popup-picklocation'),

    $popupConfirm = $('.map .popup-confirm'),
    $popupError = $('.map .popup-error'),
    add_markers = new Array(),
    map;


let $popupClose;

function popup($popupShow){
  if($popupClose){
    $popupClose.removeClass('active');
    $popupClose = null;
  }

  if($popupShow){
    $popupShow.addClass('active');
    $popupClose = $popupShow;
    $('body').addClass('overlay-disabled')
  }else{
    $('body').removeClass('overlay-disabled')
  }
  
  
}


function updateLocationText(lat,lng, mar, flash = false){
  $controlLocation.html(lng.toFixed(5) + ', ' + lat.toFixed(5));
  if(!$control.hasClass('active')){
    $control.addClass('active');
  }

  if(flash){
    $control.addClass('flash');
    setTimeout(() =>  $control.removeClass('flash'),1000)
  }
  
  add_markers.map( e => $(e._element).find('.blue').removeClass('blue'))
  
  
  marker = mar;
  let _e = $(marker._element);
  _e.find('span').addClass('blue');
}




function provinceClick(){
   console.log('click');

    let value = $(this).data('query')
    if (userData.province === value) return;
    $('.filter-custom .district .head .inner span').html($('#districtText').val())

    let text = $(this).text();
    userData.province = value
    userData.provinceText = text

    let province = address.find(e => e.value === value)


    $('.filter-custom .district ul').empty();
    let $filterCustom = $(this).closest('.filter-custom');

    if (province) {
        let list = ''
        for (let i in province.district) {
            list += `<li data-latlng="${JSON.stringify(province.district[i].geolocation)}" data-query="${province.district[i].value}">${province.district[i].text}</li>`
        }
        

        $('.filter-custom').attr('data-province',text).attr('data-district','');
        $('.filter-custom .district ul').html(list)
        $('.filter-custom .district ul li').on('click', districtClick)
        $('.filter-custom .province .head .inner span').html($(this).html());

        if($filterCustom.hasClass('map-refresh')){
          
          mapcenter = JSON.parse($(this).attr('data-latlng'))
          if(map){
            map.flyTo({center: mapcenter});
          }
          userData.district = ''
          userData.districtText = ''
          $('.filter-custom .body ul').each((i,e) => {
            $(e).fakeScrollBar();
          })
        }else{
          // $filterCustom.find('.district ul').html(list)
          // $filterCustom.find('.district ul li').on('click', districtClick)
          // $filterCustom.find('.province .head .inner span').html($(this).html());
          
        }


        
    }
    

    

    
   

    
}

let oldData;
function checkOldData(newData){
  if(!oldData) return false;
  for(let i in newData){
    if(newData[i] != oldData[i]){
      return false;
    }
  }

  return true;
}

function districtClick(){
  

  let $filterCustom = $(this).closest('.filter-custom');
  let value = $(this).data('query');
  let text = $(this).html();
  $('.filter-custom').attr('data-district',text)
  $('.filter-custom .district .head .inner span').html(text);
  $filterCustom.attr('data-district',$(this).text())
  if($filterCustom.hasClass('map-refresh')){
    userData.district = value
    userData.districtText = $(this).text()
    
    console.log($(this).attr('data-latlng'))
    map.flyTo({ center: JSON.parse($(this).attr('data-latlng')),zoom: 14});
  }else{
    // $filterCustom.closest('.district .head .inner span').html($(this).html());
    
    // choiseAddress.district = $(this).text();
  }
  
}

$(document).ready(function(){
  getLocation((geo) => {
    if(geo){
      userData.lat = geo.lat;
      userData.lng = geo.lng;
    }
  });
  

  $(window).scroll(function(){
    let mapTop = $('#map').offset().top,
        mapHeight = $('#map').height(),
        scrollTop = $(window).scrollTop(),
        scrollBottom = scrollTop + window.innerHeight,
        controlHeight = $('.map .control').height();
  
    if(scrollBottom > mapTop ){
      let mapShowHeight = scrollBottom - mapTop;
      let controlTop =  mapShowHeight - controlHeight - 30;
      if(mapShowHeight > mapHeight){
        controlTop = mapHeight - controlHeight - 30;
      }else if(mapShowHeight < 60 + controlHeight ){
        controlTop = 30;
      }
      $('.map .control').attr('style','--control-top:'+controlTop+'px;');
    }
  
    
  })


  $('.selectbox.province ul').empty();
  for (let i in address) {

      let classN = ''
      if (i == 0) {
          classN = 'active';
      }
      $('.selectbox.province ul').append('<li data-latlng="'+JSON.stringify(address[i].geolocation)+'" class="' + classN + '" data-query="' + address[i].value + '">' + address[i].province + '</li>')
  
  }

  $('.filter-custom .body ul').each((i,e) => {
    $(e).fakeScrollBar();
  })
  
  
  $('.filter-custom .province ul li').on('click', provinceClick)

  if($('.picklocation-result').length > 0){
    let timer = setInterval(() => {
      if(map && map.getLayer('heatmap-layer')){

        map.setLayoutProperty('heatmap-layer', 'visibility', 'visible');

        map.off('click', mapClick);
        // getLocation(pos => {
        //   map.flyTo({center: [pos.lng, pos.lat], zoom: map.getZoom()});
        // })

        $(".mapboxgl-ctrl-geolocate").click();
        clearInterval(timer);
      }
    },500);
  }


  
  


  // $('.btn-nearme').click(function(e) {
  //     e.preventDefault();
  //     userData.nearly = true
  //     userData.district = ''
  //     userData.province = ''
  //     $('.filter-stores .bleft .input input').val('')
  //     $('.selectbox.province .head .inner span').html($('#provinceText').val())
  //     $('.selectbox.district .head .inner span').html($('#districtText').val())
  //     $('.selectbox.district ul').empty();
  // })


  // $('.filter-custom .province ul li:first').click();


  $('.first-block').event({
    '.help' : () => {
      $popupTerm.addClass('active');
    },
    // '.see-result': () => {
    //   map.setLayoutProperty('heatmap-layer', 'visibility', 'visible');
    // }
  })
  
  function updatePopupListing(callback){
    let textAddress='ở gần bạn';
    let searchText = '';

    let data = {};

    if(userData.provinceText){
      textAddress = ' ở '  + userData.provinceText;
      data.province = userData.provinceText
    }

    if(userData.districtText){
      textAddress += ' - ' + userData.districtText
      data.provincedistrict = userData.districtText
    }
    

    let dataDemo = [
      {
        'address' : 'Số 32 LK01 KĐT Văn La, ngõ 793 Quang Trung (cạnh chợ Văn La), phường Phúc La, quận Hà Đông, Hà Nội',
        'distance':'0.6km'
      },
      {
        'address' : 'Số  64 Cầu Am (cạnh chợ Vạn Phúc), phường Vạn Phúc, quận Hà Đông, Hà Nội',
        'distance':'0.6km'
      },
      {
        'address' : 'Số 125 chợ Mễ Trì Hạ (cách cổng chợ Mễ Trì Hạ 50m), phường Mễ Trì, quận Nam Từ Liêm, Hà Nội',
        'distance':'0.6km'
      },
      {
        'address' : 'Số 32 LK01 KĐT Văn La, ngõ 793 Quang Trung (cạnh chợ Văn La), phường Phúc La, quận Hà Đông, Hà Nội',
        'distance':'0.6km'
      }
    ]


    function fillData(data){
      return `<div class="item">
                      <div class="address">
                          <i class="fa fa-map-marker"></i>
                         <p> ${data.address}</p>
                      </div>
                      <div class="distance">${data.distance}km</div>
                  </div>`

      
    }

    if(!data.province){
      data.geolocation = {lat:userData.lat,lng:userData.lng};
    }

    
    
    
    search({},(res) => {
      let data= [];
      let TotalRecords = 0;
      if(res && res.Result && Array.isArray(res.Result)){
        $popupListing.find('.list-wrap .list').empty();
        let data = res.Result;


        for(let i in data){

          let arr = data[i].Location.split(','),
            lat = parseFloat(arr[0]),
            lng = parseFloat(arr[1])
          data[i].distance = Math.round(getDistanceFromLatLonInKm(userData.lat, userData.lng, lat,lng) * 10)/10;
          
        }
        data.sort((a1 , a2) => a1.distance - a2.distance)
      
        for(let i in data){

          let html = fillData({address: data[i].OutletAddress, distance: data[i].distance})
          

          $popupListing.find('.list-wrap .list').append(html);
        }

        TotalRecords = res.TotalRecords;
      }else{
        $popupListing.find('.list-wrap .list').empty();
      }
      

      
      $popupListing.find('.list-wrap .top .count').html(TotalRecords);
      callback && callback();
    })
    
    
    $popupListing.find('.title .address').html(textAddress);
  }

  $popupFirst.event({
    '.btn-main' : () => {
      $popupFirst.fadeOut(100);
      console.log(userData)
      
      updatePopupListing(() => popup($popupListing));

      

      if(!userData.provinceText){
        map.flyTo({center: [userData.lng, userData.lat], zoom: map.getZoom()});
      }

      $('html').animate({
        scrollTop: $('.map').position().top - 100
      },200)
    },
    // '.khao-sat': () => {
    //   $popupFirst.fadeOut(100);
    //   $('html').animate({
    //     scrollTop: $('.map').position().top - 100
    //   },200)
    //   let timer = setInterval(() => {
    //     if(map.getLayer('heatmap-layer')){
    //       map.setLayoutProperty('heatmap-layer', 'visibility', 'visible');
    //       clearInterval(timer);
    //     }
    //   },500);
      
    // }
  })


  $popupNote.event({
    '.btn-done': () => {
      let val = $popupNote.find('textarea').val().trim();
      if(val.length > 500){
        $popupNote.addClass('error');
      }else{
        marker.info.note = val;
        $popupNote.removeClass('active error');
      }
      
    },
    'textarea{keyup}': function(e){
      let val = $(this).val().trim();
      $popupNote.find('.limit').html(val.length + '/500');
      if(val.length > 500){
        $popupNote.addClass('error');
      }else{
        $popupNote.removeClass('error');
      }
    }
  })


  $popup.event({
    '.close-popup,.close': function() {
      $(this).closest('[class^="popup"]').removeClass('active');
      $('body').removeClass('overlay-disabled')
      // popup()
    },
    '.wrap': (e) => {
      e.stopPropagation();
    }
  })

  $popupTerm.event({
    '.btn-main': () => {
      $popupTerm.removeClass('active');

    },
    '.close': () => {
      $popupTerm.removeClass('active');
    }
  })
  

  $control.event({
    '.plus': () => {

      if (add_markers.length >= max_store_ping){
        $popupLimitSession.find('.limit').html(max_store_ping);
        $popupLimitSession.addClass('active');
        return;
        // alert('Số điểm tối đa được đánh dấu là: ' + max_store_ping + ' điểm');
      }


      $popupPointAddress.find('.error').removeClass('error');
      $popupPointAddress.find('input[name="note"]').val('');
      $popupPointAddress.find('input[name="address"]').val('');
      checkPlusControl = true;


      $popupPointAddress.find('input').val('');
      $popupPointAddress.addClass('active');
    },
    '.note' : () => {
      checkPlusControl = false;

      let len = marker.note || '';
      len = len.length;
      
      $popupPointAddress.find('.error').removeClass('error');
      $popupPointAddress.find('input[name="note"]').val('');
      $popupPointAddress.find('input[name="address"]').val('');
      $popupPointAddress.find('.province .head .inner').html('<span>'+$('#provinceText').val()+'</span>');
      $popupPointAddress.find('.district .head .inner').html('<span>'+$('#districtText').val()+'</span>');

      
      if(marker.info.province){
        $popupPointAddress.find('.province .head .inner').html('<span>'+marker.info.province+'</span>');
      }
      if(marker.info.district){
        $popupPointAddress.find('.district .head .inner').html('<span>'+marker.info.district+'</span>');
      }
      if(marker.info.note){
        $popupPointAddress.find('input[name="note"]').val(marker.info.note);
      }
      if(marker.info.address){
        $popupPointAddress.find('input[name="address"]').val(marker.info.address);
      }
  
      oldData = {
        province: marker.info.province,
        district: marker.info.district,
        address: marker.info.address
      }

      $popupPointAddress.find('textarea').val(marker.note || '');
      $popupPointAddress.find('.limit').html(len + '/500');
    
      $popupPointAddress.removeClass('error');


      popup($popupPointAddress)


      // $popupNote.find('textarea').val(marker.note || '');
      // $popupNote.find('.limit').html(len + '/500');

      // $popupNote.removeClass('error');
      // $popupNote.addClass('active');

    },
    '.delete' : () => {
      if(marker){
        marker.remove();
        add_markers.splice(add_markers.indexOf(marker),1);
        
        add_markers.map( (e,i) => $(e._element).html("<span>"+('0' + (parseInt(i)+1)).slice(-2)+"</span>"))
      }
      


      if(add_markers.length > 0){
        let m = add_markers[add_markers.length - 1];
        let latLng = m.getLngLat();
        updateLocationText(latLng.lat,latLng.lng,m);
      }else{
        $popupPointAddress.find('.error').removeClass('error');
        $popupPointAddress.find('input[name="note"]').val('');
        $popupPointAddress.find('input[name="address"]').val('');
        checkPlusControl = true;


        $popupPointAddress.find('input').val('');
        $popupPointAddress.addClass('active');
        $popupPointAddress.addClass('active');
        // $control.removeClass('active')
      }
    },
    '.btn-hoan-tat': () => {
      if(add_markers.length> 0){
        // $popupConfirm.find('.count').html(add_markers.length);
        // $popupConfirm.addClass('active')
        // $popupSuccess.addClass('active');

        let vals = $popupPointAddress.validate({
          fields: {
            phone: {
              pattern: /086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082|092|056|058|099|059/
            }
          },
          message: {
            address: {
              required: 'Vui lòng điền địa chỉ',
            },
            phone: {
              pattern: 'Số điện thoại không hợp lệ',
            }
          },
          before: {
            phone: (val) => {
              return '0' + val.replace(/(^0*|[^0-9])/g,'')
            }
          }
        });
        vals['address'] = vals['address_user'];
        delete vals['address_user'];

        if($popupPointAddress.find('.error').length === 0){
            
            let geojson = [];


            add_markers.map( e => {
              let latLng = e.getLngLat();
              geojson.push({
                coordinates: [latLng.lng,latLng.lat],
                info: e.info
              })
              //e.remove()
            } )

            $.ajax({
              url: ajax_send_url,
              method: 'POST',
              // crossDomain:true,
              dataType: 'json',
              data: {
                geolocation: geojson,
                info: vals
              },
              success: function(res){
                

                if(res.error_code){
                  
                  if(res.error_code == 1){
                    $popupInfo.find('[name="phone"]').closest('.form-group').addClass('error').append('<div class="error-note">Số điện thoại không hợp lệ</div>');
                    return;
                  }

                  if(res.error_code == 2){

                    $popupLimitPhone.find('.limit').html(add_markers.length + '/' + res.limit);
                    $popupLimitPhone.find('.phone').html(vals.phone);
                    

                    popup($popupLimitPhone)
                    // $popupInfo.removeClass('active');
                    // $popupLimitPhone.addClass('active');
                  }
                  //$popupError.find('.message').html(res.message);
                  //$popupError.addClass('active');




                }else{
                  // $popupInfo.removeClass('active');
                  // $popupSuccess.addClass('active');

                  popup($popupSuccess)
                  
                  let addData = [];
                  add_markers.map( e => {
                    let latLng = e.getLngLat();
                    addData.push({  "geometry": { "type": "Point", "coordinates": [ latLng.lng,  latLng.lat] } })
                    //e.remove()
                  } )


                  
                  // add_markers.map( e =>e.remove() )


                  // map.addLayer('data_point').setData({
                  //   type: "geojson",
                  //   data: {
                  //     "type": "FeatureCollection",
                  //     "crs": { "type": "name"},
                  //     "features": geojson
                  //   } //Điểm pin bởi user
                  // })
                  // add_markers = [];
                  // $control.removeClass('active')
                }
              }
              
            })
            
        }



      }else{
        $popupLimit0.addClass('active');
      }


      
    }
  })

  $popupConfirm.event({
    '.btn-done': () => {
      $popupInfo.find('.error').removeClass('error').find('.error-note').remove();
      $popupInfo.find('input:text').val('')

      $popupConfirm.removeClass('active');
      $popupInfo.addClass('active');
    }
  })
  

  $popupInfo.event({
    '.btn-send': () => {

      let vals = $popupInfo.validate({
        fields: {
          phone: {
            pattern: /086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082|092|056|058|099|059/
          }
        },
        message: {
          phone: {
            pattern: 'Số điện thoại không hợp lệ',
          }
        },
        before: {
          phone: (val) => {
            return '0' + val.replace(/(^0*|[^0-9])/g,'')
          }
        }
      });
      if(!$popupInfo.find('.term input').is(':checked')){
        $popupInfo.find('.term').addClass("error");
        return;
      }

      if($popupInfo.find('.error').length === 0){
          
          let geojson = [];


          add_markers.map( e => {
            let latLng = e.getLngLat();
            geojson.push({
              coordinates: [latLng.lng,latLng.lat],
              info: e.info
            })
            //e.remove()
          } )

          $.ajax({
            url: ajax_send_url,
            method: 'POST',
            // crossDomain:true,
            dataType: 'json',
            data: {
              geolocation: geojson,
              info: vals
            },
            success: function(res){
              

              if(res.error_code){
                
                if(res.error_code == 1){
                  $popupInfo.find('[name="phone"]').closest('.form-group').addClass('error').append('<div class="error-note">Số điện thoại không hợp lệ</div>');
                  return;
                }

                if(res.error_code == 2){

                  $popupLimitPhone.find('.limit').html(add_markers.length + '/' + res.limit);
                  $popupLimitPhone.find('.phone').html(vals.phone);

                  $popupInfo.removeClass('active');
                  $popupLimitPhone.addClass('active');
                }
                //$popupError.find('.message').html(res.message);
                //$popupError.addClass('active');




              }else{
                $popupInfo.removeClass('active');
                $popupSuccess.addClass('active');
                
                let addData = [];
                add_markers.map( e => {
                  let latLng = e.getLngLat();
                  addData.push({  "geometry": { "type": "Point", "coordinates": [ latLng.lng,  latLng.lat] } })
                  //e.remove()
                } )


                
                add_markers.map( e =>e.remove() )


                // map.addLayer('data_point').setData({
                //   type: "geojson",
                //   data: {
                //     "type": "FeatureCollection",
                //     "crs": { "type": "name"},
                //     "features": geojson
                //   } //Điểm pin bởi user
                // })
                add_markers = [];
                // $control.removeClass('active')
              }
            }
            
          })
          
      }


    },
    '.btn-reset': ()=> {
        $popupInfo.find('.error').removeClass('error').find('.error-note').remove();
        $popupInfo.find('input:text').val('')
    },
    '.term a': (e) => {
      e.preventDefault();
      $popupTerm.addClass('active');
    }
  })
  
  $popupSuccess.event({
    '.btn-xem-ban-do': () => {
      // $popupSuccess.removeClass('active')
      map.setLayoutProperty('heatmap-layer', 'visibility', 'visible');
      popup();
    }
  })

  $popupListing.find('.list-wrap .top').collapse();

  $popupListing.event({
    '.btn-de-xuat': function(){
      // $popupListing.removeClass('active');
      checkPlusControl = true;
      $popupPointAddress.find('.btn-back').fadeIn(0);

      popup($popupPointAddress);

    },
    '.btn-chon-lai': function(){
      // $popupListing.removeClass('active');
      // $popupChooseLocationAgain.addClass('active');
      popup($popupChooseLocationAgain);
    }
  })

  $popupChooseLocationAgain.event({
    '.btn-done': function(){
      updatePopupListing();
      // $popupChooseLocationAgain.removeClass('active');
      // $popupListing.addClass('active');

      popup($popupListing)
    },
    '.btn-back': function(){
      // $popupChooseLocationAgain.removeClass('active');
      // $popupListing.addClass('active');

      popup($popupListing)

    }
  })
  

  let checkPlusControl = false;
  $popupPointAddress.event({
    '.btn-send': function(){

       

      let vals = $popupPointAddress.validate({
        fields: {
          phone: {
            pattern: /086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082|092|056|058|099|059/
          }
        },
        message: {
          address: {
            required: 'Vui lòng điền địa chỉ',
          },
          phone: {
            pattern: 'Số điện thoại không hợp lệ',
          }
        },
        before: {
          phone: (val) => {
            return '0' + val.replace(/(^0*|[^0-9])/g,'')
          }
        }
      });

      let searchText = '';
      let $filterCustom = $popupPointAddress.find('.filter-custom');

      let province = $filterCustom.attr('data-province') || '';
      let district = $filterCustom.attr('data-district') || '';

      searchText += province + ' ' + district;
      console.log(searchText);

      if(!$popupPointAddress.find('.term input').is(':checked')){
        $popupPointAddress.find('.term').addClass("error");
      }

      
      if(!province){
        $popupPointAddress.find('.province').closest('.form-group').addClass('error').append('<div class="error-note">Vui lòng chọn Thành phố</div>');
      }

      if(!district){
        $popupPointAddress.find('.district').closest('.form-group').addClass('error').append('<div class="error-note">Vui lòng chọn Quận / Huyện</div>');
      }


      if($popupPointAddress.find('.error').length === 0){
        

        if(!checkOldData({
          province: province,
          district: district,
          address: vals.address
        })){
          searchText += ' ' + vals.address
          $.ajax({
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+searchText+'.json?access_token=' + mapboxgl.accessToken,
            success: function(res){
              if(res.features && res.features.length > 0){
                let [lng,lat] = res.features[0].geometry.coordinates
                if(marker){
                  marker.info = {
                    province,
                    district,
                    address: vals.address,
                    note: vals.note
                  }
                  updateLocationText(lat , lng, marker)
                  map.flyTo({center: [lng,lat]});
                  marker.setLngLat([lng,lat]);
                }else{
                  createMarker(false,{lat,lng},(marker) => {
                    marker.info = {};
                    marker.info.province = province;
                    marker.info.district = district;
                    marker.info.address = vals.address
                    marker.info.note = vals.note;
                    map.flyTo({center: [lng,lat]});
                  })
                }
                
              }

              setTimeout(() =>  $popupPointAddress.find('.btn-back').fadeOut(0),1000);
            }
          })
        
          checkPlusControl = false;

        }else{
          marker.info.province = province;
          marker.info.district = district;
          marker.info.address = vals.address
          marker.info.note = vals.note;
        }
        
        $('html').animate({
          scrollTop: $('.map').position().top - 100
        },200)
        popup();
        // $popupPointAddress.removeClass('active')



      }
    },
    '.btn-back' : function(){
      // $popupPointAddress.removeClass("active")
      setTimeout(() =>  $popupPointAddress.find('.btn-back').fadeOut(0),500);
      // $popupListing.addClass('active');

      popup($popupListing);
      
    },
    '.note{keyup}': function(e){
      let val = $(this).val().trim();
      $popupPointAddress.find('.limit').html(val.length + '/500');
      if(val.length > 500){
        $popupPointAddress.find('.note-wrap').addClass('error');
      }else{
        $popupPointAddress.find('.note-wrap').removeClass('error');
      }
    },
    '.term a': (e) => {
      e.preventDefault();

      $popupTerm.addClass('active');
    },
    '.close': () => {
      setTimeout(() =>  $popupPointAddress.find('.btn-back').fadeOut(0),1000);
    }
  })
})






// ---------------- a HOANG ----------------------
function createMarker(e ,latlng  = {}, callback){

  let lat = latlng.lat || e.lngLat.lat,
      lng = latlng.lng || e.lngLat.lng


  var element = document.createElement('div');
  element.id = "user_pin_" + (add_markers.length+1);
  element.innerHTML = "<span>" + ('0' + (add_markers.length + 1)).slice(-2) + "</span>" ;
  var marker = new mapboxgl.Marker({
    element: element,
    draggable: true
  }).setLngLat([lng, lat]).addTo(map);

  marker.info = {}
  
  updateLocationText(lat , lng, marker)

  marker.on('dragend', function(e){
    var lngLat = this.getLngLat();
    console.log("Lng: "+lngLat.lng + " Lat: " + lngLat.lat);
  });
  marker.on('drag', function(e){
    var lngLat = this.getLngLat();
    // console.log("Lng: "+lngLat.lng + " Lat: " + lngLat.lat);

    updateLocationText(lngLat.lat , lngLat.lng, marker)
    
    
  });
  // marker.getElement().addEventListener('click', function(e){
  //   clicked_marker = true;
  //   console.log('marker',marker);
  // });

  element.addEventListener('click', function(e){
    e.stopPropagation();
    var lngLat = marker.getLngLat();

    updateLocationText(lngLat.lat , lngLat.lng, marker, true);
    
  });
  add_markers.push(marker);

  callback && callback(marker)
}


function mapClick(e) {
    
  //Cluster click
  const cluster = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
  if (cluster[0]) {
    map.flyTo({center: [e.lngLat.lng, e.lngLat.lat], zoom: map.getZoom() + 2});
    return;
  }
  
  //Add marker
  if (add_markers.length < max_store_ping){
    if (clicked_marker == false){
      createMarker(e);
    }
    clicked_marker = false;
  }else{
    $popupLimitSession.find('.limit').html(max_store_ping);
    $popupLimitSession.addClass('active');
    // alert('Số điểm tối đa được đánh dấu là: ' + max_store_ping + ' điểm');
  }
  //
}


class MapboxGLButtonControl {
  constructor({
    className = "",
    title = "",
    eventHandler = evtHndlr
  }) {
    this._className = className;
    this._title = title;
    this._eventHandler = eventHandler;
  }
  onAdd(map) {
    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
    this._btn.type = "button";
    this._btn.title = this._title;
    this._btn.onclick = this._eventHandler;
    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);
    return this._container;
  }
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
mapboxgl.accessToken = 'pk.eyJ1IjoibWVhdGRlbGkiLCJhIjoiY2s1bTNuaWwyMHZscTNram9rZHoxcnhtNCJ9.CRuU78fwW6QYZx_BGHk9DA';
var store_json="";
var clicked_marker = false;
// var add_markers = new Array();
map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: mapcenter, // starting position [lng, lat]
  maxZoom: 16,
  zoom: 14 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), "top-right");
map.addControl(new mapboxgl.GeolocateControl({
  // positionOptions: {
  // enableHighAccuracy: true
  // },
  // trackUserLocation: true
}), "top-right");
map.on("load", function() {
  map.addSource("data_point", {
    type: "geojson",
    data: data_pinned_by_user //Điểm pin bởi user
  });
  map.addLayer({
    id: 'heatmap-layer',
    type: 'heatmap',
    source: 'data_point',
    maxzoom: 22,
    paint: {
      // increase weight as diameter breast height increases
      'heatmap-weight': {
        property: 'dbh',
        type: 'exponential',
        stops: [
          [1, 0],
          [62, 1]
        ]
      },
      // increase intensity as zoom level increases
      'heatmap-intensity': {
        stops: [
          [11, 1],
          [15, 3]
        ]
      },
      // assign color values be applied to points depending on their density
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,"rgba(0, 0, 255, 0)",
        0.1,"#4169e1",
        0.3,"rgb(0, 255,255)",
        0.5,"rgb(0,255,0)",
        0.7,"#ffff00",
        1,"#ff0000"
      ],
      // increase radius as zoom increases
      'heatmap-radius': {
        stops: [
          [11, 15],
          [15, 20]
        ]
      },
      // decrease opacity to transition into the circle layer
      'heatmap-opacity': {
        default: 0.5,
        stops: [
          [14, 0.5],
        //   [15, 0]
        ]
      },
    }
  }, 'waterway-label');
  map.setLayoutProperty('heatmap-layer', 'visibility', 'none');
  function hide_heatmap(e) {
    var clickedLayer = 'heatmap-layer';
    e.preventDefault();
    e.stopPropagation();
    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
     
    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    } else {
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  }
  function hide_store(e) {
    var toggleableLayerIds = [ 'clusters', 'clusters-count-bg', 'cluster-count', 'unclustered-point' ];
    for(var index in toggleableLayerIds) {
      var clickedLayer = toggleableLayerIds[index];
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      } else {
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    }
  }
  // const ctrlPoint = new MapboxGLButtonControl({
  //   className: "mapbox-gl-heatmap-bt",
  //   title: "Hide/Show heatmap",
  //   eventHandler: hide_heatmap
  // });
  // const ctrlPoint2 = new MapboxGLButtonControl({
  //   className: "mapbox-gl-store-bt ",
  //   title: "Hide/Show Store",
  //   eventHandler: hide_store
  // });
  // map.addControl(ctrlPoint, "top-right");
  // map.addControl(ctrlPoint2, "top-right");
  //
  // add markers Meatdeli to map
  search({},(res) => {
    let data = {type: "FeatureCollection", features : []};

    if(res && Array.isArray(res.Result) && res.Result.length > 0){
      res = res.Result
    }else{
      res = [];
    }

    res.map(e => {
      let arr = e.Location.split(','),
          lat = arr[0],
          lng = arr[1];

      data.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng,lat]
        }
      })
    });
    

    map.loadImage('./img/store-icon.png', function(error, image) {
      if (error) throw error;
      map.addImage('store_icon', image);
      map.addSource("cluster_stores", {
        type: "geojson",
        data: data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 100,
        clusterProperties: {
          "max": ["max", 0, ["get", "scalerank"]],
          "sum": ["+", 0, ["get", "scalerank"]],
        }
      });
      map.addLayer({
        id: 'clusters',
        type: 'symbol',
        source: 'cluster_stores',
        filter: ['has', 'point_count'],
        layout: {
          'icon-image': "store_icon",
          'icon-size': 1,
          'icon-allow-overlap': true,
         }
      });
      map.addLayer({
        id: 'clusters-count-bg',
        type: 'circle',
        source: 'cluster_stores',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#FF0000',
          'circle-radius': 12,
          'circle-translate': [20, -30],
        },
      });
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'cluster_stores',
        filter: ['has', 'point_count'],
        paint: {
          'text-translate': [20, -30],
          'text-color': '#ffffff'
        },
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 14,
          'text-allow-overlap': true,
        },
      });
      map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'cluster_stores',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': "store_icon",
          'icon-size': 1,
          'icon-allow-overlap': true,
          'icon-anchor':'bottom'
        },
      });
      map.setLayoutProperty('clusters', 'visibility', 'visible');
      map.setLayoutProperty('clusters-count-bg', 'visibility', 'visible');
      map.setLayoutProperty('cluster-count', 'visibility', 'visible');
      map.setLayoutProperty('unclustered-point', 'visibility', 'visible');
    });
    // map.on('move', updateMarkers);
    // map.on('moveend', updateMarkers);
    // updateMarkers();


  })
  // var stores_point = $.ajax({
  //   url: meatdeli_stores,
  //   dataType: "json",
  //   success: function(geojson){
  //     console.log(geojson)
  //     store_json = geojson;
  //     // map.loadImage('./img/store-icon.png', function(error, image) {
  //     //   if (error) throw error;
  //     //   map.addImage('store_icon', image);
  //     //   map.addSource("cluster_stores", {
  //     //     type: "geojson",
  //     //     data: geojson,
  //     //     cluster: true,
  //     //     clusterMaxZoom: 14,
  //     //     clusterRadius: 50,
  //     //     clusterProperties: {
  //     //       "max": ["max", 0, ["get", "scalerank"]],
  //     //       "sum": ["+", 0, ["get", "scalerank"]],
  //     //     }
  //     //   });
  //     //   map.addLayer({
  //     //     id: 'clusters',
  //     //     type: 'symbol',
  //     //     source: 'cluster_stores',
  //     //     filter: ['has', 'point_count'],
  //     //     layout: {
  //     //       'icon-image': "store_icon",
  //     //       'icon-size': 1,
  //     //       'icon-allow-overlap': true,
  //     //      }
  //     //   });
  //     //   map.addLayer({
  //     //     id: 'clusters-count-bg',
  //     //     type: 'circle',
  //     //     source: 'cluster_stores',
  //     //     filter: ['has', 'point_count'],
  //     //     paint: {
  //     //       'circle-color': '#FF0000',
  //     //       'circle-radius': 12,
  //     //       'circle-translate': [25, -37],
  //     //     },
  //     //   });
  //     //   map.addLayer({
  //     //     id: 'cluster-count',
  //     //     type: 'symbol',
  //     //     source: 'cluster_stores',
  //     //     filter: ['has', 'point_count'],
  //     //     paint: {
  //     //       'text-translate': [25, -37],
  //     //       'text-color': '#ffffff'
  //     //     },
  //     //     layout: {
  //     //       'text-field': '{point_count_abbreviated}',
  //     //       'text-size': 14,
  //     //       'text-allow-overlap': true,
  //     //     },
  //     //   });
  //     //   map.addLayer({
  //     //     id: 'unclustered-point',
  //     //     type: 'symbol',
  //     //     source: 'cluster_stores',
  //     //     filter: ['!', ['has', 'point_count']],
  //     //     layout: {
  //     //       'icon-image': "store_icon",
  //     //       'icon-size': 1,
  //     //       'icon-allow-overlap': true,
  //     //       'icon-anchor':'bottom'
  //     //     },
  //     //   });
  //     //   map.setLayoutProperty('clusters', 'visibility', 'visible');
  //     //   map.setLayoutProperty('clusters-count-bg', 'visibility', 'visible');
  //     //   map.setLayoutProperty('cluster-count', 'visibility', 'visible');
  //     //   map.setLayoutProperty('unclustered-point', 'visibility', 'visible');
  //     // });
  //     // // map.on('move', updateMarkers);
  //     // // map.on('moveend', updateMarkers);
  //     // // updateMarkers();
  //   },
  //   error: function (xhr) {
  //     alert(xhr.statusText)
  //   }
  // });

  

  // map.on('click', mapClick);
});

