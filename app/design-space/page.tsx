import React from "react";
import { BackgroundCanvas } from "../../components/ipb/BackgroundCanvas";
import { UserProfile } from "../../components/ipb/UserProfile";
import "./design.css";

export default function DesignSpacePage() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundCanvas />
      <UserProfile />
    </main>
  );
}
