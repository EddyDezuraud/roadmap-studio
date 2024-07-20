<template>
  <nav :class="$style.wrapper">
    <div :class="$style.user">
      <span :class="$style.avatar">E</span>
      <span :class="$style.username">
        John Doz
      </span>
    </div>
    <NavItem to="/">
      <template v-slot:icon>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-layout-grid"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>
      </template>
      <template v-slot:label>
        Accueil
      </template>
    </NavItem>
    <div :class="$style.group" v-if="roadmaps && roadmaps.length > 0">
      <span :class="$style.groupTitle">Roadmaps</span>
      <NavItem v-for="roadmap in roadmaps" :key="roadmap.id" :to="`/roadmap?id=${roadmap.id}`">
        <template v-slot:icon>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-calendar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1zm3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16v-9.625z" /><path d="M12 12a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /></svg>
        </template>
        <template v-slot:label>
          {{ roadmap.title }}
        </template>
      </NavItem>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { globalStore } from '~/store/global';
const store = globalStore();

const roadmaps = store.roadmapList;
</script>

<style module>
.wrapper {
  width: var(--nav-width);
  border-right: var(--border);
  padding: 10px;
  background: var(--dark-100)
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--dark);
  font-size: 12px;
  font-weight: 600;
  width: 100%;
  padding: 10px;
  background: #F8F9FB;
  border: solid 1px white;
  border-radius: 10px;
  box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.avatar {
  width: 24px;
  height: 24px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 50%;
  background: var(--dark);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group {
  margin-top: 40px;;
}

.groupTitle {
  color: var(--dark-200);
  font-size: 11px;
  font-weight: 500;
  padding: 10px;
  display: block;
}
</style>