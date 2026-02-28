<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-6">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-50 mb-12">Legal Notice</h1>

      <div class="space-y-10 text-zinc-400 text-sm leading-relaxed">
        <div>
          <h2 class="text-lg font-semibold text-zinc-200 mb-4">Information According to § 5 TMG</h2>
          <div class="rounded-xl border border-white/5 bg-dark-800/60 p-5">
            <p class="font-medium text-zinc-200 mb-2">Philipp Gehrig</p>
            <p>Palmenwaldstraße 50 Apartment 404<br>73733 Esslingen<br>Germany</p>
            <p class="mt-3"><span class="text-zinc-300">Contact:</span><br>Email: philipp@gehrig.info<br>Phone: +49 151 68195162</p>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-zinc-200 mb-4">Responsible for Content According to § 55 Abs. 2 RStV</h2>
          <div class="rounded-xl border border-white/5 bg-dark-800/60 p-5">
            <p>Philipp Gehrig<br>Palmenwaldstraße 50 Apartment 404<br>73733 Esslingen<br>Germany</p>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-zinc-200 mb-4">Disclaimer</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-base font-medium text-zinc-300 mb-2">Liability for Content</h3>
              <p>The contents of this website have been created with the greatest possible care. However, I cannot guarantee the contents' accuracy, completeness, or topicality. According to statutory provisions, I am responsible for my own content on these web pages. However, I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Upon notification of violations, I will remove the content immediately.</p>
            </div>
            <div>
              <h3 class="text-base font-medium text-zinc-300 mb-2">Liability for Links</h3>
              <p>This website contains links to external third-party websites, over whose content I have no influence. Therefore, I cannot assume any liability for these external contents. The linked pages were checked for possible legal violations at the time of linking. Upon notification of violations, I will remove such links immediately.</p>
            </div>
            <div>
              <h3 class="text-base font-medium text-zinc-300 mb-2">Copyright</h3>
              <p>The content and works created by me on these pages are subject to German copyright law. Downloads and copies of this page are only permitted for private, non-commercial use. Upon notification of violations, I will remove such content immediately.</p>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-white/5 text-xs text-zinc-600">
          Last updated: April 17, 2025
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Legal Notice',
  description: 'Legal information and contact details'
});
</script>
