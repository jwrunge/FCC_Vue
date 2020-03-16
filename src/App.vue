<template>
  <div>
    <div id="app" ref='app'>

      <!-- Main navigation -->
      <Navigation :mobileOpen='mobileOpen' @openMobileNav='toggleMobileNav'/>
      
      <!-- Background slideshow -->
      <Slideshow :windowTop="windowTop"/>

      <!-- Left decorative angle -->
      <LeftAngle/>

      <!-- Main content -->
      <div id='main-content'>

        <!-- Header -->
        <div ref='header' id='header'>
          <!-- Chalice logo -->
          <img id='primary-img' alt="DOC chalice logo" src="./assets/chalice.svg">
          
          <!-- Logo text -->
          <div id='mobile-formatting-div'>
            <div id='logo'>
              <img id='primary-img-mobile' alt="DOC chalice logo" src="./assets/chalice.svg">

              <span>
                <h1>
                  First Christian Church
                  <span class='smaller'>Disciples of Christ</span>
                </h1>
                <div>Galesburg, IL</div>
              </span>
            </div>

            <!-- Location and links -->
            <div id='location-links'>
              <div class='mt'>301 N Broad St, Galesburg, IL 61401</div>
              <div>
                <a target='_blank' href='tel:1-309-343-9960'>309.343.9960</a> | 
                <a target='_blank' href='mailto:fccgalesburg@gmail.com'>Email us</a> | 
                <a target='_blank' href='https://www.google.com/maps/place/First+Christian+Church/@40.9512658,-90.3730744,17z/data=!3m1!4b1!4m5!3m4!1s0x87e1be068de92a53:0x80655c07ce1123a!8m2!3d40.9512658!4d-90.3708857'>Directions</a>
              </div>
            </div>
          </div>
        </div> <!-- end header div -->

        <div id='infobox'>
          <!-- <img id='church-pic' src='./assets/frontpage_images/church.jpg' alt='Picture of First Christian Church'> -->
          <div id='worship-times'>
            <div class='inner'>
              <h3>Sunday Worship</h3>
              <div>Contemporary: 8:30am</div>
              <div>Traditional: 11am</div>
              <hr>
              <div id='ss-classes'>All-ages Sunday School Classes: 9:30am</div>
              <button class='block mt2'>Donate Now</button>
              <button class='block'>Online Giving</button>
            </div>
          </div>
        </div>

      </div> <!-- end main-content -->

      <div id='decorative-bottom-angle'>
        <div class='white'></div>
      </div>

      <div id='mainpage-content'>
        <div class='content-block'>
          <h2>What's going on now at FCC Galesburg?</h2>
          <div class='current-events'>
            <img alt='Participating in Be The Church Sunday' src='./assets/frontpage_images/bethechurchpic.jpg'>
            <h3>Sermon Series: "Love Comes to Town"</h3>
            <p>When love comes to town, lives are changed!</p>
            <p>We are called to share the love of Christ with our neighbors and our family and yes, even our enemies! Throughout August and September, we will be going through I Corinthians 13 during our sermon series and discovering more about sharing the love of God.</p>
            <p>Upcoming sermons include:
              <ul>
                <li>September 1 - Triggered (Dealing with Anger)</li>
                <li>September 8 - Like a Good Neighbor (Be the Church Sunday)</li>
                <li>September 15 - Love Everlasting (Worship in the Park)</li>
              </ul>
            </p>
          </div>
        </div>

        <div id='quicklinks'>
          <div class="inner">
            <router-link to='staff'><img src='./assets/staff.svg' alt='Staff'><span class='linklabel'><span class='inner'>Staff</span></span></router-link>
            <router-link to='sermons'><img src='./assets/sermons.svg' alt='Sermons'><span class='linklabel'><span class='inner'>Sermons</span></span></router-link>
            <router-link to='sermons'><img src='./assets/newsletters.svg' alt='Newsletters'><span class='linklabel'><span class='inner'>Newsletters</span></span></router-link>
            <a href='https://www.facebook.com/First-Christian-Church-Disciples-of-Christ-Galesburg-Illinois-108822552519210/' target="_blank"><img src='./assets/facebooklogo.svg' alt='Facebook'><span class='linklabel'><span class='inner'>Facebook</span></span></a>
          </div>
        </div>

        <div class='angled'>
          <div id='weLoveOurChurch' ref='weLoveOurChurch' class='inner'>
            <h2 ref='loveHeader'>We love our church!</h2>
            <transition-group name='left-slide' appear>
              <p ref='loveListItem' v-for='(blurb, i) in loveList' v-show='i == currentLoveListItem' :key='blurb.name'>{{i + ' ' + blurb.text }}</p>
            </transition-group>
          </div>
        </div>

        <div id='footer'>
          <hr>
          <div class='copy'>&copy; {{new Date().getFullYear()}} First Christian Church, Disciples of Christ - Galesburg, IL</div>
          <div>Site design by <a target='_blank' href='http://jacobrunge.com'>Jacob Runge</a></div>
        </div>
      </div>
    </div>

    <!-- Subpage content -->
    <transition name='fade'>
      <div id='subpage' ref='subpage' v-if='subpageOpen'>
          <Navigation :mobileOpen='mobileOpen' @openMobileNav='toggleMobileNav' :subpage="true"/>
        <transition name='slideup' mode='out-in'>
          <router-view @showBio='showStaffBio'>
          </router-view>
        </transition>
      </div>
    </transition>

    <!-- Loader screen -->
    <transition name='fade'>
      <div v-if='!loaded' id='loader'><img src='./assets/loading.svg' alt='loading content'></div>
    </transition>

    <!-- Announcement modal -->
    <Modal v-if='announcement && loaded' @cancel='announcement = null'>
      <span class='centered' v-html='announcement'></span>
      <button @click='announcement = null'>OK</button>
    </Modal>

    <!-- Staff Bio -->
    <Modal v-if='showBio' :showControls='true' :closeOnly='true' @cancel='showBio = false'>
        <StaffBio :staffer='staffer' slot='nobg'></StaffBio>
    </Modal>

  </div>
</template>


<script>
  import Navigation from './components/Navigation'
  import Modal from './components/modal'
  import StaffBio from "./components/staffbio"
  import LeftAngle from './components/LeftAngle'
  import Slideshow from './components/Slideshow'

  export default {
    components: { Modal, StaffBio, LeftAngle, Slideshow, Navigation },
    data() {
      return {
        desktopWidth: 1200,
        loaded: true,
        navigationBgTimer: null,
        subpageOpen: false,
        mobileOpen: false,
        showBio: false,
        staffer: {},
        windowTop: 0, //holds the window top scroll position
        announcement: null,//"<h1>Work in progress</h1><p>This is a draft website; it is not intended to represent First Christian Church in its current state.</p>",
        currentLoveListItem: 0,
        loveList: [
          { name: '0', text: "0 Dolore cillum Lorem eiusmod irure consectetur ad occaecat voluptate irure laboris dolor sunt fugiat consectetur." },
          { name: '1', text: "1 Dolore cillum Lorem eiusmod irure consectetur ad occaecat voluptate irure laboris dolor sunt fugiat consectetur." },
          { name: '2', text: "2 Dolore cillum Lorem eiusmod irure consectetur ad occaecat voluptate irure laboris dolor sunt fugiat consectetur. 2 Dolore cillum Lorem eiusmod irure consectetur." },
          { name: '3', text: "3 Dolore cillum Lorem eiusmod irure consectetur ad occaecat voluptate irure laboris dolor sunt fugiat consectetur." },
          { name: '4', text: "4 Dolore cillum Lorem eiusmod irure consectetur ad occaecat voluptate irure laboris dolor sunt fugiat consectetur." }
        ]
      }
    },
    watch: {
      $route() {
        this.showHideSubpage()
      }
    },
    mounted() {
      //Set up windowTop listener (does not work as computed property)
      this.windowTop = this.$refs.app.scrollTop < 20
      this.$refs.app.addEventListener('scroll', ()=>{
        this.windowTop = this.$refs.app.scrollTop < 20
      })

      setInterval(()=> {
        if(this.currentLoveListItem == this.loveList.length - 1) this.currentLoveListItem = 0
        else this.currentLoveListItem += 1
      }, 4000)
    },
    methods: {
      toggleMobileNav(val) {
        this.mobileOpen = (val == true)
      },
      scrollToTop() { //If mobile, scroll back to top of app
        this.$refs.app.scrollTop = 0
      },
      // Ran initially and set to run on screen resize
      //Resets caption and indicator positions to more accurate locations than the CSS can handle
      resizeScreen() {
        //Set height of angled "We Love Our Church" div
        let maxPHeight = 0
        this.$refs.loveListItem.forEach((item)=> {
          item.style.display = 'block'
          if(item.clientHeight > maxPHeight) maxPHeight = item.clientHeight
          item.style.display = 'none'
        })

        this.$refs.weLoveOurChurch.style.height = (this.$refs.loveHeader.offsetHeight + maxPHeight) + "px"
      },

      //Calls a function if we're at a mobile-ish screen size
      ifMobile(callback, param=false) {
        if(window.innerWidth <= this.desktopWidth) {
          callback(param)
        }
      },

      showHideSubpage() {
        this.mobileOpen = false

        if(this.$router.currentRoute.path != '/') {
          this.subpageOpen = true
        }
        else
          this.subpageOpen = false
      },

      showStaffBio(staffer) {
        this.staffer = staffer
        this.showBio = true
      },
    }
  }

</script>


<style lang="scss">

@import './assets/style/variables.scss';
@import './assets/style/core.scss';
@import './assets/style/subpages.scss';
@import './assets/style/transitions.scss';

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
}

#app {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  width: 100%;
  position: relative;
  scroll-behavior: smooth;  
  @media #{$notMobile} {
    perspective: 2px;
  }
}

#loader {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 100;
  position: absolute;
  top: 0; left: 0;

  img {
    width: 5em;
  }
}

#mainpage-content {
  width: 100%;
  position: absolute;
  top: 100vh;
  background-color: #fff;

  .content-block {
    margin: 5em auto;
    padding: 0 1em;
  }

  @media #{$notMobile} {
    .content-block {
      width: 45em;
      margin: 7em 20% 7em auto;
      padding: 0;
      left: 0;
    }
  }
}

#main-content {
  position: relative;
  box-shadow: $box-shadow;

  @media #{$notMobile} {
    position: absolute;
    top: 0;
    width: 30%;
    height: 100vh;
    box-shadow: none;
    z-index: 2;
  }
}

.current-events {
  img {
    display: block;
    max-width: 100%;
    max-height: 50vh;
    margin: 0 auto 1em auto;

    @media #{$notMobile} {
      max-width: 50%;
      float: right;
      margin: 0 1em 1em 1em;
    }
  }
}

#infobox {
  display: none; 
  
  @media #{$notMobile} {
    display: block;
    position: absolute;
    bottom: 0;
    width: 90%;
    height: 60vh;
    text-align: center;
    font-size: 1.2em;

    h3 {
      margin: 0;
      margin-bottom: .5em;
    }

    hr {
      width: 70%;
    }
  }
}

#worship-times {
  display: none;

  h3 {
    font-size: 1.5em;
    color: $gray;
  }

  @media #{$notMobile} {
    padding: 1em;
    display: inline-block;
    width: auto;
    margin: 0 auto 0 auto;
    text-shadow: -1px -1px 0 #fff,
      1px -1px 0 #fff,
      -1px 1px 0 #fff,
      1px 1px 0 #fff;
  }
}

#ss-classes {
  font-size: .8em;
}

#quicklinks {
  background-color: $lightgray;
  transform: skewY(-1.5deg);
  padding: 3em 0 6em 0;
}

#quicklinks > .inner {
  max-width: 45em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5em auto 5em auto;
  align-items: center;
  justify-items: center;
  transform: skewY(1.5deg);

  @media screen and (min-width: 700px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

  img {
    max-width: 5em;
    margin: 1em 1em;
    transition: transform .3s ease-in-out;

    @media #{$notMobile} {
      max-width: 8em;
    }

    &:hover {
      filter: brightness(1.2);
      transform: scale(1.1);
    }
  }

  a { position: relative; }

  .linklabel {
    display: block;
    margin: 0 auto 2em auto;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
  }
}

.angled {
  width: 100%;
  background-color: $red;
  padding: 5em 0;
  color: white;
  transform: skewY(1.5deg);
  background-image: url('./assets/frontpage_images/redbg.jpg');
  background-size: cover;
  background-attachment: fixed;
  box-shadow: $box-shadow;
  position: relative;
  top: -3em;

  .inner {
    width: 45em;
    max-width: 90%;
    margin: 3em auto;
    position: relative;
    min-height: 12em;
    transform: skewY(-1.5deg);
  }

  h2 {
    color: white;
    margin: 0;
    margin-bottom: .5em;
    font-size: 3em;
    position: relative;

    @media #{$notMobile} {
      left: -1em;
    }
  }

  p {
    width: 90%;
    font-size: 1.8em;
    margin: 0 1em;

    @media #{$notMobile} {
      width: 110%;
    }
  }
}

// Site header

#header {
  position: relative;
  color: black;
  padding: .5em;
  background-color: white;
  box-shadow: $box-shadow;

  display: flex;
  align-items: center;
  justify-content: center;

  text-shadow: -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;

  #logo {
    display: flex;
    align-items: center;
  }

  #location-links {
    text-align: center;
  }

  h1 {
    font-size: 1.4em;
    color: $red;
    margin: 0;
    padding: 0;
    .smaller { font-size: .7em; display: block; }
  }

  #mobile-formatting-div {
    display: block;
  }

  @media screen and (min-width: 750px) {
    display: block;

    #mobile-formatting-div {
      display: flex; 
      justify-content: space-around;
    }
  }

  @media #{$notMobile} {
    margin-left: 1em;
    display: flex;
    text-align: left;
    background-color: transparent;
    box-shadow: none;
    padding: 0 1em 0 0;
    position: absolute;
    top: 5vh;
    height: 30vh;
    left: 0;

    h1 { white-space: nowrap; font-size: 1.8em; }

    #location-links {
      text-align: left;
    }

    #mobile-formatting-div {
      display: block;
    }
  }
}

#footer {
  padding: 5em 0 6em 0;
  text-align: center;

  hr {
    width: 60%;
    margin-bottom: 3em;
  }

  .copy {
    font-size: 1.2em;
    margin-bottom: .4em;
  }
}

#primary-img {
  display: none;

  @media #{$notMobile} {
    display: block;
    height: 25vh;
    max-height: 15em;
    margin: 0 1.5em 0 0;
  }
}

#primary-img-mobile {
  height: 4em;
  margin: 0 1em .5em 0;

  @media #{$notMobile} {
    display: none;
  }
}

// Angled divs (decorative)
#decorative-angle-left {
  display: none; 
  pointer-events: none;

  @media #{$notMobile} {
    z-index: 1;
    display: block;
    position: absolute;
    top: 0;
    height: 200vh;
    left: -.5em;
    opacity: 1;
  }
}

#decorative-bottom-angle {
  width: 100%;
  position: absolute;
  height: 3em;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  // z-index: 1;

  .white {
    height: 3em;
    background-color: white;
    transform: skewY(1.5deg);
    position: relative;
    top: 50%;
  }
}

</style>
