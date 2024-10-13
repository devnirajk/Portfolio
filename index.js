// 


const leftColumn = document.querySelector(".left-column");
const rightColumn = document.querySelector(".right-column");
const starRating = document.querySelector(".star-rating");

// Define the skills and corresponding star ratings (1-5 scale)
const skills = [
  { name: 'Javascript', rating: 4 },
  { name: 'SpringBoot', rating: 3 },
  { name: 'Selenium', rating: 3 },
  { name: 'HTML/CSS', rating: 3 },
  { name: 'Java', rating: 4 },
  { name: 'React JS', rating: 4 },
  { name: 'SQL', rating: 3 },
  { name: 'Linux', rating: 3 },
  { name: 'AWS', rating: 2 },
  { name: 'Git', rating: 3 }
];

// Function to create the skill container for each skill
const createSkillContainer = (skill) => {
  const skillContainer = document.createElement('div');
  skillContainer.classList.add('flex', 'items-center', 'space-x-2', 'my-2', 'border-b', 'border-gray-300', 'p-3', 'justify-center', 'w-fit', 'shadow-lg', 'rounded', 'opacity-0', 'transition-opacity', 'duration-500', 'shadow-blue-300', 'font-mono');

  const skillName = document.createElement('h4');
  skillName.textContent = skill.name;
  skillName.classList.add('text-sm', 'font-medium', 'text-gray-600');

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    if (i <= skill.rating) {
      star.classList.add('fas', 'fa-star', 'text-yellow-400', 'text-base'); // Filled star
    } else {
      star.classList.add('far', 'fa-star', 'text-yellow-400', 'text-base'); // Empty star
    }
    skillContainer.appendChild(star);
  }

  skillContainer.insertBefore(skillName, skillContainer.firstChild);
  return skillContainer;
};

// Function to render the skills with a staggered effect
const renderSkills = () => {
  skills.forEach((skill, index) => {
    const skillContainer = createSkillContainer(skill);

    // Distribute skills between left and right columns
    if (index % 2 === 0) {
      leftColumn.appendChild(skillContainer);
    } else {
      rightColumn.appendChild(skillContainer);
    }

    // Add a delay to the rendering for the staggered effect
    setTimeout(() => {
      skillContainer.classList.remove('opacity-0');
    }, index * 200); // 200ms delay for each skill
  });
};

// Create an Intersection Observer to detect when the star-rating comes into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // When the section is in view, trigger the rendering and stop observing
      starRating.classList.remove('opacity-0');
      renderSkills();
      observer.unobserve(starRating);
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the star-rating section is visible
});

// Start observing the star-rating section
observer.observe(starRating);
