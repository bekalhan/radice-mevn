<script>
import Header2 from '../RequiredPage/Header2.vue'
import Footer from '../FixMenus/Footer.vue'
import AllCompaniesMiddle from '../GenericCompany/AllCompanyMiddle.vue'
export default
{
    components : 
    {
        "header-app" : Header2,
        "footer-app" : Footer,
        "allcompanies-app" : AllCompaniesMiddle
    }
}
</script>
<template>
<div>
<header-app></header-app>
<div id="db-wrapper" class="justify-content-center mt-3">
    <allcompanies-app></allcompanies-app>
   
</div>
<footer-app></footer-app>
</div>
</template>
<style scoped>
@import '../../assets/allcompanies/css/theme.css'

</style>