<template>
  <div class="subpage">
    <!-- Slot for navigation -->
    <slot></slot> 
    <div class='content'>
      <h1>Worship</h1>

      <p>The First Christian Church family is diverse and dynamic, so it only makes sense that we have two unique worship services to match!</p>

      <div class='attention-box'>
        <h3>Sunday Morning Worship</h3>
        <p class='centered'>
          <strong>Contemporary Service</strong> - 8:30 AM<br>
          <strong>Traditional Service</strong> - 11 AM
        </p>
        <p class='small centered'>Sunday school is available for all ages between services - <router-link to='/learn'>learn more!</router-link></p>
      </div>

      <div class='two-content'>
        <img src='background-slides/band.jpg' class='sm-bottom-margin'>
        <div>
          <h3>Contemporary Service</h3>
          <p>Integer nunc sem, interdum vitae semper et, pharetra id massa. Donec mattis at velit ac cursus. In volutpat dictum orci. Aenean fringilla urna id sagittis iaculis. Nam dignissim velit quis fringilla maximus. Integer ut augue sed lectus hendrerit mattis. Nunc rhoncus leo magna, nec venenatis sapien imperdiet vel. Phasellus feugiat tempor felis, a mattis turpis volutpat in. Mauris venenatis mauris a magna sagittis aliquam. Ut fermentum turpis in euismod malesuada. Quisque id massa nec nunc varius interdum et et enim.</p>
        </div>
      </div>

      <div class='two-content reverse'>
          <img src='background-slides/congo.jpg' class='sm-bottom-margin'>
          <div>
            <h3>Traditional Service</h3>
            <p>In hac habitasse platea dictumst. Aliquam pharetra eu justo non iaculis. Praesent faucibus, erat convallis eleifend volutpat, nisl enim pretium tortor, pulvinar gravida ex mi nec sapien. Curabitur vel vulputate elit. Quisque suscipit dui mi, in lacinia velit gravida at. Phasellus venenatis sapien id ante aliquam, eu vestibulum orci maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent consequat laoreet vehicula. Suspendisse accumsan elit non sem commodo, eget venenatis risus fermentum.</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Worship',
  components: {
    
  }
}
</script>

<style lang='scss' scoped>

</style>