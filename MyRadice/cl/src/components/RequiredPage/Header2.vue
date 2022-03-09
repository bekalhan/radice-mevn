<template>
<div>
    <section id="topbar" class="d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">freeradice@gmail.com</a></i>
        <i class="bi bi-phone d-flex align-items-center ms-4"><span>+90 0553 770 </span></i>
      </div>
      <div class="social-links d-none d-md-flex align-items-center">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>
    </div>
  </section>
   <header id="header" class="d-flex align-items-center">
    <div class="container d-flex justify-content-between align-items-center">

      <div class="logo">
        <!-- <h1><a href="index.html">RADİCE</a></h1> -->
        <h1>
            <router-link to="/radice" tag="a">RADİCE</router-link>
        </h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <!-- <li><a class="active" href="#">Giriş yap</a></li> -->
          <li>
                <router-link tag="a" :to="link"  class=""><i class="bi bi-person" style="font-size : 36px"></i><span style="margin-left:5px;font-size: 20px">Profil</span></router-link>
                <!-- <a :href="link"><i class="bi bi-person" style="font-size : 36px"></i><span style="margin-left:5px;font-size: 20px">Profil</span></a> -->
          </li>
          <li>
                <router-link tag="a" :to="link_company"  class=""><i class="bi bi-building" style="font-size : 24px"></i><span style="margin-left:5px;font-size: 20px">Şirketim</span></router-link>
          </li>
          <li>
                <router-link tag="a" to="/allcomponies" class=""><i class="bi bi-person-plus-fill" style="font-size: 34px"></i><span style="margin-left:5px;font-size : 20px">Şirketler</span></router-link>
          </li>
          <li>
               <router-link tag="a" to="/" class=""><i class="bi bi-box-arrow-left" style="font-size : 34px"></i><span @click="Logout()" style="margin-left:5px;font-size: 20px">Çıkış Yap</span></router-link>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
</div>
</template>
<script>
export default
{
  data ()
  {
    return {
      id : '',
      link : '',
      link_company : ''
    }
  },
  methods :
  {
    Logout : async function()
    {
      await this.$store.dispatch("logout");
    }
  },
   async mounted() {
    this.id = this.$store.state.id;
    this.link =`/developer/${this.id}`
    this.link_company = `/company/${this.id}`
 
  },
}
</script>
<style>

</style>
