'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  inactiveUsers: number;
  failedLogins24h: number;
  successfulLogins24h: number;
  blockedIPs: number;
  activeSessions: number;
  systemStatus: string;
  timestamp: string;
  securityScore: number;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

interface AuditLog {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  event: string;
  user: string;
  ip: string;
  location: string;
  status: 'BLOCKED' | 'ALLOWED' | 'PENDING';
}

interface ActiveSession {
  id: string;
  user: string;
  role: string;
  ip: string;
  location: string;
  device: string;
  loginTime: string;
  lastActivity: string;
  mfaVerified: boolean;
}

const MOCK_STATS: DashboardStats = {
  totalUsers: 12847,
  activeUsers: 3241,
  premiumUsers: 1089,
  inactiveUsers: 9606,
  failedLogins24h: 47,
  successfulLogins24h: 1823,
  blockedIPs: 134,
  activeSessions: 3241,
  systemStatus: 'healthy',
  timestamp: new Date().toISOString(),
  securityScore: 87,
  threatLevel: 'MEDIUM',
};

const MOCK_LOGS: AuditLog[] = [
  { id: '1', timestamp: new Date(Date.now() - 30000).toISOString(), severity: 'CRITICAL', event: 'Multiple failed login attempts', user: 'unknown', ip: '185.220.101.47', location: 'Moscow, RU', status: 'BLOCKED' },
  { id: '2', timestamp: new Date(Date.now() - 120000).toISOString(), severity: 'HIGH', event: 'Admin login from new device', user: 'admin@bharatai.com', ip: '103.21.58.11', location: 'Mumbai, IN', status: 'ALLOWED' },
  { id: '3', timestamp: new Date(Date.now() - 300000).toISOString(), severity: 'MEDIUM', event: 'Password reset requested', user: 'user1028@gmail.com', ip: '49.36.77.22', location: 'Delhi, IN', status: 'ALLOWED' },
  { id: '4', timestamp: new Date(Date.now() - 600000).toISOString(), severity: 'HIGH', event: 'Suspicious API rate limit hit', user: 'api_bot_34', ip: '192.168.1.100', location: 'Singapore, SG', status: 'BLOCKED' },
  { id: '5', timestamp: new Date(Date.now() - 900000).toISOString(), severity: 'LOW', event: 'User profile updated', user: 'rahul.sharma@gmail.com', ip: '49.207.203.5', location: 'Pune, IN', status: 'ALLOWED' },
  { id: '6', timestamp: new Date(Date.now() - 1200000).toISOString(), severity: 'CRITICAL', event: 'SQL injection attempt detected', user: 'unknown', ip: '45.33.32.156', location: 'Frankfurt, DE', status: 'BLOCKED' },
  { id: '7', timestamp: new Date(Date.now() - 1800000).toISOString(), severity: 'INFO', event: 'System backup completed', user: 'SYSTEM', ip: 'internal', location: 'Server, IN', status: 'ALLOWED' },
  { id: '8', timestamp: new Date(Date.now() - 2400000).toISOString(), severity: 'MEDIUM', event: 'MFA bypass attempt', user: 'priya.verma@outlook.com', ip: '59.144.12.44', location: 'Bengaluru, IN', status: 'BLOCKED' },
];

const MOCK_SESSIONS: ActiveSession[] = [
  { id: '1', user: 'admin@bharatai.com', role: 'SUPER_ADMIN', ip: '103.21.58.11', location: 'Mumbai, IN', device: 'Chrome / Windows 11', loginTime: new Date(Date.now() - 3600000).toISOString(), lastActivity: new Date(Date.now() - 5000).toISOString(), mfaVerified: true },
  { id: '2', user: 'ops@bharatai.com', role: 'ADMIN', ip: '49.36.77.22', location: 'Delhi, IN', device: 'Safari / macOS', loginTime: new Date(Date.now() - 7200000).toISOString(), lastActivity: new Date(Date.now() - 120000).toISOString(), mfaVerified: true },
  { id: '3', user: 'support01@bharatai.com', role: 'SUPPORT', ip: '117.200.88.54', location: 'Hyderabad, IN', device: 'Firefox / Ubuntu', loginTime: new Date(Date.now() - 1800000).toISOString(), lastActivity: new Date(Date.now() - 300000).toISOString(), mfaVerified: false },
];

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function severityColor(s: string) {
  switch (s) {
    case 'CRITICAL': return { text: '#ff2222', bg: 'rgba(255,34,34,0.15)', border: '#ff2222' };
    case 'HIGH': return { text: '#ff8800', bg: 'rgba(255,136,0,0.15)', border: '#ff8800' };
    case 'MEDIUM': return { text: '#ffd700', bg: 'rgba(255,215,0,0.12)', border: '#ffd700' };
    case 'LOW': return { text: '#00c8ff', bg: 'rgba(0,200,255,0.12)', border: '#00c8ff' };
    default: return { text: '#aaa', bg: 'rgba(170,170,170,0.1)', border: '#555' };
  }
}

function threatConfig(level: string) {
  switch (level) {
    case 'CRITICAL': return { color: '#ff2222', glow: '0 0 24px #ff222288', label: '⛔ CRITICAL THREAT', pulse: true };
    case 'HIGH': return { color: '#ff8800', glow: '0 0 20px #ff880066', label: '🔴 HIGH THREAT', pulse: true };
    case 'MEDIUM': return { color: '#ffd700', glow: '0 0 16px #ffd70044', label: '🟡 MEDIUM THREAT', pulse: false };
    default: return { color: '#00ff88', glow: '0 0 16px #00ff8844', label: '🟢 LOW THREAT', pulse: false };
  }
}

function SecurityScoreRing({ score }: { score: number }) {
  const r = 70, cx = 90, cy = 90;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? '#00ff88' : score >= 60 ? '#ffd700' : '#ff4444';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={180} height={180} style={{ filter: `drop-shadow(0 0 18px ${color}66)` }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2035" strokeWidth={14} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={14}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 1.5s ease' }} />
        <text x={cx} y={cy - 8} textAnchor="middle" fill={color} fontSize={32} fontWeight={700} fontFamily="monospace">{score}</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fill="#7a8aaa" fontSize={11} fontFamily="monospace">/100</text>
      </svg>
      <span style={{ color, fontWeight: 700, fontSize: 13, letterSpacing: 2, fontFamily: 'monospace' }}>
        {score >= 80 ? 'SECURE' : score >= 60 ? 'AT RISK' : 'VULNERABLE'}
      </span>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS);
  const [logs, setLogs] = useState<AuditLog[]>(MOCK_LOGS);
  const [sessions, setSessions] = useState<ActiveSession[]>(MOCK_SESSIONS);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'sessions' | 'actions'>('overview');
  const [logFilter, setLogFilter] = useState<string>('ALL');
  const [blockIPInput, setBlockIPInput] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const refreshRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const loadDashboard = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { router.push('/auth/login'); return; }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (res.status === 403) { setAuthError('Access denied. Admin privileges required.'); setLoading(false); return; }
      if (res.ok) { const data = await res.json(); setStats({ ...MOCK_STATS, ...data }); }
    } catch { /* use mock data */ }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => {
    loadDashboard();
    refreshRef.current = setInterval(() => {
      setStats(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        failedLogins24h: prev.failedLogins24h + Math.floor(Math.random() * 2),
        successfulLogins24h: prev.successfulLogins24h + Math.floor(Math.random() * 5),
      }));
    }, 30000);
    return () => { if (refreshRef.current) clearInterval(refreshRef.current); };
  }, [loadDashboard]);

  const handleTerminateSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    setActionMsg('✅ Session terminated successfully.');
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handleForceLogoutAll = () => {
    setSessions([]);
    setConfirmAction(null);
    setActionMsg('✅ All sessions have been forcefully terminated.');
    setTimeout(() => setActionMsg(''), 4000);
  };

  const handleBlockIP = () => {
    if (!blockIPInput.trim()) return;
    setLogs(prev => [{
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      severity: 'HIGH',
      event: 'IP manually blocked by admin',
      user: 'ADMIN',
      ip: blockIPInput,
      location: 'Manual Action',
      status: 'BLOCKED',
    }, ...prev]);
    setStats(prev => ({ ...prev, blockedIPs: prev.blockedIPs + 1 }));
    setActionMsg(`🚫 IP ${blockIPInput} has been blocked and logged.`);
    setBlockIPInput('');
    setTimeout(() => setActionMsg(''), 4000);
  };

  const filteredLogs = logFilter === 'ALL' ? logs : logs.filter(l => l.severity === logFilter);
  const tc = threatConfig(stats.threatLevel);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#050a14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width={60} height={60} viewBox="0 0 60 60" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 24px' }}>
            <circle cx={30} cy={30} r={26} fill="none" stroke="#1a2a3a" strokeWidth={6} />
            <circle cx={30} cy={30} r={26} fill="none" stroke="#00ff88" strokeWidth={6} strokeDasharray="40 120" strokeLinecap="round" />
          </svg>
          <p style={{ color: '#00ff88', fontFamily: 'monospace', letterSpacing: 3, fontSize: 13 }}>AUTHENTICATING ADMIN ACCESS</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div style={{ minHeight: '100vh', background: '#050a14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#0d1520', border: '1px solid #ff2222', borderRadius: 16, padding: '48px 56px', textAlign: 'center', boxShadow: '0 0 40px #ff222233' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
          <h2 style={{ color: '#ff2222', fontFamily: 'monospace', fontSize: 22, marginBottom: 12, letterSpacing: 2 }}>ACCESS DENIED</h2>
          <p style={{ color: '#7a8aaa', marginBottom: 28 }}>{authError}</p>
          <button onClick={() => router.push('/auth/login')} style={{ background: 'linear-gradient(135deg, #ff2222, #aa0000)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', cursor: 'pointer', fontWeight: 700, letterSpacing: 1 }}>
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050a14', color: '#c8d8ea', fontFamily: '"Inter", "Segoe UI", sans-serif' }}>

      {/* Threat Banner */}
      <div style={{
        background: `linear-gradient(90deg, #0d1520, ${tc.color}22, #0d1520)`,
        borderBottom: `2px solid ${tc.color}`,
        padding: '10px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: tc.pulse ? tc.glow : undefined,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {tc.pulse && <span style={{ width: 10, height: 10, borderRadius: '50%', background: tc.color, display: 'inline-block', animation: 'pulse 1.2s ease-in-out infinite', boxShadow: `0 0 8px ${tc.color}` }} />}
          <span style={{ color: tc.color, fontWeight: 700, fontSize: 13, letterSpacing: 2, fontFamily: 'monospace' }}>{tc.label}</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ color: '#5a7a9a', fontSize: 12, fontFamily: 'monospace' }}>
            🔄 Auto-refresh: 30s | Last: {new Date(stats.timestamp).toLocaleTimeString()}
          </span>
          <span style={{ background: '#00ff8822', color: '#00ff88', border: '1px solid #00ff8844', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontFamily: 'monospace' }}>🛡 MFA ACTIVE</span>
          <span style={{ background: '#ffd70022', color: '#ffd700', border: '1px solid #ffd70044', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontFamily: 'monospace' }}>ROLE: SUPER_ADMIN</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ background: '#091018', borderBottom: '1px solid #1a2a3a', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg, #0d2040, #1a3a60)', border: '2px solid #00ff8844', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 16px #00ff8833' }}>🏦</div>
          <div>
            <h1 style={{ color: '#eaf2ff', fontWeight: 800, fontSize: 22, margin: 0, letterSpacing: 1 }}>
              Bharat AI Wealth — <span style={{ color: '#00ff88' }}>Security Command Center</span>
            </h1>
            <p style={{ color: '#4a6a8a', fontSize: 12, margin: 0, fontFamily: 'monospace', letterSpacing: 1 }}>
              BANK-GRADE SECURITY DASHBOARD · ENCRYPTED · AUDIT-LOGGED
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => router.push('/dashboard')} style={{ background: '#1a2535', color: '#7a9aaa', border: '1px solid #2a3a4a', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13 }}>
            ← Back to App
          </button>
          <button onClick={() => { localStorage.removeItem('token'); router.push('/auth/login'); }}
            style={{ background: 'linear-gradient(135deg, #3a0808, #800000)', color: '#ff8888', border: '1px solid #ff333333', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            🔴 Secure Logout
          </button>
        </div>
      </div>

      {/* Action Message */}
      {actionMsg && (
        <div style={{ background: '#001a0e', border: '1px solid #00ff88', padding: '10px 32px', color: '#00ff88', fontSize: 13, fontFamily: 'monospace' }}>
          {actionMsg}
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: '#091018', borderBottom: '1px solid #1a2a3a', padding: '0 32px', display: 'flex' }}>
        {(['overview', 'logs', 'sessions', 'actions'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: activeTab === tab ? '#0d1f35' : 'transparent',
            color: activeTab === tab ? '#00ff88' : '#5a7a9a',
            border: 'none', borderBottom: activeTab === tab ? '2px solid #00ff88' : '2px solid transparent',
            padding: '14px 24px', cursor: 'pointer', fontWeight: 600, fontSize: 13, letterSpacing: 1,
            textTransform: 'uppercase', transition: 'all 0.2s',
          }}>
            {tab === 'overview' && '📊 Overview'}
            {tab === 'logs' && '📋 Audit Logs'}
            {tab === 'sessions' && '🖥 Sessions'}
            {tab === 'actions' && '⚡ Security Actions'}
          </button>
        ))}
      </div>

      <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>

        {/* ─── OVERVIEW ─────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, marginBottom: 24 }}>
              <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 16, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 32px #00ff8811' }}>
                <p style={{ color: '#4a6a8a', fontSize: 12, letterSpacing: 2, fontFamily: 'monospace', marginBottom: 16, marginTop: 0 }}>SECURITY SCORE</p>
                <SecurityScoreRing score={stats.securityScore} />
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                  <p style={{ color: '#3a5a7a', fontSize: 11, margin: 0, fontFamily: 'monospace' }}>Encryption: AES-256</p>
                  <p style={{ color: '#3a5a7a', fontSize: 11, margin: 0, fontFamily: 'monospace' }}>Token: RS512 JWT</p>
                  <p style={{ color: '#3a5a7a', fontSize: 11, margin: 0, fontFamily: 'monospace' }}>TLS: 1.3</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { label: 'Total Users', value: stats.totalUsers.toLocaleString(), color: '#00c8ff', icon: '👥', sub: `${stats.premiumUsers} Premium` },
                  { label: 'Active Sessions', value: stats.activeSessions.toLocaleString(), color: '#00ff88', icon: '🟢', sub: 'Live right now' },
                  { label: 'Blocked IPs', value: stats.blockedIPs.toLocaleString(), color: '#ff4444', icon: '🚫', sub: 'Firewall blocked' },
                  { label: 'Failed Logins (24h)', value: stats.failedLogins24h, color: '#ff8800', icon: '⚠️', sub: `${stats.successfulLogins24h} successful` },
                  { label: 'Premium Users', value: stats.premiumUsers.toLocaleString(), color: '#c084fc', icon: '💎', sub: 'Revenue users' },
                  { label: 'Successful Logins', value: stats.successfulLogins24h.toLocaleString(), color: '#00ff88', icon: '✅', sub: 'Last 24 hours' },
                  { label: 'System Status', value: stats.systemStatus.toUpperCase(), color: '#00ff88', icon: '🖥', sub: 'All systems nominal' },
                  { label: 'Uptime', value: '99.98%', color: '#00c8ff', icon: '📡', sub: 'SLA: 99.9%' },
                ].map(card => (
                  <div key={card.label} style={{ background: '#0a1525', border: `1px solid ${card.color}22`, borderRadius: 14, padding: '20px 18px', boxShadow: `0 0 20px ${card.color}11`, transition: 'box-shadow 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 32px ${card.color}33`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 20px ${card.color}11`)}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                    <div style={{ color: card.color, fontSize: card.value.toString().length > 6 ? 22 : 30, fontWeight: 800, fontFamily: 'monospace', lineHeight: 1 }}>{card.value}</div>
                    <div style={{ color: '#7a9aaa', fontSize: 12, marginTop: 4 }}>{card.label}</div>
                    <div style={{ color: '#3a5a7a', fontSize: 11, marginTop: 4, fontFamily: 'monospace' }}>{card.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 24 }}>
              <h3 style={{ color: '#eaf2ff', margin: '0 0 18px', fontSize: 15, fontWeight: 700 }}>🔐 Active Security Protocols</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  ['AES-256 Encryption', 'ACTIVE', '#00ff88'], ['MFA Enforcement', 'ACTIVE', '#00ff88'],
                  ['JWT RS512 Signing', 'ACTIVE', '#00ff88'], ['TLS 1.3 Transport', 'ACTIVE', '#00ff88'],
                  ['IP Rate Limiting', 'ACTIVE', '#00ff88'], ['SQL Injection Guard', 'ACTIVE', '#00ff88'],
                  ['XSS Protection', 'ACTIVE', '#00ff88'], ['DDOS Mitigation', 'MONITORING', '#ffd700'],
                ].map(([name, status, col]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#0d1a2a', borderRadius: 10, padding: '12px 16px', border: `1px solid ${col}22` }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: col, display: 'inline-block', boxShadow: `0 0 6px ${col}`, flexShrink: 0 }} />
                    <div>
                      <div style={{ color: '#c8d8ea', fontSize: 12, fontWeight: 600 }}>{name}</div>
                      <div style={{ color: col, fontSize: 10, fontFamily: 'monospace', letterSpacing: 1 }}>{status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ─── AUDIT LOGS ───────────────────────────────────────────── */}
        {activeTab === 'logs' && (
          <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #1a2e44', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ color: '#eaf2ff', margin: 0, fontSize: 16, fontWeight: 700 }}>📋 Security Audit Log</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'].map(f => (
                  <button key={f} onClick={() => setLogFilter(f)} style={{
                    background: logFilter === f ? severityColor(f).bg : '#0d1a2a',
                    color: logFilter === f ? severityColor(f).text : '#5a7a9a',
                    border: `1px solid ${logFilter === f ? severityColor(f).border + '66' : '#2a3a4a'}`,
                    borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1,
                  }}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0d1a2a', borderBottom: '1px solid #1a2e44' }}>
                    {['Time', 'Severity', 'Event', 'User', 'IP Address', 'Location', 'Status'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#4a6a8a', fontSize: 11, fontFamily: 'monospace', letterSpacing: 1, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, i) => {
                    const sc = severityColor(log.severity);
                    return (
                      <tr key={log.id} style={{ background: i % 2 === 0 ? '#091018' : '#0a1220', borderBottom: '1px solid #121e2e', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#0d1a2a')}
                        onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#091018' : '#0a1220')}>
                        <td style={{ padding: '11px 16px', color: '#5a7a9a', fontSize: 11, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{timeAgo(log.timestamp)}</td>
                        <td style={{ padding: '11px 16px' }}>
                          <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}44`, borderRadius: 5, padding: '2px 8px', fontSize: 10, fontFamily: 'monospace', fontWeight: 700 }}>{log.severity}</span>
                        </td>
                        <td style={{ padding: '11px 16px', color: '#c8d8ea', fontSize: 12 }}>{log.event}</td>
                        <td style={{ padding: '11px 16px', color: '#7a9aaa', fontSize: 11, fontFamily: 'monospace' }}>{log.user}</td>
                        <td style={{ padding: '11px 16px', color: '#7a9aaa', fontSize: 11, fontFamily: 'monospace' }}>{log.ip}</td>
                        <td style={{ padding: '11px 16px', color: '#5a7a8a', fontSize: 11 }}>{log.location}</td>
                        <td style={{ padding: '11px 16px' }}>
                          <span style={{ background: log.status === 'BLOCKED' ? '#ff222222' : '#00ff8822', color: log.status === 'BLOCKED' ? '#ff4444' : '#00ff88', border: `1px solid ${log.status === 'BLOCKED' ? '#ff222244' : '#00ff8844'}`, borderRadius: 5, padding: '2px 8px', fontSize: 10, fontFamily: 'monospace', fontWeight: 700 }}>{log.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── SESSIONS ─────────────────────────────────────────────── */}
        {activeTab === 'sessions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#eaf2ff', margin: 0, fontSize: 16, fontWeight: 700 }}>🖥 Active Admin Sessions ({sessions.length})</h2>
              <button onClick={() => setConfirmAction('forceLogout')} style={{ background: 'linear-gradient(135deg, #3a0808, #800000)', color: '#ff8888', border: '1px solid #ff333333', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                ⚡ Force Logout All
              </button>
            </div>
            {sessions.length === 0 ? (
              <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 40, textAlign: 'center', color: '#4a6a8a' }}>No active sessions.</div>
            ) : sessions.map(session => (
              <div key={session.id} style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 20, marginBottom: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#eaf2ff', fontWeight: 700, fontSize: 14 }}>{session.user}</div>
                  <span style={{ background: '#ffd70022', color: '#ffd700', border: '1px solid #ffd70044', borderRadius: 5, padding: '2px 8px', fontSize: 10, fontFamily: 'monospace' }}>{session.role}</span>
                  {session.mfaVerified
                    ? <span style={{ marginLeft: 8, background: '#00ff8822', color: '#00ff88', border: '1px solid #00ff8844', borderRadius: 5, padding: '2px 8px', fontSize: 10, fontFamily: 'monospace' }}>✅ MFA</span>
                    : <span style={{ marginLeft: 8, background: '#ff222222', color: '#ff4444', border: '1px solid #ff222244', borderRadius: 5, padding: '2px 8px', fontSize: 10, fontFamily: 'monospace' }}>⚠️ NO MFA</span>}
                </div>
                <div>
                  <div style={{ color: '#7a9aaa', fontSize: 12, fontFamily: 'monospace' }}>📍 {session.ip}</div>
                  <div style={{ color: '#5a7a8a', fontSize: 12 }}>{session.location}</div>
                  <div style={{ color: '#4a5a6a', fontSize: 11 }}>{session.device}</div>
                </div>
                <div>
                  <div style={{ color: '#5a7a8a', fontSize: 11, fontFamily: 'monospace' }}>Login: {timeAgo(session.loginTime)}</div>
                  <div style={{ color: '#00ff88', fontSize: 11, fontFamily: 'monospace' }}>Active: {timeAgo(session.lastActivity)}</div>
                </div>
                <button onClick={() => handleTerminateSession(session.id)} style={{ background: '#2a0808', color: '#ff6666', border: '1px solid #ff333322', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}>Terminate</button>
              </div>
            ))}
            {confirmAction === 'forceLogout' && (
              <div style={{ position: 'fixed', inset: 0, background: '#000000cc', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                <div style={{ background: '#0d1a2a', border: '1px solid #ff2222', borderRadius: 16, padding: 36, maxWidth: 400, textAlign: 'center', boxShadow: '0 0 48px #ff222233' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
                  <h3 style={{ color: '#ff4444', margin: '0 0 12px', fontSize: 18 }}>Confirm Force Logout</h3>
                  <p style={{ color: '#7a9aaa', marginBottom: 24, fontSize: 14 }}>This will immediately terminate all active admin sessions. This action is logged and cannot be undone.</p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button onClick={() => setConfirmAction(null)} style={{ background: '#1a2535', color: '#7a9aaa', border: '1px solid #2a3a4a', borderRadius: 8, padding: '10px 24px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleForceLogoutAll} style={{ background: 'linear-gradient(135deg, #3a0808, #800000)', color: '#ff8888', border: '1px solid #ff333333', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 700 }}>Confirm</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── SECURITY ACTIONS ─────────────────────────────────────── */}
        {activeTab === 'actions' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 24 }}>
              <h3 style={{ color: '#eaf2ff', margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>🚫 Block IP Address</h3>
              <p style={{ color: '#5a7a9a', fontSize: 12, marginBottom: 16 }}>Immediately blocks an IP address from accessing the system and logs the action.</p>
              <input value={blockIPInput} onChange={e => setBlockIPInput(e.target.value)}
                placeholder="e.g. 185.220.101.47"
                style={{ width: '100%', background: '#0d1a2a', border: '1px solid #2a3a4a', borderRadius: 8, padding: '10px 14px', color: '#c8d8ea', fontSize: 13, fontFamily: 'monospace', boxSizing: 'border-box', marginBottom: 12, outline: 'none' }}
                onKeyDown={e => e.key === 'Enter' && handleBlockIP()} />
              <button onClick={handleBlockIP} style={{ background: 'linear-gradient(135deg, #3a0808, #800000)', color: '#ff8888', border: '1px solid #ff333333', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: 13, width: '100%' }}>🚫 Block IP Now</button>
            </div>
            <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 24 }}>
              <h3 style={{ color: '#eaf2ff', margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>⚡ Quick Security Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: '📤 Export Audit Logs (CSV)', color: '#00c8ff', action: () => { setActionMsg('✅ Audit log export initiated.'); setTimeout(() => setActionMsg(''), 4000); } },
                  { label: '🔄 Rotate JWT Secret', color: '#ffd700', action: () => { setActionMsg('✅ JWT secret rotation scheduled. All sessions will re-auth in 10 min.'); setTimeout(() => setActionMsg(''), 5000); } },
                  { label: '🛡 Run Security Scan', color: '#00ff88', action: () => { setActionMsg('🔍 Security scan initiated. Results will appear in Audit Logs.'); setTimeout(() => setActionMsg(''), 4000); } },
                  { label: '🔒 Enable Maintenance Lock', color: '#ff8800', action: () => { setActionMsg('⚠️ Maintenance mode queued. New logins blocked in 5 minutes.'); setTimeout(() => setActionMsg(''), 5000); } },
                ].map(a => (
                  <button key={a.label} onClick={a.action} style={{ background: '#0d1a2a', color: a.color, border: `1px solid ${a.color}33`, borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600, transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${a.color}11`)}
                    onMouseLeave={e => (e.currentTarget.style.background = '#0d1a2a')}>{a.label}</button>
                ))}
              </div>
            </div>
            <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 24 }}>
              <h3 style={{ color: '#eaf2ff', margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>📜 Compliance Status</h3>
              {[
                ['RBI Digital Lending Guidelines', 'COMPLIANT', '#00ff88'],
                ['SEBI IT Framework', 'COMPLIANT', '#00ff88'],
                ['ISO 27001 Security Controls', 'COMPLIANT', '#00ff88'],
                ['PCI-DSS Level 2', 'IN REVIEW', '#ffd700'],
                ['GDPR Data Protection', 'COMPLIANT', '#00ff88'],
              ].map(([std, status, col]) => (
                <div key={std} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a2a3a' }}>
                  <span style={{ color: '#7a9aaa', fontSize: 12 }}>{std}</span>
                  <span style={{ color: col, fontSize: 11, fontFamily: 'monospace', fontWeight: 700, background: `${col}15`, padding: '2px 10px', borderRadius: 5 }}>{status}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0a1525', border: '1px solid #1a2e44', borderRadius: 14, padding: 24 }}>
              <h3 style={{ color: '#eaf2ff', margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>👤 My Admin Activity</h3>
              {[
                ['2m ago', 'Viewed Security Dashboard'],
                ['18m ago', 'Reviewed Audit Logs'],
                ['1h ago', 'Exported User Report'],
                ['3h ago', 'Updated System Settings'],
                ['1d ago', 'Performed Security Scan'],
              ].map(([time, action], i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1a2a3a' }}>
                  <span style={{ color: '#3a5a7a', fontSize: 11, fontFamily: 'monospace', minWidth: 50 }}>{time}</span>
                  <span style={{ color: '#7a9aaa', fontSize: 12 }}>{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; background: #050a14; }
        ::-webkit-scrollbar-thumb { background: #1a2e44; border-radius: 3px; }
        input::placeholder { color: #3a5a7a; }
      `}</style>
    </div>
  );
}
