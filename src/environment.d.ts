declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			BOT_GAMERTAG: string;
			VERSION: string;
			NG_SERVER_ADDRESS?: string;
			NG_SERVER_PORT?: string;
			NG_API_KEY?: string;
			LOGS_WEBHOOK?: string;
			TRUSTED_GAMERTAGS?: string;
			npm_package_version: string;
		}
	}
}

export {};
