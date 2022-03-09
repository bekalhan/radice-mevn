<script>
import CompanyAside from './CompanyAside.vue'
import CompanyHeader from './CompanyHeader.vue'
import CompanyMiddle from './CompanyMiddle.vue'
export default
{
    components : 
    {
        "aside-app" : CompanyAside,
        "header-app" : CompanyHeader,
        "company-app" : CompanyMiddle
    }
}
</script>
<template>
<div>
    <div class="container-scroller">
        <aside-app></aside-app>
    <div class="container-fluid page-body-wrapper">
        <header-app></header-app>
        <div class="main-panel">
            <company-app></company-app>
        </div>
    </div>

    </div>
</div>

</template>
<style>
@import '../../assets/company/css/style.css'
</style>