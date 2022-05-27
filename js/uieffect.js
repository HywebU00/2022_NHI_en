$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  var wh = _window.height();
  var wwNew = ww;

  const wwSlim = 480;
  const wwMedium = 700; //此值以下是手機
  const wwNormal = 960;  //此值以上是電腦
  const wwMaximum = 1200;

  var _menu = $('.webHeader .menu');
  var _menuCtrl = $('.menuCtrl');
  var _sidebar = $('.sidebar');
  var _webHeader = $('.webHeader');
  var _webFooter = $('.webFooter');

  _html.removeClass('no-js');

  // --------------------- 外掛套件 slick 參數設定
  // 首頁大圖輪播
  $('.bigBanner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 800,
    autoplay: true,
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    zIndex:8
  });

  // 首頁《Featured Videos / 影音專區》
  $('.videoFlow ').find('.flowList').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 600,
    autoplay: false,
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
  });

  // 首頁《Annual Report / 年報》
  $('.booksFlow ').find('.flowList').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 600,
    autoplay: false,
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
  });


  // Contact Us 地圖
  $('.mapList').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    infinite: true,
    asNavFor: '.cardList'
  });
  $('.cardBox').find('.cardList').slick({
    slidesToShow: 1,  
    slidesToScroll: 1,
    dots: true,
    fade: true,
    infinite: true,
    asNavFor: '.mapList'
  });

  // 首頁《NHI Timelines / 健保發展時間點》
  $('.timeLine ').find('.eventList').slick({
    speed: 600,
    autoplay: false,
    arrows: true,
    dots: false,
    infinite: false,
    mobileFirst: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        }
      }
    ]
  });

  // 首頁《 What You Need To Know / 核心服務 》
  $('.dataflow').find('.flowList').slick({
    speed: 600,
    autoplay: false,
    arrows: true,
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: 0,
    mobileFirst: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  // --------------------- slick 參數設定：結束


  // 複合功能圖示
  var _compIcon = $('.compound'); //li
  _compIcon.each(function(){
    let _this = $(this);
    let _controler = _this.children('button');
    let _optList = _this.children('ul');
    let _optItem = _optList.children('li');
    let _optButton = _optItem.children('button');
    let _optLink = _optItem.children('a');
    let count = _optItem.length;

    const speed = 300;

    // 改變 li 的 z-index 值，第一個 li 要在最上面
    for (let i = 0; i < count; i++) {
      _optItem.eq(i).css('z-index', count - i)
    }

    // 收合
    function glideUp() {
      for (let i = 0; i < count; i++) {
        _optList.stop(true, false).animate({ 'top': 0 }, speed);
        _optItem.eq(i).delay( speed * i * .4).stop(true, false).animate({ 'top': 0 }, speed, function(){
          if ( i == count-1) {_optList.height(0).hide()}
        });
      }
    }

    _controler.click(function(){
      if (_optList.is(':hidden')) {
        _optList.show();
        let height = _optItem.outerHeight(true);
        _optList.stop(true, false).animate({ 'top': height }, speed);
        for (let i = 0; i < count; i++) {
          _optItem.eq(i).delay( speed*i*.3 ).stop(true, false).animate({ 'top': height * i }, speed, function(){
            _optList.height( height * count);
          })
        }
      } else {
        glideUp();
      }
    })

    _optButton.add(_optLink).click(glideUp);
    _this.siblings().click(glideUp);
    _this.siblings().children('a, button').focus(glideUp);
  })


  // font size：顯示所選項目
  var _fontSize = $('.fontSize');
  var _fontSizeBtn = _fontSize.children('button');
  var _fsOption = _fontSize.find('ul>li>button');

  _fsOption.click(function(){
    let A = $(this).text();
    let fontClass = $(this).attr('class');
    _fontSizeBtn.removeClass().text( A ).addClass(fontClass);
  })




  // 可收合區
  _drawer = $('.drawer');
  _drawer.each(function () {
    let _this = $(this);
    let _handle = _this.find('.handle');
    let _tray = _this.find('.tray');
    const speed = 400;

    _handle.click(function () {
      if (_tray.is(':hidden')) {
        _tray.slideDown(speed);
        _handle.removeClass('openIt');
      } else {
        _tray.slideUp(speed);
        _handle.addClass('openIt');
      }
    })
  })


  // rwd Table
  // 把 th 的內容複製到對應的td的 data-th 屬性值
  _rwdTable = $('.rwdTable');
  _rwdTable.each( function(){
    let _this = $(this);
    let _th = _this.find('thead>tr>th');
    let count = _th.length;
    let _tr = _this.find('tbody').children('tr');

      _tr.each(function(){
        let _td = $(this).children('td');
        for ( let i = 0; i<count; i++ ) {
          _td.eq(i).attr('data-th', _th.eq(i).text());
        }
      })
  })










  // 計算照片張數
  var _countPhoto = $('.imgSlick').filter('.count');
  _countPhoto.each(function(){
    let _this = $(this);
    _this.prepend('<div class="photoCount"><span class="current" title="目前位置"></span><span class="total" title="總張數"></span></div>');
    let _photoCount = _this.find('.photoCount');
    let _current = _photoCount.find('.current');
    let _total = _photoCount.find('.total');
    let _countThis = _this.find('.slider-for');

    _total.text(_countThis.find('.slick-slide').length);
    _current.text( _countThis.find('.slick-current').index()+1);

    _this.find('.slick-arrow').add('.slick-slide').click( function(){
      _current.text( _countThis.find('.slick-current').index()+1);
    })
  })
  


  // 製作側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');

  // 找出_menu中有次選單的li
  _menu.find('li').has('ul').addClass('hasChild');

  // 寬版「主選單」開合
  var _closeMenu = _menu.find('.closeThis');
  _menu.append('<button type="button" class="skip"></button>');
  var _skipMenu = _menu.find('.skip');
  _menuCtrl.click(function(){
    _menu.stop(true, false).fadeIn();
    _closeMenu.trigger('focus');
  })
  _skipMenu.focus( function(){
    _closeMenu.trigger('focus');
  })
  _closeMenu.click(function(){
    _menu.stop(true, false).fadeOut();
    _menuCtrl.trigger('focus');
  })
  


  // 行動版側欄選單
  // 複製「主選單」到側欄給行動版用
  _menu.clone().prependTo(_sidebar);
  _menuCtrl.clone().appendTo(_webHeader).addClass('sidebarCtrl').removeClass('menuCtrl');
  $('.topLinks').clone().appendTo(_sidebar);
  var _sidebarCtrl = _webHeader.find('.sidebarCtrl');
  var _sidebarMenu = _sidebar.find('.menu');
  var _hasChild = _sidebarMenu.find('.hasChild>a');
  var _sidebarMask = $('.sidebarMask');
  _hasChild.click(
    function(e){
      e.preventDefault();

      let _this = $(this);
      let _subMenu = _this.next('ul');

      if (_subMenu.is(':hidden')) {
        _subMenu.stop(true, false).slideDown();
        _this.parent().addClass('closeIt').siblings().removeClass('closeIt').find('ul:visible').slideUp().parent().removeClass('closeIt');
      } else {
        _subMenu.stop(true, false).slideUp().find('ul:visible').slideUp();
        _subMenu.find('.closeIt').removeClass('closeIt');
        _this.parent().removeClass('closeIt');
      }
    }
  )


  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('reveal')) {
      _sidebar.removeClass('reveal');
      _sidebarCtrl.removeClass('closeIt');
      _sidebarMask.fadeOut(400);
      _body.removeClass('noScroll');
    } else {
      _sidebar.addClass('reveal');
      _sidebarCtrl.addClass('closeIt');
      _sidebarMask.fadeIn(400);
      _body.addClass('noScroll')
    }
  })
  _sidebarMask.click(function(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(400);
  })

  let winResizeTimer0;
  _window.resize(function () {
    clearTimeout(winResizeTimer0);
    ww = _window.width();
    winResizeTimer = setTimeout(function () {
      if(ww >= wwNormal) {
        _sidebarMask.hide();
        _body.removeClass('noScroll');
        _sidebar.removeClass('reveal');
        _sidebarCtrl.removeClass('closeIt');
      } else {
        _menu.hide().removeAttr('style');
        _menuCtrl.removeClass('closeIt');
      }
    }, 200);
  });



  // 查詢區開合 -----------------------------------------------------
  var _searchCtrl = $('.searchCtrl');
  var _search = $('.search');
  var _closeSearch = _search.find('.closeThis');
  _searchCtrl.click(function(){
    if( _search.hasClass('reveal')) {
      searchHide();
    } else {
      _search.show(0, function(){
        $(this).addClass('reveal');
      });
    }
  })

  _search.find('input[type="text"]').focus(function(){
    _search.addClass('reveal').show();
  })

  _closeSearch.click(function () {
    searchHide();
  })
  function searchHide(){
    _search.removeClass('reveal');
    setTimeout(function(){_search.removeAttr('style').hide()}, 800);
  }


  // fatfooter 開合 -----------------------------------------------------
  var _fatFootCtrl = $('.fatFootCtrl');
  var _footSiteTree = $('.fatFooter').find('.siteTree>ul>li>ul');
  const text1 = _fatFootCtrl.text();
  const text2 = _fatFootCtrl.attr('data-altText');

  _fatFootCtrl.click(function(){
    if ( _footSiteTree.is(':visible')) {
      _footSiteTree.slideUp();
      $(this).addClass('closed').text(text2);
    } else {
      _footSiteTree.slideDown();
      $(this).removeClass('closed').text(text1);
    }
  })


  // 向上捲動箭頭 + 「實境展覽」連結-----------------------------------------------------
  var _goTop = $('.goTop');

  _goTop.click(function(){
    _html.stop(true,false).animate({scrollTop: 0}, 800);
  });

  _window.scroll(function () {
    if (_window.scrollTop() > 200) {
      _goTop.addClass('show');
    } else {
      _goTop.removeClass('show');
    }
  });






  // ======================================================================




  // 燈箱 ---------------------------------------
  var _showLightbox =  $('.showLightbox');
  var _lightbox = $('.lightbox');
  var _hideLightbox = _lightbox.find('.closeThis');
  var _lightboxNow;
  const speed = 400;

  _lightbox.before('<div class="coverAll"></div>');
  var _cover = $('.coverAll');
  
  _showLightbox.click(function(){
    let boxID = $(this).attr('data-id');

    _lightboxNow = _lightbox.filter( function(){ return $(this).attr('data-id') === boxID} );
    _lightboxNow.stop(true, false).fadeIn(speed).addClass('show');
    _lightboxNow.find('.closeThis').focus();
    _lightboxNow.prev(_cover).fadeIn(speed);
    _body.addClass('noScroll');
  })

  _showLightbox.focus(function(){
    $(this).keyup(function (e) { 
      if( e.keyCode == 13 ){
        $(this).trigger('click');
      }
    });
  })

  _hideLightbox.click(function(){
    let _targetLbx = $(this).parents('.lightbox');
    _targetLbx.stop(true, false).fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
    _targetLbx.prev(_cover).fadeOut(speed);
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = $(this).next('.lightbox');
    $(this).fadeOut(speed);
    _body.removeClass('noScroll');
    _targetLbx.fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
  })




})