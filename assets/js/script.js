function populateContests(id, data = null) {
  const contest = data ?? [];
  // Get the destination div by id
  const ballotsDiv = document.getElementById(id);

  // Check if the div exists
  if (!ballotsDiv) {
    console.error(`Div with id "${id}" not found.`);
    return;
  }

  // Clear any existing content in the div
  ballotsDiv.innerHTML = "";

  // Loop through the contest array and populate the div
  contest.forEach((match) => {
    const matchDiv = document.createElement("div");
    matchDiv.className = "match col-sm-6 gy-3 gy-md-4 gx-5"; // Add a class for styling
    matchDiv.id = match.id;
    matchDiv.setAttribute("data-exp", match.exp);

    matchDiv.innerHTML = `
            <div class="ballot card rounded-0 border-0${
              match?.exp ? ` expired` : ``
            }">
                <div class="align-items-center card-body d-flex justify-content-between p-0">
                    <img class="flag" src="assets/images/flags/${
                      match.team1
                    }.png" alt="${match.team1}">
                        <div class="info">
                            <div class="date">${match.date}</div>
                            <div class="teams"><span class="team">${
                              match.team1
                            }</span> v <span class="team">${
      match.team2
    }</span></div>
                            <div class="loc">${
                              match?.exp ? ` Ballot Closed` : match.loc
                            }</div>
                        </div>
                    <img class="flag" src="assets/images/flags/${
                      match.team2
                    }.png" alt="${match.team2}">
            
                </div>
            </div>
        `;

    ballotsDiv.appendChild(matchDiv);
  });
  // toggle selector
  document.querySelectorAll(".match").forEach((match) => {
    match.addEventListener("click", function () {
      const ballot = this.querySelector(".ballot"); // Select child element
      const expired = match.getAttribute("data-exp");
      console.log(expired);
      if (ballot && expired === "false") {
        ballot.classList.toggle("ico-check"); // Toggle class on child
      }
    });
  });
}

async function fetchJsonFromUrl(url) {
  try {
    // Fetch the JSON data from the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json(); // Parse the JSON data
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error fetching JSON:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}
