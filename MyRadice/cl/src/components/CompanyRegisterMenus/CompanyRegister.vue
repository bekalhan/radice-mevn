<template>
<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-form-title" style="background-image: url(./src/assets/CompanyRegister/images/bg-01.jpg);">
					<span class="login100-form-title-1">
						Startup Kur
					</span>
				</div>
                <div class="row mt-3">
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-8">
                         <small class="text-center">Email ve şifrenizi kullanıcı ve developer bilgilerinizden özel kelime ise <span class="mx-5">sadece developer olarak belirlediğiniz  kelimeyi giriniz</span></small>
                    </div>
                    <div class="col-lg-2">

                    </div>
                </div>

				<form class="login100-form validate-form" @submit.prevent="PostCompany()">
					<div class="wrap-input100 validate-input m-b-26">
						<span class="label-input100">Email</span>
						<input class="input100" type="text" name="username" placeholder="Email adresinizi giriniz" v-model="email" @blur="v$.email.$touch">
											<small v-if="v$.email.$error" class="mt-1" style="color : red">Geçerli bir e-mail adresi girilmeli</small>
						<span class="focus-input100"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-18">
						<span class="label-input100">Şifre</span>
						<input class="input100" type="password" name="pass" placeholder="Şifrenizi giriniz" v-model="password"  @blur="v$.password.$touch">
										<small v-if="v$.password.$error" class="mt-1" style="color : red">8-20 karakter arasında olmalı</small>
						<span class="focus-input100"></span>
					</div>

                    <div class="wrap-input100 validate-input m-b-18">
						<span class="label-input100">Özel Kelime</span>
						<input class="input100" type="password" name="pass" placeholder="Özel kelimenizi giriniz" v-model="secret_key"  @blur="v$.secret_key.$touch">
							<small v-if="v$.secret_key.$error" class="mt-1" style="color : red">5-15 karakter arasında olmalı</small>
						<span class="focus-input100"></span>
					</div>

                    <div class="wrap-input100 validate-input m-b-18">
						<span class="label-input100">Şirket Adı</span>
						<input class="input100" type="password" name="pass" placeholder="startup adınızı giriniz" v-model="company_name" @blur="v$.company_name.$touch">
							<small v-if="v$.company_name.$error" class="mt-1" style="color : red">2-15 karakter arasında olmalı</small>
						<span class="focus-input100"></span>
					</div>

					<div class="flex-sb-m w-full p-b-30">
						<div class="contact100-form-checkbox">
							<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
							<label class="label-checkbox100" for="ckb1">
								Beni hatırla
							</label>
						</div>

					</div>

					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Startup Kur
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required,email,minLength,maxLength,sameAs } from '@vuelidate/validators'

export default{
	data ()
	{
	return{
		v$ : useVuelidate(),
		email : '',
		password : '',
		secret_key : '',
		company_name : ''
	}
	},
	methods :
	{
		PostCompany :async function()
		{
			if(!this.v$.$error)
			{
				await this.$store.dispatch('addcompany',{email : this.email,password : this.password, secret_key : this.secret_key,company_name : this.company_name});
				if(this.$store.state.confirm_company.isCompanySuccess)
				{
					this.$toast.success('Tebrikler! Artık Radicede bir startup sahibisiniz');
					setTimeout(this.RedirectToRadice,1000);

				}
				else
				{
					this.$toast.error('Lütfen formu okuyup bilgileri doğru bir şekilde giriniz');
				}
			}
			else
			{
				this.$toast.error("Lütfen girdiğiniz bilgileri tekrar kontrol ediniz")
			}
		},
		RedirectToRadice : function()
		{
			return this.$router.push('/radice');
		}
	},
	validations ()
	{
		return {
		email :
		{
			required : required,
			email : email
		},
		password : 
		{
			required : required,
			minLength : minLength(8),
			maxLength :maxLength(20)
		},
		secret_key : 
		{
			required,
			minLength : minLength(5),
			maxLength : maxLength(15)
		},
		company_name :
		{
			required : required,
			minLength : minLength(2),
			maxLength : maxLength(15)
		}
	}
	}
}
</script>
<style>
@import '../../assets/CompanyRegister/css/main.css';

</style>