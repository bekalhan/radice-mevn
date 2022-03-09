<template>
<section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-7 col-lg-5">
					<div class="wrap">
						<div class="img" style="background-image: url(./src/assets/DeveloperRegister/images/developer.png);"></div>
                        <div class="row mt-2">
                            <div class="col-lg-12 mx-1">
                                <small>Lütfen developer olmadan önce kullanıcı kaydınızın olduğundan emin olunuz. <span class="mx-5">Email ve şifreyi kullanıcı kaydınızdaki ile aynı giriniz</span></small>
                            </div>
                        </div>
						<div class="login-wrap">
							<form @submit.prevent="PostDeveloperLogin()" class="signin-form">
			      		<div class="form-group mt-3">
			      			<input type="text" class="form-control" v-model="email" @blur="v$.email.$touch">
			      			<label class="form-control-placeholder" for="username">Email</label>
							<small v-if="v$.email.$error" class="mt-1" style="color : red">Geçerli bir e-mail adresi girilmeli</small>
			      		</div>
		            <div class="form-group">
		              <input id="password-field" type="password" v-model="password" class="form-control" @blur="v$.password.$touch" >
		              <label class="form-control-placeholder" for="password">Şifre</label>
					   <small v-if="v$.password.$error" class="mt-1" style="color : red">8-20 karakter arasında olmalı</small>
		              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
		            </div>
                     <div class="form-group">
		              <input id="password-field" type="password" v-model="secret_key" class="form-control"  @blur="v$.secret_key.$touch">
		              <label class="form-control-placeholder" for="password">Özel Kelime</label>
					   <small v-if="v$.secret_key.$error" class="mt-1" style="color : red">5-15 karakter arasında olmalı</small>
		              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
		            </div>
                    
		            <div class="form-group">
		            	<button type="submit" class="form-control btn btn-primary rounded submit px-3">Sign In</button>
		            </div>
		          </form>
		          <p class="text-center">Hala kullanıcı değilmisiniz? <router-link tag="a" to="/register">Üye ol</router-link></p>
		        </div>
		      </div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required,email,minLength,maxLength,sameAs } from '@vuelidate/validators'

export default
{
	data ()
	{
		return{
		    v$ : useVuelidate(),
			email : '',
			password : '',
			secret_key : ''
		}
	},
	methods :
	{
		
		PostDeveloperLogin : async function()
		{
			if(!this.v$.$error)
			{
			await this.$store.dispatch("developerlogin",{email : this.email,password : this.password,secret_key : this.secret_key});
			if(this.$store.state.isDeveloperLogin===true)
			{
				this.$toast.success('Developer girişi yapılıyor');
				setTimeout(this.RedirectToPage,1000);
			}
			else
			{
				this.$toast.error('Girdiğiniz bilgilere ait developer bulunamadı');
			}
		}
		else
		{
			this.$toast.error("Girdiğiniz bilgileri kontrol ediniz");
		}
		},
		RedirectToPage : function()
		{
			this.$router.push('/radice');
		}
	},
	 validations () {
      return{
        email :
        {
          required : required,
          email : email
        },
        password :
        {
          required,
          minLength : minLength(8),
          maxLength : maxLength(20)
        },
		secret_key :
		{
			required,
			minLength : minLength(5),
			maxLength : maxLength(15)
		}
      }
    }
}
</script>
<style>
@import '../../assets/DeveloperRegister/css/style.css'

</style>