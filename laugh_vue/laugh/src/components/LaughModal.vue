<template>
    <div id="modal">
      <div id="modal-content" class="modal">
        <button class="modal__close" @click="close()"><v-icon icon="mdi-close-circle-outline"/></button>
        <p id="modal-message" class="modal__message">{{ message }}</p>
        <button id="modal-cansel" class="modal__btn modal__btn_left" @click="laugh()"><v-icon class="action_icon" icon="mdi-emoticon-excited-outline"/><br>Laugh</button>
        <button class="modal__btn modal__btn_right" @click="superLaugh()"><v-icon class="action_icon" icon="mdi-emoticon-lol-outline"/><br>Super Laugh</button>
      </div>
      <div id="modal-overlay"></div>
    </div>
  </template>
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(["message"]);
  const emit = defineEmits(['post-match']);

  const laugh = () => {
    emit("post-match", 0);
  }

  const superLaugh = () => {
    emit("post-match", 11);
  }

  const close = () => {
    emit("post-match", );
  }

  </script>
  <style scoped>
  .modal {
    padding: 10px 20px;
    border: 2px solid #FB8C00;
    background: #FFFF;
    z-index: 2;
    display: block;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    height: 40%;
    width: 30%;
  }
  
  .modal__message {
    margin-top: 30px;
    font-size: 20px;
  }
  
  .modal__btn {
    padding-top: 50px;
    font-size: 15px;
    font-weight: bold;
  }
  .modal__btn_right {
    margin-left: 50px;
  }
  .action_icon {
    font-size: 80px;
  }
  .modal__close {
    display: block;
    margin-left: auto;
  }
  
  .modal__btn:hover {
    cursor: pointer;
    color: #FB8C00;
    font-weight: bold;
  }
  
  #modal-overlay {
    z-index: 1;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    background-color: rgba(140, 140, 140, 0.75);
  }
  </style>
  
  
  
  
  
  