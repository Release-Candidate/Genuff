// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Browser.ts
// Date:     07.Mar.2022
//
// ==============================================================================
/**
 * Draw an error box with the given HTML (as string).
 *
 * @param element The HTML element to append the error box to.
 * @param html The HTML content to display in the error box.
 */
export function errorBox(element: Element, html: string) {
  // eslint-disable-next-line i18next/no-literal-string
  const errorDiv = document.createElement("div");
  ["flex", "flex-col", "h-screen", "justify-center", "items-center"].forEach(
    (c) => errorDiv.classList.add(c)
  );
  // eslint-disable-next-line i18next/no-literal-string
  const textBox = document.createElement("div");
  [
    "text-xl",
    "bg-red-50",
    "border-2",
    "border-red-500",
    "border-solid",
    "rounded",
    "px-4",
    "py-4",
  ].forEach((c) => textBox.classList.add(c));
  textBox.innerHTML = html;
  errorDiv.appendChild(textBox);
  element.appendChild(errorDiv);
}
