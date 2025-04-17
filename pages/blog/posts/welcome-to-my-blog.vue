<template>
  <BlogPostLayout :post="post">
    <h1>Welcome to My Blog</h1>
    
    <p>
      Hello and welcome to my personal blog! I'm Philipp Gehrig, and I'm excited to share my thoughts, 
      experiences, and knowledge with you through this platform.
    </p>
    
    <h2>Who Am I?</h2>
    
    <p>
      I'm a passionate engineer and web developer with interests spanning across multiple domains. 
      My background in engineering has equipped me with a problem-solving mindset that I apply to 
      both technical challenges and creative pursuits. When I'm not coding or working on engineering 
      problems, you might find me exploring new technologies, reading, or enjoying outdoor activities.
    </p>
    
    <h2>My Professional Journey</h2>
    
    <p>
      My career path has been shaped by my passion for both engineering and technology. After completing 
      my education at DHBW (Baden-Wuerttemberg Cooperative State University), where I studied Engineering, 
      I started my professional journey at Mercedes-Benz.
    </p>
    
    <p>
      At Mercedes-Benz, I worked on innovative engineering projects that challenged me to apply theoretical 
      knowledge to real-world problems. This experience was invaluable, teaching me not only technical 
      skills but also how to collaborate effectively in cross-functional teams and deliver solutions under 
      pressure.
    </p>
    
    <p>
      Throughout my career, I've developed expertise in Computational Fluid Dynamics (CFD), which combines 
      my interest in physics, mathematics, and computational methods. This specialization has allowed me 
      to work on fascinating projects involving fluid flow simulations and thermal analysis.
    </p>
    
    <p>
      In parallel with my engineering career, I've cultivated a growing passion for web development. 
      What started as a curiosity evolved into a serious pursuit, leading me to master technologies 
      like Vue.js, Nuxt, and TailwindCSS. I find the intersection of engineering principles and software 
      development particularly interesting — both fields require structured thinking, problem-solving, 
      and attention to detail.
    </p>
    
    <h2>Personal Growth and Learning</h2>
    
    <p>
      My journey hasn't been without challenges. Transitioning between different technical domains 
      required continuous learning and adaptation. There were moments when I questioned my direction, 
      but each obstacle ultimately reinforced my passion for both engineering and web development.
    </p>
    
    <p>
      One of the most significant lessons I've learned is that the boundaries between different technical 
      fields are often more permeable than they appear. The analytical thinking I developed as an engineer 
      has proven invaluable in approaching web development challenges, while the user-centric design 
      principles from web development have influenced how I approach engineering solutions.
    </p>
    
    <p>
      I believe in lifelong learning and constantly push myself to grow both professionally and personally. 
      Whether it's mastering a new programming framework, deepening my understanding of fluid dynamics, or 
      improving my technical writing skills, I'm always looking for opportunities to expand my knowledge base.
    </p>
    
    <h2>What to Expect From This Blog</h2>
    
    <p>
      This blog is my digital garden—a space where I'll share:
    </p>
    
    <ul>
      <li><strong>Engineering Insights:</strong> Dive into topics like Computational Fluid Dynamics (CFD) and other engineering concepts</li>
      <li><strong>Web Development:</strong> Tutorials, best practices, and experiences with technologies like Vue.js, Nuxt, and TailwindCSS</li>
      <li><strong>Professional Growth:</strong> Reflections on career development, learning paths, and skill acquisition</li>
      <li><strong>Personal Projects:</strong> Updates and deep dives into projects I'm working on</li>
    </ul>
    
    <p>
      My goal is to make complex topics accessible while providing value to both beginners and experienced professionals.
      Whether you're here to learn something new or just curious about my perspective, I hope you'll find something 
      interesting in these pages.
    </p>
    
    <h2>Why I Started This Blog</h2>
    
    <p>
      I believe in the power of sharing knowledge. Writing helps me organize my thoughts, deepen my understanding, 
      and connect with like-minded individuals. Through this blog, I aim to:
    </p>
    
    <ul>
      <li>Document my learning journey and professional growth</li>
      <li>Create resources that might help others facing similar challenges</li>
      <li>Build a community of people interested in similar topics</li>
      <li>Challenge myself to articulate complex ideas clearly</li>
    </ul>
    
    <h2>Recent and Upcoming Topics</h2>
    
    <p>
      I've already published a few articles on Computational Fluid Dynamics, including:
    </p>
    
    <ul>
      <li>Introduction to the Basics of CFD Simulations</li>
      <li>Introduction to CFD Simulations and the k-epsilon Model</li>
    </ul>
    
    <p>
      In the coming months, I plan to expand into more varied topics:
    </p>
    
    <ul>
      <li>Modern web development with Nuxt 3 and Vue.js</li>
      <li>Implementing efficient CI/CD pipelines for personal projects</li>
      <li>The intersection of engineering principles and software development</li>
      <li>Building an effective professional portfolio</li>
      <li>Lessons learned from my time at Mercedes-Benz and how they apply across industries</li>
      <li>How my engineering background influences my approach to web development</li>
    </ul>
    
    <h2>Let's Connect</h2>
    
    <p>
      I value interaction and feedback. If you have questions, suggestions for topics, or just want to 
      connect, don't hesitate to reach out through:
    </p>
    
    <ul>
      <li>Comments on blog posts (coming soon)</li>
      <li>My professional social media profiles</li>
      <li>Email (available on my contact page)</li>
    </ul>
    
    <p>
      Your engagement helps make this blog better and more relevant to what readers want to see.
    </p>
    
    <h2>Thank You for Being Here</h2>
    
    <p>
      Whether you stumbled upon this blog by accident or you're here intentionally, thank you for taking 
      the time to read. I hope you'll bookmark this site and return as I continue to add new content.
    </p>
    
    <p>
      Here's to sharing knowledge, continuous learning, and meaningful connections!
    </p>
  </BlogPostLayout>
</template>

<script setup lang="ts">
// Post metadata
const post = {
  title: "Welcome to My Blog",
  description: "An introduction to my blog, what to expect, and the topics I'll be covering",
  date: "2025-04-17T08:00:00.000Z", // Today's date
  tags: ["introduction", "personal", "blog", "career"]
};
</script>