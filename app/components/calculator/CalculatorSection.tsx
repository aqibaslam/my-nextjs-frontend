'use client';
import { useState } from 'react';
import './calculator.css';

interface CalculatorSectionProps {
  calculator_title: string;
  the_number_heading: string;
  fint_out_heading: string;
  left_title: string;
  left_desc: string;
  monthly_heading: string;
  average_heading: string;
  current_conversion_heading: string;
  current_monthly_heading: string;
  right_title: string;
  right_description: string;
  new_conversion_heading: string;
  extra_revenue_heading: string;
  last_desc: string;
  calculator_cta: string;
  calculator_cta_url: string;
}

function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function formatCurrency(num: number) {
  return '$' + formatNumber(Math.round(num));
}
function updateSliderFill(el: HTMLInputElement) {
  const min = parseFloat(el.min);
  const max = parseFloat(el.max);
  const val = parseFloat(el.value);
  const pct = ((val - min) / (max - min)) * 100;
  el.style.background = `linear-gradient(to right, #FF462E 0%, #FF462E ${pct}%, #e0e0e0 ${pct}%, #e0e0e0 100%)`;
}

export default function CalculatorSection({
  calculator_title, the_number_heading, fint_out_heading,
  left_title, left_desc, monthly_heading, average_heading,
  current_conversion_heading, current_monthly_heading,
  right_title, right_description, new_conversion_heading,
  extra_revenue_heading, last_desc, calculator_cta, calculator_cta_url,
}: CalculatorSectionProps) {
  const [visitors, setVisitors] = useState(0);
  const [orderValue, setOrderValue] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionIncrease, setConversionIncrease] = useState(0);

  const currentRevenue = visitors * (conversionRate / 100) * orderValue;
  const newConversionRate = conversionRate * (1 + conversionIncrease / 100);
  const newRevenue = visitors * (newConversionRate / 100) * orderValue;
  const extraMonthly = newRevenue - currentRevenue;
  const extraYearly = extraMonthly * 12;

  return (
    <section className="roi-calculator">
      <div className="page-width">
        <div className="container">
          <div className="header">
            <h1>{calculator_title}</h1>
            <div
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: the_number_heading }}
            />
            <p className="description">{fint_out_heading}</p>
          </div>
          <div className="calculator-grid">
            {/* Left */}
            <div className="section">
              <h2 className="section-title">{left_title}</h2>
              <p className="section-subtitle">{left_desc}</p>
              <div className="input-group">
                <div className="input-label">
                  <label>{monthly_heading}</label>
                  <span className="value">{formatNumber(visitors)}</span>
                </div>
                <input type="range" min="0" max="100000" step="1000" value={visitors}
                  onChange={(e) => { setVisitors(+e.target.value); updateSliderFill(e.target); }} />
              </div>
              <div className="input-group">
                <div className="input-label">
                  <label>{average_heading}</label>
                  <span className="value">{formatCurrency(orderValue)}</span>
                </div>
                <input type="range" min="0" max="500" step="5" value={orderValue}
                  onChange={(e) => { setOrderValue(+e.target.value); updateSliderFill(e.target); }} />
              </div>
              <div className="input-group">
                <div className="input-label">
                  <label>{current_conversion_heading}</label>
                  <span className="value">{conversionRate.toFixed(1)}%</span>
                </div>
                <input type="range" min="0" max="10" step="0.1" value={conversionRate}
                  onChange={(e) => { setConversionRate(+e.target.value); updateSliderFill(e.target); }} />
              </div>
              <div className="revenue-box">
                <div className="revenue-label">{current_monthly_heading}</div>
                <div className="revenue-amount">{formatCurrency(currentRevenue)}</div>
              </div>
            </div>
            {/* Right */}
            <div className="section right-sec">
              <div className="main-top-section">
                <h2 className="section-title">{right_title}</h2>
                <div className="input-group">
                  <div className="input-label">
                    <label>{right_description}</label>
                    <span className="value">{conversionIncrease}%</span>
                  </div>
                  <input type="range" min="0" max="100" step="1" value={conversionIncrease}
                    onChange={(e) => { setConversionIncrease(+e.target.value); updateSliderFill(e.target); }} />
                </div>
                <div className="input-group">
                  <div className="input-label">
                    <label>{new_conversion_heading}</label>
                    <span className="value">{newConversionRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="main-bootm-sec">
                <div className="extra-revenue-box">
                  <div className="extra-revenue-title">{extra_revenue_heading}</div>
                  <div className="revenue-values">
                    <div className="revenue-item">
                      <div className="revenue-item-amount">{formatCurrency(extraMonthly)}</div>
                      <div className="revenue-item-period">/month</div>
                    </div>
                    <div className="revenue-item">
                      <div className="revenue-item-amount">{formatCurrency(extraYearly)}</div>
                      <div className="revenue-item-period">/year</div>
                    </div>
                  </div>
                  <div className="extra-revenue-note">{last_desc}</div>
                </div>
              </div>
            </div>
          </div>
          <a href={calculator_cta_url} className="cta-button">
            {calculator_cta}
            <img className="cta-btn-image" src="https://convertt.co/wp-content/uploads/2026/02/Arrow-Placeholder-1.svg" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}