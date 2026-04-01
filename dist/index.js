// src/github-action.ts
import { getInput, info, setFailed } from '@actions/core';

// src/lib/lint.ts
function lint(title, prefix, caseSensetive) {
  if (!title || !prefix) {
    return false;
  }
  if (!caseSensetive) {
    title = title.toLowerCase();
    prefix = prefix.toLowerCase();
  }
  if (prefix.includes(',')) {
    const prefixes = prefix.split(',');
    for (const p of prefixes) {
      if (title.startsWith(p.trim())) {
        return true;
      }
    }
    return false;
  }
  return title.startsWith(prefix.trim());
}

// src/lib/util.ts
function stringToBoolean(value) {
  return value.toLowerCase() === 'true';
}

// src/github-action.ts
import { context } from '@actions/github';
var run = async () => {
  const title = context.payload.pull_request?.title;
  info(`\u{1F50E} Checking if the title of this PR "${title}" meets the requirements ...`);
  if (!title) {
    setFailed(`\u274C Could not find the title of this PR`);
    return;
  }
  if (!getInput('prTitlePrefix')) {
    setFailed(`\u274C The prefix is required`);
    return;
  }
  const isValid = lint(
    title,
    getInput('prTitlePrefix'),
    getInput('caseSensetive') === '' ? false : stringToBoolean(getInput('caseSensetive')),
  );
  if (!isValid) {
    setFailed(`\u274C The title of this PR does not meet the requirements`);
  } else {
    info(`\u2714\uFE0F All good`);
  }
};

// src/index.ts
run();
