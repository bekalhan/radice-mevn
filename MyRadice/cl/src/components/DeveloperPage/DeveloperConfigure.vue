<script>
import DeveloperAside from './DeveloperAside.vue'
import {mapActions,createStore} from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required,email,minLength,maxLength,sameAs } from '@vuelidate/validators'

export default
{
    data ()
    {
        return {
            v$ : useVuelidate(),
            developerId : '',
            developer : [],
            features : [],
            bio_patch :
            {
                secret_key : '',
                newinfo : ''
            },
            feature_update :
            {
                secret_key : '',
                featurename : '',
                update_featurename : '',
                featurerate : '',
            },
            feature_add :
            {
                secret_key : '',
                featurename : '',
                featurerate : '',
            },
            feature_delete :
            {
                secret_key : '',
                featurename : ''
            },
            github :
            {
                link : '',
                secret_key : ''
            },
            linkedln :
            {
                link : '',
                secret_key : ''
            },
            twitter :  
            {
                link : '',
                secret_key : ''
            }

        }
    },
    components : 
    {
        "aside-app" : DeveloperAside
    },
     async mounted() {
        this.developerId = this.$route.params.id;
        this.developer = await this.fetchdeveloper(`http://localhost:5000/developer/${this.developerId}`);
        this.features =  await this.fetchfeatures(`http://localhost:5000/developer/features/${this.developerId}`);
    },
    methods :
    {
        ...mapActions(['fetchdeveloper','fetchfeatures']),
        BioSubmit : async function()
        {
            if(!this.v$.$error)
            {
                await this.$store.dispatch('patchinfo',{secret_key : this.bio_patch.secret_key , newinfo : this.bio_patch.newinfo });
                if(this.$store.state.confirm_configure.isBioSuccess)
                {
                    this.$toast.success('Biyografiniz başarıyla güncellendi');
                    setTimeout(this.RedirectToDeveloper,1000);
                }
                else if(!this.$store.state.confirm_configure.isBioSuccess)
                {
                    this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz2');
                }
            }
            else
            {
                 this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
            }
        },
        FeatureSubmit : async function()
        {
            if(!this.v$.$error)
            {
            await this.$store.dispatch('newfeature',{secret_key :this.feature_add.secret_key,featurename : this.feature_add.featurename,featurerate : this.feature_add.featurerate})
              if(this.$store.state.confirm_configure.isAddFeature)
                {
                    console.log("true");
                    this.$toast.success('Özellik başarıyla eklendi');
                    setTimeout(this.RedirectToSkills,1000);
                }
                else if(!this.$store.state.confirm_configure.isAddFeature)
                {
                    this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
                }
            }
            else
            {
                this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
            }
        },
        PatchFeatureSubmit : async function()
        {
            if(!this.v$.$error)
            {
            await this.$store.dispatch('patchfeature',{secret_key : this.feature_update.secret_key,featurename : this.feature_update.featurename,newfeaturename : this.feature_update.update_featurename,featurerate : this.feature_update.featurerate});
            if(this.$store.state.confirm_configure.isPatchFeature)
                {
                    console.log("true");
                    this.$toast.success('Özellik başarıyla güncellendi');
                    setTimeout(this.RedirectToSkills,1000);
                }
                else if(!this.$store.state.confirm_configure.isBioSuccess)
                {
                    this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
                }
            }
            else
            {
                this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
            }
    
        },
        DeleteFeatureSubmit : async function()
        {
            await this.$store.dispatch('deletefeature',{secret_key : this.feature_delete.secret_key,featurename : this.feature_delete.featurename})
        },
        AddGithubSubmit : async function()
        {
            if(!this.v$.$error)
            {
            await this.$store.dispatch('addgithub',{secret_key : this.github.secret_key,github : this.github.link});
             if(this.$store.state.confirm_configure.isGithub)
                {
                    this.$toast.success('github başarıyla eklendi');
                    setTimeout(this.RedirectToContact,1000);
                }
                else if(!this.$store.state.confirm_configure.isGithub)
                {
                    this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz2');
                }
            }
            else
            {
                 this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
            }
        },
        AddLinkedlnSubmit : async function()
        {
            if(!this.v$.$error)
            {
            await this.$store.dispatch('addlinkedln',{secret_key : this.linkedln.secret_key,linkedln : this.linkedln.link});
             if(this.$store.state.confirm_configure.isLinkedln)
                {
                    this.$toast.success('linkedln başarıyla eklendi');
                    setTimeout(this.RedirectToContact,1000);
                }
                else if(!this.$store.state.confirm_configure.isLinkedln)
                {
                    this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz2');
                }
            }
            else
            {
                 this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
            }
        },
        AddTwitterSubmit : async function()
        {
            if(!this.v$.$error)
            {
            await this.$store.dispatch('addtwitter',{secret_key : this.twitter.secret_key,twitter : this.twitter.link});
             if(this.$store.state.confirm_configure.isTwitter)
                {
                    this.$toast.success('twitter başarıyla eklendi');
                    setTimeout(this.RedirectToContact,1000);
                }
                else if(!this.$store.state.confirm_configure.isTwitter)
                {
                    this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz2');
                }
            }
            else
            {
                 this.$toast.error('Lütfen bilgileri tekrar kontrol ediniz');
            }
        },
        RedirectToDeveloper : function()
        {
            this.$router.push(`/developer/${this.developerId}`);
        },
        RedirectToContact : function()
        {
            this.$router.push(`/developer/contact/${this.developerId}`);
        },
        RedirectToSkills : function()
        {
            this.$router.push(`/developer/features`);
        }

    },
    validations () {
        return{
            bio_patch :
            {
                newinfo :
                {
                    minLength : minLength(20),
                    maxLength : maxLength(50),
                    required : required
                },
                secret_key :
                {
                    required : true,
                    minLength : minLength(5),
                    maxLength : maxLength(15)
                }
            },
            feature_update :
            {
                featurename :
                {
                    required : required
                },
                update_featurename :
                {
                    required : required
                },
                featurerate :
                {
                    minLength : minLength(1),
                    maxLength : maxLength(2),
                    required : required
                },
                secret_key :
                {
                    required : true,
                    minLength : minLength(5),
                    maxLength : maxLength(15)
                }
                
            },
            feature_add:
            {
                featurename :
                {
                    required : required
                },
                featurerate :
                {
                    required : required,
                    minLength : minLength(1),
                    maxLength : maxLength(2)
                },
                secret_key :
                {
                    required : required,
                    minLength : minLength(5),
                    maxLength :maxLength(15)
                }
            },
            github :
            {
                link :
                {
                    required : required
                },
                secret_key :
                {
                    required : required,
                    minLength : minLength(5),
                    maxLength :maxLength(15)
                }
            },
            linkedln :
            {
                link :
                {
                    required : required,
                },
                secret_key :
                {
                required : required,
                minLength : minLength(5),
                maxLength :maxLength(15)
                }
            },
            twitter :
            {
                 link :
                {
                    required : required,
                },
                secret_key :
                {
                required : required,
                minLength : minLength(5),
                maxLength :maxLength(15)
                }
            }

        }
    }
}
</script>
<template>
<div id="colorlib-page">
        <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>
        <aside-app></aside-app>
        <div id="colorlib-main">
            <div class="row mt-3">
                <h3 class="text-center">BEN KİMİM SAYFASI YAPILANDIRILMASI</h3>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="card text-center">
                        <div class="card-header">
                            <h4 class="text-center">BİYOGRAFİ</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <strong style="color : red">Şuanki biyografi</strong>  {{this.developer.information}}
                            </div>
                            <div class="row mt-3">
                                <form  class="signin-form" @submit.prevent="BioSubmit()">
                                    <div class="form-group">
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="bio_patch.newinfo" @blur="v$.bio_patch.newinfo.$touch" placeholder="Güncel biyografinizi giriniz (20-50)" style="border : 1px solid green"></textarea>
                                        <small v-if="v$.bio_patch.newinfo.$error" style="color : red">Bu alan 20-50 karater arası olmalı</small>
                                    </div>
                                    <div class="form-group mt-3">
			      			                <input type="text" class="form-control" placeholder="Özel kelime" @blur="v$.bio_patch.secret_key.$touch" v-model="bio_patch.secret_key">
                                            <small v-if="v$.bio_patch.secret_key.$error" style="color : red">Bu alan 5-15 karakter olmalı</small>

			      		            </div>
                                     <div class="form-group">
		            	                <button type="submit" class="form-control btn btn-primary rounded submit px-3">GÜNCELLE</button>
		                            </div>
                                </form>

                            </div>
                        </div>
                        </div>
                </div>
                 <div class="col-md-6">
                    <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">RESİM</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, non! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quam a dolores sed. Molestiae temporibus dolore quae libero officia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, porro. Lorem ipsum dolor sit amet Lorem, ipsum.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                </div>
                <div class="row">
                    <h3 class="text-center mt-4">NELER BİLİYORUM SAYFASI YAPILANDIRILMASI</h3>
                </div>
            <div class="row mt-3" id="beceri">
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">BECERİ</h4>
                        </div>
                        <div class="card-body">
                             <div class="row">
                                <strong style="color : red">Şuanki becerileriniz</strong>  <span v-for="(item,features) in features" :key="features">{{item.featurename}}</span>
                            </div>
                            <div class="form-group mt-3">
                                <form  class="signin-form"  @submit.prevent="PatchFeatureSubmit()">
                                    <div>
			      			            <input type="text" class="form-control" placeholder="Güncellenecek beceri" v-model="feature_update.featurename" @blur="v$.feature_update.featurename.$touch" >
                                                <small v-if="v$.feature_update.featurename.$error" style="color : red">Bu alan boş geçilemez</small>

			      		            </div>
                                    <div class="form-group mt-3">
			      			            <input type="text" class="form-control" placeholder="Beceri yeni adı" v-model="feature_update.update_featurename" @blur="v$.feature_update.update_featurename.$touch">
                                            <small v-if="v$.feature_update.update_featurename.$error" style="color : red">Bu alan boş geçilemez</small>

			      		            </div>
                                    <div class="form-group mt-3">
			                             <input type="text" class="form-control" placeholder="Yeni beceri bilme oranı" v-model="feature_update.featurerate" @blur="v$.feature_update.featurerate.$touch">
                                            <small v-if="v$.feature_update.featurerate.$error" style="color : red">1-100 arası sayı giriniz</small>

		  		                     </div>
                                    <div class="form-group mt-3">
			                            <input type="text" class="form-control" placeholder="Özel kelime" v-model="feature_update.secret_key" @blur="v$.feature_update.secret_key.$touch">
                                            <small v-if="v$.feature_update.secret_key.$error" style="color : red">5-15 arası karakter giriniz</small>

		  		                    </div>
                                    <div class="form-group">
		            	                <button type="submit" class="form-control btn btn-primary rounded submit px-3">GÜNCELLE</button>
		                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">BECERİ</h4>
                        </div>
                        <div class="card-body">
                             <div class="row">
                                <strong style="color : red">Şuanki becerileriniz</strong>  <span v-for="(item,features) in features" :key="features">{{item.featurename}}</span>
                            </div>
                            <div class="row mt-3">
                                <form  class="signin-form" @submit.prevent="FeatureSubmit()">
                                    <div class="form-group">
			      			         <input type="text" class="form-control" placeholder="Eklenecek beceri" v-model="feature_add.featurename" @blur="v$.feature_add.featurename.$touch">
                                        <small v-if="v$.feature_add.featurename.$error" style="color : red">Bu alan boş geçilemez</small>

			      		            </div>
                                     <div class="form-group mt-3">
			                            <input type="text" class="form-control" placeholder="Yeni beceri bilme oranı" v-model="feature_add.featurerate" @blur="v$.feature_add.featurerate.$touch">
                                            <small v-if="v$.feature_add.featurerate.$error" style="color : red">1-100 arası sayı giriniz</small>
		  		                    </div>
                                    <div class="form-group mt-3">
			                            <input type="text" class="form-control" placeholder="Özel kelime" v-model="feature_add.secret_key" @blur="v$.feature_add.secret_key.$touch">
                                            <small v-if="v$.feature_add.secret_key.$error" style="color : red">5-15 arası karakter giriniz</small>

		  		                     </div>
                                    <div class="form-group">
		            	                  <button type="submit" class="form-control btn btn-primary rounded submit px-3">EKLE</button>
		                             </div>
                                 </form>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="col-md-4">
                 <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">BECERİ</h4>
                        </div>
                    <div class="card-body">
                             <div class="row">
                                <strong style="color : red">Şuanki becerileriniz</strong>  <span v-for="(item,features) in features" :key="features">{{item.featurename}}</span>
                            </div>
                        <div class="row mt-3">
                            <form  class="signin-form" @submit.prevent="DeleteFeatureSubmit()">
                                 <div class="form-group">
			      			        <input type="text" class="form-control" placeholder="Silinecek beceri" v-model="feature_delete.featurename">
			      		        </div>
                                 <div class="form-group mt-3">
			                         <input type="text" class="form-control" placeholder="Özel kelime" v-model="feature_delete.secret_key">
		  		                 </div>
                                <div class="form-group">
		            	          <button type="submit" class="form-control btn btn-primary rounded submit px-3">SİL</button>
		                        </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <h3 class="text-center">BANA ULAŞABİLİRSİNİZ SAYFASI YAPILANDIRILMASI</h3>
            </div>
            <div class="row mt-3">
                 <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">GİTHUB</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group mt-3">
                                <form  class="signin-form" @submit.prevent="AddGithubSubmit()">
                                    <div>
			      			            <input type="text" class="form-control" placeholder="Github hesap linki" v-model="github.link" @blur="v$.github.link.$touch" >
                                        <small v-if="v$.github.link.$error" style="color : red">Bu alan boş geçilemez</small>
			      		            </div>
                                    <div class="mt-3">
			      			            <input type="text" class="form-control" placeholder="Özel kelime" v-model="github.secret_key" @blur="v$.github.secret_key.$touch">
                                        <small v-if="v$.github.secret_key.$error" style="color : red">5-15 arası karakter giriniz</small>
			      		            </div>
                                    <div class="form-group mt-3">
		            	                <button type="submit" class="form-control btn btn-primary rounded submit px-3">EKLE / GÜNCELLE</button>
		                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">LİNKEDLN</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group mt-3">
                                <form  class="signin-form" @submit.prevent="AddLinkedlnSubmit()">
                                    <div>
			      			            <input type="text" class="form-control" placeholder="Linkedln hesap linki" v-model="linkedln.link"  @blur="v$.linkedln.link.$touch">
                                            <small v-if="v$.linkedln.link.$error" style="color : red">Bu alan boş geçilemez</small>

			      		            </div>
                                      <div class="mt-3">
			      			            <input type="text" class="form-control" placeholder="Özel kelime" v-model="linkedln.secret_key"  @blur="v$.linkedln.link.$touch">
                                            <small v-if="v$.linkedln.secret_key.$error" style="color : red">5-15 arası karakter giriniz</small>

			      		            </div>
                                    <div class="form-group mt-3">
		            	                <button type="submit" class="form-control btn btn-primary rounded submit px-3">EKLE / GÜNCELLE</button>
		                            </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="col-md-4">
                    <div class="card text-center">
                        <div class="card-header">
                             <h4 class="text-center">TWİTTER</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group mt-3">
                                <form  class="signin-form" @submit.prevent="AddTwitterSubmit()">
                                    <div>
			      			            <input type="text" class="form-control" placeholder="Twitter hesap linki" v-model="twitter.link" @blur="v$.twitter.link.$touch">
                                            <small v-if="v$.twitter.link.$error" style="color : red">Bu alan boş geçilemez</small>
			      		            </div>
                                      <div class="mt-3">
			      			            <input type="text" class="form-control" placeholder="Özel kelime" v-model="twitter.secret_key" @blur="v$.twitter.link.$touch">
                                            <small v-if="v$.twitter.secret_key.$error" style="color : red">5-15 arası karakter girinizz</small>
			      		            </div>
                                    <div class="form-group mt-3">
		            	                <button type="submit" class="form-control btn btn-primary rounded submit px-3">EKLE / GÜNCELLE</button>
		                            </div>
                                </form>
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
.row
{
    margin-top : 0px;
    margin-left : 10px;
    margin-right : 10px
}
</style>