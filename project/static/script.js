function predict() {

    const data = {
        production_volume: parseFloat(document.getElementById("production_volume").value),
        production_cost: parseFloat(document.getElementById("production_cost").value),
        defect_rate: parseFloat(document.getElementById("defect_rate").value),
        quality_score: parseFloat(document.getElementById("quality_score").value),
        maintenance_hours: parseFloat(document.getElementById("maintenance_hours").value),
        stockout_rate: parseFloat(document.getElementById("stockout_rate").value),
        energy_efficiency: parseFloat(document.getElementById("energy_efficiency").value)
    };

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("result").innerHTML =
            `Prediction: ${result.prediction} <br> Confidence: ${(result.confidence * 100).toFixed(2)}%`;
    })
    .catch(err => {
        document.getElementById("result").innerHTML = "Error connecting to backend";
        console.error(err);
    });
}