<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">Приветствую на главной странице!</h2>
      <div v-if="!authenticatedStore.IS_AUTH" class="page__text">
        Для начала работы системы , прошу пройти &nbsp;
        <button-with-modal-form label="регистрацию">
          <template #formSlot="{ closeModal }">
            <regisitration-form @close="closeModal" />
          </template>
        </button-with-modal-form>
        &nbsp; или же &nbsp;
        <button-with-modal-form label="войти в систему">
          <template #formSlot="{ closeModal }">
            <login-form @close="closeModal" />
          </template>
        </button-with-modal-form>
        &nbsp;, если у вас есть учетная запись.
      </div>

      <div>
        <ul class="page__list">
          Данный Pet-проект реализовывает:
          <li class="page__list-item">CRUD-операции над пользователями</li>
          <li class="page__list-item">
            CRUD-операции над задачами, котороми обмениваются пользователи
            системы
          </li>
        </ul>
      </div>
      <div>
        <ul class="page__list">
          В процессе разработки были применены инструменты:
          <li class="page__list-item">VUE v.3 - как основной фреймворк</li>
          <li class="page__list-item">
            VUE-Router - для маршрутизации страниц приложения
          </li>
          <li class="page__list-item">
            VUEX - для реализации глобального хранилища, обеспечивающего
            рективное отображение данных, получаемых из Session Storage и
            IndexedDB
          </li>
          <li class="page__list-item">
            Библиотека VUElidate - для реактивной валидации полей различных форм
          </li>
          <li class="page__list-item">VUE-CLI - для сборки всего проекта</li>
          <li class="page__list-item">
            Библиотека компонентов Prime-VUE - для заимстовования некоторого
            функционала
          </li>
          <li class="page__list-item">
            Session Storage - для хранения данных об аутентифицированном
            пользователе
          </li>
          <li class="page__list-item">
            Indexed DataBase - для хранения данных о пользователях и задачах,
            получаемых асинхронно при инициализации приложения и обновлямых при
            действиях над пользователями и задачами путем ответов на мутации
            глобального состояния
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import RegisitrationForm from '@/components/forms/RegistrationForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';

import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

const authenticatedStore = useAuthenticatedStore();
</script>
