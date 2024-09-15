'use server';
import { Update } from '@/app/page';
import ncu from 'npm-check-updates';
import semver from 'semver';

type Index<T> = Record<string, T>;

export async function checkPackageUpdates(packageJson: string) {
  if (!packageJson) {
    return { error: 'No se proporcionó package.json' };
  }

  let parsedPackageJson;

  try {
    parsedPackageJson = JSON.parse(packageJson);
  } catch (error) {
    return { error: 'package.json inválido' };
  }

  const upgrades = (await ncu({ packageData: packageJson, upgrade: false, jsonUpgraded: true, })) as Index<string>;

  const dependencies = parsedPackageJson.dependencies || {};
  const devDependencies = parsedPackageJson.devDependencies || {};

  function getUpdateType(currentVersion: string, latestVersion: string): string {
    const current = semver.coerce(currentVersion);
    const latest = semver.coerce(latestVersion);

    if (current && latest && semver.gt(latest, current)) {
      const diff = semver.diff(current, latest);
      return diff || 'unknown';
    }
    return 'up-to-date';
  }

  const updates = Object.entries({ ...dependencies, ...devDependencies }).map(([dep, currentVersion]) => {
  const latestVersion = upgrades[dep];

  if (latestVersion) {
    const updateType = getUpdateType(currentVersion as string, latestVersion);

    return {
      package: dep,
      currentVersion,
      latestVersion,
      updateType,
    };
  }

  return null; 
}).filter(Boolean) as Update[] 


  return { updates };
}
