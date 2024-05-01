

function toggleOptions() {
    var optionsDiv = document.getElementById("options");
    if (optionsDiv.classList.contains("hidden")) {
      optionsDiv.classList.remove("hidden");
      // Change button text when options are shown
      document.getElementById("toggleButton").textContent = "Hide Options";
    } else {
      optionsDiv.classList.add("hidden");
      // Change button text when options are hidden
      document.getElementById("toggleButton").textContent = "EDIT PROFIL";
    }
  }