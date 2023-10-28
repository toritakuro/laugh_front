<template>
    <div id="modal">
      <div id="modal-content" class="modal">
        <button @click="close()">X</button>
        <p id="modal-message" class="modal__message">{{ message }}</p>
        <span id="modal-cansel" class="modal__cancel" @click="laugh()">
          Laugh
        </span>
        <button class="modal__btn" @click="superLaugh()">Super Laugh</button>
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
  }
  
  .modal__message {
    margin-top: 10px;
  }
  
  .modal__cancel {
    margin-right: 30px;
    font-size: 15px;
  }
  
  .modal__cancel:hover {
    cursor: pointer;
    color: #FB8C00;
    font-weight: bold;
  }
  
  .modal__btn {
    display: inline-block;
    margin: 30px auto;
    text-decoration: none;
    width: 100px;
    height: 30px;
    text-decoration: none;
    color: #000000;
    border: solid 2px #FB8C00;
    border-radius: 3px;
    transition: 0.4s;
    text-align: center;
    vertical-align: middle;
    font-size: 15px;
    background-color: #faebd7;
  }
  
  .modal__btn:hover {
    background: #FB8C00;
    color: white;
    cursor: pointer;
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
  
  
  
  
  
  