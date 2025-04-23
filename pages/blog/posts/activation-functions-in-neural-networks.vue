<template>
  <BlogPostLayout :post="post">
    <!-- bilingual language selector -->
    <div class="mb-8 flex justify-center">
      <div class="inline-flex items-center px-3 py-1.5 bg-apple-gray-100 rounded-full">
        <button 
          @click="language = 'en'" 
          class="px-3 py-1 text-sm font-medium transition-all duration-200 rounded-full"
          :class="language === 'en' ? 'bg-white text-apple-gray-900 shadow-sm' : 'text-apple-gray-600 hover:text-apple-gray-900'"
          aria-label="English"
        >
          English
        </button>
        <span class="mx-1 text-apple-gray-300">|</span>
        <button 
          @click="language = 'de'" 
          class="px-3 py-1 text-sm font-medium transition-all duration-200 rounded-full"
          :class="language === 'de' ? 'bg-white text-apple-gray-900 shadow-sm' : 'text-apple-gray-600 hover:text-apple-gray-900'"
          aria-label="Deutsch"
        >
          Deutsch
        </button>
      </div>
    </div>

    <!-- English section -->
    <div v-if="language === 'en'">
      <h2 class="text-2xl font-semibold mb-2">Neural Network Basics</h2>
      <p class="mb-4">
        A neural network consists of interconnected layers of simple processing units (neurons) that learn to map inputs to outputs by adjusting weights based on data.
      </p>
      <NeuralNetworkDemo class="mb-6" />
      <h1 class="text-4xl font-bold mb-4">Activation Functions in Neural Networks</h1>
      <p class="mb-4">
        Neural networks are computational models inspired by the human brain, composed of layers of interconnected neurons that learn patterns by propagating signals through weighted connections.
      </p>
      <p class="mb-4">
        Activation functions introduce the essential non-linearity that allows these networks to capture complex relationships beyond simple linear mappings.
      </p>
      <p class="mb-4">
        Activation functions introduce non-linear transformations in neural networks, enabling them to model complex relationships between inputs and outputs. Below are key functions commonly used in practice.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">1. Sigmoid</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>σ(z) = 1/(1+e<sup>-z</sup>)</code></div>
          <p class="text-apple-gray-700">Maps inputs to (0,1); may suffer vanishing gradients for large |z|.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">2. Tanh</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>tanh(z) = (e<sup>z</sup> - e<sup>-z</sup>)/(e<sup>z</sup> + e<sup>-z</sup>)</code></div>
          <p class="text-apple-gray-700">Zero-centered (-1,1); still prone to saturation at extremes.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">3. ReLU &amp; Leaky ReLU</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>ReLU(z) = max(0, z); Leaky(z) = max(α·z, z)</code></div>
          <p class="text-apple-gray-700">Simple, efficient; Leaky variant avoids dead neurons.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">4. Softmax</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>softmax(z<sub>i</sub>) = e<sup>z<sub>i</sub></sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub></sup></code></div>
          <p class="text-apple-gray-700">Converts vector to probabilities; used in classification output.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">5. GELU</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>GELU(z) = z · Φ(z)</code></div>
          <p class="text-apple-gray-700">Smooth, probabilistic gating; popular in transformer models.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">6. Swish</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>swish(z) = z · σ(z)</code></div>
          <p class="text-apple-gray-700">Smooth, self-gated; often improves deep network training.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">7. Mish</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>mish(z) = z · tanh(ln(1 + e<sup>z</sup>))</code></div>
          <p class="text-apple-gray-700">Combines smoothness and strong nonlinearity; emerging favorite.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">8. PReLU</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>prelu(z) = max(0, z) + a · min(0, z)</code></div>
          <p class="text-apple-gray-700">Learnable slope for negative inputs; flexible alternative to Leaky ReLU.</p>
        </div>
      </div>
      <h2 class="text-2xl font-semibold mt-6 mb-2">Practical Tips</h2>
      <ul class="list-disc pl-5 mb-4">
        <li>Use ReLU for most hidden layers to speed up training.</li>
        <li>Try Swish or Mish for deeper networks where smoothness aids gradients.</li>
        <li>Plot functions to understand behavior around zero and in saturation regions.</li>
        <li>Switch activation if you observe dead neurons or slow convergence.</li>
      </ul>
    </div>

    <!-- German section -->
    <div v-if="language === 'de'">
      <h2 class="text-2xl font-semibold mb-2">Grundlagen Neuronaler Netze</h2>
      <p class="mb-4">
        Ein neuronales Netz besteht aus Schichten einfacher Verarbeitungseinheiten (Neuronen), die durch Anpassen von Gewichten lernen, Eingaben auf Ausgaben abzubilden.
      </p>
      <NeuralNetworkDemo class="mb-6" />
      <h1 class="text-4xl font-bold mb-4">Aktivierungsfunktionen in Neuronalen Netzen</h1>
      <p class="mb-4">
        Neuronale Netze sind von Gehirn inspirierte Modelle, die Muster durch gewichteten Verbindungen erlernen.
      </p>
      <p class="mb-4">
        Aktivierungsfunktionen fügen die essentielle Nicht-Linearität hinzu, damit diese Netze komplexe Beziehungen erfassen können.
      </p>
      <p class="mb-4">
        Aktivierungsfunktionen führen nicht-lineare Transformationen ein, damit Netzwerke komplexe Zusammenhänge lernen können. Im Folgenden wichtige Funktionen im Überblick.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">1. Sigmoid</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>σ(z) = 1/(1+e<sup>-z</sup>)</code></div>
          <p class="text-apple-gray-700">Bildet Werte auf (0,1) ab; kann bei großen |z| unter verschwindenden Gradienten leiden.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">2. Tanh</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>tanh(z) = (e<sup>z</sup> - e<sup>-z</sup>)/(e<sup>z</sup> + e<sup>-z</sup>)</code></div>
          <p class="text-apple-gray-700">Nullzentriert (-1,1); immer noch anfällig für Sättigung an den Extremen.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">3. ReLU &amp; Leaky ReLU</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>ReLU(z) = max(0, z); Leaky(z) = max(α·z, z)</code></div>
          <p class="text-apple-gray-700">Einfach, effizient; Leaky-Variante vermeidet tote Neuronen.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">4. Softmax</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>softmax(z<sub>i</sub>) = e<sup>z<sub>i</sub></sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub></sup></code></div>
          <p class="text-apple-gray-700">Wandelt Vektor in Wahrscheinlichkeiten um; wird im Klassifikationsausgang verwendet.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">5. GELU</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>GELU(z) = z · Φ(z)</code></div>
          <p class="text-apple-gray-700">Sanftes, probabilistisches Gating; beliebt in Transformator-Modellen.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">6. Swish</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>swish(z) = z · σ(z)</code></div>
          <p class="text-apple-gray-700">Sanft, selbstgesteuert; verbessert oft das Training tiefer Netzwerke.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">7. Mish</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>mish(z) = z · tanh(ln(1 + e<sup>z</sup>))</code></div>
          <p class="text-apple-gray-700">Kombiniert Sanftheit und starke Nichtlinearität; aufstrebender Favorit.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-apple hover:shadow-apple-hover transition-all duration-200 border-l-4 border-apple-blue.DEFAULT">
          <h3 class="text-xl font-semibold mb-2">8. PReLU</h3>
          <div class="inline-block bg-apple-blue.light text-white font-mono px-3 py-1 rounded-full mb-3"><code>prelu(z) = max(0, z) + a · min(0, z)</code></div>
          <p class="text-apple-gray-700">Lernbare Steigung für negative Eingaben; flexible Alternative zu Leaky ReLU.</p>
        </div>
      </div>
      <h2 class="text-2xl font-semibold mt-6 mb-2">Praktische Tipps</h2>
      <ul class="list-disc pl-5 mb-4">
        <li>Verwende ReLU für die meisten Hidden-Layer für schnellere Trainingszeiten.</li>
        <li>Probiere Swish oder Mish für tiefere Netzwerke, bei denen Glätte die Gradienten unterstützt.</li>
        <li>Erstelle Plots, um das Verhalten um Null und in Sättigungsregionen zu überprüfen.</li>
        <li>Wechsle die Aktivierung, wenn du tote Neuronen oder langsame Konvergenz bemerkst.</li>
      </ul>
    </div>
  </BlogPostLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NeuralNetworkDemo from '~/components/blog/NeuralNetworkDemo.vue'

const language = ref('en')

const post = {
  title: 'Activation Functions in Neural Networks',
  description: 'An overview of activation functions for neural networks.',
  date: '2025-04-23T08:00:00.000Z',
  tags: ['neural-networks', 'activation-functions', 'deutsch', 'english'],
  path: '/blog/posts/activation-functions-in-neural-networks',
  slug: 'activation-functions-in-neural-networks'
}
</script>