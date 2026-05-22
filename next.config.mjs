const isCapacitorBuild = process.env.CAPACITOR_BUILD === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Permite conexões externas/IP local para testes em dispositivos móveis no modo dev
  allowedDevOrigins: ['192.168.18.9', '127.0.0.1', 'localhost'],

  // Keep heavy server-only packages OUT of the browser bundle
  serverExternalPackages: [
    '@pinecone-database/pinecone',
    '@launchdarkly/node-server-sdk',
    '@huggingface/transformers',
    'bull',
    'y-websocket',
    'yjs',
  ],

  // Configurações condicionais para build nativo do Capacitor
  output: isCapacitorBuild ? 'export' : undefined,
  trailingSlash: isCapacitorBuild ? true : undefined,
  typescript: isCapacitorBuild ? { ignoreBuildErrors: true } : undefined,

  // Headers de segurança e cache (apenas em produção Web standard, não no Capacitor)
  headers: isCapacitorBuild ? undefined : async () => {
    return [
      {
        source: '/:file*.glb',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },

  experimental: {
    // Tree-shake large UI packages — only import what's used
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'recharts',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
    ],
  },
}

export default nextConfig
