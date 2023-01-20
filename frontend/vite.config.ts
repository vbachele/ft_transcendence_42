import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default {
	plugins: [react(), svgr(), tsconfigPaths()],
};
