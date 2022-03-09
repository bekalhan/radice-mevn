<script>
import Aside from './DeveloperAside.vue'
import About from './DeveloperAbout.vue'
import {mapState,mapActions} from 'vuex'

export default
{
    data ()
    {
        return{
            developerId : '',
            developer : []
        }
    },
    components : 
    {
        "aside-app" : Aside,
        "about-app" : About
    },
    async mounted() {
        this.developerId = this.$route.params.id;
        this.developer = await this.fetchdeveloper(`http://5000/developer/${this.developerId}`);
    },
    methods :
    {
        ...mapActions(['fetchdeveloper'])
    }
}
</script>
<template>
	<div id="colorlib-page">
        <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
        <aside-app></aside-app>
        <div id="colorlib-main">
            <about-app></about-app>
        </div>
        

    </div>
</template>
<style>
</style>