<script>
import {mapActions} from 'vuex'

export default{
  data ()
  {
    return{
      id : '',
      company_features : [],
      active_works : []
    }
  },
  async mounted()
  {
    this.id = this.$store.state.id;
    this.company_features = await this.fetchcompanyfeatures(`http://localhost:5000/company/feature/${this.id}`)
    this.active_works = await this.fetchactiveworks(`http://localhost:5000/company/activeworks/${this.id}`);
  },
  methods:
  {
    ...mapActions(['fetchcompanyfeatures','fetchactiveworks'])
  }
}
</script>
<template>
  <div class="content-wrapper">
            <div class="row">
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$12.34</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success ">
                          <span class="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Aylık büyüme oranı</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$17.34</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+11%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success">
                          <span class="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Aylık ortalama gelir</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$12.34</h3>
                          <p class="text-danger ml-2 mb-0 font-weight-medium">-2.4%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-danger">
                          <span class="mdi mdi-arrow-bottom-left icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Aylık ortalama iş</h6>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-9">
                        <div class="d-flex align-items-center align-self-start">
                          <h3 class="mb-0">$31.53</h3>
                          <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="icon icon-box-success ">
                          <span class="mdi mdi-arrow-top-right icon-item"></span>
                        </div>
                      </div>
                    </div>
                    <h6 class="text-muted font-weight-normal">Müşteri memnuniyeti</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Şirket Becerileri</h4>
                    <!-- <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3" v-for="(item,feature) in company_features" :key="feature">
                      <div class="text-md-center text-xl-left">
                        <div class="row">
                          <div class="col-md-12">
                              <h6 class="mb-1 text-center">{{item.featurename}}</h6>
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="col-md-8 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">AKTİF İŞLER</h4>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th> Müşteri adı </th>
                            <th> iş alım tarihi </th>
                            <th> iş teslim tarihi </th>
                            <th> Proje </th>
                            <th> Fiyat </th>
                          </tr>
                        </thead>
                        <tbody v-for="(item,works) in active_works" :key="works">
                          <tr v-for="(item2,el) in item.user" :key="el">
                            <td> {{item2.name}} </td>
                            <td> 14.03.2022 </td>
                            <td> 14.04.2022 </td>
                            <td> {{item.job_defination}} </td>
                            <td> {{item.price}} </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title text-center">Şirketin başarı sıralaması</h4>
                            <h5 class="text-center" style="color : white">1023</h5>
                        </div>
                    </div>
                </div>
            </div>
          </div>
</template>
<style>
</style>