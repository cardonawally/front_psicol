<script>
import {defineComponent} from 'vue';

export default defineComponent({

  data() {
    return {
      event_list: [],
      clients: [],
      isOpen: false,
      form: {
        client_id: null,
        event: null,
        seat: null
      }
    }
  },

  methods: {
    resetForm() {
      this.form = {
        client_id: null,
        event: null,
        seat: null
      }
    },

    save(data) {
      this.axios.post('http://psicol.test/api/ticket', data).then((resp) => {
        this.data = resp.data
        alert('Registro guardato con exito');
        this.resetForm();
        this.isOpen = false;
      })
    },

    events() {
      this.axios.get('http://psicol.test/api/event').then(resp => {
        this.event_list = resp.data
      }).catch(err => {
        alert(err.data)
      })
    },

    client() {
      this.axios.get('http://psicol.test/api/client').then(resp => {
        this.clients = resp.data
      }).catch(err => {
        alert(err.data)
      })
    },

    tickets(tickets_array, tickets_en_venta) {
      const suma_tickets = tickets_array.reduce(function (a, c) {
        return a + Number(c.seat || 0)
      }, 0);

      return tickets_en_venta - suma_tickets
    },
  },

  mounted: function mounted() {
    this.events()
    this.client()

  }
})


</script>
<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200 m-7">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre
          Evento
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Descripcion
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad
          inicial de boletas
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad
          disponible
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="event in event_list ">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.description }}</td>
        <td class=" flex justify-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ event.seats }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ tickets(event.tickets, event.seats) }}
        </td>
      </tr>
      </tbody>
    </table>

    <div class="m-5 flex justify-center">
      <button @click="isOpen=true" class="px-6 py-2 text-white bg-blue-600 rounded shadow">Asignacion de boletas
      </button>
    </div>
  </div>

  <div class="flex justify-center">
    <div v-show="isOpen" class=" absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div class="max-w-full p-6 bg-white rounded-md shadow-xl">
        <div v-if="clients, event_list" class="flex items-center justify-between">
          <h3 class="text-2xl">Asignación de tickets</h3>
          <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="mt-4">
          <table class="min-w-full divide-y divide-gray-200 m-7">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EVENTO
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CLIENTE
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CANTIDAD INICIAL
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CANTIDAD BOLETAS
              </th>
              <th scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-model="form.event">
                  <option disabled value="">Seleccionar</option>
                  <option class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-for="event in event_list"
                          v-bind:value="event">{{ event.name }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-model="form.client_id">
                  <option disabled value="">Seleccionar</option>
                  <option class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-for="client in clients"
                          v-bind:value="client.id">{{ client.name }}
                  </option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ form.event !== null ? form.event.seats : 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-model="form.seat"
                       type="form-control"></td>
            </tr>
            </tbody>
          </table>
          <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
            Cancelar
          </button>
          <button @click.prevent="save(form)" class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>