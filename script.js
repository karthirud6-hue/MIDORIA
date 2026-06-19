let impactChart = null;

function generateReport() {

    const transport = document.getElementById("transport").value;
    const distance = Number(document.getElementById("distance").value);
    const electricity = Number(document.getElementById("electricity").value);
    const diet = document.getElementById("diet").value;
    const water = document.getElementById("water").value;

    if (!distance || !electricity) {
        alert("Please complete all fields, Citizen of Midoria.");
        return;
    }

    let transportImpact = 0;
    let electricityImpact = electricity * 0.01;
    let dietImpact = 0;
    let waterImpact = 0;

    switch (transport) {
        case "car":
            transportImpact = distance * 0.05;
            break;
        case "public":
            transportImpact = distance * 0.025;
            break;
        case "bike":
            transportImpact = distance * 0.005;
            break;
        case "walk":
            transportImpact = 0;
            break;
    }

    switch (diet) {
        case "vegan":
            dietImpact = 0.3;
            break;
        case "vegetarian":
            dietImpact = 0.6;
            break;
        case "mixed":
            dietImpact = 1.0;
            break;
        case "meat":
            dietImpact = 1.5;
            break;
    }

    switch (water) {
        case "low":
            waterImpact = 0.2;
            break;
        case "moderate":
            waterImpact = 0.5;
            break;
        case "high":
            waterImpact = 0.8;
            break;
    }

    const totalFootprint =
        transportImpact +
        electricityImpact +
        dietImpact +
        waterImpact;

    const carbonFootprint = totalFootprint.toFixed(2);

    let healthScore = Math.max(
        0,
        Math.round(100 - totalFootprint * 10)
    );

    let evaluation = "";

    if (healthScore >= 80) {
        evaluation =
            "🌿 Midoria is flourishing. Your lifestyle choices demonstrate strong environmental awareness and contribute positively to the kingdom's future.";
    }
    else if (healthScore >= 60) {
        evaluation =
            "🍃 Midoria is recovering. Several sustainable habits are already in place, but there is still room to strengthen the kingdom's health.";
    }
    else {
        evaluation =
            "⚠️ Midoria faces environmental challenges. Small changes in daily habits can significantly improve the kingdom's future.";
    }

    let kingdomStatus = "";

    if (healthScore >= 80) {
        kingdomStatus = "🌿 Flourishing";
    }
    else if (healthScore >= 60) {
        kingdomStatus = "🍃 Recovering";
    }
    else {
        kingdomStatus = "⚠️ At Risk";
    }

    let highestImpact = Math.max(
        transportImpact,
        electricityImpact,
        dietImpact,
        waterImpact
    );

    let guidance = "";

    if (highestImpact === transportImpact) {
        guidance =
            "Haruka has observed that transportation contributes most to your footprint. Consider reducing car travel or using public transport more often.";
    }
    else if (highestImpact === electricityImpact) {
        guidance =
            "Haruka recommends reducing electricity usage by switching off unused devices and using energy-efficient appliances.";
    }
    else if (highestImpact === dietImpact) {
        guidance =
            "Haruka suggests introducing more plant-based meals into your weekly routine.";
    }
    else {
        guidance =
            "Haruka advises being mindful of water consumption and reducing unnecessary usage where possible.";
    }

    const quests = [
        "🌱 Carry a reusable water bottle today.",
        "🚶 Walk instead of driving for one short trip.",
        "💡 Turn off unused lights for an entire evening.",
        "♻️ Avoid single-use plastics today.",
        "🥗 Try one plant-based meal this week."
    ];

    const randomQuest =
        quests[Math.floor(Math.random() * quests.length)];

    const transportPercent =
        Math.round((transportImpact / totalFootprint) * 100);

    const electricityPercent =
        Math.round((electricityImpact / totalFootprint) * 100);

    const dietPercent =
        Math.round((dietImpact / totalFootprint) * 100);

    const waterPercent =
        Math.round((waterImpact / totalFootprint) * 100);

    document.getElementById("transportPercent").textContent =
        transportPercent + "%";

    document.getElementById("electricityPercent").textContent =
        electricityPercent + "%";

    document.getElementById("dietPercent").textContent =
        dietPercent + "%";

    document.getElementById("waterPercent").textContent =
        waterPercent + "%";

    document.getElementById("carbonFootprint").textContent =
        carbonFootprint + " tCO₂/year";

    document.getElementById("healthScore").textContent =
        healthScore + "/100";

    document.getElementById("kingdomStatus").textContent =
        kingdomStatus;

    const statusElement =
        document.getElementById("kingdomStatus");

    statusElement.className = "";

    if (healthScore >= 80) {
        statusElement.classList.add("status-good");
    }
    else if (healthScore >= 60) {
        statusElement.classList.add("status-medium");
    }
    else {
        statusElement.classList.add("status-danger");
    }

    document.getElementById("guidance").textContent =
        guidance;

    document.getElementById("quest").textContent =
        randomQuest;

    const evaluationElement =
        document.getElementById("evaluationText");

    if (evaluationElement) {
        evaluationElement.textContent = evaluation;
    }

    const ctx = document.getElementById("impactChart");

    if (impactChart) {
        impactChart.destroy();
    }

    impactChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: [
                "Transport",
                "Electricity",
                "Diet",
                "Water"
            ],
            datasets: [{
                data: [
                    transportPercent,
                    electricityPercent,
                    dietPercent,
                    waterPercent
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });

    document.getElementById("results").style.display = "block";

document.getElementById("results").scrollIntoView({
    behavior: "smooth"
});
}