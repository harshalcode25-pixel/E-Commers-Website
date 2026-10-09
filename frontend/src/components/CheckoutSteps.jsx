import React from "react";

function CheckoutSteps(props) {
    const stepClass = active =>
        "flex-1 border-t-4 pt-4 " +
        (active ? "border-orange-500 text-orange-500" : "border-gray-300 text-gray-300");

    return (
        <div className="mx-auto my-4 flex w-160 justify-around">
            <div className={stepClass(props.step1)}>Signin</div>
            <div className={stepClass(props.step2)}>Shipping</div>
            <div className={stepClass(props.step3)}>Payment</div>
            <div className={stepClass(props.step4)}>Place Order</div>
        </div>
    );
}
export default CheckoutSteps;
