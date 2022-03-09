<script>
export default 
{
	data ()
	{
		return {
			id : '',
			name : '',
			link : '',
			link_configure : '',
			link_contact : ''
		}
	},
	methods : 
	{
		Logout : function()
		{
			alert("selamun aleyküm");
		}
	},
	async mounted() {
		this.name = this.$store.state.name;
		this.id = this.$store.state.id;
		this.link = `/developer/${this.id}`;
		this.link_configure = `/developer/configure/${this.id}`;
		this.link_contact = `/developer/contact/${this.id}`
	},	
}
</script>
<template>
		<aside id="colorlib-aside" role="complementary" class="js-fullheight text-center">
			<h1 id="colorlib-logo"><a href="index.html">{{this.name}}<span>.</span></a></h1>
			<nav id="colorlib-main-menu" role="navigation">
				<ul>
		  <li class="colorlib-active"><router-link tag="a" :to="link">Ben kimim?</router-link></li>
          <li><router-link tag="a" to="/developer/features">Neler Biliyorum?</router-link></li>
          <li><router-link tag="a" :to="link_contact">Bana ulaşabilirsiniz</router-link></li>
          <li><router-link tag="a" to="/developer/appointments">Başvurularım</router-link></li>
		  <li><router-link tag="a" :to="link_configure">Profilini yapılandır</router-link></li>
              </ul>
			</nav>
		</aside> <!-- END COLORLIB-ASIDE -->
</template>
<style>

</style>