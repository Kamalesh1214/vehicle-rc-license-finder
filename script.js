document.addEventListener("DOMContentLoaded", function () 
{
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const rcArticle = document.getElementById("rc-details");
    const licenseArticle = document.getElementById("license-details");
    const imageContainer = document.getElementById("details-right");

    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

    const vehicleDB = {
        "AP09AB1234": {
            owner: "Jonnadula Kamalesh",
            model: "Hyundai i20",
            registration: "12-05-2022",
            insurance: "Active",
            licenseHolder: "Jonnadula Kamalesh",
            licenseNumber: "DL-0420110149646",
            validity: "2032",
            type: "LMV",
            image: "kamalesh.png"
        },
        "TS07CD5678": {
            owner: "Nithya",
            model: "Tata Nexon",
            registration: "21-04-2023",
            insurance: "Active",
            licenseHolder: "Nithya",
            licenseNumber: "DL-0420110149323",
            validity: "2030",
            type: "MCWG",
            image: "nithya.png"
        }
    };

    form.addEventListener("submit", function (e) 
    {
        e.preventDefault();

        let vehicleNumber = input.value.toUpperCase().trim();

        removeError();

        if (!vehicleRegex.test(vehicleNumber)) {
            showError("Invalid Format (Example: AP09AB1234, TS07CD5678)");
            return;
        }

        simulateLoading();

        setTimeout(() => {
            showData(vehicleNumber);
        }, 1000);
    });

    function showError(message) 
    {
        const error = document.createElement("p");
        error.textContent = message;
        error.style.color = "red";
        error.id = "error-msg";
        form.appendChild(error);
    }

    function removeError() 
    {
        const oldError = document.getElementById("error-msg");
        if (oldError) oldError.remove();
    }

    function simulateLoading() {
        rcArticle.innerHTML = "<p>Loading RC details...</p>";
        licenseArticle.innerHTML = "<p>Loading License details...</p>";
        imageContainer.innerHTML = "";
    }

    function showData(vehicleNumber) 
    {
        const data = vehicleDB[vehicleNumber];

        if (!data) {
            showError("Vehicle not found in database");
            rcArticle.innerHTML = "";
            licenseArticle.innerHTML = "";
            imageContainer.innerHTML = "";
            return;
        }

        localStorage.setItem("lastVehicle", vehicleNumber);

        rcArticle.innerHTML = `
            <h3>RC Book Details</h3>
            <p><strong>Owner Name:</strong> ${data.owner}</p>
            <p><strong>Vehicle Model:</strong> ${data.model}</p>
            <p><strong>Registration Date:</strong> ${data.registration}</p>
            <p><strong>Insurance Status:</strong> ${data.insurance}</p>
        `;
        licenseArticle.innerHTML = `
            <h3>Driving License Details</h3>
            <p><strong>License Holder:</strong> ${data.licenseHolder}</p>
            <p><strong>License Number:</strong> ${data.licenseNumber}</p>
            <p><strong>Validity:</strong> ${data.validity}</p>
            <p><strong>License Type:</strong> ${data.type}</p>
        `;
        imageContainer.innerHTML = `
            <img src="${data.image}" alt = "Vehicle Owner" style = "width: 280px; border-radius: 14px; animation: imageFade 0.8s ease forwards; ">
        `;
    }
    const last = localStorage.getItem("lastVehicle");
    if (last && vehicleDB[last]) {
        input.value = last;
        showData(last);
    }
});
