import React from "react";

function CheckoutSteps(props) {
    const stepClass = active =>
        "min-w-0 flex-1 border-t-4 px-1 pt-3 text-xs sm:pt-4 sm:text-base " +
        (active ? "border-orange-500 text-orange-500" : "border-gray-300 text-gray-300");

    return (
        <div className="mx-auto my-4 flex w-full max-w-160 justify-around px-4 sm:px-0">
            <div className={stepClass(props.step1)}>Signin</div>
            <div className={stepClass(props.step2)}>Shipping</div>
            <div className={stepClass(props.step3)}>Payment</div>
            <div className={stepClass(props.step4)}>Place Order</div>
        </div>
    );
}
export default CheckoutSteps;
