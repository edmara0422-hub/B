// Ativado com: CAPACITOR_BUILD=true npm run build:cap
// Gera pasta out/ para embutir no app iOS (funciona fora de casa, sem servidor)
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

if (isCapacitorBuild) {
  nextConfig.output = 'export'
  nextConfig.trailingSlash = true
  nextConfig.typescript = { ignoreBuildErrors: true }
} else {
  nextConfig.headers = async () => {
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
  }
}

// Only wrap with bundle analyzer if explicitly enabled
let finalConfig = nextConfig
if (process.env.ANALYZE === 'true') {
  const bundleAnalyzer = (await import('@next/bundle-analyzer')).default
  finalConfig = bundleAnalyzer({ enabled: true })(nextConfig)
}

export default finalConfig
