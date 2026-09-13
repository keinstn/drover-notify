import assert from "node:assert/strict";
import test from "node:test";

import { statusEventFromEnvironment } from "../src/event.mjs";

void test("accepts a blocked status event", () => {
  assert.deepEqual(
    statusEventFromEnvironment({
      HERDR_PLUGIN_EVENT_JSON: JSON.stringify({
        event: "pane_agent_status_changed",
        data: {
          type: "pane_agent_status_changed",
          pane_id: "workspace:pane",
          agent_status: "blocked",
          display_agent: "Claude",
        },
      }),
    }),
    { paneId: "workspace:pane", agentName: "Claude", status: "blocked" },
  );
});

void test("accepts a done status event", () => {
  assert.deepEqual(
    statusEventFromEnvironment({
      HERDR_PLUGIN_EVENT_JSON: JSON.stringify({
        event: "pane_agent_status_changed",
        data: {
          type: "pane_agent_status_changed",
          pane_id: "workspace:pane",
          agent_status: "done",
          display_agent: "Claude",
        },
      }),
    }),
    { paneId: "workspace:pane", agentName: "Claude", status: "done" },
  );
});

void test("ignores non-blocked, non-done status events", () => {
  assert.equal(
    statusEventFromEnvironment({
      HERDR_PLUGIN_EVENT_JSON: JSON.stringify({
        event: "pane_agent_status_changed",
        data: {
          type: "pane_agent_status_changed",
          pane_id: "workspace:pane",
          agent_status: "working",
        },
      }),
    }),
    null,
  );
});
