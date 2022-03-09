<script>
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
    async mounted() {
        this.developerId = this.$route.params.id;
        this.developer = await this.fetchdeveloper(`http://localhost:5000/developer/${this.developerId}`);
    },
    methods :
    {
        ...mapActions(['fetchdeveloper'])
    }
}
</script>
<template>
			<div class="hero-wrap hero-wrap-2 js-fullheight" style="background-image: url(./src/assets/developer/images/bg_4.jpg);" data-stellar-background-ratio="0.5">
				<div class="overlay"></div>
				<div class="js-fullheight d-flex justify-content-center align-items-center">
					<div class="col-md-8 text text-center">
						<div class="img mb-4" style="background-image: url(./src/assets/developer/images/author.jpg);"></div>
						<div class="desc">
							<h2 class="subheading">Radice developer</h2>
							<h1 class="mb-4">{{developer.name}}</h1>
							<p class="mb-4">{{developer.information}}</p>
							<ul class="ftco-social mt-3">
                <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
              </ul>
						</div>
					</div>
				</div>
			</div>
</template>
<style>
@media screen and (min-width:240px) and (max-width:400px) {

#colorlib-main
{
    margin-top : 50px
}
}


@media screen and (min-width:400px) and (max-width:992px) {

#colorlib-main
{
    margin-top : 50px
}
}

@media screen and (min-width:992px) and (max-width:1400px) {

#colorlib-main
{
    margin-top : 50px;
    margin-left : 30px !important
}
}
</style>