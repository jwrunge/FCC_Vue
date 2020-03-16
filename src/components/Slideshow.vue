<template>
    <div>
        <!-- The slideshow -->
        <transition name='slidefade'>
            <img class='slideshow' :src="bgImages[currentImageIndex].src" :key="currentImageIndex">
        </transition>

      <!-- The 'caption' / info box -->
      <transition-group name='fadeup'>
        <div class='caption' ref='captions' v-for="(bgImage, index) in bgImages" v-show="windowTop && index == currentImageIndex && bgImages[currentImageIndex].text != null" :key='bgImage.name'>
            <div class='inner'>
              <h2 class='caption-heading'>{{bgImage.heading}}</h2>
              <div class='caption-text'>{{bgImage.text}}</div>
              <div v-if="bgImage.link != null" class='caption-link'>
                <router-link :to='bgImage.link' v-if="bgImage.linkType != 'browser'" class='caption-link'>{{ bgImage.linkText }}</router-link>
                <a v-else target="_blank" class='caption-link' :href="bgImage.link">{{bgImage.linkText}}</a>
              </div>
            </div>
        </div>
      </transition-group>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        currentImageIndex: 0,
        navigationBgTimer: null,
        slideshowPaused: false,
        slideshowTimer: null,
        secondsTimer: null,
        secondsLeft: 0,
        slideDisabled: false,
        slideEnabler: null,
        showFullscreenImage: false,
        fullscreenImage: null,
        bgImages: [
          { name:'1', src: 'background-slides/band.jpg', xPercent: 50, yPercent: 50, alt: "", heading: "Growing passionate disciples of Christ", text: "Join us for worship Sundays at 8:30am (Contemporary) or 11am (Traditional).", linkText: "Learn more about our Worship services", link: "/worship" },
          { name:'2', src: 'background-slides/bethechurch.jpg', xPercent: 50, yPercent: 100, alt: "", heading: "Serving our community", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elit leo, cursus vel interdum eget, finibus vitae nisl. Suspendisse feugiat tincidunt gravida. Aliquam vitae metus facilisis, vestibulum mi id, tempor nulla. Proin finibus pretium dapibus. Donec ac pulvinar odio. Ut arcu nulla, posuere quis sodales nec, bibendum at lorem. Nulla facilisi.", linkType: 'browser', linkText: "For news and current events, check out our Facebook page!", link: "https://www.facebook.com/First-Christian-Church-Disciples-of-Christ-Galesburg-Illinois-108822552519210/" },
          { name:'3', src: 'background-slides/band2.jpg', xPercent: 50, yPercent: 50, alt: "", heading: "Rockin' out", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elit leo, cursus vel interdum eget, finibus vitae nisl. Suspendisse feugiat tincidunt gravida. Aliquam vitae metus facilisis, vestibulum mi id, tempor nulla. Proin finibus pretium dapibus. Donec ac pulvinar odio. Ut arcu nulla, posuere quis sodales nec, bibendum at lorem. Nulla facilisi." },
          { name:'4', src: 'background-slides/choir.jpg', xPercent: 0, yPercent: 20, alt: "", heading: "Singing songs of praise", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elit leo, cursus vel interdum eget, finibus vitae nisl." },
          { name:'5', src: 'background-slides/congo.jpg', xPercent: 50, yPercent: 50, alt: "", heading: "Congolese Worship", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elit leo, cursus vel interdum eget, finibus vitae nisl." },
          { name:'6', src: 'background-slides/dinner.jpg', xPercent: 50, yPercent: 60, alt: "", heading: "Our family of faith", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkText: "Click here for pictures from the event!", link: "google.com", linkType: "browser" }
        ]
      }
    },

    props: ['windowTop'],

    mounted() {
      this.preloadImages().then(this.startSlideshow())
    },
    
    methods: {
      //Loads images
      preloadImages: async function() {
        const preloads = []

        //Preload images
        for(let i = 0; i < this.bgImages.length; i++) {
          preloads.push(new Image)
          preloads[i].src = this.bgImages[i].src
        }
      },
      startSlideshow() {
        this.secondsLeft = 0

        if(!this.slideshowPaused) {
          this.slideshowTimer = setInterval(()=> {
            this.currentImageIndex += 1
            if(this.currentImageIndex == this.bgImages.length) this.currentImageIndex = 0
          }, 7000)

          this.secondsTimer = setInterval(()=> {
            if(this.$refs.timeLeft) {
              if(this.secondsLeft == 0) {
                this.$refs.timeLeft.classList.remove('animating')
                this.secondsLeft = 6
              }
              else {
                this.$refs.timeLeft.classList.add('animating')
                this.secondsLeft -= 1
              }
            }
          }, 1000)
        }
      },

      jumpTo(index) {
        this.currentImageIndex = index
        clearTimeout(this.slideshowTimer)
        clearTimeout(this.secondsTimer)
        this.startSlideshow()
      },

      reenableSlides() {
        clearTimeout(this.slideEnabler)
        this.slideEnabler = setTimeout(()=>{
          this.slideDisabled = false
        }, 1000)
      },

      checkBGImage(index) {
        return this.currentImageIndex == index
      },

      pauseSlideshow(index) {
        this.currentImageIndex = index
        this.slideshowPaused = true
        clearInterval(this.slideshowTimer)
        clearInterval(this.secondsTimer)
      },

      resumeSlideshow() {
        if(this.slideshowPaused) {
          this.slideshowPaused = false
          this.startSlideshow()
        }
      },

      nextSlide(swiped = false) {
        if(!this.slideDisabled) {
          this.slideDisabled = true
          this.reenableSlides()

          this.currentImageIndex += 1
          if(this.currentImageIndex >= this.bgImages.length - 1) this.currentImageIndex = 0

          // Reset timeout
          clearInterval(this.slideshowTimer)
          clearInterval(this.secondsTimer)
          this.startSlideshow()

          // Account for swipe
          if(swiped) {
            for(let i = 0; i < this.$refs.swipeable.length; i++) {
              this.$refs.swipeable[i].$el.classList.remove('swipeRight')
            }
          }
          else this.pauseSlideshow(this.currentImageIndex)
        }
      },

      previousSlide(swiped = false) {
        if(!this.slideDisabled) {
          this.slideDisabled = true
          this.reenableSlides()

          this.currentImageIndex -= 1
          if(this.currentImageIndex < 0) this.currentImageIndex = this.bgImages.length - 1

          // Reset timeout
          clearInterval(this.slideshowTimer)
          clearInterval(this.secondsTimer)
          this.startSlideshow()

          // Account for swipe
          if(swiped) {
            for(let i = 0; i < this.$refs.swipeable.length; i++) {
              this.$refs.swipeable[i].$el.classList.add('swipeRight')
              setTimeout(()=>{
                this.$refs.swipeable[i].$el.classList.remove('swipeRight')
              }, 1000)
            }
          }
          else this.pauseSlideshow(this.currentImageIndex)
        }
      }
    }
  }

</script>

<style lang='scss'>
    @import '../assets/style/variables.scss';

    .slideshow {
        position: absolute;
        top: 0; right: 0;
        object-fit: cover;
        width: 100%;
        height: 100vh;
        transform: translateZ(-1px) scale(1.6);
        z-index: -1;

        @media #{$notMobile} {
            width: 80%;
            right: -2em;
        }
    }

    .caption {
        position: absolute;
        background-color: transparent;
        background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.6), rgba(0,0,0,.8));
        width: 95%;
        left: 0; bottom: 0;
        padding: 1em 2.5% 6em 2.5%;

        h2 {
            margin: 0;
            margin-bottom: .2em;
            color: white;
            font-size: 2em;
            max-width: 90%;
        }

        .caption-text {
            color: white;
        }

        div.caption-link {
            text-align: right;
            margin-top: .5em;
        }

        a.caption-link {
            color: white;
            padding: .5em;
            &:hover { background-color: $blue;}
        }

        @media screen and (max-width: 500px) {
            font-size: .8em;
            pointer-events: none;

            h2 {
                font-size: 1.2em;
            }

            a {
                pointer-events: auto;
            }
        }

        @media #{$notMobile} {
            background-color: transparent;
            background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.6), rgba(0,0,0,.6), rgba(0,0,0,.8));
            bottom: 0;
            width: 85%;
            left: 15%;
            padding: 0;

            .inner {
                padding: 1em 2em 3em 9em;
            }
        }
    }
</style>