const path = require("path");
const fs = require("fs");
require("dotenv").config();

const powerToysFolder = process.env.POWERTOYS_USER_FILE_LOCATION;
const configPath = './configs'

args = process.argv;

// Create the PowerToysTools class
class PowerToysTool {
	constructor(name, path) {
		this.name = name;
		this.path = path;
	}

	backup() {
        console.log(`Starting Backup for ${this.name}...`)
		fs.copyFile(path.join(powerToysFolder, this.path), path.join(configPath, `${this.name}.json`), (err) => {
			if (err) {
				console.error("❌ Copy failed:", err);
			} else {
				console.log("✅ File copied successfully!");
			}
		});
	}

	sync() {
        console.log(`Starting Sync for ${this.name}...`)
		fs.copyFile(path.join(configPath, `${this.name}.json`), path.join(powerToysFolder, this.path), (err) => {
			if (err) {
				console.error("❌ Copy failed:", err);
			} else {
				console.log("✅ File copied successfully!");
			}
		});
	}
}

// Create Class instances
const keybindings = new PowerToysTool('keybindings', path.join('Keyboard Manager', 'default.json'))
const fancyZonesSettings = new PowerToysTool('fancyZonesSettings', path.join('FancyZones', 'settings.json'))
const fancyZonesCustomLayouts = new PowerToysTool('fancyZonesCustomLayouts', path.join('FancyZones', 'custom-layouts.json'))


switch (args[2]) {
    case 'sync':
        console.log('sync method initialized...')
        keybindings.sync();
        fancyZonesCustomLayouts.sync();
        fancyZonesSettings.sync();
        break;
    case 'backup':
        console.log('backup method initialized...')
        keybindings.backup();
        fancyZonesCustomLayouts.backup();
        fancyZonesSettings.backup();
        break;
    default:
        console.log('Unrecognized arguments...\nTRY: node sync.js sync|backup')
        break;
}
