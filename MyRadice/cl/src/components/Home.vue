<script>
import Header from './FixMenus/Header.vue'
import Footer from './FixMenus/Footer.vue'
import HomeMiddle from './HomeMiddle.vue'
export default
{
    components : 
    {
        "header-app" : Header,
        "footer-app" : Footer,
        homemiddle :  HomeMiddle,
    }
}
</script>
<template>
<div>
    <div>
        <header-app></header-app>

    </div>
    <div>
        <homemiddle></homemiddle>
    </div>
    <div>
        <footer-app></footer-app>
    </div>
</div>
</template>
<style>

</style>