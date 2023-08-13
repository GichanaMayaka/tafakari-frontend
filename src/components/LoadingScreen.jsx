import React from "react";
import { LoadingOverlay } from "@mantine/core";

export default function LoadingScreen({ isLoading }) {
  return (
    <LoadingOverlay
      visible={isLoading}
      overlayBlur={1}
      loaderProps={{ size: "xl", color: "yellow", variant: "oval" }}
    />
  );
}
