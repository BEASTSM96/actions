const core      = require( '@actions/core' );
const github    = require( '@actions/github' );
const toolcache = require( '@actions/tool-cache' );

async function main() {
	if ( process.platform === 'win32' ) {
		const fileZip = await tc.downloadTool( 'https://github.com/premake/premake-core/releases/download/v5.0.0-alpha16/premake-5.0.0-alpha16-windows.zip' );
		await tc.extractZip( fileZip, 'tpremake' );
	  }
	  else if ( process.platform === 'darwin' ) {
		const fileZip = await tc.downloadTool( 'https://github.com/premake/premake-core/releases/download/v5.0.0-alpha16/premake-5.0.0-alpha16-macosx.tar.gz' );
		await tc.extractTar( fileZip, 'tpremake' );
	  }
	  else {
		const fileZip = await tc.downloadTool( 'https://github.com/premake/premake-core/releases/download/v5.0.0-alpha16/premake-5.0.0-alpha16-linux.tar.gz' );
		await tc.extractTar( fileZip, 'tpremake' );
	}
	core.addPath( "tpremake" )
}

main().catch( err => {
	core.setFailed( `Error when downloading premake error: ${err}` )
})