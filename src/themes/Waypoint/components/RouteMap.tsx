import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useTranslation } from '../../../i18n';
import { THEME_CONTAINER } from '../layout';
import { useInView } from '../../../hooks/useInView';

interface TimelineStop {
  coords: string;
  title: string;
}

const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

const RouteMap = () => {
  const { t } = useTranslation();
  const [sectionRef, inView] = useInView<HTMLElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);

  // State for the telescopic crosshair reticle
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [geoData, setMouseGeoData] = useState({ lat: "45.0000° N", lng: "122.0000° W", elev: "120m" });

  const stopsText = (t('Waypoint.timeline') as TimelineStop[] | undefined) ?? [];
  const olympicCoords: string = (t('Waypoint.olympic.coords') as string) ?? '';
  const olympicTitle: string = (t('Waypoint.olympic.title') as string) ?? '';

  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  const waypoints: { x: number; y: number; label: string }[] = [
    { x: 120, y: 320, label: stopsText[0]?.coords ?? '' },
    { x: 380, y: 180, label: stopsText[1]?.coords ?? '' },
    { x: 720, y: 240, label: olympicCoords },
  ];

  const pathD = `M ${waypoints[0].x} ${waypoints[0].y} L ${waypoints[1].x} ${waypoints[1].y} L ${waypoints[2].x} ${waypoints[2].y}`;
  const totalLengthRef = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    totalLengthRef.current = length;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  }, []);

  useEffect(() => {
    if (!inView) return;
    const path = pathRef.current;
    if (!path || totalLengthRef.current === 0) return;

    const duration = 1800;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(p);
      const length = totalLengthRef.current;
      path.style.strokeDashoffset = `${length * (1 - eased)}`;
      setProgress(eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  // Mouse movement handling over the map container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Compute fake geographic coordinates from the cursor position for realism
    const latBase = 47.9; // Pacific NW coordinates (near Washington/Olympic)
    const lngBase = -123.5;
    const calculatedLat = (latBase - (y / rect.height) * 0.4).toFixed(4);
    const calculatedLng = (lngBase + (x / rect.width) * 0.6).toFixed(4);
    
    // Fake elevation based on the cursor height
    const calculatedElev = Math.round((1 - (y / rect.height)) * 8200);

    setMouseGeoData({
      lat: `${calculatedLat}° N`,
      lng: `${Math.abs(Number(calculatedLng))}${'° W'}`,
      elev: `${calculatedElev}ft`
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-24"
    >
      {/* Section background: backgrounds/4.jpg very subtle (12%) full screen width */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src="/src/webp/backgrounds/4.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.12]"
          loading="lazy"
        />
      </div>

      <div className={`relative z-10 ${THEME_CONTAINER}`}>
      <div className="flex flex-col items-start mb-10">
        <span className="text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2">
          {t('Waypoint.routeMap.label') as string}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif italic text-zinc-800 leading-snug max-w-2xl">
          {t('Waypoint.routeMap.title') as string}
        </h2>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full rounded-sm overflow-hidden border border-zinc-100 transition-all duration-700 cursor-crosshair ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{
          background: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
        }}
      >
        {/* Telescopic Reticle following the cursor subtly */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Horizontal line */}
            <div 
              className="absolute left-0 right-0 border-t border-dashed border-red-500/20"
              style={{ top: `${mousePos.y}px` }}
            />
            {/* Vertical line */}
            <div 
              className="absolute top-0 bottom-0 border-l border-dashed border-red-500/20"
              style={{ left: `${mousePos.x}px` }}
            />
            {/* Real-time GPS coordinates badge next to the cursor */}
            <div 
              className="absolute bg-zinc-900/90 text-white text-[9px] font-mono p-2 rounded-sm shadow-xl flex flex-col gap-0.5"
              style={{ 
                left: `${mousePos.x + 12}px`, 
                top: `${mousePos.y + 12}px`,
                transform: mousePos.x > containerWidth - 150 ? 'translateX(-115%)' : ''
              }}
            >
              <span className="text-red-400 font-bold">Reticulado Activo</span>
              <span>LAT: {geoData.lat}</span>
              <span>LNG: {geoData.lng}</span>
              <span>ELEV: {geoData.elev}</span>
            </div>
          </div>
        )}

        <svg
          viewBox="0 0 840 420"
          className="w-full h-auto block relative z-10"
          preserveAspectRatio="xMidYMid meet"
          aria-label={t('Waypoint.routeMap.title') as string}
        >
          {/* Decorative terrain contours (enhanced topographic contour lines) */}
          <g stroke="#e5e5e5" strokeWidth="1" fill="none">
            {/* Closed background topographic curves */}
            <path d="M 450 150 C 490 120, 520 180, 480 200 C 440 220, 410 180, 450 150" strokeWidth="0.8" opacity="0.6" />
            <path d="M 450 150 C 510 100, 550 200, 480 220 C 410 240, 390 200, 450 150" strokeWidth="0.6" opacity="0.4" />
            <path d="M 120 320 C 80 300, 70 340, 100 360 C 130 380, 160 340, 120 320" strokeWidth="0.8" opacity="0.6" />
            
            {/* General elevation lines */}
            <path d="M 40 380 Q 160 340 280 360 T 540 340 T 800 360" stroke="#d4d4d4" strokeWidth="1.2" />
            <path d="M 40 360 Q 150 320 260 340 T 520 320 T 800 340" stroke="#d4d4d4" strokeWidth="1" opacity="0.7" />
            <path d="M 60 300 Q 180 260 320 280 T 580 260 T 780 280" stroke="#d4d4d4" strokeWidth="0.8" opacity="0.5" />
            <path d="M 80 240 Q 200 200 360 220 T 600 200 T 760 220" stroke="#d4d4d4" strokeWidth="0.8" opacity="0.35" />
          </g>

          {/* Subtle grid lines */}
          <g stroke="#f0f0f0" strokeWidth="0.8">
            {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x) => (
              <line key={`v-${x}`} x1={x} y1={40} x2={x} y2={380} />
            ))}
            {[80, 160, 240, 320, 400].map((y) => (
              <line key={`h-${y}`} x1={40} y1={y} x2={800} y2={y} />
            ))}
          </g>

          {/* Animated route */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0"
            strokeDashoffset="0"
          />

          {/* Waypoints */}
          {waypoints.map((wp, i) => (
            <g key={i}>
              <circle
                cx={wp.x}
                cy={wp.y}
                r="8"
                fill="white"
                stroke="#ef4444"
                strokeWidth="4"
                opacity={progress >= (i / (waypoints.length - 1)) ? 1 : 0}
                style={{ transition: 'opacity 0.3s ease' }}
              />
              <text
                x={wp.x + 14}
                y={wp.y - 10}
                className="font-display"
                fill="#171717"
                fontSize="11"
                letterSpacing="0.2em"
                style={{ textTransform: 'uppercase' }}
              >
                {`0${i + 1}`}
              </text>
              <text
                x={wp.x + 14}
                y={wp.y + 18}
                fill="#737373"
                fontSize="9"
                letterSpacing="0.1em"
              >
                {wp.label}
              </text>
            </g>
          ))}

          {/* Final destination label */}
          <text
            x={waypoints[2].x + 14}
            y={waypoints[2].y + 32}
            fill="#171717"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="0.15em"
            style={{ textTransform: 'uppercase' }}
          >
            {olympicTitle}
          </text>
        </svg>
      </div>
      </div>
    </section>
  );
};

export default RouteMap;
