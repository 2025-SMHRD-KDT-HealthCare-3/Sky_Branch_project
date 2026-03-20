import React, { useState } from 'react';

const trendData = [
  {label:'월', val:52, color:'#22c55e'},
  {label:'화', val:68, color:'#f59e0b'},
  {label:'수', val:44, color:'#22c55e'},
  {label:'목', val:81, color:'#ef4444'},
  {label:'금', val:60, color:'#f59e0b'},
  {label:'토', val:58, color:'#f59e0b'},
  {label:'일', val:72, color:'#ef4444'},
];

const dcWeek = [
  {label:'월', val:58}, {label:'화', val:63}, {label:'수', val:67},
  {label:'목', val:71}, {label:'금', val:69}, {label:'토', val:70}, {label:'일', val:72},
];

const causes = [
  {icon:'☕', label:'카페인', val:'83%', color:'#ef4444'},
  {icon:'📱', label:'스마트폰', val:'71%', color:'#f59e0b'},
  {icon:'💤', label:'수면 부족', val:'65%', color:'#f59e0b'},
  {icon:'💼', label:'과로', val:'48%', color:'#6ee7f7'},
];

function Report() {
  const [week, setWeek] = useState('이번주');

  return (
    <div className="report-screen">
      {/* 헤더 */}
      <div className="report-header">
        <div style={{fontSize:'10px',color:'var(--accent2)',letterSpacing:'1px',marginBottom:'6px'}}>WEEKLY REPORT</div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'28px',lineHeight:1,marginBottom:'4px'}}>3월 3주차 리포트</div>
        <div style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',fontWeight:300}}>2026.03.11 ~ 03.17</div>
        <div style={{display:'flex',gap:'10px',marginTop:'14px'}}>
          {[{l:'평균 수면점수',v:'5.9',c:'#f59e0b'},{l:'평균 다크서클',v:'61%',c:'#ef4444'},{l:'개선 코칭 수',v:'21개',c:'var(--accent)'}].map(i => (
            <div key={i.l} style={{background:'rgba(255,255,255,0.05)',borderRadius:'10px',padding:'10px 16px',flex:1,textAlign:'center'}}>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginBottom:'4px'}}>{i.l}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'28px',color:i.c}}>{i.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 주차 선택 */}
      <div style={{display:'flex',gap:'6px',marginBottom:'14px'}}>
        {['이번주','지난주','이번달'].map(w => (
          <button key={w} className={`week-btn ${week===w?'sel':''}`} onClick={() => setWeek(w)}>{w}</button>
        ))}
      </div>

      {/* 피로도 트렌드 */}
      <div className="report-card">
        <div className="section-title" style={{marginBottom:'12px'}}>주간 피로도 트렌드</div>
        {trendData.map(t => (
          <div key={t.label} className="trend-row">
            <div className="trend-label">{t.label}요일</div>
            <div className="trend-bar">
              <div className="trend-fill" style={{width:`${t.val}%`,background:t.color}}></div>
            </div>
            <div className="trend-val" style={{color:t.color}}>{t.val}%</div>
          </div>
        ))}
      </div>

      {/* 원인 분석 */}
      <div className="report-card">
        <div className="section-title" style={{marginBottom:'12px'}}>주요 피로 원인 분석</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
          {causes.map(c => (
            <div key={c.label} style={{background:'var(--bg3)',borderRadius:'10px',padding:'12px',textAlign:'center'}}>
              <div style={{fontSize:'20px',marginBottom:'4px'}}>{c.icon}</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginBottom:'4px'}}>{c.label}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'24px',color:c.color}}>{c.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 다크서클 주간 트렌드 */}
      <div className="report-card" style={{borderColor:'rgba(239,68,68,0.15)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
          <div>
            <div className="section-title" style={{marginBottom:'2px'}}>👁 다크서클 주간 트렌드</div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',fontWeight:300}}>3일 연속 65% 초과 — 집중 케어 필요</div>
          </div>
          <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:'20px',padding:'4px 10px',fontSize:'10px',color:'#f87171'}}>위험</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'14px'}}>
          <svg viewBox="0 0 100 60" width="90" height="54" style={{flexShrink:0}}>
            <path d="M5 30 Q50 2 95 30 Q50 58 5 30 Z" fill="#e8e8f0" opacity="0.85"/>
            <ellipse cx="50" cy="42" rx="34" ry="12" fill="#7b1a2a" opacity="0.5"/>
            <circle cx="50" cy="30" r="16" fill="#1a3a6e"/>
            <circle cx="50" cy="30" r="8" fill="#050508"/>
            <circle cx="55" cy="26" r="3" fill="rgba(255,255,255,0.55)"/>
            <path d="M5 30 Q50 2 95 30" fill="none" stroke="#1a1a2a" strokeWidth="2"/>
          </svg>
          <div style={{flex:1}}>
            {dcWeek.map(r => {
              const c = r.val >= 65 ? '#ef4444' : r.val >= 50 ? '#f59e0b' : '#22c55e';
              return (
                <div key={r.label} className="trend-row" style={{marginBottom:'5px'}}>
                  <div className="trend-label">{r.label}요일</div>
                  <div className="trend-bar" style={{height:'5px'}}>
                    <div className="trend-fill" style={{width:`${r.val}%`,background:c}}></div>
                  </div>
                  <div className="trend-val" style={{color:c,fontSize:'12px'}}>{r.val}%</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:'10px',padding:'12px'}}>
          <div style={{fontSize:'11px',fontWeight:700,marginBottom:'6px',color:'#f87171'}}>♨️ 이번 주 추천 케어 루틴</div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {['취침 전 스팀 온열 안대 10분','기상 후 냉찜질 5분','수분 섭취 2L 이상'].map(t => (
              <div key={t} style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',background:'rgba(255,255,255,0.04)',padding:'5px 10px',borderRadius:'6px'}}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* AI 종합 평가 */}
      <div className="report-card">
        <div className="section-title" style={{marginBottom:'12px'}}>AI 종합 평가</div>
        <div style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.8,fontWeight:300}}>
          이번 주 수면 패턴을 분석한 결과, <span style={{color:'#f59e0b',fontWeight:500}}>카페인 섭취량</span>과 <span style={{color:'#f59e0b',fontWeight:500}}>스마트폰 사용시간</span>이 수면 질 저하의 주요 원인으로 확인됐어요.<br/><br/>
          특히 <span style={{color:'#ef4444',fontWeight:500}}>다크서클 지수가 3일 연속 65% 초과</span>해 눈 주변 혈액순환이 매우 저하된 상태예요. 온열·냉각 찜질 루틴과 함께 <span style={{color:'var(--accent)',fontWeight:500}}>오후 2시 이후 카페인 차단</span>을 최우선으로 실천해보세요.
        </div>
        <button style={{width:'100%',background:'rgba(167,139,250,0.1)',border:'1px solid rgba(167,139,250,0.3)',color:'var(--accent2)',padding:'12px',borderRadius:'10px',fontFamily:"'Noto Sans KR',sans-serif",fontSize:'13px',fontWeight:700,cursor:'pointer',marginTop:'14px'}}>
          📄 리포트 저장하기
        </button>
      </div>
    </div>
  );
}

export default Report;