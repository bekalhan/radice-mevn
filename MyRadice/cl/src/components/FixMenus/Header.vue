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
            <router-link to="/" tag="a">RADİCE</router-link>
        </h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <!-- <li><a class="active" href="#">Giriş yap</a></li> -->
          <router-link tag="li" to="/login">Giriş yap</router-link>
         <router-link tag="li" to="/register">Kayıt ol</router-link>

        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
  
  
    </div>
  </header>
</div>
</template>
<script>
</script>
<style>

</style>
