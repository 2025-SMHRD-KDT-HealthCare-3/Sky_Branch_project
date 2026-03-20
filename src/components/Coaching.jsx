import React, { useState } from 'react';

const planData = {
  1: {
    title: '1일 응급 케어 플랜',
    period: '2026.03.17',
    days: [
      {
        day: 1, label: '오늘 응급 케어',
        tasks: [
          { text: '오후 2시 이후 카페인 완전 차단', type: '필수' },
          { text: '취침 1시간 전 스마트폰 종료', type: '필수' },
          { text: '취침 전 스팀 온열 안대 10분', type: '권장' },
        ]
      }
    ]
  },
  7: {
    title: '7일 집중 케어 플랜',
    period: '2026.03.17 ~ 03.23',
    days: [
      {
        day: 1, label: '카페인 & 스크린 차단',
        tasks: [
          { text: '오후 2시 이후 카페인 완전 차단', type: '필수' },
          { text: '취침 1시간 전 스마트폰 종료', type: '필수' },
          { text: '취침 전 스팀 온열 안대 10분', type: '권장' },
          { text: '기상 후 냉찜질 5분', type: '권장' },
          { text: '수면유도 음악 틀고 취침', type: '선택' },
        ]
      },
      { day: 2, label: '수면 루틴 정착', tasks: [{ text: '오전 7시 기상 유지', type: '필수' }, { text: '카페인 차단 지속', type: '필수' }, { text: '취침 전 스트레칭 10분', type: '권장' }] },
      { day: 3, label: '다크서클 집중 케어', tasks: [{ text: '오이 슬라이스 팩 10분', type: '필수' }, { text: '수분 2L 이상 섭취', type: '필수' }, { text: '자외선 차단 외출 시 필수', type: '권장' }] },
      { day: 4, label: '카페인 완전 차단', tasks: [{ text: '하루 종일 카페인 0mg', type: '필수' }, { text: '녹차도 오전만', type: '권장' }] },
      { day: 5, label: '운동 루틴 추가', tasks: [{ text: '30분 이상 유산소 운동', type: '필수' }, { text: '야외 햇빛 노출 20분', type: '권장' }] },
      { day: 6, label: '수면 환경 개선', tasks: [{ text: '침실 온도 18~20도 유지', type: '권장' }, { text: '블루라이트 안경 착용', type: '선택' }] },
      { day: 7, label: '최종 측정·비교', tasks: [{ text: '웹캠 다크서클 재측정', type: '필수' }, { text: '1주일 변화 확인', type: '필수' }] },
    ]
  },
  15: {
    title: '15일 장기 자기관리 플랜',
    period: '2026.03.17 ~ 03.31',
    days: [
      { day: 1, label: '기초 루틴 시작', tasks: [{ text: '오후 2시 이후 카페인 차단', type: '필수' }, { text: '취침 전 폰 1시간 차단', type: '필수' }, { text: '온열 안대 10분', type: '권장' }] },
      { day: 3, label: '다크서클 집중 케어', tasks: [{ text: '냉온 교대 찜질 루틴', type: '필수' }, { text: '수분 2L 이상', type: '필수' }] },
      { day: 7, label: '중간 점검', tasks: [{ text: '다크서클 중간 측정', type: '필수' }, { text: '플랜 달성률 확인', type: '필수' }] },
      { day: 10, label: '습관 강화', tasks: [{ text: '규칙적 기상 시간 유지', type: '필수' }, { text: '주 3회 운동 달성', type: '필수' }] },
      { day: 15, label: '최종 측정 & 리뷰', tasks: [{ text: '최종 다크서클 측정', type: '필수' }, { text: '15일 전후 비교', type: '필수' }, { text: '다음 플랜 설정', type: '권장' }] },
    ]
  }
};

function Coaching({ selectedPlan }) {
  const plan = planData[selectedPlan] || planData[7];
  const [activeDay, setActiveDay] = useState(0);
  const [checked, setChecked] = useState({});

  const currentDay = plan.days[activeDay];
  const totalTasks = currentDay.tasks.length;
  const doneTasks = Object.values(checked[activeDay] || {}).filter(Boolean).length;
  const pct = totalTasks > 0 ? Math.round(doneTasks / totalTasks * 100) : 0;

  const totalAll = plan.days.reduce((acc, d) => acc + d.tasks.length, 0);
  const doneAll = Object.entries(checked).reduce((acc, [di, tasks]) => acc + Object.values(tasks).filter(Boolean).length, 0);
  const totalPct = totalAll > 0 ? Math.round(doneAll / totalAll * 100) : 0;

  const toggle = (dayIdx, taskIdx) => {
    setChecked(prev => ({
      ...prev,
      [dayIdx]: { ...(prev[dayIdx] || {}), [taskIdx]: !(prev[dayIdx]?.[taskIdx]) }
    }));
  };

  const getBadgeStyle = (type) => {
    if (type === '필수') return { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' };
    if (type === '권장') return { background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' };
    return { background: 'rgba(110,231,247,0.1)', color: '#6ee7f7', border: '1px solid rgba(110,231,247,0.2)' };
  };

  const msgs = ['아직 완료한 항목이 없어요', '잘 하고 있어요!', '절반 이상 완료!', '거의 다 왔어요!', '오늘 모든 미션 완료! 🎉'];
  const msgIdx = Math.min(Math.floor(doneTasks / (totalTasks / 4)), 4);

  return (
    <div className="coaching-screen">

      {/* 플랜 헤더 */}
      <div style={{
        background: 'linear-gradient(135deg,#1e1040,#2a1a5e)',
        border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: '14px', padding: '16px', marginBottom: '12px'
      }}>
        <div style={{ fontSize: '9px', color: 'var(--accent2)', letterSpacing: '1px', marginBottom: '4px' }}>ACTIVE PLAN</div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '24px', color: '#fff' }}>{plan.title}</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{plan.period}</div>
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
            <span>전체 진행률</span><span>{totalPct}%</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--accent2)', borderRadius: '4px', width: `${totalPct}%`, transition: 'width .4s' }}></div>
          </div>
        </div>
      </div>

      {/* Day 선택 탭 */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '10px' }}>
        {plan.days.map((d, i) => (
          <div key={i} onClick={() => setActiveDay(i)} style={{
            flexShrink: 0, textAlign: 'center', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer',
            background: i === activeDay ? 'rgba(110,231,247,0.1)' : 'var(--bg2)',
            border: i === activeDay ? '1px solid rgba(110,231,247,0.4)' : '1px solid var(--border)',
            transition: '.2s', minWidth: '70px'
          }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '15px', color: i === activeDay ? 'var(--accent)' : 'rgba(255,255,255,0.4)' }}>Day {d.day}</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', lineHeight: 1.3 }}>{d.label}</div>
            {/* 완료 표시 */}
            {Object.values(checked[i] || {}).filter(Boolean).length === d.tasks.length && d.tasks.length > 0 && (
              <div style={{ fontSize: '9px', color: '#22c55e', marginTop: '2px' }}>✓ 완료</div>
            )}
          </div>
        ))}
      </div>

      {/* 오늘 미션 */}
      <div className="section-title">DAY {currentDay.day} — {currentDay.label}</div>
      <div className="coaching-card">
        {currentDay.tasks.map((task, ti) => (
          <div key={ti} onClick={() => toggle(activeDay, ti)} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 0',
            borderBottom: ti < currentDay.tasks.length - 1 ? '1px solid var(--border)' : 'none',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '5px', flexShrink: 0,
              border: checked[activeDay]?.[ti] ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
              background: checked[activeDay]?.[ti] ? 'var(--accent)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0b0b13', fontSize: '11px', transition: '.2s'
            }}>
              {checked[activeDay]?.[ti] ? '✓' : ''}
            </div>
            <div style={{
              flex: 1, fontSize: '13px',
              textDecoration: checked[activeDay]?.[ti] ? 'line-through' : 'none',
              color: checked[activeDay]?.[ti] ? 'rgba(255,255,255,0.3)' : 'var(--text)'
            }}>{task.text}</div>
            <div style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '10px', flexShrink: 0, ...getBadgeStyle(task.type) }}>
              {task.type}
            </div>
          </div>
        ))}
      </div>

      {/* 오늘 수행 요약 */}
      <div className="coaching-card">
        <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '8px' }}>오늘 수행 요약</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '30px', color: 'var(--accent)', lineHeight: 1 }}>{doneTasks}</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>/ {totalTasks} 완료</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
              <div style={{ height: '100%', background: pct === 100 ? '#22c55e' : 'var(--accent)', borderRadius: '6px', width: `${pct}%`, transition: 'width .3s' }}></div>
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{msgs[msgIdx]}</div>
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', color: pct === 100 ? '#22c55e' : 'var(--accent)', flexShrink: 0 }}>{pct}%</div>
        </div>
      </div>

      {/* 수면유도 음악 */}
      <div className="music-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '1px', marginBottom: '3px' }}>🎵 수면유도 음악 추천</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>오늘의 플레이리스트</div>
          </div>
          <div className="music-badge">3곡</div>
        </div>
        {[
          { title: 'Rain & Piano', artist: '수면유도 플레이리스트', dur: '45:20' },
          { title: 'Deep Sleep Waves', artist: 'Binaural Beats', dur: '60:00' },
          { title: 'Forest Night Sounds', artist: '자연의 소리', dur: '30:15' },
        ].map(m => (
          <div key={m.title} className="music-row">
            <div className="music-icon">🎵</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{m.title}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{m.artist}</div>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{m.dur}</div>
            <div className="play-btn" onClick={() => alert('재생!')}>▶</div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Coaching;