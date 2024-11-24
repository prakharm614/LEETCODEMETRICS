document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isValid = regex.test(username);
        if (!isValid) {
            alert("Invalid Username");
        }
        return isValid;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyUrl = "https://api.allorigins.win/raw?url=https://leetcode.com/graphql/";
           // const targetUrl = "";
            const graphqlQuery = `
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                            totalSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }
                    }
                }
            `;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: graphqlQuery, variables: { username } }),
            };

            const response = await fetch(proxyUrl , requestOptions);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }
            const parsedData = await response.json();
            displayUserData(parsedData);
        } catch (error) {
            statsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressPercentage = Math.round((solved / total) * 100);
        circle.style.setProperty("--progress-degree", `${progressPercentage}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {
        if (!parsedData.data?.matchedUser?.submitStats) {
            statsContainer.innerHTML = "<p>No data available for this user.</p>";
            return;
        }

        const { allQuestionsCount, matchedUser } = parsedData.data;
        const { acSubmissionNum, totalSubmissionNum } = matchedUser.submitStats;

        updateProgress(acSubmissionNum[1].count, allQuestionsCount[1].count, easyLabel, easyProgressCircle);
        updateProgress(acSubmissionNum[2].count, allQuestionsCount[2].count, mediumLabel, mediumProgressCircle);
        updateProgress(acSubmissionNum[3].count, allQuestionsCount[3].count, hardLabel, hardProgressCircle);

        const cardsData = [
            { label: "Overall Submissions", value: totalSubmissionNum[0].submissions },
            { label: "Easy Submissions", value: totalSubmissionNum[1].submissions },
            { label: "Medium Submissions", value: totalSubmissionNum[2].submissions },
            { label: "Hard Submissions", value: totalSubmissionNum[3].submissions },
        ];

        cardStatsContainer.innerHTML = cardsData.map(
            (data) => `<div class="card"><h4>${data.label}</h4><p>${data.value}</p></div>`
        ).join("");
    }

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
