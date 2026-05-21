<template>
  <div class="app-shell">
    <nav class="tab-bar">
      <router-link to="/" class="tab-item" active-class="tab-active">
        <span class="tab-icon">🧮</span>
        <span class="tab-label">计算器</span>
      </router-link>
      <router-link to="/history" class="tab-item" active-class="tab-active">
        <span class="tab-icon">📋</span>
        <span class="tab-label">历史记录</span>
      </router-link>
    </nav>
    <div class="app-content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  overflow: hidden;
}

.tab-bar {
  display: flex;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-separator);
  padding-top: var(--safe-top);
  flex-shrink: 0;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 64px;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 500;
  gap: 3px;
  transition: color 0.15s ease;
}

.tab-active {
  color: #007AFF;
}

.tab-icon {
  font-size: 22px;
  line-height: 1;
}

.tab-label {
  font-size: 11px;
}
</style>
