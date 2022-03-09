<script>
import DeveloperAside from './DeveloperAside.vue'
import {mapActions,createStore} from 'vuex'


export default
{
	data ()
	{
		return {
			developerId : '',
			developer : []
		}
	},
    components : 
    {
        "aside-app" : DeveloperAside
    },
	async mounted() {
		this.developerId = this.$route.params.id;
        this.developer = await this.fetchdeveloper(`http://localhost:5000/developer/${this.developerId}`);
	},
	methods: {
		...mapActions(['fetchdeveloper'])
	},
}
</script>
<template>
<div id="colorlib-page">
        <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
        <aside-app></aside-app>
        <div id="colorlib-main">
            
          	<section class="ftco-section contact-section">
	      <div class="container">
	        <div class="row d-flex mb-5 contact-info">
	          <div class="col-md-12 mb-4">
	            <h2 class="h4 font-weight-bold text-center">Bana ulaşabilirsiniz</h2>
	          </div>
	          <div class="text-center">
	            <p><span>Email:</span> <a href="mailto:info@yoursite.com">{{developer.contact_email}}</a></p>
				<p><span>Github:</span> <a href="mailto:info@yoursite.com">{{developer.github}}</a></p>
	            <p><span>Linkedln:</span> <a href="mailto:info@yoursite.com">{{developer.linkedln}}</a></p>
	            <p><span>Twitter:</span> <a href="mailto:info@yoursite.com">{{developer.twitter}}</a></p>

	          </div>
	        </div>
	        <div class="row block-9" id="iletisim">
	          <div class="col-md-12 order-md-last pr-md-5 text-center">
	            <form action="#">
	              <div class="form-group">
	                <input type="text" class="form-control" placeholder="Your Name">
	              </div>
	              <div class="form-group">
	                <input type="text" class="form-control" placeholder="Your Email">
	              </div>
	              <div class="form-group">
	                <input type="text" class="form-control" placeholder="Subject">
	              </div>
	              <div class="form-group">
	                <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Message"></textarea>
	              </div>
	              <div class="form-group">
	                <input type="submit" value="Send Message" class="btn btn-primary py-3 px-5">
	              </div>
	            </form>
	          
	          </div>
	        </div>
	      </div>
	    </section>

        </div>

    </div>
</template>
<style>
/* @media screen and (min-width:767px){

#iletisim
{
margin-right: 100px;
}

} */



</style>