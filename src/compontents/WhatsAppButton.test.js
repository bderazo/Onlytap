import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect"; // Importamos esto para las expectativas extendidas
import WhatsAppButton from "./WhatsAppButton";

describe("<WhatsAppButton />", () => {
  test("renders the Counter component", () => {
    render(<WhatsAppButton />);
    const boton = screen.getByText(/Solicitar tarjeta física:/i);

    expect(boton).toBeInTheDocument();
  })
});
