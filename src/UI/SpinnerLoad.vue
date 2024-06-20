<template>
  <div class='spinner-container' v-if='props.isLoading'>
    <div class='spinner'>
      <div 
        v-for='n, index in pointsCount' 
        :key='n' 
        class='point' 
        :style='pointStyle(index)'
      ></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, ref, computed } from 'vue';

const props = defineProps<{
  isLoading: boolean;
}>();

const pointsCount = ref<number>(9); // Количество точек

// Вычисляем случайные значения задержки и длительности
const delays = computed(() =>
  Array.from({ length: pointsCount.value }, () => `${Math.random() * 0.6}s`)
);
const durations = computed(() =>
  Array.from({ length: pointsCount.value }, () => `${0.5 + Math.random() * 0.6}s`)
);

type PointStyle = {
  animationDelay: string;
  animationDuration: string;
};

const pointStyle = (index: number): PointStyle => {
  return {
    animationDelay: delays.value[index],
    animationDuration: durations.value[index],
  };
};
</script>

<style scoped lang='scss'>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #DBE2EF;
}

.spinner {
  display: flex;
  gap: 5px;
  margin-top: -15px;
}

.point {
  width: 10px;
  height: 10px;
  background-color: #3F72AF;
  border-radius: 50%;
  animation: bounce 1s infinite alternate;
}

.point:nth-child(3) {
  margin-right: 17px;
}

.point:nth-child(6) {
  margin-right: 20px;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
