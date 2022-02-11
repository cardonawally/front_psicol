<template>
  <div>
    <nav
        class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-10 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <!-- Left links -->
        <ul class="flex justify-between">
          <li class="nav-item p-2">
            <RouterLink class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/">Clientes
            </RouterLink>
          </li>
          <li class="nav-item p-2">
            <RouterLink class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/event">Eventos
            </RouterLink>
          </li>
          <li class="nav-item p-2">
            <RouterLink class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/ticket">Comprar
              boletas
            </RouterLink>
          </li>
        </ul>
        <!-- Left links -->
      </div>
    </nav>
  </div>

  <RouterView/>
</template>

<style>
@import '@/assets/base.css';

</style>
