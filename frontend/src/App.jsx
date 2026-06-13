import { useState } from "react";
import "./App.css";

function App() {
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictPrice = async () => {
    setLoading(true);
    setError(null);
    setPrice(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: Number(area),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setPrice(data.predicted_price);
    } catch (err) {
      setError("Failed to connect to the server. Please ensure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">House Price AI</h1>
        <p className="subtitle">Enter details to get an estimated price.</p>

        <div className="input-group">
          <label>Area (sqft)</label>
          <input
            type="number"
            placeholder="e.g. 1500"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Bedrooms</label>
          <input
            type="number"
            placeholder="e.g. 3"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Bathrooms</label>
          <input
            type="number"
            placeholder="e.g. 2"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>

        <button className="predict-btn" onClick={predictPrice} disabled={loading}>
          {loading ? "Calculating..." : "Predict Price"}
        </button>

        {error && <div className="error-msg">{error}</div>}

        {price && (
          <div className="result">
            <h3>Estimated Price</h3>
            <span className="price-tag">₹ {price}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
