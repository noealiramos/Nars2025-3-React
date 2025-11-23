import Button from "../../common/Button";
import "./SummarySection.css";

export default function SummarySection({
  title,
  selected,
  summaryContent,
  isExpanded,
  onToggle,
  children,
}) {
  return (
    <div className={`summary-section ${isExpanded ? "expanded" : ""}`}>
      <div className="summary-header" onClick={onToggle}>
        <div className="summary-title">
          <h3>{title}</h3>
          {!isExpanded && selected && (
            <div className="summary-content">
              {summaryContent}
              <Button variant="text" size="small">
                Cambiar
              </Button>
            </div>
          )}
          {!isExpanded && <div className="summary-badge">✓</div>}
        </div>
        {isExpanded && (
          <div className="summary-expanded-content">{children}</div>
        )}
      </div>
    </div>
  );
}
