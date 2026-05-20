import { ref, computed } from 'vue';
import { timelineData } from './data/timelineData';
import type { TimelineEntry, TimelineItem } from './data/types';

export function useTimeline() {
  const activeFilters = ref<Set<'work' | 'education' | 'extracurricular'>>(
    new Set(['work', 'education', 'extracurricular'])
  );

  const allItems = timelineData;

  const filteredItems = computed<TimelineItem[]>(() => {
    const items: TimelineItem[] = [];
    let lastYearMarker: TimelineItem | null = null;

    for (const item of allItems) {
      if (item.isYearMarker) {
        lastYearMarker = item;
        continue;
      }

      const entry = item as TimelineEntry;
      if (activeFilters.value.has(entry.type)) {
        if (lastYearMarker) {
          items.push(lastYearMarker);
          lastYearMarker = null;
        }
        items.push(item);
      }
    }

    return items;
  });

  const toggleFilter = (type: 'work' | 'education' | 'extracurricular') => {
    const newFilters = new Set(activeFilters.value);
    if (newFilters.has(type)) {
      if (newFilters.size > 1) {
        newFilters.delete(type);
      }
    } else {
      newFilters.add(type);
    }
    activeFilters.value = newFilters;
  };

  const isFilterActive = (type: 'work' | 'education' | 'extracurricular') => {
    return activeFilters.value.has(type);
  };

  return {
    allItems,
    filteredItems,
    activeFilters,
    toggleFilter,
    isFilterActive,
  };
}
