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
      offers : [],
      defination : '',
      defination_id : '',
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
    this.offers = await this.fetchoffers(`http://localhost:5000/company/offers/${this.id}`);
  },
  methods :
  {
    ...mapActions(['fetchoffers','fetchdef']),
    ShowDefination : async function()
    {
      this.defination = await this.fetchdef(`http://localhost:5000/company/getdef/${this.defination_id}`);
      this.check = true;
    },
    DefClose : function()
    {
      this.check = false;
    },
    RedirectToConfigure : function()
    {
      this.$router.push(`/company/configure/${this.id}`);
    }
  }
}
</script>
<template>
 <div class="container-scroller">
        <aside-app></aside-app>
    <div class="container-fluid page-body-wrapper">
        <header-app></header-app>
        <div class="main-panel">
            <div class="content-wrapper">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">İŞ TEKLİFLERİ</h4>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th> Ad </th>
                            <th> Email </th>
                            <th> İş açıklama </th>
                            <th> Fiyat</th>
                            <th>Kabul et / Reddet</th>
                          </tr>
                        </thead>
                        <tbody v-for="(item,offer) in offers" :key="offer">
                           <tr v-for="(item2,el) in item.user" :key="el">
                            
                            <td> 
                              <!-- {{item2.name}} -->
                              {{item2.name}}
                            </td>
                            <td>
                              {{item2.email}}
                            </td>
                            <td> 
                              <span style="display : none">
                                  {{defination_id = item._id}}
                              </span>
                                <button class="btn btn-primary" @click="ShowDefination()">İş açıklama</button>
                            </td>
                            <td>
                                {{item.price}}
                            </td>
                            <td>
                                <button class="btn btn-success" @click="RedirectToConfigure()">Kabul et</button>
                                <button class="btn btn-danger mx-3" @click="RedirectToLogin()">Reddet</button>
                            </td>
                          </tr>                                             
                        </tbody>
                      </table>
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
                    <h4 class="card-title text-center">İş açıklama</h4>
                        <p class="text-center">{{defination}}</p>
                        <div class="row">
                          <div class="col-lg-5">

                          </div>
                          <div class="col-lg-4">
                            <button class="btn btn-danger justify-content-center" @click="DefClose()">Kapat</button>
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

</template>
<style>
@import '../../assets/company/css/style.css'
</style>