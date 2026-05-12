// Shown instantly while the explore page JS loads — prevents black screen flash
export default function ExploreLoading() {
  return (
    <div className="relative min-h-screen bg-[#020202]">
      <div className="relative z-10 flex min-h-[calc(100vh-6rem)] w-full flex-col justify-center px-2 pb-36 pt-6 md:px-4 md:pt-8">
        <div className="mx-auto w-[78%] md:w-[68%]">
          {/* Carousel skeleton (sem relógio) */}
          <div
            className="w-full rounded-[2rem] bg-white/3 animate-pulse"
            style={{ height: 'clamp(320px, 56vh, 540px)' }}
          />
        </div>
      </div>
    </div>
  )
}
