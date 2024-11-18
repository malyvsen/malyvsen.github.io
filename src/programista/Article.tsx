import React from "react";

export default interface Article {
  id: string;
  title: string;
  content: React.ReactNode;
  hasFooter: boolean;
}
