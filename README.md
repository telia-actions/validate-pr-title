# Validate PR title

## Description

This GitHub Action validates the title of a pull request to ensure it meets specified prefix requirements.

## Inputs

### `githubToken`

**Required**: `true`

Description: GitHub token.

### `prTitlePrefix`

**Required**: `true`

Description: Can be in any of these formats:
- `'feat:'` - single prefix
- `'feat:, fix:'` - multiple prefixes

### `caseSensetive`

**Required**: `false`

Description: Case sensitive check. Defaults to `false`.

## Usage

```yaml
name: Validate PR Title

on:
  pull_request:
    types: [opened, reopened, edited, synchronize]

concurrency:
  group: ${{ github.workflow }}-${{ github.event.number }}
  cancel-in-progress: true

jobs:
  validate-pr-title:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Validate PR title
        uses: telia-actions/validate-pr-title@v1
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          prTitlePrefix: 'feat:, fix:'
          caseSensetive: false