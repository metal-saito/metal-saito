<template>
  <div id="app">
    <story-section :section="currentSection" @section-changed="updateSection" />
  </div>
</template>

<script>
import StorySection from './components/StorySection.vue';

export default {
  components: {
    StorySection
  },
  data() {
    return {
      currentSectionId: 1,
      story: {
        1: {
          title: "章1",
          content: "物語の始まり。主人公は運命の旅に出る決意をします。",
          options: [
            { text: "旅に出る", nextSection: 2 },
            { text: "家に留まる", nextSection: 3 }
          ]
        },
        2: {
          title: "章2",
          content: "主人公は冒険の旅に出ます。",
          options: [
            { text: "森を探検する", nextSection: 4 },
            { text: "町を探検する", nextSection: 5 }
          ]
        },
        3: {
          title: "家に留まる",
          content: "主人公は家に留まり、平凡な日々を送ります。",
          options: [
            { text: "再考する", nextSection: 1 }
          ]
        },
        // 他のセクションもここに追加...
      }
    };
  },
  computed: {
    currentSection() {
      return this.story[this.currentSectionId];
    }
  },
  methods: {
    updateSection(sectionId) {
      this.currentSectionId = sectionId;
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
}
</style>