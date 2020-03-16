<template>
    <div class='margin-border'>
        <div class='side-by-side'>
            <img :src='staffer.src' :alt="staffer.name + ' ' + staffer.title">
            <span class='description'>
                <span class='name'>{{ staffer.name }}</span>
                <span class='title'><br>{{ staffer.title }}</span>
                <span class='bio' v-html='staffer.bio'></span>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: "StaffBio",
    props: ['staffer']
}

</script>

<style lang='scss'>

.side-by-side {
    max-width: 45em;
    margin: 0 auto;

    img {
        width: 45%;
        max-width: 20em;
        float: left;
        margin-right: 2em;
        margin-bottom: 1em;
    }

    .description {
        color: white;

        .name { font-size: 2.5em;}
        .title { font-size: 1.5em; font-style: italic;}
        .bio { margin-top: 1em; }
    }
}

</style>