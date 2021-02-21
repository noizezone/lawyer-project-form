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

                const alert = createAlert("danger", 'Invalid Information');

                // Find last activeStep h2 and append alert after that element

                const lastHeaders = activeStep.querySelectorAll("h2");
                const lastHeader = lastHeaders[lastHeaders.length - 1];

                lastHeader.parentNode.insertBefore(alert, lastHeader.nextSibling);

                return false;
            }

            if (1 === index) {
                return true;
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
