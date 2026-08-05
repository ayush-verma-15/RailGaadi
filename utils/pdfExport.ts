/**
 * RailPulse AI - PDF Trip Report Export Utility
 * Generates an executive telemetry report printout format.
 */
export function exportTripReportPDF(telemetry: any) {
  if (typeof window === 'undefined') return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>RailPulse AI Telemetry Report - #${telemetry.number}</title>
        <style>
          body { font-family: monospace; background: #0f172a; color: #f8fafc; padding: 40px; }
          h1 { color: #38bdf8; border-bottom: 2px solid #0284c7; padding-bottom: 10px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
          .card { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; }
          .highlight { color: #4ade80; font-weight: bold; }
          .label { color: #94a3b8; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>RAILPULSE AI TELEMETRY REPORT</h1>
        <div><strong>Train:</strong> #${telemetry.number} - ${telemetry.name}</div>
        <div><strong>Corridor:</strong> ${telemetry.origin.name} (${telemetry.origin.code}) &rarr; ${telemetry.destination.name} (${telemetry.destination.code})</div>
        <div><strong>Timestamp:</strong> ${new Date().toLocaleString()}</div>

        <div class="grid">
          <div class="card">
            <div class="label">CURRENT VELOCITY</div>
            <div style="font-size: 24px;" class="highlight">${telemetry.speedKmh} km/h</div>
          </div>
          <div class="card">
            <div class="label">SCHEDULE DELAY</div>
            <div style="font-size: 24px; color: #f59e0b;">+${telemetry.delayMinutes} Minutes</div>
          </div>
          <div class="card">
            <div class="label">AI DELAY RISK SCORE</div>
            <div style="font-size: 24px; color: #f43f5e;">${telemetry.delayRisk?.score || 12}%</div>
          </div>
          <div class="card">
            <div class="label">CO2 OFFSET</div>
            <div style="font-size: 24px;" class="highlight">${telemetry.ecoMetrics?.co2SavedKg || 45} kg Saved</div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
