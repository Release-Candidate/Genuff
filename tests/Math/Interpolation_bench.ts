// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2022 Roland Csaszar
//
// Project:  Genuff
// File:     Interpolation_bench.ts
// Date:     05.Mar.2022
//
// ==============================================================================
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable chai-friendly/no-unused-expressions */
/* eslint-disable i18next/no-literal-string */

import * as b from "benny";
import { AitkenInterpolation } from "../../src/Math/AitkenInterpolation";
import { KroghIIInterpolation } from "../../src/Math/KroghIIInterpolation";
import { KroghIInterpolation } from "../../src/Math/KroghIInterpolation";
import { LagrangeInterpolation } from "../../src/Math/LagrangeInterpolation";
import { LinearInterpolation } from "../../src/Math/LinearInterpolation";
import { NevilleInterpolation } from "../../src/Math/NevilleInterpolation";

// X values to evaluate the interpolation function on.
const xArr = [...Array(2000).keys()].map((e) => 0.005 * e);

// -10 + 11x - x^2 =============================================================
const points1: Array<[number, number]> = [
  [1, 0],
  [10, 0],
  [5.5, 81 / 4],
];
const linear1 = new LinearInterpolation(points1);
const aitken1 = new AitkenInterpolation(points1);
const neville1 = new NevilleInterpolation(points1);
const lagrange1 = new LagrangeInterpolation(points1);
const kroghI1 = new KroghIInterpolation(points1);
const kroghII1 = new KroghIIInterpolation(points1);

// x^3 - 16 x^2 + 73 x - 90 ====================================================
const points2: Array<[number, number]> = [
  [0, -90],
  [2, 0],
  [5, 0],
  [9, 0],
];
const linear2 = new LinearInterpolation(points2);
const aitken2 = new AitkenInterpolation(points2);
const neville2 = new NevilleInterpolation(points2);
const lagrange2 = new LagrangeInterpolation(points2);
const kroghI2 = new KroghIInterpolation(points2);
const kroghII2 = new KroghIIInterpolation(points2);

// sin x
const points3: Array<[number, number]> = [
  [0, 0],
  [Math.PI / 2, 1],
  [Math.PI, 0],
  [1.5 * Math.PI, -1],
  [2 * Math.PI, 0],
  [3 * Math.PI, 0],
  [4 * Math.PI, 0],
];
const linear3 = new LinearInterpolation(points3);
const aitken3 = new AitkenInterpolation(points3);
const neville3 = new NevilleInterpolation(points3);
const lagrange3 = new LagrangeInterpolation(points3);
const kroghI3 = new KroghIInterpolation(points3);
const kroghII3 = new KroghIIInterpolation(points3);

// (x-1)(x-2)(x-3)(x-4)(x-5)(x-6)(x-7)(x-8)(x-9)(x-10)
const points4: Array<[number, number]> = [
  [0, 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [10, 0],
];
const linear4 = new LinearInterpolation(points4);
const aitken4 = new AitkenInterpolation(points4);
const neville4 = new NevilleInterpolation(points4);
const lagrange4 = new LagrangeInterpolation(points4);
const kroghI4 = new KroghIInterpolation(points4);
const kroghII4 = new KroghIIInterpolation(points4);

// |x - 4|
const points5: Array<[number, number]> = [
  [0, 4],
  [2, 2],
  [4, 0],
  [6, 2],
  [8, 4],
  [10, 6],
];
const linear5 = new LinearInterpolation(points5);
const aitken5 = new AitkenInterpolation(points5);
const neville5 = new NevilleInterpolation(points5);
const lagrange5 = new LagrangeInterpolation(points5);
const kroghI5 = new KroghIInterpolation(points5);
const kroghII5 = new KroghIIInterpolation(points5);

// |x - 4|
const points6: Array<[number, number]> = [
  [0, 4],
  [1, 3],
  [2, 2],
  [3, 1],
  [4, 0],
  [5, 1],
  [6, 2],
  [7, 3],
  [8, 4],
  [9, 5],
  [10, 6],
  [11, 7],
  [12, 8],
];
const linear6 = new LinearInterpolation(points6);
const aitken6 = new AitkenInterpolation(points6);
const neville6 = new NevilleInterpolation(points6);
const lagrange6 = new LagrangeInterpolation(points6);
const kroghI6 = new KroghIInterpolation(points6);
const kroghII6 = new KroghIIInterpolation(points6);

// |x - 4|
const points7: Array<[number, number]> = [
  [-1, 5],
  [0, 4],
  [0.5, 3.5],
  [1, 3],
  [1.5, 2.5],
  [2, 2],
  [2.5, 1.5],
  [3, 1],
  [3.5, 0.5],
  [4, 0],
  [4.5, 0.5],
  [5, 1],
  [5.5, 1.5],
  [6, 2],
  [6.5, 2.5],
  [7, 3],
  [7.5, 3.5],
  [8, 4],
  [8.5, 4.5],
  [9, 5],
  [9.5, 5.5],
  [10, 6],
  [10.5, 6.5],
  [11, 7],
  [11.5, 7.5],
  [12, 8],
  [14, 10],
];
const linear7 = new LinearInterpolation(points7);
const aitken7 = new AitkenInterpolation(points7);
const neville7 = new NevilleInterpolation(points7);
const lagrange7 = new LagrangeInterpolation(points7);
const kroghI7 = new KroghIInterpolation(points7);
const kroghII7 = new KroghIIInterpolation(points7);

// ln(1 + x)
const points8: Array<[number, number]> = [
  [0, Math.log(1)],
  [2, Math.log(1 + 2)],
  [5, Math.log(1 + 5)],
  [6, Math.log(1 + 6)],
  [8, Math.log(1 + 8)],
  [10, Math.log(1 + 10)],
];
const linear8 = new LinearInterpolation(points8);
const aitken8 = new AitkenInterpolation(points8);
const neville8 = new NevilleInterpolation(points8);
const lagrange8 = new LagrangeInterpolation(points8);
const kroghI8 = new KroghIInterpolation(points8);
const kroghII8 = new KroghIIInterpolation(points8);

// ln(1 + x)
const points9: Array<[number, number]> = [
  [0, Math.log(1)],
  [1, Math.log(1 + 1)],
  [2, Math.log(1 + 2)],
  [3, Math.log(1 + 3)],
  [4, Math.log(1 + 4)],
  [5, Math.log(1 + 5)],
  [6, Math.log(1 + 6)],
  [7, Math.log(1 + 7)],
  [8, Math.log(1 + 8)],
  [9, Math.log(1 + 9)],
  [10, Math.log(1 + 10)],
];
const linear9 = new LinearInterpolation(points9);
const aitken9 = new AitkenInterpolation(points9);
const neville9 = new NevilleInterpolation(points9);
const lagrange9 = new LagrangeInterpolation(points9);
const kroghI9 = new KroghIInterpolation(points9);
const kroghII9 = new KroghIIInterpolation(points9);

// ln(1 + x)
const points10: Array<[number, number]> = [
  [0, Math.log(1)],
  [0.5, Math.log(1.5)],
  [1, Math.log(1 + 1)],
  [1.5, Math.log(1 + 1.5)],
  [2, Math.log(1 + 2)],
  [2.5, Math.log(1 + 2.5)],
  [3, Math.log(1 + 3)],
  [3.5, Math.log(1 + 3.5)],
  [4, Math.log(1 + 4)],
  [4.5, Math.log(1 + 4.5)],
  [5, Math.log(1 + 5)],
  [5.5, Math.log(1 + 5.5)],
  [6, Math.log(1 + 6)],
  [6.5, Math.log(1 + 6.5)],
  [7, Math.log(1 + 7)],
  [7.5, Math.log(1 + 7.5)],
  [8, Math.log(1 + 8)],
  [8.5, Math.log(1 + 8.5)],
  [9, Math.log(1 + 9)],
  [9.5, Math.log(1 + 9.5)],
  [10, Math.log(1 + 10)],
];
const linear10 = new LinearInterpolation(points10);
const aitken10 = new AitkenInterpolation(points10);
const neville10 = new NevilleInterpolation(points10);
const lagrange10 = new LagrangeInterpolation(points10);
const kroghI10 = new KroghIInterpolation(points10);
const kroghII10 = new KroghIIInterpolation(points10);

module.exports = b.suite(
  `Interpolation Benchmark, -10 + 11x - x^2, 3 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear1.f(x))),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken1.f(x))),
  b.add("Neville Interpolation", () => xArr.map((x) => neville1.f(x))),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI1.f(x))),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII1.f(x))),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange1.f(x))),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation1", format: "csv", details: false }),
  b.save({ file: "interpolation1", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark x^3 - 16 x^2 + 73 x - 90, 4 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear2.f(x))),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken2.f(x))),
  b.add("Neville Interpolation", () => xArr.map((x) => neville2.f(x))),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI2.f(x))),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII2.f(x))),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange2.f(x))),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation2", format: "csv", details: false }),
  b.save({ file: "interpolation2", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark sin x, 7 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear3.f(x))),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken3.f(x))),
  b.add("Neville Interpolation", () => xArr.map((x) => neville3.f(x))),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI3.f(x))),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII3.f(x))),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange3.f(x))),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation3", format: "csv", details: false }),
  b.save({ file: "interpolation3", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark (x-1)(x-2)(x-3)(x-4)(x-5)(x-6)(x-7)(x-8)(x-9)(x-10), 11 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear4.f(x))),
  b.add("Linear Interpolation, evenly spaced", () =>
    xArr.map((x) => linear4.fEvenlyGrid(x))
  ),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken4.f(x))),
  b.add("Aitken Interpolation evenly spaced", () =>
    xArr.map((x) => aitken4.fEvenlyGrid(x))
  ),
  b.add("Neville Interpolation", () => xArr.map((x) => neville4.f(x))),
  b.add("Neville Interpolation, evenly spaced", () =>
    xArr.map((x) => neville4.fEvenlyGrid(x))
  ),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI4.f(x))),
  b.add("Krogh I Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghI4.fEvenlyGrid(x))
  ),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII4.f(x))),
  b.add("Krogh II Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghII4.fEvenlyGrid(x))
  ),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange4.f(x))),
  b.add("Lagrange Interpolation, evenly spaced", () =>
    xArr.map((x) => lagrange4.fEvenlyGrid(x))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation4", format: "csv", details: false }),
  b.save({ file: "interpolation4", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark |x - 4|, 6 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear5.f(x))),
  b.add("Linear Interpolation, evenly spaced", () =>
    xArr.map((x) => linear5.fEvenlyGrid(x))
  ),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken5.f(x))),
  b.add("Aitken Interpolation, evenly spaced", () =>
    xArr.map((x) => aitken5.fEvenlyGrid(x))
  ),
  b.add("Neville Interpolation", () => xArr.map((x) => neville5.f(x))),
  b.add("Neville Interpolation, evenly spaced", () =>
    xArr.map((x) => neville5.fEvenlyGrid(x))
  ),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI5.f(x))),
  b.add("Krogh I Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghI5.fEvenlyGrid(x))
  ),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII5.f(x))),
  b.add("Krogh II Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghII5.fEvenlyGrid(x))
  ),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange5.f(x))),
  b.add("Lagrange Interpolation, evenly spaced", () =>
    xArr.map((x) => lagrange5.fEvenlyGrid(x))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation5", format: "csv", details: false }),
  b.save({ file: "interpolation5", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark |x - 4|, 13 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear6.f(x))),
  b.add("Linear Interpolation, evenly spaced", () =>
    xArr.map((x) => linear6.fEvenlyGrid(x))
  ),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken6.f(x))),
  b.add("Aitken Interpolation evenly spaced", () =>
    xArr.map((x) => aitken6.fEvenlyGrid(x))
  ),
  b.add("Neville Interpolation", () => xArr.map((x) => neville6.f(x))),
  b.add("Neville Interpolation, evenly spaced", () =>
    xArr.map((x) => neville6.fEvenlyGrid(x))
  ),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI6.f(x))),
  b.add("Krogh I Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghI6.fEvenlyGrid(x))
  ),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII6.f(x))),
  b.add("Krogh II Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghII6.fEvenlyGrid(x))
  ),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange6.f(x))),
  b.add("Lagrange Interpolation, evenly spaced", () =>
    xArr.map((x) => lagrange6.fEvenlyGrid(x))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation6", format: "csv", details: false }),
  b.save({ file: "interpolation6", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark |x - 4|, 27 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear7.f(x))),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken7.f(x))),
  b.add("Neville Interpolation", () => xArr.map((x) => neville7.f(x))),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI7.f(x))),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII7.f(x))),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange7.f(x))),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation7", format: "csv", details: false }),
  b.save({ file: "interpolation7", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark ln(1 + x), 6 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear8.f(x))),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken8.f(x))),
  b.add("Neville Interpolation", () => xArr.map((x) => neville8.f(x))),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI8.f(x))),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII8.f(x))),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange8.f(x))),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation8", format: "csv", details: false }),
  b.save({ file: "interpolation8", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark ln(1 + x), 11 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear9.f(x))),
  b.add("Linear Interpolation, evenly spaced", () =>
    xArr.map((x) => linear9.fEvenlyGrid(x))
  ),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken9.f(x))),
  b.add("Aitken Interpolation evenly spaced", () =>
    xArr.map((x) => aitken9.fEvenlyGrid(x))
  ),
  b.add("Neville Interpolation", () => xArr.map((x) => neville9.f(x))),
  b.add("Neville Interpolation, evenly spaced", () =>
    xArr.map((x) => neville9.fEvenlyGrid(x))
  ),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI9.f(x))),
  b.add("Krogh I Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghI9.fEvenlyGrid(x))
  ),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII9.f(x))),
  b.add("Krogh II Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghII9.fEvenlyGrid(x))
  ),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange9.f(x))),
  b.add("Lagrange Interpolation, evenly spaced", () =>
    xArr.map((x) => lagrange9.fEvenlyGrid(x))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation9", format: "csv", details: false }),
  b.save({ file: "interpolation9", format: "chart.html", details: true })
);
module.exports = b.suite(
  `Interpolation Benchmark ln(1 + x), 21 points`,
  b.add("Linear Interpolation", () => xArr.map((x) => linear10.f(x))),
  b.add("Linear Interpolation, evenly spaced", () =>
    xArr.map((x) => linear10.fEvenlyGrid(x))
  ),
  b.add("Aitken Interpolation", () => xArr.map((x) => aitken10.f(x))),
  b.add("Aitken Interpolation, evenly spaced", () =>
    xArr.map((x) => aitken10.fEvenlyGrid(x))
  ),
  b.add("Neville Interpolation", () => xArr.map((x) => neville10.f(x))),
  b.add("Neville Interpolation, evenly spaced", () =>
    xArr.map((x) => neville10.fEvenlyGrid(x))
  ),
  b.add("Krogh I Interpolation", () => xArr.map((x) => kroghI10.f(x))),
  b.add("Krogh I Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghI10.fEvenlyGrid(x))
  ),
  b.add("Krogh II Interpolation", () => xArr.map((x) => kroghII10.f(x))),
  b.add("Krogh II Interpolation, evenly spaced", () =>
    xArr.map((x) => kroghII10.fEvenlyGrid(x))
  ),
  b.add("Lagrange Interpolation", () => xArr.map((x) => lagrange10.f(x))),
  b.add("Lagrange Interpolation, evenly spaced", () =>
    xArr.map((x) => lagrange10.fEvenlyGrid(x))
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: "interpolation10", format: "csv", details: false }),
  b.save({ file: "interpolation10", format: "chart.html", details: true })
);
