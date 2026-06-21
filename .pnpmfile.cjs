const fs = require("node:fs");
const path = require("node:path");

let localPackages;

function readLinks() {
  try {
    const linkStr = fs.readFileSync(".links.json", "utf-8");
    const links = JSON.parse(linkStr);
    console.log(
      `Read ${Object.keys(links).length} links from .links.json:`,
      Object.keys(links).join(", "),
    );
    return links;
  } catch (error) {
    console.error(error);
  }

  return {};
}

function overrideDependency(deps) {
  if (!deps) {
    return;
  }

  for (const dep in deps) {
    if (!localPackages[dep]) {
      continue;
    }

    const localPath = path.resolve(__dirname, localPackages[dep]);
    console.log(
      `Overriding dependency ${dep} to point to local path ${localPath}`,
    );
    deps[dep] = localPath;
  }
}

function hook(pkg) {
  if (!localPackages) {
    localPackages = readLinks();
  }

  overrideDependency(pkg.dependencies);
  overrideDependency(pkg.devDependencies);

  return pkg;
}

module.exports = {
  hooks: {
    readPackage: (pkg) => hook(pkg),
  },
};
