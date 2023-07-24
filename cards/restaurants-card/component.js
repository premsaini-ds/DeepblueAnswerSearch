{{> cards/card_component componentName='restaurants-card' }}

class restaurantsCardComponent extends BaseCard['restaurants-card'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }
  onMount() {
    const onVerticalFullPageMap = !!document.querySelector('.js-answersVerticalFullPageMap');
    onVerticalFullPageMap && registerVerticalFullPageMapCardListeners(this);
    const self = this;
    const tabLinks = self._container.querySelectorAll(".tablinks");
    tabLinks.forEach(function(elTab) { 
      var tabLinksTabsId = elTab.dataset.tabsid;
      elTab.addEventListener("click", function (el) {
        var tabsId = el.currentTarget.dataset.tabsid;           
        if( tabLinksTabsId === tabsId ){      
          var element = document.getElementById(tabsId);
          if(element.classList.contains("active")){
            element.classList.remove("active");
            document.getElementById("tabs-"+tabsId).classList.remove("active");
          }else{ 
            const tabcontent = document.querySelectorAll(".tabcontent");           
            tabcontent.forEach(function(tc) {
              tc.classList.remove("active");
            });
            const tabLinks1 = document.querySelectorAll(".tablinks");     
            tabLinks1.forEach(function(tl) {        
                tl.classList.remove("active");        
            });
            document.getElementById("tabs-"+tabsId).classList.add("active");                     
            element.classList.add("active");
          }
        }
      });
    });  
    $('.accordion-container').on('click', '.test', function(){
      $('.set-acc').removeClass('active');
      $(this).parent().addClass('active');
    });
    $('.accordion-container').on('click', '.active .test', function(){
      $('.set-acc').removeClass('active');
    }); 
    super.onMount();
       const getCustomDirection = self._container.querySelector(".get-direction-url"); 
       if(getCustomDirection){    
       getCustomDirection.addEventListener("click", function (el) {  
        var placename = $(this).attr('data-name');
        console.log(placename);
        var latitude = el.currentTarget.dataset.latitude;         
        var longitude = el.currentTarget.dataset.longitude;
        var city = el.currentTarget.dataset.city;
        var country = el.currentTarget.dataset.country;
        var region =el.currentTarget.dataset.region;
        let user_latitude = getCookie('user_latitude');
        let user_longitude = getCookie('user_longitude');
        if (user_latitude && user_longitude) {
            var direction_url = 'https://www.google.com/maps/dir/?api=1&destination='+ placename + ','  + address.line1 + ',' + address.line2 +'&origin=' + user_latitude + ',' + user_longitude;
            window.open(direction_url, '_blank');
        } else {
            getCustomDirectionUrl(latitude,longitude,country,city,region,placename);
        }
    });
       }
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function getCustomDirectionUrl(latitude, longitude, country, city,region,placename) {  
         
        if (navigator.geolocation) {
            const error = (error) => {
                var message_string = 'Unable to determine your location. please share your location';
                 if (confirm(message_string) != true) {
                        if (city.length == 0) {
                            if (region.length == 0) {
                                getCoordinates(country, latitude, longitude,placename );
                                console.log(placename);
                            }
                            else {
                                getCoordinates(region, latitude, longitude, placename);
                                console.log(placename);
                            }
                        }
                        else {
                            getCoordinates(city, latitude, longitude, placename)
                             console.log(placename);
                        }
                    } else {
                        return false;
                    }
            }
            navigator.geolocation.getCurrentPosition(function(position) {
                var currentLatitude = position.coords.latitude;
                var currentLongitude = position.coords.longitude;
                console.log(currentLatitude,currentLongitude);
              //  setCookie("user_latitude", currentLatitude, 1);
              //  setCookie("user_longitude", currentLongitude, 1);
                var direction_url = 'https://www.google.com/maps/dir/?api=1&destination='+ placename + ',' + address+ '&origin=' + currentLatitude + ',' + currentLongitude;
                window.open(direction_url, '_blank');
            }, error, {
                timeout: 10000
            , });
        };
    }
     function getCoordinates(address, latitude, longitude, placename) {
                    var getDirectionUrl = 'https://www.google.com/maps/dir/?api=1&origin=UK'+ address + '&destination='+ placename + ',' + address;
                      console.log(latitude,longitude);
                    window.open(getDirectionUrl, '_blank');
        }
  }
  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param {Object} profile of the entity in the card
   */
  dataForRender(profile) {
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_top';    
    let opts = {};
    opts.disableOpenStatus = true;
    let renderData = {
      title: profile.name, // The header text of the card
      uid: profile.uid, // The header text of the card
      url: 'https://www.deepbluerestaurants.com/locations/' + profile.slug, // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      titleEventOptions: this.addDefaultEventOptions(), // The event options for title click analytics
      hours: Formatter.hoursList(profile, opts),
      deliveryHours: Formatter.deliveryHourslist(profile, opts),
      takeoutHours: Formatter.takeoutHourslist(profile, opts),
      phoneurl: Formatter.phoneLink(profile),
      line1: profile.address.line1,
      line2: profile.address.line2,
      city: profile.address.city,
      postalCode:profile.address.postalCode,
      reopenstatus1: Formatter.statusa(profile),
      reopenstatus2: Formatter.statusb(profile),
      reopenstatus3: Formatter.statusc(profile),
      address: Formatter.address(profile) || profile.locationString || '', // The address for the card
      phone: Formatter.nationalizedPhoneDisplay(profile), // The phone number for the card
      phoneEventOptions: this.addDefaultEventOptions(), // The analytics event options for phone clicks
      distance: Formatter.toLocalizedDistance(profile), // Distance from the user’s or inputted location
      image: profile.c_locationAnswerSearchRestaurantImage ? profile.c_locationAnswerSearchRestaurantImage.image.url : null, // The URL of the image to display on the card
      showOrdinal: true, // Show the map pin number on the card. Only supported for universal search
      CTA2: { // The secondary call to action for the card
        label: profile.c_getDirections1,
        staticlabel: 'Get Directions',
        iconName: 'directions',
        url: "#",
        target: '_blank',
        eventType: 'DRIVING_DIRECTIONS',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
        yextDisplayCoordinate: profile.yextDisplayCoordinate,
        ctaaddress:profile.address, // Screen reader only text for thumbs-down
        placename : profile.name
      },
      CTA3: {
        label: 'Call', // The CTA's label
        iconName: 'phone', // The icon to use for the CTA
        url: Formatter.phoneLink(profile), // The URL a user will be directed to when clicking
        target: 'blank', // Where the new URL will be opened
        eventType: 'TAP_TO_CALL', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      feedback: false, // Shows thumbs up/down buttons to provide feedback on the result card
      feedbackTextOnSubmission: 'Thanks!', // Text to display after a thumbs up/down is clicked
      positiveFeedbackSrText: 'This answered my question', // Screen reader only text for thumbs-up
      negativeFeedbackSrText: 'This did not answer my question' // Screen reader only text for thumbs-down      
    };
  if(typeof profile.c_moreInfo1 != 'undefined' ){
      renderData.CTA1 = { // The primary call to action for the card
        label: profile.c_moreInfo1, // The label of the CTA
        iconName: 'document', // The icon to use for the CTA
        url: 'https://www.deepbluerestaurants.com/locations/' + profile.slug, // The URL a user will be directed to when clicking
        target: linkTarget, // If the URL will be opened in a new tab, etc.
        eventType: 'CTA_CLICK', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(), // The analytics event options for CTA clicks
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      };
    }
    else{
      renderData.CTA1 = { // The primary call to action for the card
        label: "More Info", // The label of the CTA
        iconName: 'document', // The icon to use for the CTA
        url: 'https://www.deepbluerestaurants.com/locations/' + profile.slug, // The URL a user will be directed to when clicking
        target: linkTarget, // If the URL will be opened in a new tab, etc.
        eventType: 'CTA_CLICK', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(), // The analytics event options for CTA clicks
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      };
    }
  if(typeof profile.c_orderNow != 'undefined' && profile.c_orderNow.label && profile.c_orderNow.link){
      renderData.CTA4 = {
        label: profile.c_orderNow.label, // The CTA's label
       // iconName: '', // The icon to use for the CTA
        url: profile.c_orderNow.link, // The URL a user will be directed to when clicking
        iconUrl: 'https://www.deepbluerestaurants.com/locations/images/order_list.png',
        target: linkTarget, // Where the new URL will be opened
        eventType: 'ORDER_NOW', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      };
    }
    if(typeof profile.c_bookATable2 != 'undefined' && profile.c_bookATable2.label && profile.c_bookATable2.link){
      renderData.CTA5 = {
        label: profile.c_bookATable2.label, // The CTA's label
       // iconName: '', // The icon to use for the CTA
        url: profile.c_bookATable2.link, // The URL a user will be directed to when clicking
        iconUrl: 'https://www.deepbluerestaurants.com/locations/images/bookatable.png',
        target: '_blank', // Where the new URL will be opened
        eventType: 'ORDER_NOW', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      };
    }
    return renderData;
  }
  /**
   * The template to render
   * @returns {string}
   * @override
   */
  static defaultTemplateName (config) {
    return 'cards/restaurants';
  }
}
ANSWERS.registerTemplate(
  'cards/restaurants',
  {{{stringifyPartial (read 'cards/restaurants-card/template') }}}
);
ANSWERS.registerComponentType(restaurantsCardComponent);
