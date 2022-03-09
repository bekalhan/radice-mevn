<script>
import DeveloperAside from './DeveloperAside.vue'
import {mapActions} from 'vuex'


export default
{
	data ()
	{
		return{
			id: '',
			rate : '70',
			features : [],
		
		}
	},
    components : 
    {
        "aside-app" : DeveloperAside,
    },
	async mounted() {
		this.id = this.$store.state.id;
		this.features = await this.fetchfeatures(`http://localhost:5000/developer/features/${this.id}`);
	},
	methods :
	{
		...mapActions(['fetchfeatures']),
		SendConfigurePage : function()
		{
			return this.$router.push(`/developer/configure/${this.id}`)
		}
	}
}
</script>
<template>
<div id="colorlib-page">
        <aside-app></aside-app>
        <div id="colorlib-main">
            <div class="colorlib-narrow-content">
					<div class="row">
						<H1 class="text-center">BİLDİĞİM TEKNOLOJİLER</H1>
						<button class="btn btn-success mt-2" @click="SendConfigurePage()">YENİ EKLE</button>
					</div>
					<div class="row mt-4">
						<div class="col-md-12 animate-box fadeInLeft animated" v-for="(item,feature) in features" :key="feature" data-animate-effect="fadeInLeft">
							<div class="progress-wrap">
								<h3>{{item.featurename}}</h3>
								<span style="display : none">
									{{rate=item.featurerate}}
								</span>
								<div class="progress">
								 	<div   class="progress-bar color-1" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" :style="{'width' : rate+'%'}">
								    <span>{{item.featurerate}}</span>
								  	</div>
								</div>
							</div>
						</div>	
					</div>
					<div>
					</div>
			</div>
			<!-- example start -->
			<!-- end -->
        </div>

    </div>
</template>
<style>
/* .progress-bar
{
	width: 50%;
} */
@media screen and (min-width:240px) and (max-width:400px) {

.colorlib-narrow-content
{
    margin-top : 10px;
    margin-left : 40px
}

}

@media screen and (min-width:400px) and (max-width:992px) {

.colorlib-narrow-content
{
    margin-top : 20px;
    margin-left : 40px
}
}

@media screen and (min-width:992px)
{
.colorlib-narrow-content
{
    margin-top : 20px;
    margin-left : 40px;
    margin-right: 30px;
}
}


</style>