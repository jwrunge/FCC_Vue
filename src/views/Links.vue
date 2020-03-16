<template>
  <div class="subpage">
    <!-- Slot for navigation -->
    <slot></slot> 
    <div class='content'>
        <h1>Links</h1>

        <p>See below for links to affiliated organizations, useful services and resources, and other interesting information.</p>

        <h2>Affilliate Organizations</h2>
        <ul class='link-page'>
            <li>
                <a href='https://disciples.org/' target='_blank'>The Christian Church (Disciples of Christ) in the United States and Canada</a>
                <p>The national office for the Christian Church (Disciples of Christ), with information about the denomination and resources for church leaders and congregations.</p>
            </li>
            <li>
                <a href='https://cciwdisciples.org/' target='_blank'>The Christian Church of Illinois and Wisconsin (CCIW)</a>
                <p>The home page of the regional office of the Christian Church in Illinois and Wisconsin. Here you will find information about activities, news, and links to other regional churches.</p>
            </li>
        </ul>

        <h2>Bible Reading and Devotion Resources</h2>
        <ul class='link-page'>
            <li>
                <a href='https://www.biblegateway.com/' target='_blank'>Bible Gateway</a>
                <p>Online Bible verse lookup and Bible reading tool that allows you to read verses in multiple versions.</p>
            </li>
            <li>
                <a href='https://www.backtothebible.org/forward' target='_blank'>Back to the Bible</a>
                <p>Provides schedules for reading the Bible in one year as well as multiple devotional readings.</p>
            </li>
            <li>
                <a href='http://www.ccel.org/' target='_blank'>Christian Classics Ethereal Library</a>
                <p>A large collection of classic Christian books available online at no charge.</p>
            </li>
            <li>
                <a href='http://www.bible-reading.com/' target='_blank'>Bible-Reading.com</a>
                <p>Has links to the schedule for reading the Bible in one year, as well as numerous other Bible reading choices.</p>
            </li>
        </ul>

        <h2>Congo Resources</h2>
        <ul class='link-page'>
            <li>
                <a href='congo-links/English/' target='_blank'>English</a>
            </li>
            <li>
                <a href='congo-links/French/' target='_blank'>French</a>
            </li>
        </ul>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Links'
}
</script>

<style lang='scss'>
    @import '../assets/style/variables.scss';

    ul.link-page {
        list-style: none;
        padding-left: 0;

        li + li {
            margin-top: 2em;
        }

        a {
            font-weight: bold;
        }

        p {
            margin-top: .5em;
        }
    }
</style>