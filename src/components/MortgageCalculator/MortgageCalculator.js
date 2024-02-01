import React from "react";
import "./MortgageCalculator.css";

const MortgageCalculator = () => {

    const [monthlyPayment, setMonthlyPayment] = React.useState(0);

    const savingsRef = React.useRef();
    const numYearsRef = React.useRef();
    const annualInterestRef = React.useRef();
    const houseValueInputRef = React.useRef();

    const handleDecrease = (ref, step) => {
        let currentValue = parseFloat(ref.current.value);
        currentValue = Math.max(currentValue - step, 0);
        if (ref === annualInterestRef) {
            ref.current.value = currentValue.toFixed(2);
        } else (ref.current.value = currentValue) 
    };

    const handleIncrease = (ref, step) => {
        let currentValue = parseFloat(ref.current.value);
        currentValue += step;
        if (ref === annualInterestRef) {
            ref.current.value = currentValue.toFixed(2);
        } else (ref.current.value = currentValue) 
    };

    const getValuesAndCalculateMonthlyPayment = () => {
        const houseValue = parseFloat(houseValueInputRef.current.value);
        const savings = parseFloat(savingsRef.current.value);
        const annualInterest = parseFloat(annualInterestRef.current.value);
        const numYears = parseInt(numYearsRef.current.value, 10);
        const payment = calculateMonthPayment(houseValue, savings, annualInterest, numYears);
        setMonthlyPayment(payment);
    };

    const calculateMonthPayment = (houseValue, savings, annualInterest, numYears) => {
        const numMonths = numYears * 12;
        const annualInterestDecimal = annualInterest / 100;
        const monthlyInterest = annualInterestDecimal / 12;
        const moneyToAsk = houseValue - savings;
        const divider = (1 - Math.pow(1 + monthlyInterest, -numMonths)) / monthlyInterest;
        const monthPayment = moneyToAsk / divider;
        const roundedPayment = (Math.round(monthPayment * 100) / 100).toFixed(2);
        return roundedPayment.replace('.', ',');
    };
    
    return (
        <div className="mortage-calculator">
            <h2>Calculadora de hipotecas</h2>

            {/* valor de la casa */}
            <fieldset className="mortgage-calculator__fieldset">
                <label className="mortgage-calculator__label">Introduce el valor de la casa:</label>
                <div className="mortgage-calculator__item">
                    <button className="mortgage-calculator__button-field" onClick={() => handleDecrease(houseValueInputRef, 5000)}>-</button>
                    <input
                        className="mortgage-calculator__input"
                        ref={houseValueInputRef}
                        defaultValue="300000"
                        type="number"
                        name="houseValue"
                        id="houseValue"
                    />
                    <button className="mortgage-calculator__button-field" onClick={() => handleIncrease(houseValueInputRef, 5000)}>+</button>
                </div>
            </fieldset>

            {/* ahorros aportados */}
            <fieldset className="mortgage-calculator__fieldset">
                <label className="mortgage-calculator__label">Introduce los ahorros aportados:</label>
                <div className="mortgage-calculator__item">
                    <button className="mortgage-calculator__button-field" onClick={() => handleDecrease(savingsRef, 1000)}>-</button>
                    <input 
                        className="mortgage-calculator__input"
                        ref={savingsRef} 
                        defaultValue="30000"
                        type="number" 
                        name="savings" 
                        id="savings" />
                    <button className="mortgage-calculator__button-field" onClick={() => handleIncrease(savingsRef, 1000)}>+</button>
                </div>
            </fieldset>

            {/* plazo en años */}
            <fieldset className="mortgage-calculator__fieldset">
                <label className="mortgage-calculator__label">Introduce el plazo en años:</label>
                <div className="mortgage-calculator__item">
                    <button className="mortgage-calculator__button-field" onClick={() => handleDecrease(numYearsRef, 1)}>-</button>
                    <input 
                        className="mortgage-calculator__input" 
                        ref={numYearsRef} 
                        defaultValue="30"
                        type="number" 
                        name="numYears" 
                        id="numYears" />
                    <button className="mortgage-calculator__button-field" onClick={() => handleIncrease(numYearsRef, 1)}>+</button>
                </div>
            </fieldset>

            {/* interés de la hipoteca (tipo fijo) */}
            <fieldset className="mortgage-calculator__fieldset">
                <label className="mortgage-calculator__label">Introduce el interés de la hipoteca (tipo fijo):</label>
                <div className="mortgage-calculator__item">
                    <button className="mortgage-calculator__button-field" onClick={() => handleDecrease(annualInterestRef, 0.01)}>-</button>
                    <input 
                        className="mortgage-calculator__input" 
                        ref={annualInterestRef} 
                        defaultValue="2.50" 
                        type="number" 
                        name="annualInterest" 
                        id="annualInterest" />
                    <button className="mortgage-calculator__button-field" onClick={() => handleIncrease(annualInterestRef, 0.01)}>+</button>
                </div>
            </fieldset>

            <button className="mortgage-calculator__button-submit" onClick={getValuesAndCalculateMonthlyPayment}>Calcular cuota mensual</button>

            <p>Tu cuota mensual será de: <strong>{monthlyPayment}</strong></p>
        </div>
    );
};

export default MortgageCalculator;
