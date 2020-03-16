<template>
<transition name='fade' appear>
    <div class='modal_container' @click='cancel' ref='modal_container'>

        <!-- Image controls -->
        <div v-if="showControls" class='img-controls' @click.stop=''>
            <img v-if="!noContraster && !closeOnly" src='~../assets/bwcircle.svg' @click='btow'/>
            <img v-if="!closeOnly" ref='zoomin' src='~../assets/zoomin.svg' @click='changezoom'/>
            <img v-if="!closeOnly" ref='zoomout' class='selected' src='~../assets/zoomout.svg' @click='changezoom'/>
            <img v-if="!noCloser" src='~../assets/xout.svg' @click='cancel'/>
        </div>

        <!-- Content -->
        <slot name='outer'></slot>
        <div v-if='$slots.nobg || image' class='nobg_inner'>
            <slot name='nobg'></slot>
            <img v-if='image' class='enlarged_img fit viewImage' ref='viewedimg' :src='image' @click.stop=''/>
        </div>
        <div class='modal_inner' v-else-if='$slots.default' @click.stop=''><!--Prevent cancel method from bubbling up-->
            <slot></slot>
        </div>
    </div>
</transition>
</template>

<script>

export default {
    name: "Modal",
    props: [ 'image', 'showControls', 'noContraster', 'closeOnly', 'noCloser'],
    methods: {
        cancel () {
            this.$emit('cancel')
        },
        btow() {
            if(this.$refs.modal_container.classList.contains('whited'))
                this.$refs.modal_container.classList.remove('whited')
            else this.$refs.modal_container.classList.add('whited')
        },
        changezoom() {
            if(this.$refs.viewedimg.classList.contains('fit')) {
                this.$refs.viewedimg.classList.remove('fit')
                this.$refs.zoomout.classList.remove('selected')
                this.$refs.zoomin.classList.add('selected')
            }
            else {
                this.$refs.viewedimg.classList.add('fit')
                this.$refs.zoomout.classList.add('selected')
                this.$refs.zoomin.classList.remove('selected')
            }
        }
    }
}

</script>

<style lang='scss'>

.modal_container {
    background-color: rgba(0,0,0,.9);
    z-index: 10;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .5s;
    &.whited { background-color: rgba(255,255,255,.9); }

    .modal_inner {
        display: inline-block;
        position: relative;
        background-color: white;
        width: 45em;
        max-width: 80%;
        margin: 1em auto;
        padding: 1em;
        max-height: 100vh;
        overflow: auto;

        @media screen and (max-width: 500px) {
            max-width: 80%;
            margin: 1em 0;
        }
        
        button {
            display: block;
            margin: 2em auto 1em auto;
        }
    }

    .nobg_inner {
        display: block;
        position: relative;
        width: 100%;
        margin: 1em auto;
        max-height: 100vh;
        overflow: auto;
        @media screen and (max-width: 500px) {
            width: 100%;
            margin: 1em 0;
        }
        img.viewImage {
            display: block;
            margin: 0 auto;
            min-width: 100%;
            max-width: 300%;
            max-height: 200vh;
            transition: all .5s ease-in-out;
            &.fit {
                min-width: 0;
                max-width: 100%;
                max-height: 90vh;
            }
        }
    }

    .img-controls {
        position: absolute;
        padding-top: .8em;
        padding-bottom: .5em;
        top: 2em;
        right: 2em;
        margin: 0 auto;
        z-index: 3001;
        background-color: white;
        box-shadow: 0 2px 4px #00000088;
        transition: background-color .5s, opacity .5s;
        
        @media screen and (min-width: 500px) {
            opacity: .3;
            &:hover { opacity: 1; }
        }

        img {
            width: 1.5em;
            margin: 0 .5em;
            cursor: pointer;
            &.selected {
                display: none;
            }
        }
    }
}

</style>