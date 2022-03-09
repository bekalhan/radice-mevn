<template>
<div>
    <section id="hero">
    <div class="hero-container">
      <div id="heroCarousel" data-bs-interval="5000" class="carousel slide carousel-fade" data-bs-ride="carousel">

        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

        <div class="carousel-inner" role="listbox">

          <!-- Slide 1 -->
          <div class="carousel-item active" style="background: url(./src/assets/img/slide/slide-1.jpg)">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated animate__fadeInDown">RA<span>DİCE</span></h2>
                <p class="animate__animated animate__fadeInUp">Bugun sizde bir Startup sahibi veya bir developer gibi hissedebilirsiniz. Hadi araştırın ve bu dünyada bir yer sahibi olun</p>
                <a href="" class="btn-get-started animate__animated animate__fadeInUp">Detaylı bilgi için</a>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="carousel-item" style="background: url(./src/assets/img/slide/slide-2.jpg)">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated fanimate__adeInDown">Startup <span>sahibi olun</span></h2>
                <p class="animate__animated animate__fadeInUp">Kendi sanal şirketinizi kurabilir ve çalışmaya başlayabilirsiniz ayrıca startup sahibi olmanın ayrıcalıklarını yaşayabilirsiniz</p>
                <a href="" class="btn-get-started animate__animated animate__fadeInUp">Detaylı bilgi için</a>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="carousel-item" style="background: url(./src/assets/img/slide/slide-3.jpg)">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated animate__fadeInDown">Developer <span>olarak çalışmaya başlayın</span></h2>
                <p class="animate__animated animate__fadeInUp">Developer olarak çalışmaya başlayıp şirket seçerek başvurabilirsiniz ve sanal iş hayatına girebilirsiniz</p>
                <a href="" class="btn-get-started animate__animated animate__fadeInUp">Detaylı bilgi için</a>
              </div>
            </div>
          </div>

        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </a>

      </div>
    </div>
  </section><!-- End Hero -->
    <section id="featured" class="featured">
      <div class="container">

        <div class="row">
          <div class="col-lg-4" @click="SendtoRegister">
            <div class="icon-box">
              <i class="bi bi-card-checklist"></i>
              <h3>
              <router-link tag="a" to="/register">Kayıt ol</router-link>
              </h3>
              <p>Hadi sende kayıt olarak bu sanal dünyaya atıl ve tüm bu ayrıcalıklardan faydalanmaya başla</p>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="icon-box">
              <i class="bi bi-laptop"></i>
              <h3>
                <router-link tag="a" to="/regdeveloper">Developer ol</router-link>
              </h3>
              <p>Hadi sende developer olarak kendi startup kurabilme hakkına sahip ol veya bir startup içerisine katılarak sanal hayata adım at</p>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="icon-box">
              <i class="bi bi-building"></i>
              <h3>
                <router-link tag="a" to="/createstartup" @click.prevent="GetBoss()">Startup kur</router-link>
              </h3>
              <p>Hadi sende startup kuraral sanal aleminin yöneticisi ol ve bu ayrıcalılardan faydalanma şansını yakala</p>
            </div>
          </div>
        </div>

        <!-- second -->
        <div class="row mt-4">
          <div class="col-lg-2">

          </div>
          <div class="col-lg-4" @click="SendtoRegister">
            <div class="icon-box">
              <i class="bi bi-person-check-fill"></i>
              <h3>
              <router-link tag="a" to="/login">Kullanıcı girişi</router-link>
              </h3>
              <p>Eğer Radice'de kullanıcıysanız ihtiyacınız olan işleri yapabilecek yetenekli freelancer kişi ya da şirketleri bulabilirsiniz</p>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="icon-box">
              <i class="bi bi-person-square"></i>
              <h3>
                <router-link tag="a" to="/logdeveloper">Developer girişi</router-link>
              </h3>
              <p>Eğer Radici'de developersanız bir startup'da çalışabilir ve para kazanmaya başlayabilirsiniz</p>
            </div>
          </div>
          <div class="col-lg-2">

          </div>
        </div>
        <!-- second end -->

      </div>
    </section><!-- End Featured Section -->
     <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="row">
          <div class="col-lg-6">
            <img :src="image" class="img-fluid" alt="">
          
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0 content">
            <h3>Radice Freelancer ve startup topluluğu</h3>
            <p class="fst-italic">
              Radice kayıt olarak neler yapılabilir ne gibi ayrıcalıklara sahip olunabilir
            </p>
            <ul>
              <li class="mt-4"><i class="bi bi-check-circle"></i> Kayıt olabilir ve bu sanal dünyaya sahip olunabilir</li>
              <li class="mt-4"><i class="bi bi-check-circle"></i> Freelancer kaydınızı yapabilir ve artık startup kurabilir veya kurulmuş startupa dahil olabilirsiniz</li>
              <li class="mt-4"><i class="bi bi-check-circle"></i> Startup kurabilir ve bu sanal dünyada bir şirket sahibi olabilirsiniz ve çalışmaya başlayabilirsiniz</li>
            </ul>
            <p>
             
            </p>
          </div>
        </div>

      </div>
    </section><!-- End About Section -->
</div>
</template>
<script>
import image from '../assets/img/pexels-fauxels-3184306.jpg'
export default
{
    data ()
    {
        return{
            image : image,
        }
    },
    methods : 
    {
        GetBoss : async function()
        {
          await this.$store.dispatch("bosscontrol");
        },
        SendtoRegister : function()
        {
            // axios la istek yap kart için
        }
    }
}
</script>
<style>

</style>