import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import {defineConfig, loadEnv} from 'vite';

export default ({mode}) => {
	const env = loadEnv(mode, process.cwd());

	return defineConfig({
		plugins: [react(), svgr(), tsconfigPaths()],
		server: {
			proxy: {
				'/api': {
					target: 'http://backend:' + env.VITE_SERVER_PORT.toString(),
					changeOrigin: true,
					secure: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
			port: parseInt(env.VITE_PORT),
		},
	});
};
