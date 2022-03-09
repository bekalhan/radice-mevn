<script>
import Header from './Header2.vue'
import HomeMiddle from '../HomeMiddle.vue'
import Footer from '../FixMenus/Footer.vue'
export default
{
    components : 
    {
        "header-app" : Header,
        "homemiddle-app" : HomeMiddle,
        "footer-app" : Footer
    }
}
</script>
<template>
<div>
    <div>
        <header-app></header-app>
    </div>
    <div>
        <homemiddle-app></homemiddle-app>
    </div>
    <div>
        <footer-app></footer-app>
    </div>
</div>
</template>
<style>
</style>