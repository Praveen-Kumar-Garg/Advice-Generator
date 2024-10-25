const adviceNumber = document.getElementById("advice-number");
const adviceContent = document.getElementById("advice-content");
const getAdviceButton = document.getElementById("get-advice");

async function getAdvice() {
  try {
    // Add loading state
    getAdviceButton.style.pointerEvents = "none";
    getAdviceButton.style.opacity = "0.7";

    const response = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-cache", // Prevents caching of the response
    });
    const data = await response.json();

    // Update the DOM with new advice
    adviceNumber.textContent = data.slip.id;
    adviceContent.textContent = `"${data.slip.advice}"`;
  } catch (error) {
    console.error("Error fetching advice:", error);
    adviceContent.textContent = '"Failed to load advice. Please try again."';
  } finally {
    // Remove loading state
    getAdviceButton.style.pointerEvents = "auto";
    getAdviceButton.style.opacity = "1";
  }
}

// Add click event listener to the button
getAdviceButton.addEventListener("click", getAdvice);

// Optional: Load initial advice when page loads
window.addEventListener("load", getAdvice);
