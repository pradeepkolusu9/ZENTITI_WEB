import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/common/Button";

describe("Button", () => {
  it("disables itself while loading", () => {
    render(<Button loading>Submit</Button>);

    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });
});
