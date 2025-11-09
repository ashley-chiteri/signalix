import { toast } from "sonner";
import { CheckCircle, XCircle, Info } from "lucide-react";
import React from "react";

export type ToastType = "success" | "error" | "info";

const ACCENT_COLOR = "#A087FF";
const BG_COLOR = "#1f2937"; // Tailwind bg-gray-800

// 🧩 Enhanced Toast Utility
export const showToast = (
  type: ToastType,
  title: string,
  description?: string
) => {
  const baseStyle = {
    border: `1px solid ${ACCENT_COLOR}`,
    background: BG_COLOR,
    color: "#fff",
    padding: "16px 18px",
    borderRadius: "12px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "300px",
  };

  const renderContent = (icon: React.ReactNode) => (
    <div className="flex items-start gap-3">
      {icon}
      <div className="flex flex-col text-left">
        <span className="font-semibold text-gray-100">{title}</span>
        {description && (
          <span className="text-sm text-gray-400 mt-0.5">{description}</span>
        )}
      </div>
    </div>
  );

  switch (type) {
    case "success":
      toast(renderContent(<CheckCircle size={22} color={ACCENT_COLOR} />), {
        style: baseStyle,
      });
      break;

    case "error":
      toast(renderContent(<XCircle size={22} color="#ff6b6b" />), {
        style: { ...baseStyle, border: "1px solid #ff6b6b" },
      });
      break;

    case "info":
    default:
      toast(renderContent(<Info size={22} color={ACCENT_COLOR} />), {
        style: baseStyle,
      });
      break;
  }
};
