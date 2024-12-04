const components = document.querySelectorAll(".component-container");
const breakButton = document.getElementById("breakButton");
const mainImg = document.querySelector(".main-img");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const loadingCircle = document.getElementById("loadingCircle");
let isBroken = false;

function createTooltip(text, number) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerText = `#${number} - ${text}`;
  return tooltip;
}

components.forEach((component) => {
  const fact = component.getAttribute("data-fact");
  const number = component.getAttribute("data-number");
  const tooltip = createTooltip(fact, number);
  component.appendChild(tooltip);
});

const positions = [
  { left: "10%", top: "70%" },
  { left: "15%", top: "50%" },
  { left: "7%", top: "30%" },
  { left: "25%", top: "30%" },
  { left: "16%", top: "87%" },
  { left: "30%", top: "50%" },
  { left: "27%", top: "70%" },
  { left: "70%", top: "30%" },
  { left: "67%", top: "50%" },
  { left: "86%", top: "30%" },
  { left: "65%", top: "70%" },
  { left: "82%", top: "70%" },
  { left: "83%", top: "50%" },
  { left: "83%", top: "10%" }
];

function updateProgress(progress) {
  progressBar.style.width = progress + "%";
  progressText.innerText = progress + "%";
}

function breakComponents() {
  progressContainer.style.display = "block";
  loadingCircle.style.display = "block";
  progressMessage.style.display = "block"; // Show the progress message

  let progress = 0; 
  const interval = setInterval(() => {
    progress += 1;
    updateProgress(progress);
    if (progress === 100) {
      clearInterval(interval);
      progressContainer.style.display = "none";
      loadingCircle.style.display = "none";
      progressMessage.style.display = "none"; 

      
      components.forEach((component, index) => {
        const pos = positions[index];
        component.style.left = pos.left;
        component.style.top = pos.top;
        component.style.opacity = "1";
        component.style.position = "fixed"; // Ensure fixed positioning
        component.style.transition = "all 1s ease-in-out"; // Smooth transition
      });

      // Add transition effect to main image and switch to omain.png
      mainImg.src = "img/omain.png";
      mainImg.classList.add("omain-img");
    }
  }, 50); // Duration of the breakdown process (5 seconds)

  isBroken = true;
  breakButton.textContent = "Reset";
}

function resetComponents() {
  components.forEach((component) => {
    component.style.opacity = "0";
    component.style.transition = "all 1s ease-in-out"; // Smooth transition back to center
    component.style.left = "50%";
    component.style.top = "50%";
    component.style.transform = "translate(-50%, -50%)"; // Center position
    setTimeout(() => {
      component.style.position = "absolute";
    }, 1000); // Delay to keep position fixed during transition
  });

  // Reset main image to main.png
  mainImg.src = "img/main.png";
  mainImg.classList.remove("omain-img");

  isBroken = false;
  breakButton.textContent = "Break";
}

breakButton.addEventListener("click", () => {
  if (isBroken) {
    resetComponents();
  } else {
    breakComponents();
  }
});
