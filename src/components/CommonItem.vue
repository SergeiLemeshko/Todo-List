<template>
  <li class='wrapper'>
    <section v-if='isTodoPage'>
      <div class='todo-top'>
        <div v-if='item.name' class='todo-top__name'>
          <TooltipText :text='item.name' :isShort='true'>
            <p>{{ item.name }}</p>
          </TooltipText>
        </div>
        <div class='todo-top__container'>
          <div v-if='item.categoryName' class='todo-top__folder'></div>
          <div v-if='item.categoryName' class='todo-top__container-cat'>
            <TooltipText :text='item.categoryName' :isShort='true'>
              <span>{{ item.categoryName }}</span>
            </TooltipText>
          </div>
        </div>
      </div>
      <div v-if='item.description' class='todo-description'>
        <TooltipText :text='item.description'>
          <p>{{ item.description }}</p>
        </TooltipText>
      </div>
    </section>
    <section v-if='!isTodoPage' class='categorie'>
      <div class='categorie-container'>
        <div v-if='item.name' class='categorie-container__name'>
          <TooltipText :text='item.name'>
            <span>{{ item.name }}</span>
          </TooltipText>
        </div>
        <div v-if='item.description' class='categorie-container__description'>
          <TooltipText :text='item.description'>
            <span>{{ item.description }}</span>
          </TooltipText>
        </div>
      </div>
    </section>
    <section class='todo-btns'>
      <CommonButton buttonType="edit" :onClick='openMainModal' />
      <CommonButton buttonType="delete" :onClick='handleDeleteBtn' />
    </section>
  </li>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults } from 'vue';
import CommonButton from '@/UI/CommonButton.vue';
import TooltipText from '@/UI/TooltipText.vue';
import { ValueForCommonItem } from '@/interfaces/interfaces';

const props = withDefaults(defineProps<{
  item: ValueForCommonItem;
  confirmRemoveItem: (id: number) => void;
  openMainModal: () => void;
  isTodoPage?: boolean;
}>(), {
  isTodoPage: true
});

const handleDeleteBtn = () => {
  props.confirmRemoveItem(props.item.id);
};
</script>

<style scoped lang='scss'>
.wrapper {
  display: flex;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  padding: 15px 16px;
  margin: 0 auto;
  border-bottom: 2px solid #3F72AF;
  transition: background-color 0.3s ease;
}

/* Стили для выделения при наведении */
.wrapper:hover {
  background-color: rgba(37, 127, 234, 0.2);
}

.todo-top {
  display: flex;
  margin-bottom: 8px;

  &__container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  &__name {
    font-size: 18px;
    font-weight: 500;
    text-align: justify;
    max-width: 500px;
  }

  &__folder {
    background-image: url('@/assets/folder.svg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 24px;
    height: 18px;
    margin-left: 22px;
  }
}

.todo-top__container-cat {
  font-size: 18px;
  line-height: 21px;
  color: #3F72AF;
  margin-left: 2px
}

.todo-description {
  display: flex;
  color: #808080;
  text-align: justify;
  max-width: 500px;
}

.todo-btns {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.categorie-container {
  display: flex;
  flex-direction: column;

  &__name {
    font-size: 18px;
    font-weight: 500;
    text-align: justify;
    max-width: 500px;
    margin-bottom: 8px;
  }

  &__description {
    display: flex;
    color: #808080;
    text-align: justify;
    max-width: 500px;
  }
}
</style>