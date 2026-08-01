# drover-notify

A Herdr plugin (id `drover.notify`) that sends a push notification to the
[Drover](https://github.com/keinstn/drover) iOS app
when an agent in a Herdr pane becomes blocked. It listens for `pane.agent_status_changed`
events and notifies only on the `blocked` status — it does not send anything for `done`
events.

## Requirements

- Herdr 0.7.0+ (native Windows support is preview/beta)
- Node.js 18+

The plugin has zero npm dependencies (only Node built-ins), so it needs no `npm install`
step on the host.

## Install

```sh
herdr plugin install keinstn/drover-notify
```

Or clone and link it manually:

```sh
git clone https://github.com/keinstn/drover-notify.git
herdr plugin link /path/to/drover-notify
```

## Pairing

Pairing is normally driven from the Drover app: open host settings and choose
"Create notification pairing code". For the manual pairing path on the host, run
`node bin/setup.mjs` (interactive) or `node bin/pair.mjs` (reads the pairing code from
stdin). Invoking them through `node` works on every platform; the `./bin/setup.mjs`
shebang form is Unix-only.

Pairing writes the config file with POSIX mode 0600 on Linux and macOS. On Windows those
permission bits do not apply, and the file is protected by the `%APPDATA%` user-profile
ACL instead.

See [`docs/push-notifications.md`](https://github.com/keinstn/drover/blob/main/docs/push-notifications.md)
in the `drover` repo for the full pairing and notification flow.

## License

MIT — see [`LICENSE`](LICENSE).
