// --- DOM Elements ---
const formBB = document.getElementById("checkoutForm");
const nameBB = document.getElementById("name");
const mobileBB = document.getElementById("mobile");
const emailBB = document.getElementById("email");
const houseBB = document.getElementById("house");
const areaBB = document.getElementById("area");
const cityBB = document.getElementById("city");
const stateBB = document.getElementById("state");
const pincodeBB = document.getElementById("pincode");


const isRequired = (value) => (value === "" ? false : true);

const showError = (errorElement, message) => {
    errorElement.innerText = message;
};

const showSuccess = (errorElement) => {
    errorElement.innerText = "";
};

const isLettersOnly = (value) => /^[A-Za-z ]+$/.test(value);
const isMobileValid = (value) => /^[0-9]{10}$/.test(value);
const isEmailValid = (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
const isPincodeValid = (value) => /^[0-9]{6}$/.test(value);


const checkName = () => {
    let valid = false;
    const nameVal = nameBB.value.trim();
    const nameError = document.getElementById("nameError");

    if (!isRequired(nameVal)) {
        showError(nameError, "Name is required");
    } else if (!isLettersOnly(nameVal)) {
        showError(nameError, "Name can contain only letters");
    } else {
        showSuccess(nameError);
        valid = true;
    }
    return valid;
};

const checkMobile = () => {
    let valid = false;
    const mobileVal = mobileBB.value.trim();
    const mobileError = document.getElementById("mobileError");

    if (!isRequired(mobileVal)) {
        showError(mobileError, "Mobile number is required");
    } else if (!isMobileValid(mobileVal)) {
        showError(mobileError, "Enter 10 digit mobile number");
    } else {
        showSuccess(mobileError);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const emailVal = emailBB.value.trim();
    const emailError = document.getElementById("emailError");

    if (!isRequired(emailVal)) {
        showError(emailError, "Email is required");
    } else if (!isEmailValid(emailVal)) {
        showError(emailError, "Email is not in valid format");
    } else {
        showSuccess(emailError);
        valid = true;
    }
    return valid;
};

const checkHouse = () => {
    let valid = false;
    const houseVal = houseBB.value.trim();
    const houseError = document.getElementById("houseError");

    if (!isRequired(houseVal)) {
        showError(houseError, "House number is required");
    } else {
        showSuccess(houseError);
        valid = true;
    }
    return valid;
};

const checkArea = () => {
    let valid = false;
    const areaVal = areaBB.value.trim();
    const areaError = document.getElementById("areaError");

    if (!isRequired(areaVal)) {
        showError(areaError, "Area is required");
    } else {
        showSuccess(areaError);
        valid = true;
    }
    return valid;
};

const checkCity = () => {
    let valid = false;
    const cityVal = cityBB.value.trim();
    const cityError = document.getElementById("cityError");

    if (!isRequired(cityVal)) {
        showError(cityError, "City is required");
    } else {
        showSuccess(cityError);
        valid = true;
    }
    return valid;
};

const checkState = () => {
    let valid = false;
    const stateVal = stateBB.value.trim();
    const stateError = document.getElementById("stateError");

    if (!isRequired(stateVal)) {
        showError(stateError, "State is required");
    } else {
        showSuccess(stateError);
        valid = true;
    }
    return valid;
};

const checkPincode = () => {
    let valid = false;
    const pincodeVal = pincodeBB.value.trim();
    const pincodeError = document.getElementById("pincodeError");

    if (!isRequired(pincodeVal)) {
        showError(pincodeError, "PIN code is required");
    } else if (!isPincodeValid(pincodeVal)) {
        showError(pincodeError, "PIN code must contain 6 numbers");
    } else {
        showSuccess(pincodeError);
        valid = true;
    }
    return valid;
};

const checkPayment = () => {
    let valid = false;
    const payment = document.querySelector('input[name="payment"]:checked');
    const paymentError = document.getElementById("paymentError");

    if (!payment) {
        showError(paymentError, "Please select payment method");
    } else {
        showSuccess(paymentError);
        valid = true;
    }
    return valid;
};

// --- Submit Listener ---
formBB.addEventListener("submit", function (e) {
    e.preventDefault();

    let isNameValid = checkName(),
        isMobileValid = checkMobile(),
        isEmailValid = checkEmail(),
        isHouseValid = checkHouse(),
        isAreaValid = checkArea(),
        isCityValid = checkCity(),
        isStateValid = checkState(),
        isPincodeValid = checkPincode(),
        isPaymentValid = checkPayment();

    let isFormValid =
        isNameValid &&
        isMobileValid &&
        isEmailValid &&
        isHouseValid &&
        isAreaValid &&
        isCityValid &&
        isStateValid &&
        isPincodeValid &&
        isPaymentValid;

    if (isFormValid) {
        window.location.href = "order-success.html";
    }
});

// --- Submit Listener with LocalStorage ---
formBB.addEventListener("submit", function (e) {
    e.preventDefault();

    let isNameValid = checkName(),
        isMobileValid = checkMobile(),
        isEmailValid = checkEmail(),
        isHouseValid = checkHouse(),
        isAreaValid = checkArea(),
        isCityValid = checkCity(),
        isStateValid = checkState(),
        isPincodeValid = checkPincode(),
        isPaymentValid = checkPayment();

    let isFormValid =
        isNameValid &&
        isMobileValid &&
        isEmailValid &&
        isHouseValid &&
        isAreaValid &&
        isCityValid &&
        isStateValid &&
        isPincodeValid &&
        isPaymentValid;

    if (isFormValid) {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');

        // 1. Create order details object
        const orderDetails = {
            orderId: "KRN-" + Math.floor(100000 + Math.random() * 900000),
            orderDate: new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric"
            }),
            customer: {
                name: nameBB.value.trim(),
                mobile: mobileBB.value.trim(),
                email: emailBB.value.trim()
            },
            shippingAddress: {
                house: houseBB.value.trim(),
                area: areaBB.value.trim(),
                city: cityBB.value.trim(),
                state: stateBB.value.trim(),
                pincode: pincodeBB.value.trim()
            },
            paymentMethod: selectedPayment ? selectedPayment.value : ""
        };

        // 2. Save latest order for order-success.html display
        localStorage.setItem("latestOrder", JSON.stringify(orderDetails));

        // 3. Append to user order history list
        const orderHistory = JSON.parse(localStorage.getItem("kronosOrders")) || [];
        orderHistory.push(orderDetails);
        localStorage.setItem("kronosOrders", JSON.stringify(orderHistory));

        // 4. Redirect to confirmation page
        window.location.href = "order-success.html";
    }
});

formBB.addEventListener("change", function (e) {
    if (e.target.name === "payment") {
        checkPayment();
    }
});