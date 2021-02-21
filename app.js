(function () {
    'use strict';
    window.addEventListener('load', function () {
        const steps = Array.from(document.querySelectorAll(".step"));
        const dots = Array.from(document.querySelectorAll(".dot"));


        const nextBtn = document.querySelector("#next-btn");
        const prevBtn = document.querySelector("#prev-btn");
        const submitBtn = document.querySelector("#submit-btn");

        const alerts = document.querySelectorAll(".alert");
        const radios = document.querySelectorAll(".custom");

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
            // TODO: Find alerts and remove them
            for(let i of alerts){
                alerts.classList.remove("alert alert-danger alert-dismissible fade show");
            }

            // TODO: Remove is-invalid class from inputs
            for(let i of radios){
                radios.classList.remove("is-invalid");
            }

            if (0 === index) {
                // validate radio buttons

                // TODO: Set is-invalid class if something is invalid
                if(!radios.value){
                    radios.classList.add("is-invalid");
                }else{
                    radios.classList.remove("is-invalid");
                }

               // const alert = createAlert('danger', 'Some alert text');
                const alertType = "alert alert-type alert-dismissible fade show";
                const alert = createAlert(alertType, 'Invalid Information');

                // TODO: Find last activeStep h2 and append alert after that element

                const lastH2 = document.querySelectorAll("h2");
                lastH2[lastH2.length-1].appendChild(alert);
                return false;
            }
           // $().alert('close')
            if (1 === index) {
                return true;
            }

            return false;
        }

        function createAlert(type, text) {
            // TODO: Create dom element and return it
            const al = document.createElement("div");
            al.className = type;
            al.innerText = text;
            const closeButton = document.createElement("button");
            closeButton.className = "close";
            closeButton.type = "button";

            // <div className="alert alert-type alert-dismissible fade show">
            //     <span>Make choice</span>
            //     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            //         <span aria-hidden="true">&times;</span>
            //     </button>
            // </div>
        }
    });
})();
