import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    production_volume: '',
    production_cost: '',
    defect_rate: '',
    quality_score: '',
    maintenance_hours: '',
    stockout_rate: '',
    energy_efficiency: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://machin-learning-project-2lnv.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          production_volume: Number(formData.production_volume),
          production_cost: Number(formData.production_cost),
          defect_rate: Number(formData.defect_rate),
          quality_score: Number(formData.quality_score),
          maintenance_hours: Number(formData.maintenance_hours),
          stockout_rate: Number(formData.stockout_rate),
          energy_efficiency: Number(formData.energy_efficiency)
        })
      });

      if (!response.ok) {
        throw new Error('Prediction service returned an error');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the prediction backend. Please check the deployed API URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard page">
      <div className="container">
        <header className="dashboard-header">
          <h1>Prediction Dashboard</h1>
          <p>Enter machinery parameters and evaluate defect risk in seconds.</p>
        </header>

        <form className="prediction-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="production_volume">Production Volume</label>
              <small className="input-desc">Total number of units produced in a cycle</small>
              <input
                type="number"
                id="production_volume"
                name="production_volume"
                value={formData.production_volume}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="production_cost">Production Cost</label>
              <small className="input-desc">Total cost incurred during production</small>
              <input
                type="number"
                id="production_cost"
                name="production_cost"
                value={formData.production_cost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="defect_rate">Defect Rate (%)</label>
              <small className="input-desc">Percentage of defective items produced</small>
              <input
                type="number"
                step="0.1"
                id="defect_rate"
                name="defect_rate"
                value={formData.defect_rate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quality_score">Quality Score</label>
              <small className="input-desc">Overall quality rating (0–100)</small>
              <input
                type="number"
                step="0.1"
                id="quality_score"
                name="quality_score"
                value={formData.quality_score}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="maintenance_hours">Maintenance Hours</label>
              <small className="input-desc">Time spent on machine maintenance</small>
              <input
                type="number"
                step="0.1"
                id="maintenance_hours"
                name="maintenance_hours"
                value={formData.maintenance_hours}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stockout_rate">Stockout Rate (%)</label>
              <small className="input-desc">Frequency of inventory shortages</small>
              <input
                type="number"
                step="0.1"
                id="stockout_rate"
                name="stockout_rate"
                value={formData.stockout_rate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="energy_efficiency">Energy Efficiency</label>
              <small className="input-desc">Efficiency of energy usage (0–1)</small>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                id="energy_efficiency"
                name="energy_efficiency"
                value={formData.energy_efficiency}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn-submit" type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Defect'}
          </button>
        </form>

        {error && <div className="notification error">{error}</div>}

        {result && (
          <section className={`result-card ${result.prediction === 'Defective' ? 'defective' : 'non-defective'}`}>
            <h2>Prediction Result</h2>
            <p><strong>Prediction:</strong> {result.prediction}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
            {result.random_factor !== undefined && (
              <p><strong>Live Variation Factor:</strong> {result.random_factor >= 0 ? '+' : ''}{result.random_factor.toFixed(3)}</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default Dashboard;