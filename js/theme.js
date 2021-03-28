    /*
     * https://github.com/kaimallea/isMobile
     */
    !function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

( function ( $ ) {
    "use strict";
    
    /*
     * Button classes
     */

    jQuery( 'input#comment-submit,.yith-woocompare-widget a.compare.button, .widget_price_filter button.button, .woocommerce input.button, .woocommerce button.button, p.product .add_to_cart_button, .wishlist_table a.add_to_cart, input#submit, .checkout-button, .bbp-submit-wrapper button.submit, #bbp_user_edit_submit' ).addClass( 'btn btn-leap' );
    jQuery( '.woocommerce header.title .edit' ).addClass( 'btn btn-leap btn-mini' );

    /**
     * Disable SmoothScroll effect on mobile
     */
    if( theme_vars.smooth_scroll && isMobile.any ) {
        SmoothScroll.destroy();
    }

    var orig_menu_height, total_height, wp_admin_bar = 0;
    jQuery( document ).ready( function ( ) {


        // This initializes the Superfish menu.
        jQuery( 'ul.sf-menu' ).superfish( {
            hoverClass: 'sfHover',
            delay: 50,
            animation: { opacity: 'show' },
            animationOut: { opacity: 'hide' },
            speed: 'normal',
            speedOut: 'fast',
            cssArrows: true
        } );


        jQuery( '#main-menu-mobile' ).slicknav( {
            'label': '',
            'prependTo': '#mobile-menu',
            'closedSymbol': '<i class="fa fa-angle-right fa-2x"></i>',
            'openedSymbol': '<i class="fa fa-angle-down fa-2x"></i>',
            'removeIds': true,
            'removeClasses': true,
            'allowParentLinks': true
        } );




        if ( jQuery( '.header .navbar-inner' ).length ) {
            if ( jQuery( 'body' ).hasClass( 'admin-bar' ) ) {
                wp_admin_bar = jQuery( '#wpadminbar' ).outerHeight();
            }

            orig_menu_height = jQuery( '.header .navbar-inner' ).outerHeight();
            total_height = jQuery( '.header .navbar-inner' ).offset().top + orig_menu_height - wp_admin_bar;
        }

        //jQuery( document ).scroll( function () {
        jQuery( window ).on( 'scroll resize', function () {

            if ( jQuery( window ).width() >= theme_vars.mobile_menu_width && jQuery( ".header .navbar-inner" ).hasClass( "navbar-fixed-top" ) ) {
                if ( jQuery( document ).scrollTop( ) > total_height ) {

                    var navbar_inner = jQuery( '.header .navbar-inner' );
                    var navbar_fixed_top = jQuery( '.header .navbar-fixed-top' );

                    if ( !navbar_fixed_top.hasClass( "fixed-header" ) ) {
                        navbar_fixed_top.addClass( "fixed-header" );
                        jQuery( '.header-placholder' ).css( "height", orig_menu_height );
                        navbar_inner.hide();
                        navbar_inner.slideDown( "slow" );

                        jQuery( '#leap-header' ).css( "position", "relative" );
                        jQuery( ".absolute-header .header7, .absolute-header .header8, .absolute-header .header9" ).css( {
                            "position": "",
                            "z-index": ""
                        } ); 
                    }
                } else {
                    var navbar_fixed_top = jQuery( '.header .navbar-fixed-top' );
                    if ( navbar_fixed_top.hasClass( "fixed-header" ) ) {
                        navbar_fixed_top.removeClass( "fixed-header" );
                    }
                    jQuery( '.header-placholder' ).css( "height", '0px' );

                    jQuery( '#leap-header' ).css( "position", "" );
                    jQuery( ".absolute-header .header7, .absolute-header .header8, .absolute-header .header9" ).css( {
                        "position": "absolute",
                        "z-index": "100"
                    } );
                }
            }
        } );


        /**
         * Remove link tag when href = # and display text only
         */
        jQuery( "#main-menu .mega-section-head" ).each( function ( ) {
            if ( jQuery( this ).find( 'a' ).attr( 'href' ) === undefined ) {
                jQuery( this ).html( jQuery( this ).find( 'a' ).html( ) );
            }
        } );

    } );



    /**
     * Add sticky & responsive logo
     */
    if ( jQuery( window ).width() < theme_vars.mobile_menu_width ) {
        var logo_img = jQuery( '.logo img' );
        if ( theme_vars.sticky_logo_url !== '' ) {
            logo_img.attr( 'src', theme_vars.sticky_logo_url );
        } else {
            logo_img.attr( 'src', theme_vars.logo_url );
        }
    }

    jQuery( document ).ready( function ( ) {
        // Preload sticky logo
        jQuery( "<img />" ).attr( "src", theme_vars.sticky_logo_url );

        jQuery( window ).on( 'scroll resize', function () {

            if ( jQuery( window ).width() >= theme_vars.mobile_menu_width ) {

                jQuery( '.logo img' ).attr( 'src', theme_vars.logo_url );

                var body = jQuery( "body" );

                if ( theme_vars.sticky_logo_url !== '' ) {
                    if ( body.hasClass( "sticky-header" ) ) {

                        var sticky_header_logo = jQuery( '.navbar-fixed-top .logo img' );

                        if ( jQuery( ".header .navbar-inner" ).hasClass( "fixed-header" ) ) {
                            sticky_header_logo.attr( 'src', theme_vars.sticky_logo_url );
                        } else {
                            if ( body.is( '.header4-layout, .header5-layout, .header6-layout' ) ) {
                                sticky_header_logo.attr( 'src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==' );
                            } else {
                                sticky_header_logo.attr( 'src', theme_vars.logo_url );
                            }
                        }
                    }
                }
            } else {

                var logo_img = jQuery( '.logo img' );
                if ( theme_vars.sticky_logo_url !== '' ) {
                    logo_img.attr( 'src', theme_vars.sticky_logo_url );
                } else {
                    logo_img.attr( 'src', theme_vars.logo_url );
                }

            }
        } );
    } );


    /*
     * search icon show/hide
     */
    jQuery( document ).click( function ( ) {
        jQuery( '.searchform' ).hide( "drop", { percent: 0 }, 500 );
    } );
    jQuery( '.searchform' ).click( function ( e ) {
        e.stopPropagation( );
    } );
    jQuery( '#searchbutton' ).click( function ( e ) {
        e.stopPropagation( );
        if ( jQuery( '.searchform' ).css( 'display' ) == 'block' ) {
            jQuery( '.searchform' ).hide( "drop", { percent: 0 }, 500 );
            jQuery( '.searchform .navbar-search input.search-query' ).blur( );
        } else {
            jQuery( '.searchform' ).show( "drop", { percent: 0 }, 500 );
            jQuery( '.searchform .navbar-search input.search-query' ).focus( );
        }
    } );

    // http://stackoverflow.com/a/30293936/1794834
    // to top right away
    if ( window.location.hash )
        scroll( 0, 0 );
    // void some browsers issue
    setTimeout( function () {
        scroll( 0, 0 );
    }, 1 );

    jQuery( function () {

        var stickyH = 63;
        if ( jQuery( ".header .navbar-inner" ).hasClass( "fixed-header" ) ) {
            stickyH = jQuery( '.navbar-inner.navbar-fixed-top.fixed-header' ).innerHeight( );
        }

        if ( jQuery( 'body' ).hasClass( 'admin-bar' ) ) {
            stickyH = stickyH + jQuery( '#wpadminbar' ).outerHeight();
        }

        // your current click function
        jQuery( '#main-menu > li a' ).on( 'click', function ( e ) {
            if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
                var target = jQuery( this.hash );
                target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );

                if ( jQuery( 'body' ).hasClass( 'vertical-header' ) ) {
                    stickyH = jQuery( '#wpadminbar' ).outerHeight();
                }

                jQuery( 'html, body' ).animate( {
                    scrollTop: target.offset().top - stickyH + 'px'
                }, 1000, 'swing' );
                return false;
            }

        } );

        // *only* if we have anchor on the url
        if ( window.location.hash ) {
            // smooth scroll to the anchor id
            if ( jQuery( window.location.hash ).length ) {
                jQuery( 'html, body' ).animate( {
                    scrollTop: jQuery( window.location.hash ).offset().top - stickyH + 'px'
                }, 1000, 'swing' );
                return false;
            }
        }

    } );

    jQuery( document ).ready( function ( ) {
        /*
         * Parallax Scrolling
         */
        jQuery( '.leap-parallax' ).each( function ( ) {
            jQuery( this ).parallax( "50%", 0.4 );
        } );
        /*
         * PrettyPhoto
         */
        jQuery( "a[data-rel^='prettyPhoto']" ).prettyPhoto( {
            hook: 'data-rel',
            animation_speed: 'fast', /* fast/slow/normal */
            slideshow: 5000, /* false OR interval time in ms */
            autoplay_slideshow: false, /* true/false */
            opacity: 0.80, /* Value between 0 and 1 */
            show_title: false, /* true/false */
            allow_resize: true, /* Resize the photos bigger than viewport. true/false */
            default_width: 500,
            default_height: 344,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            horizontal_padding: 20, /* The padding on each side of the picture */
            hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
            wmode: 'opaque', /* Set the flash wmode attribute */
            autoplay: true, /* Automatically start videos: True/False */
            modal: false, /* If set to true, only the close button will close the window */
            deeplinking: false, /* Allow prettyPhoto to update the url to enable deeplinking. */
            overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
            social_tools: false /* html or false to disable */
        } );
        /*
         * Woocommerce
         */
        jQuery( 'a.add_to_cart_button.product_type_simple' ).click( function ( ) {
            var link = this;
            jQuery( link ).closest( '.product' ).find( '.cart-loading' ).find( 'i' ).removeClass( 'fa-check-square-o' ).addClass( 'fa-spinner fa-spin' );
            jQuery( this ).closest( '.product' ).find( '.cart-loading' ).fadeIn( );
            setTimeout( function ( ) {
                jQuery( link ).closest( '.product' ).find( '.product-img img' ).animate( { opacity: 0.75 } );
                jQuery( link ).closest( '.product' ).find( '.cart-loading' ).find( 'i' ).hide( ).removeClass( 'fa-spinner fa-spin' ).addClass( 'fa-check-square-o' ).fadeIn( );
                setTimeout( function ( ) {
                    jQuery( link ).closest( '.product' ).find( '.cart-loading' ).fadeOut( ).closest( '.product' ).find( '.product-img img' ).animate( { opacity: 1 } );
                    ;
                }, 2000 );
            }, 2000 );
        } );
        jQuery( 'li.product' ).mouseenter( function ( ) {
            if ( jQuery( this ).find( '.cart-loading' ).find( 'i' ).hasClass( 'fa-check-square-o' ) ) {
                jQuery( this ).find( '.cart-loading' ).fadeIn( );
            }
        } ).mouseleave( function ( ) {
            if ( jQuery( this ).find( '.cart-loading' ).find( 'i' ).hasClass( 'fa-check-square-o' ) ) {
                jQuery( this ).find( '.cart-loading' ).fadeOut( );
            }
        } );
        // SOCIAL Share POPOUP WINDOW
        jQuery( '.leap-share-buttons a' ).click( function ( event ) {
            var width = 575,
                height = 400,
                left = ( jQuery( window ).width( ) - width ) / 2,
                top = ( jQuery( window ).height( ) - height ) / 2,
                url = this.href,
                opts = 'status=1' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
            window.open( url, 'share', opts );
            return false;
        } );
        
        /*
         * headers 12, 13 & 14
         */
        
        var header_12_13_14 = jQuery( ".header12, .header13, .header14" );
        var header_12_13_14_content = header_12_13_14.find('.header-content');
        var header14_vh_wrapper = jQuery('.header14 .header-vh-wrapper');
        var mobile_menu = jQuery('#mobile-menu');
        var header_15 = jQuery( ".header15 .top-header-content" );
        var header_17 = jQuery( ".header17 .horizontal_menu_area" );

        function toggle_menu_icon() {
            
            if( mobile_menu.css('display') == 'block' ) {
                return;
            } 
            
            var toggle_icon = jQuery( "#nav-icon" );

            if ( header_12_13_14.hasClass( "side-header" ) ) {
                toggle_icon.removeClass( "icon-bars" ).addClass( "icon-close" );
                header_12_13_14_content.fadeIn( 500 );
            } else {
                toggle_icon.removeClass( "icon-close" ).addClass( "icon-bars" );
                header_12_13_14_content.fadeOut( 500 );
            }
        }

        toggle_menu_icon();
        
        jQuery( document ).click( function ( ) {
            if ( header_12_13_14.hasClass( "side-header" ) ) {
                header_12_13_14.removeClass( "side-header" );
                toggle_menu_icon();
            }
        } );
        jQuery( ".header-content" ).click( function ( event ) {
            event.stopPropagation();
        } );

        jQuery( ".menu-icon" ).click( function ( event ) {
            event.preventDefault();
            
            if ( header_12_13_14.hasClass( "side-header" ) ) {
                header_12_13_14.removeClass( "side-header" );
            } else {
                event.stopPropagation();
            }
            
            header_12_13_14.addClass( "side-header" );
            toggle_menu_icon();
        } );
        
        jQuery( ".header15 .menu-icon" ).click( function ( event ) {
            this.classList.toggle( "active" );
            header_15.slideToggle( "300" );  
        });
        jQuery( ".header17 .menu-icon" ).click( function ( event ) {
            this.classList.toggle( "active" );
            header_17.toggleClass("opened"); 
        });

        
        /*
         * Close vertical headers when mouse out of the header div
         */
        var mouse_on_vh;
        
        jQuery('#leap-header')
            .mouseenter(function() {
                mouse_on_vh = 1;
            })
            .mouseleave(function() {
                mouse_on_vh = null;
                setTimeout(function(){
                    if ( ! mouse_on_vh && jQuery( '#leap-header' ).hasClass( 'side-header' ) ) {
                        jQuery( '#leap-header' ).removeClass( "side-header" );
                        toggle_menu_icon( );
                    }
                }, 1000);
            });
        
            
    } );

    jQuery( document ).ready( function ( ) {

        /*
         * Sticky Main Sidebar
         */
        
        var fixed_header = 0;
        if ( jQuery( '#leap-header .navbar-inner' ).hasClass( 'navbar-fixed-top' ) ) {
            fixed_header = 64;
        }
        jQuery( '#main-sidebar.sticky-element .main-sidebar-content' ).stickUp( {
            keepInWrapper: true,
            topMargin: jQuery( "#wpadminbar" ).outerHeight() + fixed_header + 25,
            wrapperSelector: ".row",
            disableOn: function () {
                if ( isMobile.any || jQuery( window ).width() < 768 )
                    return false;
                return true;
            }
        } );
        
    } );


    jQuery( window ).load( function ( $ ) {
        var page_dir = jQuery( 'html' ).attr( 'dir' );
        var dir_transformsEnabled;
        if ( page_dir == 'rtl' ) {
            dir_transformsEnabled = false;
        } else {
            dir_transformsEnabled = true;
        }


// cache container
        var $containerGrid = jQuery( '.portfolio-wrapper .portfolio-grid, .blog-grid, .archive-grid, .search-grid' );
        // initialize isotope
        $containerGrid.isotope( {
            layoutMode: 'masonry',
            isOriginLeft: dir_transformsEnabled
                // options...
        } );
        /*
         $containerGrid.infinitescroll({
         navSelector  : '.pagination',    // selector for the paged navigation 
         nextSelector : '.pagination ul li.next a',  // selector for the NEXT link (to page 2)
         itemSelector : '.portfolio-wrapper .portfolio-item',     // selector for all items you'll retrieve
         loading: {
         finishedMsg: 'No more pages to load.',
         }
         },
         // call Isotope as a callback
         function( newElements ) {
         $containerGrid.isotope( 'appended', jQuery( newElements ) ); 
         }
         );
         */


        // filter items when filter link is clicked
        jQuery( '.portfolio-tabs a' ).click( function ( ) {
            var selector = jQuery( this ).attr( 'data-filter' );
            $containerGrid.isotope( { filter: selector } );
            jQuery( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
            jQuery( this ).parent( ).addClass( 'active' );
            return false;
        } );
        // cache container
        var $containerOneCol = jQuery( '.portfolio-wrapper .portfolio-1col, .portfolio-wrapper .portfolio-one-column' );
        // initialize isotope
        $containerOneCol.isotope( {
            layoutMode: 'vertical',
            isOriginLeft: dir_transformsEnabled,
        } );
        // filter items when filter link is clicked
        jQuery( '.portfolio-tabs a' ).click( function ( ) {
            var selector = jQuery( this ).attr( 'data-filter' );
            $containerOneCol.isotope( { filter: selector } );
            jQuery( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
            jQuery( this ).parent( ).addClass( 'active' );
            return false;
        } );
        // cache container
        var $containerTwoCol = jQuery( '.portfolio-wrapper .portfolio-2col, .portfolio-wrapper .portfolio-two-column, .blog-medium, .archive-medium, .search-medium' );
        // initialize isotope

        $containerTwoCol.isotope( {
            layoutMode: 'fitRows',
            isOriginLeft: dir_transformsEnabled,
        } );
        // filter items when filter link is clicked
        jQuery( '.portfolio-tabs a' ).click( function ( ) {
            var selector = jQuery( this ).attr( 'data-filter' );
            $containerTwoCol.isotope( { filter: selector } );
            jQuery( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
            jQuery( this ).parent( ).addClass( 'active' );
            return false;
        } );
        // cache container
        var $containerThreeCol = jQuery( '.portfolio-wrapper .portfolio-3col, .portfolio-wrapper .portfolio-three-column' );
        // initialize isotope
        $containerThreeCol.isotope( {
            layoutMode: 'fitRows',
            isOriginLeft: dir_transformsEnabled,
        } );
        // filter items when filter link is clicked
        jQuery( '.portfolio-tabs a' ).click( function ( ) {
            var selector = jQuery( this ).attr( 'data-filter' );
            $containerThreeCol.isotope( { filter: selector } );
            jQuery( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
            jQuery( this ).parent( ).addClass( 'active' );
            return false;
        } );
        // cache container
        var $containerFourCol = jQuery( '.portfolio-wrapper .portfolio-4col, .portfolio-wrapper .portfolio-four-column' );
        // initialize isotope
        $containerFourCol.isotope( {
            layoutMode: 'fitRows',
            isOriginLeft: dir_transformsEnabled,
        } );
        // filter items when filter link is clicked
        jQuery( '.portfolio-tabs a' ).click( function ( ) {
            var selector = jQuery( this ).attr( 'data-filter' );
            $containerFourCol.isotope( { filter: selector } );
            jQuery( this ).parents( 'ul' ).find( 'li' ).removeClass( 'active' );
            jQuery( this ).parent( ).addClass( 'active' );
            return false;
        } );
    } );




// Shortcodes
// Toogla and Accordion
    jQuery( function () {
        jQuery( ".toggle" ).accordion( {
            collapsible: true,
            heightStyle: "content",
            active: false
        } );
        jQuery( ".toggle-open" ).accordion( {
            collapsible: true,
            heightStyle: "content"
        } );
        jQuery( ".accordion" ).accordion( {
            collapsible: true,
            heightStyle: "content"
        } );
    } );

// Tabs
    jQuery( function () {
        jQuery( ".leap-sc-tabs ul.leap-tabs-titles > li a" ).each( function ( index ) {
            jQuery( this ).attr( "href", "#leap-sc-tab-" + index.toString() );
        } );
        jQuery( ".leap-sc-tabs > div" ).each( function ( index ) {
            jQuery( this ).attr( "id", "leap-sc-tab-" + index.toString() );
        } );
        jQuery( ".leap-sc-tabs.horizontal" ).tabs();
        jQuery( ".leap-sc-tabs.vertical" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        jQuery( ".leap-sc-tabs.vertical ul.leap-tabs-titles li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    } );

// Tooltip
    jQuery( function () {
        jQuery( document ).tooltip( {
            selector: "a[data-toggle=tooltip]",
        } )
        jQuery( '.topbar-block .social-networks a' ).attr( 'data-placement', 'bottom' );
    } );

// Cycle Testimonials
    jQuery( document ).ready( function () {
        function onAfter( curr, next, opts, fwd ) {
            var $ht = jQuery( this ).height();
            //set the container's height to that of the current slide
            jQuery( this ).parent().css( 'height', $ht );
        }

        jQuery( '.leap-testimonials' ).each( function () {
            jQuery( this ).find( '.testimonials' ).cycle( {
                fx: 'fade',
                after: onAfter,
                pause: true,
                timeout: jQuery(this).data("timeout"),
                prev: jQuery( this ).find( '.prev' ),
                next: jQuery( this ).find( '.next' )
            } );
        } );
    } );


    jQuery( window ).load( function () {
        //Clients/Portfolio Slider 
        jQuery( '.list_carousel' ).each( function () {
            var carousel = jQuery( this ).find( 'ul' );
            carousel.carouFredSel( {
                prev: jQuery( this ).find( '.cfs-prev' ),
                next: jQuery( this ).find( '.cfs-next' ),
                auto: false,
                width: '100%'
            } );
        } );
    } );

    jQuery( document ).ready( function ( $ ) {
        //Pricing table
        jQuery( '.sep-boxed-pricing,.full-boxed-pricing' ).each( function () {
            jQuery( this ).addClass( 'columns-' + jQuery( this ).find( '.column' ).length );
        } );
    } );
    

} )( jQuery );
