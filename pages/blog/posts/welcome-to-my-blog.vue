<template>
  <BlogPostLayout :post="post">
    <!-- Apple-styled language selector -->
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
    
    <!-- English content -->
    <div v-if="language === 'en'">
      <h1>Engineering Ideas Into Reality</h1>
      
      <p>
        Welcome to my little corner of the internet — a space where coding meets combustion, and engineering challenges are part of everyday life.
        I'm a student at DHBW and an active member of <strong>DHBW Engineering e.V.</strong>, where I work hands-on with an incredible team to design, simulate, and build our very own Formula Student race car.
        From brainstorming in the lab to crunching CFD data and testing at the track, it's a wild ride that constantly pushes me to learn more and do better.
      </p>

      <p>
        Outside of university, I dive even deeper into the automotive world through my work at <strong>Mercedes-Benz</strong>.
        Being close to real-world vehicle development adds an entirely different perspective to the engineering problems we tackle at school — and sometimes, those worlds collide in really exciting ways.
      </p>

      <p>
        This blog is a place for me to document my journey — from coding side-projects and simulation workflows to hands-on builds and behind-the-scenes looks at cool engineering ideas.
        Whether you're into automotive tech, software development, or just love seeing how things are made, I hope you'll find something here that sparks your interest.
      </p>
      <p>
        So, buckle up and join me on this adventure! I can't wait to share my experiences, insights, and maybe even a few laughs along the way.
        If you have any questions or just want to chat about engineering, feel free to reach out!
        Let's connect and explore the world of engineering together!
      </p>
      <p>
        I will be writing mostly in English, but for some posts, I might also include a German version.
      </p>
      <p>
        Cheers,
        <br />
        <strong>Philipp</strong>
      </p>
    </div>
    
    <!-- German content -->
    <div v-if="language === 'de'">
      <h1>Ingenieursideen Verwirklichen</h1>
      
      <p>
        Willkommen in meiner kleinen Ecke des Internets — ein Raum, in dem Programmieren auf Verbrennung trifft und technische Herausforderungen zum Alltag gehören.
        Ich bin Student an der DHBW und aktives Mitglied bei <strong>DHBW Engineering e.V.</strong>, wo ich mit einem unglaublichen Team zusammenarbeite, um unseren eigenen Formula Student Rennwagen zu entwerfen, zu simulieren und zu bauen.
        Von Brainstorming im Labor über CFD-Datenanalyse bis hin zu Tests auf der Rennstrecke — es ist eine wilde Fahrt, die mich ständig dazu antreibt, mehr zu lernen und besser zu werden.
      </p>

      <p>
        Außerhalb der Universität tauche ich noch tiefer in die Automobilwelt ein durch meine Arbeit bei <strong>Mercedes-Benz</strong>.
        Die Nähe zur realen Fahrzeugentwicklung gibt eine völlig andere Perspektive auf die technischen Probleme, die wir in der Hochschule angehen — und manchmal überschneiden sich diese Welten auf wirklich spannende Weise.
      </p>

      <p>
        Dieser Blog ist ein Ort für mich, um meine Reise zu dokumentieren — von Coding-Nebenprojekten und Simulationsworkflows bis hin zu praktischen Aufbauten und Blicken hinter die Kulissen cooler Ingenieursideen.
        Ob du dich für Automobiltechnik, Softwareentwicklung interessierst oder einfach nur gerne sehen möchtest, wie Dinge entstehen, ich hoffe, du findest hier etwas, das dein Interesse weckt.
      </p>
      <p>
        Also schnall dich an und begleite mich auf diesem Abenteuer! Ich kann es kaum erwarten, meine Erfahrungen, Einsichten und vielleicht sogar ein paar Lacher mit dir zu teilen.
        Wenn du Fragen hast oder einfach über Ingenieurswesen plaudern möchtest, zögere nicht, dich zu melden!
        Lass uns gemeinsam die Welt des Ingenieurwesens erkunden!
      </p>
      <p>
        Ich werde hauptsächlich auf Englisch schreiben, aber für einige Beiträge werde ich auch eine deutsche Version anbieten.
      </p>
      <p>
        Viele Grüße,
        <br />
        <strong>Philipp</strong>
      </p>
    </div>
  </BlogPostLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Language state
const language = ref('en');

// Post metadata
const post = {
  title: "Welcome to My Blog",
  description: "An introduction to my blog, what to expect, and the topics I'll be covering",
  date: "2025-04-17T08:00:00.000Z", // Today's date
  tags: ["introduction", "personal", "blog", "english", "deutsch"]
};
</script>