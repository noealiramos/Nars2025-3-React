import React from "react";

export default function SectionTitle({ title, subtitle, right = null }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}