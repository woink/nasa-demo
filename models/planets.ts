import { join, BufReader, parse, pick } from '../deps.ts';

type Planet = Record<string, string>

let planets: Array<Planet>

export function filterHabitablePlanets(planets: Array<Planet>) {
	return planets.filter((planet) => {
		const plantaryRadius = Number(planet['koi_prad']);
		const stellerRadius = Number(planet['koi_srad']);
		const stellerMass = Number(planet['koi_smass']);

		return (
			planet['koi_disposition'] === 'CONFIRMED' &&
			plantaryRadius > 0.5 &&
			plantaryRadius < 1.5 &&
			stellerMass > 0.78 &&
			stellerMass < 1.04 &&
			stellerRadius > 0.99 &&
			stellerRadius < 1.01
		);
	});
}

async function loadPlanetData() {
	const path = join('./data/', 'kepler_exoplanets_nasa.csv');

	const file = await Deno.open(path);

	const bufReader = new BufReader(file);

	const result = await parse(bufReader, {
		skipFirstRow: true,
		comment: '#',
	});

	Deno.close(file.rid);

	const planets = filterHabitablePlanets(result as Array<Planet>)

	return planets.map((planet) => {
		return pick(planet, [
			"kepler_name",
			"koi_prad",
			"koi_smass",
			"koi_srad",
			"koi_count",
			"koi_steff"
		])
	});
}

planets = await loadPlanetData();

export function getAll() {
	return planets
}