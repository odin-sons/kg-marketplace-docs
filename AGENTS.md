# Agent rules

Read [CONTRIBUTING.md](CONTRIBUTING.md) first; it describes the branch, deploy and version-archive flow.

## Updating the docs across several mod versions

When the docs are behind the mod by more than one version, do not update them in one step. Split the update to follow the mod's own releases, so that every released version gets its own docs commit, its own `version/<version>` branch, its own deploy and its own environment.

- Work through the versions in order, oldest first. For each one, take the mod's source at that version's commit (the version number in `Marketplace.cs` and the mod's `CHANGELOG.md`) and document only what that version changed.
- One commit per version, titled `docs: update to mod version <version>`. It also updates `_data/versions.js`, the changelog and the version number quoted in the prose.
- After each commit, cut `version/<version>` at that commit. The tip of `main` is the newest released version.
- Push the `version/*` branches before the commit on `main` that links to them, and check that each archive deploy is live.
- Document a version only from the mod's released state. Code that sits after the last released version in the mod's history is unreleased: keep it off `main` until the version that ships it exists.
- If the mod's history has no commit for an intermediate version, say so in the changelog entry and take the closest earlier commit that contains the change.
