import fs from "fs";
import path from "path";

// Needs to validate the theme somehow
export async function GET() {
	const themeDir = path.resolve("./static/imgs/themes");
    console.log(themeDir);
	let folders = [];

	try {
		folders = fs
			.readdirSync(themeDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);
	} catch (error) {
		return new Response(JSON.stringify({ error: "Could not list directories" }), { status: 500 });
	}

	return new Response(JSON.stringify(folders), { status: 200 });
}
