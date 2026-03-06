document.addEventListener("DOMContentLoaded", function () 
{
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const rcArticle = document.querySelector("#rc-details");
    const licenseArticle = document.querySelector("#license-details");
    const imageContianer = document.querySelector("#details-right");

    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let vehicleNumber = input.value.toUpperCase().trim();
        removeError();

        if (!vehicleRegex.test(vehicleNumber)) {
            showError("Invalid Vehicle Number Format (Example: AP09AB1234)");
            return;
        }

        simulateLoading();
        setTimeout(() => {
            showFakeData(vehicleNumber);
        }, 1500);
    });

    function showError(message) {
        const error = document.createElement("p");
        error.textContent = message;
        error.style.color = "red";
        error.style.marginTop = "10px";
        error.id = "error-msg";
        form.appendChild(error);
    }

    function removeError() {
        const oldError = document.getElementById("error-msg");
        if (oldError) oldError.remove();
    }

    function simulateLoading() {
        rcArticle.innerHTML = "<p>Loading RC details...</p>";
        licenseArticle.innerHTML = "<p>Loading License details...</p>";
    }
    
    function showFakeData(vehicleNumber) {
        rcArticle.innerHTML = `
            <h3>RC Book Details</h3>
            <p><strong>Owner Name:</strong> Jonnadula Kamalesh</p>
            <p><strong>Vehicle Model:</strong> Hyundai i20</p>
            <p><strong>Registration Date:</strong> 12-05-2022</p>
            <p><strong>Insurance Status:</strong> Active✅</p>
        `;

        licenseArticle.innerHTML = `
            <h3>Driving License Details</h3>
            <p><strong>License Holder:</strong> Jonnadula Kamalesh</p>
            <p><strong>License Number:</strong> DL-0420110149646</p>
            <p><strong>Validity:</strong> 2032</p>
            <p><strong>License Type:</strong> LMV</p>
        `;

        imageContianer.innerHTML = `
                <img src = "Kamalesh.png" alt = "Photo of Person" style = "width: 280px; border-radius: 14px; animation: imageFade 0.8s ease forwards; ">
            `;
    }
});



