<template>
  <section id="loginForm" class="form__container">
    <h3 class="form__title">Редактирование задачи</h3>
    <form class="form__body" @submit.prevent="this.editTask">
      <div class="form__row">
        <div class="form__group">
          <label class="form__label" for="email">Выберите отправителя:</label>
          <select v-model="sender" name="sender" id="sender">
            <option v-for="user in userList" :key="user.id" :value="user.id">
              {{ user.firstName }} {{ user.secondName }}
            </option>
          </select>
        </div>
  
        <div class="form__group">
          <label class="form__label" for="email">Выберите получателя:</label>
          <select v-model="executor" name="executor" id="executor">
            <option v-for="user in userList" :key="user.id" :value="user.id">
              {{ user.firstName }} {{ user.secondName }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__group">
        <div class="form__column">
          <h2 class="form__title">Описание задачи:</h2>
          <textarea
            @blur="v$.description.$touch"
            v-model="description"
            name="task"
            id="task"
            cols="30"
            rows="10"
          ></textarea>
          <small
            v-if="v$.description.$dirty && v$.description.required.$invalid"
            class="form__invalid"
            >Поле обязательно для заполнения
          </small>
        </div>
      </div>
      <div class="form__group">
        <label class="form__label" for="">Завершение задачи :</label>
        <complete-task-button
          :target="this.target"
          :taskList="taskList"
        ></complete-task-button>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">ОК</button>
      </div>
    </form>
  </section>
</template>

<script>
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  name: "EditTaskForm",
  components: {
    CompleteTaskButton,
  },
  props: {
    target: {
      type: Object,
      required: true,
    },
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      executor: this.target.executorId,
      sender: this.target.senderId,
      description: this.target.description,
      isCompleted: this.target.isCompleted,
      id: this.target.id,
    };
  },

  validations() {
    return {
      description: { required },
    };
  },

  methods: {
    editTask() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("editTask", this.changedData);
      this.$emit("close");
    },
  },
  computed: {
    changedData() {
      return {
        id: this.target.id,
        executorId: this.executor,
        executorFullName: `
      ${this.userList.find((user) => user.id === this.executor).firstName}
      ${this.userList.find((user) => user.id === this.executor).secondName}`,
        senderId: this.sender,
        senderFullName: `
      ${this.userList.find((user) => user.id === this.sender).firstName}
      ${this.userList.find((user) => user.id === this.sender).secondName}`,
        description: this.description,
        isCompleted: this.isCompleted,
      };
    },
  },
};
</script>