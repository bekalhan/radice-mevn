<script>
import CompanyAside from './CompanyAside.vue'
import CompanyHeader from './CompanyHeader.vue'
import {mapActions} from 'vuex'

export default
{
    data ()
    {
      return {
        id : '',
        appointments : [],
        cv : '',
        cv_id : '',
        check : false
      }
    },
    components : 
    {
        "aside-app" : CompanyAside,
        "header-app" : CompanyHeader,
    },
    async mounted()
    {
      this.id = this.$store.state.id;
      this.appointments = await this.fetchappointments(`http://localhost:5000/company/appointments/${this.id}`);
    },
    methods :
    {
      ...mapActions(['fetchappointments','fetchcv']), 
      ShowCv : async function()
      {
        this.cv = await this.fetchcv(`http://localhost:5000/company/getcv/${this.cv_id}`);
        this.check = true;
      },
      CvClose : function()
      {
        this.check =false;
      },
      RedirectToConfigure : function()
      {
        this.$router.push(`/company/configure/${this.id}`);
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
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Başvurular</h4>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> Ad </th>
                            <th> Emailxcs </th>
                            <th> Cv </th>
                            <th>Kabul et / Reddet</th>
                          </tr>
                        </thead>
                        <tbody v-for="(item,dev) in appointments" :key="dev">
                          <tr v-for="(item2,el) in item.developer" :key="el">
                               <td>
                                 {{item2.name}}
                               </td>
                               <td>
                                 {{item2.email}}
                               </td>
                               <td>
                                  <span style="display : none">{{this.cv_id = item._id}}</span>
                                  <button class="btn btn-primary" @click="ShowCv()">CV</button>
                               </td>
                               <td>
                                  <button class="btn btn-success" @click="RedirectToConfigure()">Kabul et</button>
                                <button class="btn btn-danger mx-3" @click="RedirectToConfigure()">Reddet</button>
                               </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row"  v-if="check">
              <div class="row">

              
              <div class="col-lg-3">
              </div>
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title text-center">CV</h4>
                        <p class="text-center">{{cv}}</p>
                        <div class="row">
                          <div class="col-lg-5">

                          </div>
                          <div class="col-lg-4">
                            <button class="btn btn-danger justify-content-center" @click="CvClose()">Kapat</button>
                          </div>
                          <div class="col-lg-4">

                          </div>
                        </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">

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
@import '../../assets/company/css/style.css'
</style>