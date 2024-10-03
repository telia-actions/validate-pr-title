import { context } from '@actions/github';
import { getInput, info, setFailed } from '@actions/core';
import { lint } from './lib/lint';

export const run = async (): Promise<void> => {
  const title = context.payload.pull_request?.title;

  info(
    `🔎 Checking if the title of this PR "${title}" meets the requirements ...`,
  );

  if (!title) {
    setFailed(`❌ Could not find the title of this PR`);
    return;
  }

  if (!getInput('prTitlePrefix')) {
    setFailed(`❌ The prefix is required`);
    return;
  }

  const isValid = lint(
    title,
    getInput('prTitlePrefix'),
    getInput('caseSensetive') === ''
      ? false
      : Boolean(getInput('caseSensetive')),
  );
  if (!isValid) {
    setFailed(`❌ The title of this PR does not meet the requirements`);
  } else {
    info(`✔️ All good`);
  }
};
