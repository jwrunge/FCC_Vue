<template>
    <nav ref='navigation' id="navigation" :class="{sub: subpage}">
        <span class='nav-links' :class="{shown: mobileOpen}">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About Us</router-link>
            <router-link to="/worship">Worship</router-link>
            <router-link to="/learn">Education</router-link>
            <router-link to="/resources">Resources</router-link>
        </span>
        <div v-if='!mobileOpen' @click='$emit("openMobileNav", true)' id='mobile-menu-open'>&#9776;</div>
        <div v-if='mobileOpen' @click='$emit("openMobileNav", false)' id='mobile-menu-close'>&#x2716;</div>
    </nav>
</template>

<script>
export default {
    name: "Modal",
    props: [ 'mobileOpen', 'subpage'],
    computed: {
        open() {
            return this.mobileOpen
        }
    }
}
</script>

<style lang="scss">

@import '../assets/style/variables.scss';

// Navigation
@media screen and (min-width: 501px) {
  #mobile-menu-open, #mobile-menu-close {
    display: none;
  }
}

#mobile-menu-open, #mobile-menu-close {
  font-size: 1.5em;
  margin-bottom: .25em;
  z-index: 10;
}

#mobile-menu-close {
  color: white;
}

#navigation {
  position: fixed;
  padding: 0;
  width: 100%;
  background-color: $accent-color;
  box-shadow: $box-shadow;
  bottom: 0; right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  z-index: 1;

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    padding: .5em;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;

    @media screen and (max-width: 500px) {
      padding: 0;
      display: flex;
      flex-direction: column;
      align-content: center;
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      opacity: 0;
      pointer-events: none;
      z-index: 10;
      height: 100vh;

      a {
        font-size: 1.5em;
        color: white;
      }

      &.shown {
        opacity: 1;
        background-color: rgba(0,0,0,.9);
        pointer-events: auto;
      }
    }
  }

  a {
    color: black;
    font-weight: bold;
    text-decoration: none;
    z-index: 6;
    line-height: 2em;

    &:hover {
      filter: brightness(1.3);
    }

    &.router-link-exact-active {
      cursor: default;
      opacity: .5;

      &:hover { color: black; }
    }
  }

  a + a {
    @media screen and (min-width: 501px) {
      margin-left: 1.25em;
    }
  }

  @media #{$notMobile} {
    position: fixed;
    
    align-content: center;
    top: 0; bottom: auto;
    padding: 0 2% 0 0;
    width: 98%;
    text-align: right;
    justify-content: flex-end;

    &.sub {
        position: absolute;
        background: transparent;
        box-shadow: none;
        right: 16px;

        .nav-links {
          background-color: white;
        }
    }

    a {
      margin-bottom: 0;
    }

    .nav-links {
      border: none;
      display: flex;
    }
  }
}
</style>