import React from "react";

function CoinInfoCard() {
  return (
    <div className="flex items-center mb-4">
      {icon && (
        <FontAwesomeIcon icon={icon} className="text-xl mr-4 text-gray-500" />
      )}
      <div className="text-lg flex-1">{subtitle}</div>
      <div className="font-bold text-xl">{value}</div>
    </div>
  );
}

export default CoinInfoCard;
