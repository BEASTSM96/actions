const core      = require( '@actions/core' );
const github    = require( '@actions/github' );
const toolcache = require( '@actions/tool-cache' );

var args = process.argv.slice(2);
let premakeVer = "";

function downloadPremake() {
	if ( process.platform === 'win32' ) {
		const fileZip = await toolcache.downloadTool( `https://github.com/premake/premake-core/releases/download/v5.0.0-${premakeVer}/premake-5.0.0-${premakeVer}-windows.zip` );
		await toolcache.extractZip( fileZip, 'tpremake' );
	}
	else if ( process.platform === 'darwin' ) {
		const fileZip = await toolcache.downloadTool( `https://github.com/premake/premake-core/releases/download/v5.0.0-${premakeVer}/premake-5.0.0-${premakeVer}-macosx.tar.gz` );
		await toolcache.extractTar( fileZip, 'tpremake' );
	}
	else {
		const fileZip = await toolcache.downloadTool( `https://github.com/premake/premake-core/releases/download/v5.0.0-${premakeVer}/premake-5.0.0-${premakeVer}-linux.tar.gz` );
		await toolcache.extractTar( fileZip, 'tpremake' );
	}
}

async function main() {

	if( args[0] === "--premake=alpha16" ) {
		premakeVer = "alpha16";
	}
	else if( args[0] === "--premake=beta1" ) {
		premakeVer = "beta1";
	}
	else {
		core.setFailed(`Unvaild command line arg: ${args[0]}, to download a specific version use --premake=alpha16`);
	}

	downloadPremake();

	core.addPath( "tpremake" )
}

main().catch( err => {
	core.setFailed( `Error when downloading premake error: ${err}` )
})