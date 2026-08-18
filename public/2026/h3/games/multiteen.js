(function registerMultitask(registry) {
  const COLORS={orange:'#ea8757',blue:'#5f87d7',green:'#59a982'};
  const SHAPES=['circle','square','triangle'];
  const LANE_LABELS={left:'왼쪽',right:'오른쪽'};

  function signalSvg(signal,className) {
    const color=COLORS[signal.color];
    const geometry=signal.shape==='circle'
      ? `<circle cx="50" cy="50" r="29" fill="${color}"></circle>`
      : signal.shape==='square'
        ? `<rect x="22" y="22" width="56" height="56" rx="7" fill="${color}"></rect>`
        : `<polygon points="50,18 82,78 18,78" fill="${color}"></polygon>`;
    return `<svg class="drive-signal ${className||''}" viewBox="0 0 100 100" aria-hidden="true">${geometry}</svg>`;
  }

  function allSignals(colors,shapes) {
    const result=[];
    colors.forEach(color=>shapes.forEach(shape=>result.push({color,shape})));
    return result;
  }

  function sameSignal(first,second,matchShape) {
    return first.color===second.color&&(!matchShape||first.shape===second.shape);
  }

  function pickSignal(ctx,target,candidates,shouldMatch,matchShape) {
    if(shouldMatch)return {...target};
    const alternatives=candidates.filter(signal=>!sameSignal(signal,target,matchShape));
    return {...ctx.shuffled(alternatives)[0]};
  }

  function choiceLabel(lane,respond) {
    return `${LANE_LABELS[lane]} · ${respond?'응답':'응답 안 함'}`;
  }

  function roadScene(lanes,currentLane,signal,difficulty) {
    return `<div class="drive-lane-scene ${difficulty}" role="img" aria-label="자동차가 ${LANE_LABELS[currentLane]} 차선에 있는 도로">
      <div class="drive-current-signal"><span>현재 신호</span>${signalSvg(signal,'live-signal')}</div>
      <div class="drive-lanes" style="--drive-lanes:${lanes.length}">
        ${lanes.map(lane=>`<div class="drive-lane ${lane===currentLane?'current':''}">
          <span class="drive-lane-marker"></span>
          ${lane===currentLane?'<span class="drive-car" aria-hidden="true">🚙</span>':''}
          <small>${LANE_LABELS[lane]}</small>
        </div>`).join('')}
      </div>
    </div>`;
  }

  registry.register({
    id:'multiteen',
    age:'teen',
    title:'멀티태스킹 드라이브',
    original:'NeuroRacer 방식 인지제어',
    icon:'🛣️',
    target:'인지 제어 · 유연성',
    desc:'주행 경로를 지키면서 나타나는 표적 신호에도 반응해요.',
    research:{
      ko:'주행 과제와 신호 판단 과제를 동시에 유지하는 이중 과제 구조를 사용합니다. 두 목표를 함께 기억하고 필요한 순간에 반응 자원을 배분해야 하므로 작업기억 용량과 인지적 통제를 다룹니다.',
      en:'This dual-task structure combines continuous driving with signal decisions. Keeping both goals active and allocating responses at the right moment engages working-memory capacity and cognitive control.',
      zh:'该双任务结构同时包含持续驾驶和信号判断。玩家需要保持两个目标，并在适当时刻分配反应资源，因此主要涉及工作记忆容量与认知控制。'
    },
    paper:'Anguera, J. A., et al. (2013). Video game training enhances cognitive control in older adults. Nature, 501(7465), 97–101.',
    paperUrl:'https://escholarship.org/uc/item/6dv9c9gc',
    type:'multitask',
    instruction:()=>'자동차가 있는 차선을 확인하면서 현재 신호가 표적인지도 동시에 판단하세요.',
    round(ctx) {
      const s=ctx.state.session,d=s.difficulty;
      const lanes=['left','right'];
      const currentLane=ctx.shuffled(lanes)[0];
      const shouldMatch=Math.random()>.5;
      let target,signal,matchShape,candidates;

      if(d==='easy'){
        target={color:'orange',shape:'circle'};
        matchShape=false;
        candidates=allSignals(['orange','blue'],['circle']);
      }else if(d==='medium'){
        target={color:'orange',shape:'circle'};
        matchShape=true;
        candidates=allSignals(['orange','blue'],['circle','square']);
      }else{
        candidates=allSignals(['orange','blue','green'],SHAPES);
        if(!s.data.driveTarget||s.round%3===1)s.data.driveTarget={...ctx.shuffled(candidates)[0]};
        target=s.data.driveTarget;
        matchShape=true;
      }

      signal=pickSignal(ctx,target,candidates,shouldMatch,matchShape);
      const respond=sameSignal(signal,target,matchShape);
      const correct=`${currentLane}-${respond?'respond':'pass'}`;
      const choices=ctx.shuffled(lanes.reduce((result,lane)=>result.concat([
        {value:`${lane}-respond`,label:choiceLabel(lane,true)},
        {value:`${lane}-pass`,label:choiceLabel(lane,false)}
      ]),[]));
      const stimulus=`<div class="drive-task ${d}">
        <div class="drive-target-card"><span>이번 표적</span>${signalSvg(target,'target-signal')}<small>${d==='easy'?'색깔만 확인':d==='medium'?'색깔과 모양 확인':'표적이 3라운드마다 변경'}</small></div>
        <div class="drive-scene">${roadScene(lanes,currentLane,signal,d)}</div>
      </div>`;
      ctx.choiceStage('자동차 차선과 표적 신호를 동시에 판단하세요',stimulus,choices,correct);
    }
  });
})(window.DailyCogGames);
