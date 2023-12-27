<template>
  <div class="story-section">
    <h2>{{ section.title }}</h2>
    <p>{{ section.content }}</p>
    <button v-for="option in section.options" :key="option.nextSection" @click="goToSection(option.nextSection)">
      {{ option.text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToSection(nextSectionId) {
      this.$emit('section-changed', nextSectionId);
    }
  }
}
</script>

<style>
.story-section {
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin-bottom: 20px;
}

.story-section h2 {
  color: #333;
}

.story-section p {
  color: #666;
}

.story-section button {
  background-color: #008CBA;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.story-section button:hover {
  background-color: #005f73;
}
</style>
