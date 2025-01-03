const core      = require( '@actions/core' );
const github    = require( '@actions/github' );
const toolcache = require( '@actions/tool-cache' );

async function downloadPremake() {
	if ( process.platform === 'win32' ) {
		const fileZip = await toolcache.downloadTool( `https://github.com/premake/premake-core/releases/download/v5.0.0-beta4/premake-5.0.0-beta4-windows.zip` );
		await toolcache.extractZip( fileZip, 'tpremake' );
	}
	else if ( process.platform === 'darwin' ) {
		const fileZip = await toolcache.downloadTool( `https://github.com/premake/premake-core/releases/download/v5.0.0-beta4/premake-5.0.0-beta4-macosx.tar.gz` );
		await toolcache.extractTar( fileZip, 'tpremake' );
	}
	else {
		const fileZip = await toolcache.downloadTool( `https://github.com/premake/premake-core/releases/download/v5.0.0-beta4/premake-5.0.0-beta4-linux.tar.gz` );
		await toolcache.extractTar( fileZip, 'tpremake' );
	}
}

async function main() {
	core.addPath( "tpremake" );

	downloadPremake();
}

main().catch( err => {
	core.setFailed( `Error when downloading premake error: ${err}` )
})