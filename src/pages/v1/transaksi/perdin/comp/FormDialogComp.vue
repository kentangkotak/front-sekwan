<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-white">
      <q-bar class="bg-indigo">
        <q-space />
        <q-btn
          color="orange"
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          color="orange"
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn color="orange" dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <table
        class="text-h6 absolute-center-top"
        style="border: dashed; border-color: orange; margin-top: 1mm"
        width="100%"
      >
        <tr>
          <td style="text-align: center" colspan="4">
            <h7>
              <b><u>FORM PERJALANAN DINAS</u></b>
            </h7>
          </td>
        </tr>
        <tr>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
          <td width="10%">
            <q-input outlined v-model="date" mask="date" label="Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" minimal>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </td>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
        </tr>
        <tr>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
          <td width="10%">
            <q-input outlined label="No. Transaksi" />
          </td>
        </tr>
      </table>
      <table
        style="border: dashed; border-color: orange; margin-top: 1mm"
        width="100%"
      >
        <table width="100%">
          <thead>
            <tr class="text-white bg-black">
              <th color="white" width="5%">NO.</th>
              <th>NANA</th>
              <th>UANG REPR</th>
              <th>HOTEL</th>
              <th>PESWAT</th>
              <th>KERETA</th>
              <th>TAKSI</th>
              <th>TRANSP</th>
              <th>TOTAL</th>
              <th>NO. KWT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="store.loading">
              <tr v-for="n in store.params.per_page" :key="n">
                <div class="fixed-center"><AppLoading /></div>
              </tr>
            </template>
            <template v-else>
              <template v-for="(item, n) in store.items" :key="n">
                <tr :class="item?.flag === '1' ? 'bg-light-blue-2' : ''">
                  <!-- <td width="5%">{{ n + 1 }}.</td> -->
                  <td>
                    <q-avatar
                      v-if="item?.jns_kelamin === 'P'"
                      glossy
                      size="40px"
                      class="overlapping"
                    >
                      <img src="../../../../../assets/images/female.svg" />
                    </q-avatar>
                    <q-avatar v-else size="40px" class="overlapping" glossy
                      ><img src="../../../../../assets/images/male.svg"
                    /></q-avatar>
                  </td>
                  <td>
                    {{ item?.nik }}
                  </td>
                  <td>
                    {{ item?.nama }}
                  </td>
                  <td>
                    {{ getkelamin(item?.jns_kelamin) }}
                  </td>
                  <td>
                    {{ item?.alamat }}
                  </td>
                  <td>
                    {{ item?.komisi?.komisi }}
                  </td>
                  <!-- <td>
              {{ getstatusmu(item?.status) }}
            </td> -->
                  <td>
                    <q-btn
                      color="black"
                      size="sm"
                      round
                      glossy
                      icon="eva-edit-2-outline"
                      @click="formDialogx(item)"
                    >
                      <q-tooltip class="primary" :offset="[10, 10]">
                        Edit
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      v-model="store.payloadx.id"
                      color="red"
                      size="sm"
                      round
                      glossy
                      icon="eva-person-delete-outline"
                      @click="store.lemparDewan(item.id)"
                    >
                      <q-tooltip class="primary" :offset="[10, 10]">
                        Delete
                      </q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <formDialog v-model="dialog" :komisi="komisi" />
        </table>
      </table>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { usePendampingDewanStore } from "src/stores/master/pendampingdewan";
import { ref, watchEffect } from "vue";
//import { useQuasar } from "quasar";
//import { store } from "quasar/wrappers";

const maximizedToggle = ref(true);
const store = usePendampingDewanStore();
const props = defineProps({
  komisi: { type: Array, default: () => [] },
});
const date = ref("YYYY");
// watchEffect(() => {
//   console.log("asasaa", penyimpanan.form.id_komisi);
// });
</script>
