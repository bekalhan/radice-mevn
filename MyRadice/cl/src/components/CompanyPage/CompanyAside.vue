<script>
import {mapActions} from 'vuex'
export default
{
  data ()
  {
     return{
       id : '',
       company : [],
       link : '',
       link_app : '',
       link_offer : '',
       link_conf :  ''
     }
  },
  async mounted()
  {
    this.id = this.$store.state.id;
    this.company = await this.fetchcompany(`http://localhost:5000/company/${this.id}`);
    this.link = `/company/${this.id}`
    this.link_app = `/company/appointments/${this.id}`
    this.link_offer = `/company/offers/${this.id}`,
    this.link_conf = `/company/configure/${this.id}`
  },
  methods: {
    ...mapActions(['fetchcompany'])
  },
}
</script>
<template>
     <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a class="sidebar-brand brand-logo" href="index.html"><img src="../../assets/company/images/logo.svg" alt="logo" /></a>
          <a class="sidebar-brand brand-logo-mini" href="index.html"><img src="../../assets/company/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <ul class="nav">
          <li class="nav-item profile">
            <div class="profile-desc">
              <div class="profile-pic">
                <div class="count-indicator">
                  <img class="img-xs rounded-circle " src="../../assets/company/images/faces/face15.jpg" alt="">
                  <span class="count bg-success"></span>
                </div>
                <div class="profile-name">
                  <h5 class="mb-0 font-weight-normal" style="color:white">{{company.founder}}</h5>
                  <span>founder</span>
                </div>
              </div>              
            </div>
          </li>
          <li class="nav-item nav-category">
            <span class="nav-link">Seçenekler</span>
          </li>
          <li class="nav-item menu-items">
              <router-link tag="a" :to="link" class="nav-link">
                  <span class="menu-icon">
                <i class="mdi mdi-speedometer"></i>
              </span>
              <span class="menu-title">Startup</span>
              </router-link>
          </li>
          <li class="nav-item menu-items">
              <router-link tag="a" to="/company/developers" class="nav-link">
              <span class="menu-icon">
                <i class="mdi mdi-laptop"></i>
              </span>
              <span class="menu-title">Developers</span>
              </router-link>
          </li>
          <li class="nav-item menu-items">
              <router-link tag="a" :to="link_app" class="nav-link">
                <span class="menu-icon">
                <i class="mdi mdi-playlist-play"></i>
              </span>
              <span class="menu-title">Başvurular</span>
              </router-link>
          </li>
          <li class="nav-item menu-items">
              <router-link tag="a" :to="link_offer" class="nav-link">
                    <span class="menu-icon">
                <i class="mdi mdi-playlist-play"></i>
              </span>
              <span class="menu-title">İş teklifleri</span>
              </router-link>
          </li>
          <li class="nav-item menu-items">
              <router-link tag="a" :to="link_conf" class="nav-link">
                 <span class="menu-icon">
                <i class="mdi mdi-chart-bar"></i>
              </span>
              <span class="menu-title">Yapılandırma</span>
              </router-link>
          </li>
        </ul>
      </nav>
</template>
<style scoped>
@import '../../assets/company/css/style.css'
</style>