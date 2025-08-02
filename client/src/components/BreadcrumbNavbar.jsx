import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BreadcrumbNavbar = ({ customLabels = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const fullPath = "/" + pathSegments.slice(0, index + 1).join("/");

    // Label from full path or fallback to segment
    const label =
      customLabels[fullPath] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);

    return { label, path: fullPath };
  });

  return (
    <div className="w-full bg-white px-6 py-3 border-b border-gray-200 rounded-2xl shadow sticky top-0 z-20">
      <nav className="text-sm text-gray-600 font-medium flex gap-1 flex-wrap">
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Dashboard
        </span>
        {breadcrumbs.map((crumb, idx) => (
          <span key={idx} className="flex items-center gap-1">
            <span className="text-gray-400">›</span>
            <span
              onClick={() => navigate(crumb.path)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>
    </div>
  );
};

export default BreadcrumbNavbar;
