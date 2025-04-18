<template>
  <BlogPostLayout :post="post">
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
      Whether you're into automotive tech, software development, or just love seeing how things are made, I hope you’ll find something here that sparks your interest.
    </p>
    <p>
      So, buckle up and join me on this adventure! I can't wait to share my experiences, insights, and maybe even a few laughs along the way.
      If you have any questions or just want to chat about engineering, feel free to reach out!
      Let's connect and explore the world of engineering together!
    </p>
    <p>
      I will be writing mostly in English, but for some post, i might also include a german version.
    </p>
    <p>
      Cheers,
      <br />
      <strong>Philipp</strong>
    </p>
  </BlogPostLayout>
</template>

<script setup lang="ts">
// Post metadata
const post = {
  title: "Welcome to My Blog",
  description: "An introduction to my blog, what to expect, and the topics I'll be covering",
  date: "2025-04-17T08:00:00.000Z", // Today's date
  tags: ["introduction", "personal", "blog", "english"]
};
</script>