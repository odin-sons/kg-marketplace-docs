# Player Tags

**File:** `Marketplace/PlayerTags/PlayerTags.cfg` (a single file, created automatically on first server start — note this one lives outside the `Configs/` folder)

Prefixes a player's name in the player list with a custom tag, like `[Admin]` or `[VIP]`.

## Example

`Marketplace/PlayerTags/PlayerTags.cfg`:

```
76561198000000001: [Admin]
76561198000000002: [VIP]
```

## Format

`userID: tag text` — one player per line. The user ID is the player's platform ID (Steam ID, etc.), the same kind of ID used for `OverrideDebug`, `BlockedPlayers`, and `VIPplayersList` in the [server config](../setup/server-config.md).

Keep the tag text free of colons — the line is split on the first `:`, so an extra colon inside the tag will break the line.

## Related

- [Server config](../setup/server-config.md) — other places player IDs are configured.
