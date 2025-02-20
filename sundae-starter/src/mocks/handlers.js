import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/image/chocolate.png" },
      { name: "Vanilla", imagePath: "/image/vanilla.png" },
    ]);
  }),
  http.get("http://localhost:3030/toppings", () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/image/cherries.png" },
      { name: "M&Ms", imagePath: "/image/m-and-ms.png" },
      { name: "Hot fudge", imagePath: "/image/hot-fudge.png" },
    ]);
  }),

  // order confirmation
  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: "1234" }, { status: 201 });
  }),
];
