import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

test("handles error for scoops and toppigns routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<OrderEntry />);

  // we expect these alerts to be there asynchronously because they
  // are not going to appear until we hit that CATCH function on axios
  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
