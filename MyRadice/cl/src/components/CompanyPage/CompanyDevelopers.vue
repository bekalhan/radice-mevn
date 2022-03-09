<script>
import CompanyAside from './CompanyAside.vue'
import CompanyHeader from './CompanyHeader.vue'
import {mapActions} from 'vuex'

export default
{
    data ()
    {
        return {
            id : '',
            members : []
        }
    },
    components : 
    {
        "aside-app" : CompanyAside,
        "header-app" : CompanyHeader,
    },
    async mounted() {
        this.id = this.$store.state.id;
        this.members = await this.fetchmembers(`http://localhost:5000/company/developers/${this.id}`);
    },
    methods :
    {
        ...mapActions(['fetchmembers'])
    }
}
</script>
<template>

    <div class="container-scroller">
        <aside-app></aside-app>
    <div class="container-fluid page-body-wrapper">
        <header-app></header-app>
        <div class="main-panel">
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card" v-for="(item,member) in members"  :key="member">                           
                            <div class="card-body">
                                <h4 class="card-title">{{item.name}}</h4>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h4 class="card-title">{{item.information}}</h4> <button class="btn btn-danger">KOV</button> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
@import '../../assets/company/css/style.css';
</style>