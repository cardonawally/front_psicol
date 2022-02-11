<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        seats: ''
      },
      events: []
    }
  },

  methods: {
    resetForm() {
      this.form = {
        name: '',
        description: '',
        seats: ''
      }
    },
    event() {
      this.axios.get('http://psicol.test/api/event').then(resp => {
        this.events = resp.data
      }).catch(err => {
        alert(err.data)
      })
    },


    save(data) {
      this.axios.post('http://psicol.test/api/event', data).then((resp) => {
        this.data = resp.data
        alert('Registro guardato con exito');
        this.resetForm();
      })
    },

    updated_event(form) {
      this.axios.put('http://psicol.test/api/event/' + form.id, form).then((resp) => {
        this.data = resp.data
        alert('Registro actualizado con exito');
        this.resetForm();
      })
    }
  },

  mounted: function mounted() {
    this.event()
  }
}
</script>
<template>
  <main>
    <div class="container my-8">
      <form class="m-10 bg-white shadow-lg rounded-lg overflow-hidden ">
        <h1 class="flex justify-center m-2 uppercase text-center text-2xl font-bold">Crear Evento</h1>
        <div class="grid xl:grid-cols-2 xl:gap-6">
          <div class="relative z-0 m-6 w-full group">
            <input v-model="form.name" type="text" name="floating_first_name" id="floating_first_name"
                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder="Nombre evento" required/>
            <label for="floating_first_name"
                   class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
          </div>
          <div class="relative z-0 m-6 w-full group">
            <input v-model="form.description" type="text" name="floating_last_name" id="floating_last_name"
                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder="Descripcion del evento" required/>
            <label for="floating_last_name"
                   class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
          </div>
        </div>
        <div class="grid xl:grid-cols-2 xl:gap-6">
          <div class="relative z-0 m-6 w-full group">
            <input v-model="form.seats" type="number" name="floating_phone" id="floating_phone"
                   class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                   placeholder="Numero de boletas" required/>
            <label for="floating_phone"
                   class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
          </div>
        </div>
        <button @click.prevent="save(form)" type="button"
                class="flex justify-center mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-80 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Crear Evento
        </button>
      </form>
    </div>

    <div class="container my-8 m-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 class="flex justify-center m-2 uppercase text-center text-2xl font-bold">Eventos Registrados</h1>
      <table class="min-w-full divide-y divide-gray-200 m-7">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Telefono
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="event in events">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="form-control" v-model="event.name">
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="form-control"
                                                                               v-model="event.description"></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><input type="form-control"
                                                                               v-model="event.seats"></td>
          <td>
            <button @click.prevent="updated_event(event)"
                    class="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Editar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>