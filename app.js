(function () {
    'use strict';
    window.addEventListener('load', function () {
        const steps = Array.from(document.querySelectorAll(".step"));
        const dots = Array.from(document.querySelectorAll(".dot"));

        const nextBtn = document.querySelector("#next-btn");
        const prevBtn = document.querySelector("#prev-btn");
        const submitBtn = document.querySelector("#submit-btn");

        nextBtn.addEventListener("click", function (event) {
            event.preventDefault();
            changeStep("next");
        });

        prevBtn.addEventListener("click", function (event) {
            event.preventDefault();
            changeStep("prev");
        });

        submitBtn.addEventListener("click", function (event) {
            event.preventDefault();
            alert('submit form');
        });

        function changeStep(direction) {
            const activeStep = document.querySelector(".step.active");
            const index = steps.indexOf(activeStep);
            const newIndex = index + (direction === "next" ? 1 : -1);

            // console.log(index, newIndex);

            if (direction === "next") {
                const isValid = validateStep(activeStep, index);

                if (!isValid) {
                    // alert('Step is invalid.');

                    return;
                }
            }

            if (0 === newIndex) {
                prevBtn.style.display = "none";
                submitBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
            }

            // If we are at last step
            if (newIndex === steps.length - 1) {
                nextBtn.style.display = "none";
                submitBtn.style.display = "block";
            } else {
                submitBtn.style.display = "none";
                nextBtn.style.display = "block";
            }

            steps[index].classList.remove("active");
            steps[newIndex].classList.add("active");

            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
                dots[i].classList.remove("finished");
            }

            for (let i = 0; i < newIndex; i++) {
                dots[i].classList.add("finished");
            }

            if (direction === "next") {
                dots[newIndex].classList.add("active");
            } else {
                dots[newIndex].classList.add("finished");
            }
        }

        function validateStep(activeStep, index) {
            // Find alerts and remove them
            const alerts = activeStep.querySelectorAll(".alert");

            for (const index in alerts) {
                if (alerts.hasOwnProperty(index)) {
                    alerts[index].parentNode.removeChild(alerts[index]);
                }
            }

            // Remove is-invalid class from inputs
            const invalidInputs = activeStep.querySelectorAll(".is-invalid");

            for (const index in invalidInputs) {
                if (invalidInputs.hasOwnProperty(index)) {
                    invalidInputs[index].classList.remove("is-invalid");
                }
            }

            if (0 === index) {
                // Validate step 1
                const legalDomains = document.getElementsByName("legal_domain");
                let isLegalDomainChecked = false;

                for (const index in legalDomains) {
                    if (legalDomains.hasOwnProperty(index) && legalDomains[index].checked) {
                        isLegalDomainChecked = true;
                        break;
                    }
                }

                if (isLegalDomainChecked) {
                    return true;
                }

                // Set is-invalid class if something is invalid
                for (const index in legalDomains) {
                    if (legalDomains.hasOwnProperty(index)) {
                        legalDomains[index].classList.add("is-invalid");
                    }
                }

                const alert = createAlert("danger", 'Please select one legal matter');

                // Find last activeStep h2 and append alert after that element

                const lastHeaders = activeStep.querySelectorAll("h2");
                const lastHeader = lastHeaders[lastHeaders.length - 1];

                lastHeader.parentNode.insertBefore(alert, lastHeader.nextSibling);

                return false;
            }


            //Validate Step 2
            if (1 === index) {
                const personalInfo = document.getElementsByName("input_personal_info");

                let isValidAll = [false, false, false, false, false];

                for (let i = 0; i < personalInfo.length; i++) {
                    if (personalInfo.hasOwnProperty(i)) {
                        personalInfo[i].classList.add("is-invalid");
                    }
                }

                if (personalInfo[0].value !== "") {
                    personalInfo[0].classList.remove("is-invalid");
                    personalInfo[0].classList.add("is-valid");
                    isValidAll[0] = true;
                }

                if (personalInfo[1].value !== "") {
                    personalInfo[1].classList.remove("is-invalid");
                    personalInfo[1].classList.add("is-valid");
                    isValidAll[1] = true;
                }

                if (personalInfo[2].value !== "") {

                    function validateEmail(emailInput) {
                        const regex = /\S+@\S+\.\S+/;
                        return regex.test(emailInput);
                    }

                    personalInfo[2].classList.remove("is-invalid");
                    personalInfo[2].classList.add("is-valid");
                    isValidAll[2] = true;
                }

                if (personalInfo[3].value !== "") {
                    personalInfo[3].classList.remove("is-invalid");
                    personalInfo[3].classList.add("is-valid");
                    isValidAll[3] = true;
                }

                if (document.getElementById('tos').checked) {
                    personalInfo[4].classList.remove("is-invalid");
                    personalInfo[4].classList.add("is-valid");
                    isValidAll[4] = true;
                }

                const alert = createAlert("danger", 'Please fill up all required fields correctly and accept the conditions');
                const lastHeaders = activeStep.querySelectorAll("h3");
                const lastHeader = lastHeaders[lastHeaders.length - 1];
                lastHeader.parentNode.insertBefore(alert, lastHeader.nextSibling);

                for (let i = 0; i < isValidAll.length; i++) {
                    if (isValidAll[index] === false) {
                        return false;
                    }
                    if (isValidAll[isValidAll.length - 1] === true && i === isValidAll.length - 1) {
                        return true;
                    }
                }

                return false;
            }

            //Validate step 3
            if (2 === index) {
                const paymentTypes = document.getElementsByName("payment");
                let isPaymentTypeChecked = false;

                for (const index in paymentTypes) {
                    if (paymentTypes.hasOwnProperty(index) && paymentTypes[index].checked) {
                        isPaymentTypeChecked = true;
                        break;
                    }
                }

                if (isPaymentTypeChecked) {
                    return true;
                }

                for (const index in paymentTypes) {
                    if (paymentTypes.hasOwnProperty(index)) {
                        paymentTypes[index].classList.add("is-invalid");
                    }
                }

                const alert = createAlert("danger", 'Please select your payment type');

                const lastHeaders = activeStep.querySelectorAll("h3");
                const lastHeader = lastHeaders[lastHeaders.length - 1];

                lastHeader.parentNode.insertBefore(alert, lastHeader.nextSibling);


                return false;
            }
            return false;
        }

        function createAlert(type, text) {
            const alert = document.createElement("div");
            alert.className = "alert alert-" + type + " alert-dismissible fade show";

            const alertSpan = document.createElement("span");
            alertSpan.innerText = text;

            alert.appendChild(alertSpan);

            const button = document.createElement("button");
            button.className = "close";
            button.dataset.dismiss = "alert";
            button.setAttribute("type", "button");
            button.setAttribute("aria-label", "Close");

            const buttonSpan = document.createElement("span");
            buttonSpan.setAttribute("aria-hidden", "true");
            buttonSpan.innerHTML = "&times;";

            button.appendChild(buttonSpan);
            alert.appendChild(button);

            return alert;
        }
    });
})();

function initAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(document.getElementById('geomap'), {types: ['geocode']});
}





