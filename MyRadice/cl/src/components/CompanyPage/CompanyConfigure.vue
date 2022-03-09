<script>
import CompanyAside from './CompanyAside.vue'
import CompanyHeader from './CompanyHeader.vue'
import useVuelidate from '@vuelidate/core'
import { required,email,minLength,maxLength,sameAs } from '@vuelidate/validators'


export default
{
    data ()
    {
        return {
            v$ : useVuelidate(),
            company_feature_add :
            {
                feature_name : '',
                secret_key : ''
            },
            company_developer_accept :
            {
                email : '',
                secret_key : ''
            },
            company_job_accept :
            {
                email : '',
                secret_key : ''
            },
            company_developer_refuse:
            {
                email : '',
                secret_key : ''
            },
            company_job_refuse :
            {
                email : '',
                secret_key : ''
            }
        }
    },
    components : 
    {
        "aside-app" : CompanyAside,
        "header-app" : CompanyHeader,
    },
    methods :
    {
        CompanyFeatureSubmit : async function()
        {
            if(!this.v$.$error)
            {
                await this.$store.dispatch('addcompanyfeature',{featurename : this.company_feature_add.feature_name,secret_key : this.company_feature_add.secret_key});
                if(this.$store.state.confirm_company.isFeatureSuccess)
                {
                    this.$toast.success('Beceri başarıyla eklendi');
                    setTimeout(this.RedirectToCompany,1000);
                }
                else
                {
                    this.$toast.error("Lütfen bilgileri tekrar kontrol ediniz")
                }
            }
            else
            {
                this.$toast.error("Bilgileri tekrar kontrol ediniz");
            }
        },
        DeveloperAccept : async function()
        {
            if(!this.v$.error)
            {
                await this.$store.dispatch('developeraccept',{email : this.company_developer_accept.email , secret_key : this.company_developer_accept.secret_key})
                if(this.$store.state.confirm_company.isDeveloperAccept)
                {
                    this.$toast.success('Developer şirketinize girdi')
                }
                else
                {
                    this.$toast.error('Bilgileri kontrol edin ve tekrar deneyin');
                }
            }
            else
            {
                this.$toast.error("Bilgileri tekrar kontrol ediniz")
            }
        },
        JobAccept : async function()
        {
            if(!this.v$.error)
            {
                await this.$store.dispatch('jobaccept',{email : this.company_job_accept.email , secret_key : this.company_job_accept.secret_key})
                if(this.$store.state.confirm_company.isJobAccept)
                {
                    this.$toast.success('İş şirketiniz tarafından kabul edildi')
                }
                else
                {
                    this.$toast.error('Bilgileri kontrol edin ve tekrar deneyin');
                }
            }
            else
            {
                this.$toast.error("Bilgileri tekrar kontrol ediniz")
            }
        },
        DeveloperRefuse :async function()
        {
            if(!this.v$.error)
            {
                await this.$store.dispatch('refusedeveloper',{email : this.company_developer_refuse.email,secret_key : this.company_developer_refuse.secret_key});
                console.log("nasknad"+this.$store.state.confirm_company.isDeveloperRefuse);
                if(this.$store.state.confirm_company.isDeveloperRefuse)
                {
                    this.$toast.success("Developer başvurusu reddedildi");
                }
                else
                {
                    this.$toast.error("Bilgileri kontrol edin ve tekrar deneyin");
                }
            }
            else
            {
                this.$toast.error("Formu tekrar doldurun");
            }
        },
        JobRefuse : async function()
        {
              if(!this.v$.error)
            {
                await this.$store.dispatch('refusejob',{email : this.company_job_refuse.email,secret_key : this.company_job_refuse.secret_key});
                if(this.$store.state.confirm_company.isJobRefuse)
                {
                    this.$toast.success("Developer başvurusu reddedildi");
                }
                else
                {
                    this.$toast.error("Bilgileri kontrol edin ve tekrar deneyin");
                }
            }
            else
            {
                this.$toast.error("Formu tekrar doldurun");
            }
        },

        RedirectToCompany :  function()
        {
            this.$router.push(`/company/${this.id}`);
        }
    },
    validations()
    {
        return{
            company_feature_add :
            {
                feature_name :
                {
                    required : required,
                    maxLength : maxLength(20)
                },
                secret_key :
                {
                    required : required,
                    minLength : minLength(5),
                    maxLength : maxLength(15)
                }
            },
            company_developer_accept :
            {
                email :
                {
                    required : required,
                    email : email
                },
                secret_key :
                {
                    required  : required,
                    minLength : minLength(5),
                    maxLength : maxLength(15)
                }
            },
              company_job_accept :
            {
                email :
                {
                    required : required,
                    email : email
                },
                secret_key :
                {
                    required  : required,
                    minLength : minLength(5),
                    maxLength : maxLength(15)
                }
            },
            company_developer_refuse :
            {
                email:
                {
                    required : required,
                    email : email
                },
                secret_key :
                {
                    required  : required,
                    minLength : minLength(5),
                    maxLength : maxLength(16)
                }
            },
               company_job_refuse :
            {
                email:
                {
                    required : required,
                    email : email
                },
                secret_key :
                {
                    required  : required,
                    minLength : minLength(5),
                    maxLength : maxLength(16)
                }
            }
        }
    }
}
</script>
<template>
<div>
    <div class="container-scroller">
        <aside-app></aside-app>
    <div class="container-fluid page-body-wrapper">
        <header-app></header-app>
        <div class="main-panel">
            <div class="content-wrapper">
                <div class="row">
    <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title text-center">BECERİ EKLE</h4>
                <form class="box" @submit.prevent="CompanyFeatureSubmit()" >
                    <input type="text"  placeholder="Beceri adı" v-model="company_feature_add.feature_name" @blur="v$.company_feature_add.feature_name.$touch" >
                    <small v-if="v$.company_feature_add.feature_name.$error"  style="color : white;margin-left : 150px">En çok 20 karakter olmalıdır</small>
                    <input type="password"  placeholder="Özel kelime" v-model="company_feature_add.secret_key" @blur="v$.company_feature_add.secret_key.$touch">
                    <small v-if="v$.company_feature_add.secret_key.$error" style="color : white;margin-left : 140px">5-15 karakter arası girilmelidir</small>
                    <input type="submit" name="" value="EKLE" href="#"> 
                </form>                 
             </div>               
        </div>
    </div>
    <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title text-center">BECERİ SİL</h4>
                <form class="box">
                    <input type="text" name="" placeholder="Beceri adı">
                    <input type="password" name="" placeholder="Özel kelime">
                    <input type="submit" name="" value="SİL" href="#">
                </form>                 
             </div>               
        </div>
    </div>
 </div>
 <div class="row">
     <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title text-center">DEVELOPER    İŞE ALIM</h4>
                <form class="box" @submit.prevent="DeveloperAccept()">
                    <input type="text"  placeholder="developer email" v-model="company_developer_accept.email" @blur="v$.company_developer_accept.email.$touch" >
                    <small v-if="v$.company_developer_accept.email.$error"  style="color : white;margin-left : 150px">Bu alan zorunludur</small>
                    <input type="password"  placeholder="Özel kelime" v-model="company_developer_accept.secret_key" @blur="v$.company_developer_accept.secret_key.$touch">
                    <small v-if="v$.company_developer_accept.secret_key.$error" style="color : white;margin-left : 140px">5-15 karakter arası girilmelidir</small>
                    <input type="submit" name="" value="EKLE" href="#"> 
                </form>                 
             </div>               
        </div>
    </div>
     <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title text-center">İŞ KABUL</h4>
                <form class="box" @submit.prevent="JobAccept()">
                    <input type="text"  placeholder="iş veren email" v-model="company_job_accept.email" @blur="v$.company_job_accept.email.$touch" >
                    <small v-if="v$.company_job_accept.email.$error"  style="color : white;margin-left : 150px">Bu alan zorunludur</small>
                    <input type="password"  placeholder="Özel kelime" v-model="company_job_accept.secret_key" @blur="v$.company_job_accept.secret_key.$touch">
                    <small v-if="v$.company_job_accept.secret_key.$error" style="color : white;margin-left : 140px">5-15 karakter arası girilmelidir</small>
                    <input type="submit" name="" value="KABUL" href="#"> 
                </form>                 
             </div>               
        </div>
    </div>
 </div>
  <div class="row">
     <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title text-center">DEVELOPER REDDETME</h4>
                <form class="box" @submit.prevent="DeveloperRefuse()">
                    <input type="text"  placeholder="developer email" v-model="company_developer_refuse.email" @blur="v$.company_developer_refuse.email.$touch" >
                    <small v-if="v$.company_developer_refuse.email.$error"  style="color : white;margin-left : 150px">Bu alan zorunludur</small>
                    <input type="password"  placeholder="Özel kelime" v-model="company_developer_refuse.secret_key" @blur="v$.company_developer_refuse.secret_key.$touch">
                    <small v-if="v$.company_developer_refuse.secret_key.$error" style="color : white;margin-left : 140px">5-15 karakter arası girilmelidir</small>
                    <input type="submit" name="" value="EKLE" href="#"> 
                </form>                 
             </div>               
        </div>
    </div>
     <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                    <h4 class="card-title text-center">İŞ REDDETME</h4>
                <form class="box" @submit.prevent="JobRefuse()">
                    <input type="text"  placeholder="iş veren email" v-model="company_job_refuse.email" @blur="v$.company_job_refuse.email.$touch" >
                    <small v-if="v$.company_job_refuse.email.$error"  style="color : white;margin-left : 150px">Bu alan zorunludur</small>
                    <input type="password"  placeholder="Özel kelime" v-model="company_job_refuse.secret_key" @blur="v$.company_job_refuse.secret_key.$touch">
                    <small v-if="v$.company_job_refuse.secret_key.$error" style="color : white;margin-left : 140px">5-15 karakter arası girilmelidir</small>
                    <input type="submit" name="" value="KABUL" href="#"> 
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
@import '../../assets/company/css/style.css';





.box input[type="text"],
.box input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    width: 250px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
    width: 300px;
    border-color: #2ecc71
}

.box input[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
}

.box input[type="submit"]:hover {
    background: #2ecc71
}

</style>