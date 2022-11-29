export async function setup({gameData}) {
  await gameData.addPackage('data/package.json');
}