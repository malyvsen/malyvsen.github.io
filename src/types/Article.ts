import type React from "react";

export interface Article {
  id: string;
  title: string;
  content: React.ReactNode;
  footer?: React.ComponentType;
}
