// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

module.exports = nextConfig;
