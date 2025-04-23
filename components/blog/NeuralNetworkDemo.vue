<template>
  <div class="p-4">
    <svg :height="height" class="border relative w-full" :viewBox="`0 0 ${width} ${height}`">
      <!-- links between layers -->
      <g v-for="link in links" :key="`${link.from}-${link.to}`">
        <line
          :x1="nodePositions[link.from].x"
          :y1="nodePositions[link.from].y"
          :x2="nodePositions[link.to].x"
          :y2="nodePositions[link.to].y"
          stroke="#999"
          stroke-width="1"
        />
      </g>

      <!-- animated signal point -->
      <circle
        v-if="signal.active"
        :cx="signal.x"
        :cy="signal.y"
        r="8"
        class="signal-circle"
        fill="#ffffff"
        stroke="#333"
        stroke-width="2"
      />

      <!-- animated nodes -->
      <transition-group name="node" tag="g">
        <g v-for="node in nodes" :key="node.id">
          <circle
            :cx="nodePositions[node.id].x"
            :cy="nodePositions[node.id].y"
            r="20"
            stroke="#333"
            stroke-width="2"
            :class="['node-circle', layerClasses[node.layerIndex]]"
          />
          <text
            :x="nodePositions[node.id].x"
            :y="nodePositions[node.id].y + 5"
            text-anchor="middle"
            font-size="12"
            fill="#fff"
          >
            {{ node.layerIndex === 0 ? 'I' : node.layerIndex === maxLayer ? 'O' : 'H' }}
          </text>
        </g>
      </transition-group>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, nextTick, onMounted } from 'vue'

interface Node {
  id: string
  layerIndex: number
}

const width = 600
const height = 400
const hiddenLayersCount = 4 // multiple hidden layers (added 2 more)
const state = reactive({ nodes: [] as Node[], nextId: 1 })
const isSimulating = ref(false)
const isAnimating = ref(false)
const signal = reactive({ x: 0, y: 0, active: false })

function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }

const maxLayer = computed(() => hiddenLayersCount + 1)
const layersOrder = computed(() => Array.from({ length: maxLayer.value + 1 }, (_, i) => i))

// SCONN simulation builds layers vertically
async function startSimulation() {
  if (isSimulating.value) return
  isSimulating.value = true
  state.nodes = []
  state.nextId = 1

  // create input layer (index 0)
  for (let i = 0; i < 3; i++) {
    state.nodes.push({ id: String(state.nextId++), layerIndex: 0 })
    await delay(300)
  }

  // create multiple hidden layers
  for (let layer = 1; layer <= hiddenLayersCount; layer++) {
    for (let j = 0; j < 4; j++) {
      state.nodes.push({ id: String(state.nextId++), layerIndex: layer })
      await delay(300)
    }
  }

  // create output layer (last index)
  for (let i = 0; i < 2; i++) {
    state.nodes.push({ id: String(state.nextId++), layerIndex: maxLayer.value })
    await delay(300)
  }
  isSimulating.value = false
}

// animate a single signal through one node per layer
async function runSignal() {
  if (isAnimating.value || isSimulating.value) return
  if (!state.nodes.length) return
  isAnimating.value = true

  // pick a random node in each layer
  const path: Node[] = []
  layersOrder.value.forEach(idx => {
    const layerNodes = state.nodes.filter(n => n.layerIndex === idx)
    if (layerNodes.length) {
      const choice = layerNodes[Math.floor(Math.random() * layerNodes.length)]
      path.push(choice)
    }
  })

  // start at first
  signal.x = nodePositions.value[path[0].id].x
  signal.y = nodePositions.value[path[0].id].y
  signal.active = true

  for (const node of path.slice(1)) {
    await nextTick()
    await delay(500)
    signal.x = nodePositions.value[node.id].x
    signal.y = nodePositions.value[node.id].y
  }
  await delay(500)
  signal.active = false
  isAnimating.value = false
}

// on mount, auto-run SCONN then continuously loop signal
onMounted(async () => {
  await startSimulation()
  while (true) {
    await runSignal()
    await delay(1000)
  }
})

// compute positions by horizontal layers
const nodePositions = computed(() => {
  const positions: Record<string, { x: number; y: number }> = {}
  layersOrder.value.forEach((layerIdx, i) => {
    const layerNodes = state.nodes.filter(n => n.layerIndex === layerIdx)
    const x = (i + 1) * (width / (layersOrder.value.length + 1))
    layerNodes.forEach((node, j) => {
      const y = (j + 1) * (height / (layerNodes.length + 1))
      positions[node.id] = { x, y }
    })
  })
  return positions
})

// links between consecutive layers
const links = computed(() => {
  const out: { from: string; to: string }[] = []
  state.nodes.forEach(n1 => {
    state.nodes.forEach(n2 => {
      if (n2.layerIndex === n1.layerIndex + 1) {
        out.push({ from: n1.id, to: n2.id })
      }
    })
  })
  return out
})

// helper classes for nodes by layer
const layerClasses = computed(() => {
  const classes: Record<number, string> = {}
  classes[0] = 'input-node'
  for (let i = 1; i <= hiddenLayersCount; i++) classes[i] = 'hidden-node'
  classes[maxLayer.value] = 'output-node'
  return classes
})

const nodes = computed(() => state.nodes)

defineExpose({ width, height })
</script>

<style scoped>
.node-circle { transition: transform 0.3s ease, opacity 0.3s ease; transform-origin: center; }
.node-enter-from, .node-leave-to { opacity:0; transform:scale(0); }
.node-enter-to, .node-leave-from { opacity:1; transform:scale(1); }
.node-enter-active, .node-leave-active { transition: all 0.3s ease; }
.input-node { fill:#6fcf97; }
.hidden-node { fill:#f2c94c; }
.output-node { fill:#eb5757; }
.signal-circle { transition: cx 0.5s linear, cy 0.5s linear; }
</style>