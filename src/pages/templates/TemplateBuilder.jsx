// src/pages/templates/TemplateBuilder.jsx
import React, { useState } from "react";
import {
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCopy,
  FiShare2,
  FiCheck,
  FiGrid,
  FiList,
  FiUser,
  FiUsers,
  FiCalendar,
  FiTag,
  FiHome,
  FiBriefcase,
  FiClipboard,
  FiLayers,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiSliders, // ← Changed from FiRuler to FiSliders
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCw,
} from "react-icons/fi";

const TemplateBuilder = () => {
  const [templateName, setTemplateName] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [measurements, setMeasurements] = useState({});
  const [isShared, setIsShared] = useState(false);
  const [saving, setSaving] = useState(false);

  const garmentTypes = [
    "SHIRT",
    "TROUSER",
    "SUIT",
    "DRESS",
    "SKIRT",
    "KABA",
    "SLIT",
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: API call to save template
      console.log("Saving template:", {
        templateName,
        garmentType,
        measurements,
        isShared,
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error saving template:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="template-builder">
      <div className="template-builder-header">
        <h1>Create Measurement Template</h1>
        <div className="template-builder-actions">
          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            <FiArrowLeft /> Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <FiRefreshCw className="spin" /> : <FiSave />}
            {saving ? "Saving..." : "Save Template"}
          </button>
        </div>
      </div>

      <div className="template-builder-content">
        <div className="template-info">
          <div className="form-group">
            <label className="form-label">Template Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Standard Business Shirt"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Garment Type</label>
            <select
              className="form-input"
              value={garmentType}
              onChange={(e) => setGarmentType(e.target.value)}
            >
              <option value="">Select garment type</option>
              {garmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
              />
              <span>Share this template with other companies</span>
            </label>
          </div>
        </div>

        <div className="measurements-section">
          <h3>Measurement Fields</h3>
          <p className="text-muted">
            {garmentType
              ? `Configure measurements for ${garmentType}`
              : "Select a garment type to see measurement fields"}
          </p>

          {garmentType === "SHIRT" && (
            <ShirtMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
          {garmentType === "TROUSER" && (
            <TrouserMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
          {garmentType === "KABA" && (
            <KabaMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
          {garmentType === "SLIT" && (
            <SlitMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
          {garmentType === "DRESS" && (
            <DressMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
          {garmentType === "SKIRT" && (
            <SkirtMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
          {garmentType === "SUIT" && (
            <SuitMeasurementsForm
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Measurement Forms (you can implement these as needed)
const ShirtMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Neck (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="15.5"
        value={measurements.neck || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, neck: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Chest (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="40"
        value={measurements.chest || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, chest: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="34"
        value={measurements.waist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, waist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Sleeve Length (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="25"
        value={measurements.sleeveLength || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, sleeveLength: e.target.value })
        }
      />
    </div>
  </div>
);

const TrouserMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="34"
        value={measurements.waist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, waist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Inseam (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="32"
        value={measurements.inseam || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, inseam: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Thigh (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="24"
        value={measurements.thigh || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, thigh: e.target.value })
        }
      />
    </div>
  </div>
);

const KabaMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Bust (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="36"
        value={measurements.bust || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, bust: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="28"
        value={measurements.waist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, waist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Kaba Length (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="42"
        value={measurements.kabaLength || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, kabaLength: e.target.value })
        }
      />
    </div>
  </div>
);

const SlitMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="28"
        value={measurements.waist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, waist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Hip (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="38"
        value={measurements.hip || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, hip: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Length (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="36"
        value={measurements.length || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, length: e.target.value })
        }
      />
    </div>
  </div>
);

const DressMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Bust (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="36"
        value={measurements.bust || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, bust: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="28"
        value={measurements.waist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, waist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Hip (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="38"
        value={measurements.hip || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, hip: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Dress Length (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="48"
        value={measurements.dressLength || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, dressLength: e.target.value })
        }
      />
    </div>
  </div>
);

const SkirtMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="28"
        value={measurements.waist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, waist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Hip (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="38"
        value={measurements.hip || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, hip: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Skirt Length (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="22"
        value={measurements.skirtLength || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, skirtLength: e.target.value })
        }
      />
    </div>
  </div>
);

const SuitMeasurementsForm = ({ measurements, setMeasurements }) => (
  <div className="measurements-grid">
    <div className="form-group">
      <label className="form-label">Jacket Chest (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="42"
        value={measurements.jacketChest || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, jacketChest: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Jacket Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="36"
        value={measurements.jacketWaist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, jacketWaist: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label className="form-label">Trouser Waist (inches)</label>
      <input
        type="number"
        step="0.1"
        className="form-input"
        placeholder="34"
        value={measurements.trouserWaist || ""}
        onChange={(e) =>
          setMeasurements({ ...measurements, trouserWaist: e.target.value })
        }
      />
    </div>
  </div>
);

export default TemplateBuilder;
