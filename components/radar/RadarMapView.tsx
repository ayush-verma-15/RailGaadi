'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { Target, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { TelemetryReport } from '@/types/transit';
import { useTelemetryStore } from '@/store/useTelemetryStore';
import { interpolateRouteCoordinate } from '@/core/infrastructure/adapters/railRadarAdapter';
import { cn } from '@/utils/cn';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '';

interface RadarMapViewProps {
  telemetry: TelemetryReport;
  className?: string;
}

export default function RadarMapView({ telemetry, className }: RadarMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const stationMarkersRef = useRef<maplibregl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const followCameraMode = useTelemetryStore((state) => state.followCameraMode);
  const setFollowCameraMode = useTelemetryStore((state) => state.setFollowCameraMode);

  // Initialize MapLibre GL
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const styleUrl = MAPTILER_KEY
      ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${MAPTILER_KEY}`
      : {
          version: 8 as const,
          sources: {
            'carto-dark': {
              type: 'raster' as const,
              tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap © CARTO',
            },
          },
          layers: [{ id: 'carto-layer', type: 'raster' as const, source: 'carto-dark' }],
        };

    const initialCenter: [number, number] = [
      telemetry.currentLocation?.lng || telemetry.stations[0]?.lng || 77.22,
      telemetry.currentLocation?.lat || telemetry.stations[0]?.lat || 28.64,
    ];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleUrl as any,
      center: initialCenter,
      zoom: 7,
      pitch: 35,
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    map.on('load', () => {
      mapRef.current = map;
      setMapLoaded(true);
    });

    map.on('dragstart', () => setFollowCameraMode(false));

    return () => {
      map.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Route Polyline & Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const coords: [number, number][] =
      telemetry.routeGeometry ||
      telemetry.stations
        .filter((s) => s.lat && s.lng)
        .map((s) => [s.lng, s.lat] as [number, number]);

    if (coords.length < 2) return;

    const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: coords },
    };

    if (map.getSource('telemetry-route')) {
      (map.getSource('telemetry-route') as maplibregl.GeoJSONSource).setData(routeGeoJSON);
    } else {
      map.addSource('telemetry-route', { type: 'geojson', data: routeGeoJSON });

      // Glowing route halo
      map.addLayer({
        id: 'route-glow',
        type: 'line',
        source: 'telemetry-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#06b6d4', 'line-width': 10, 'line-opacity': 0.25, 'line-blur': 6 },
      });

      // Primary vector route line
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'telemetry-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#38bdf8', 'line-width': 3.5 },
      });
    }

    // Vehicle Marker Pos
    let vehicleLng = telemetry.currentLocation?.lng;
    let vehicleLat = telemetry.currentLocation?.lat;

    if (!vehicleLng || !vehicleLat) {
      const [interpolatedLng, interpolatedLat] = interpolateRouteCoordinate(coords, telemetry.completionPercentage);
      vehicleLng = interpolatedLng;
      vehicleLat = interpolatedLat;
    }

    if (!markerRef.current) {
      const el = document.createElement('div');
      el.innerHTML = `
        <div class="relative flex items-center justify-center w-10 h-10">
          <div class="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping"></div>
          <div class="relative flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-slate-950 font-black border-2 border-white shadow-lg text-sm">
            🚆
          </div>
        </div>`;

      const popup = new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(`
        <div class="p-2 font-mono text-xs">
          <div class="font-bold text-cyan-400">${telemetry.name}</div>
          <div class="text-slate-400">#${telemetry.number}</div>
          <div class="text-emerald-400 font-bold mt-1">${telemetry.speedKmh} km/h</div>
        </div>`);

      markerRef.current = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([vehicleLng, vehicleLat])
        .setPopup(popup)
        .addTo(map);
    } else {
      markerRef.current.setLngLat([vehicleLng, vehicleLat]);
    }

    // Station Markers
    stationMarkersRef.current.forEach((m) => m.remove());
    stationMarkersRef.current = [];

    telemetry.stations.forEach((st) => {
      if (!st.lat || !st.lng) return;
      const el = document.createElement('div');
      const isPassed = st.status === 'passed';
      const isCurrent = st.status === 'current';

      el.innerHTML = `<div class="rounded-full border-2 border-slate-900 shadow-md cursor-pointer transition-transform hover:scale-125 ${
        isCurrent ? 'h-4 w-4 bg-cyan-400 ring-4 ring-cyan-500/30' : isPassed ? 'h-2.5 w-2.5 bg-emerald-400' : 'h-2.5 w-2.5 bg-slate-600'
      }"></div>`;

      const popup = new maplibregl.Popup({ offset: 10, closeButton: false }).setHTML(`
        <div class="p-2 font-mono text-xs">
          <div class="font-bold text-white">${st.name} (${st.code})</div>
          <div class="text-slate-400">${st.distanceKm} km</div>
          <div class="text-emerald-400 font-semibold">${st.delayMinutes > 0 ? `+${st.delayMinutes}m delay` : 'On time'}</div>
        </div>`);

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([st.lng, st.lat])
        .setPopup(popup)
        .addTo(map);

      stationMarkersRef.current.push(marker);
    });

    if (followCameraMode) {
      map.easeTo({ center: [vehicleLng, vehicleLat], duration: 800 });
    }
  }, [telemetry, mapLoaded, followCameraMode]);

  const recenterCamera = () => {
    setFollowCameraMode(true);
    mapRef.current?.easeTo({
      center: [telemetry.currentLocation?.lng ?? 77.22, telemetry.currentLocation?.lat ?? 28.64],
      zoom: 9,
      duration: 800,
    });
  };

  return (
    <div className={cn('relative overflow-hidden rounded-3xl border border-slate-800 shadow-2xl', className)}>
      <div ref={mapContainerRef} className="h-full w-full min-h-[460px]" />

      {/* Floating Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={recenterCamera}
          className={cn(
            'glass-panel flex h-10 w-10 items-center justify-center rounded-xl transition-all',
            followCameraMode ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'text-slate-200 hover:text-white'
          )}
          title="Center on Vehicle"
        >
          <Target className="h-4 w-4" />
        </button>
      </div>

      {/* Camera Lock Status */}
      <div className="absolute bottom-4 left-4 z-10">
        <button
          onClick={() => setFollowCameraMode(!followCameraMode)}
          className={cn(
            'glass-panel flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-mono font-semibold transition-all',
            followCameraMode ? 'text-cyan-400 border-cyan-500/30' : 'text-slate-400'
          )}
        >
          <span className={cn('h-2 w-2 rounded-full', followCameraMode ? 'bg-cyan-400 animate-ping' : 'bg-slate-500')} />
          <span>{followCameraMode ? 'CAMERA LOCKED' : 'FREE CAM'}</span>
        </button>
      </div>
    </div>
  );
}
