const exec = require('child_process').exec;
const util = require('util');

const groups = [
  'japan',
  'america',
  'korea',
  'china',
  'mexico',
  'vietnam',
  'india',
  'thai',
  'taiwan',
  'greece'
];

async function* pushToEachBranch(branches) {
  for (let i = 0; i < branches.length; i++) {
    await util.promisify(exec)(`git push upstream --delete ${branches[i]}`);
    await util.promisify(exec)(`git switch -c ${branches[i]} upstream/main`);
    await util.promisify(exec)(`git push upstream ${branches[i]}`);
    yield branches[i];
  }
}

(async () => {
  for await (let group of pushToEachBranch(groups)) {
    console.log(`Push to ${group}`);
  }
})();