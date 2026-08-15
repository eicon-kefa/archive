(function registerFlanker(registry) {
  const HORIZONTAL=[
    {value:'left',symbol:'←',label:'← 왼쪽'},
    {value:'right',symbol:'→',label:'오른쪽 →'}
  ];
  const ALL_DIRECTIONS=[
    ...HORIZONTAL,
    {value:'up',symbol:'↑',label:'↑ 위'},
    {value:'down',symbol:'↓',label:'아래 ↓'}
  ];
  const TARGET_POSITIONS=[
    {value:'left',label:'왼쪽'},
    {value:'center',label:'가운데'},
    {value:'right',label:'오른쪽'}
  ];

  function randomItem(items) {
    return items[Math.floor(Math.random()*items.length)];
  }

  function targetIndex(count,position) {
    if(position==='left')return 0;
    if(position==='right')return count-1;
    return Math.floor(count/2);
  }

  function rowStimulus(count,target,directions,position) {
    const focusIndex=targetIndex(count,position);
    const arrows=Array.from({length:count},(_,index)=>{
      if(index===focusIndex)return `<span class="flanker-target">${target.symbol}</span>`;
      const distractors=directions.filter(item=>item.value!==target.value);
      return `<span>${randomItem(distractors).symbol}</span>`;
    });
    return `<div class="flanker-row count-${count}">${arrows.join('')}</div>`;
  }

  function variedChoices(ctx,choices) {
    let ordered=ctx.shuffled(choices);
    const previous=ctx.state.session.data.flankerChoicePositions;
    if(previous&&ordered.length>1){
      for(let shift=0;shift<ordered.length;shift+=1){
        const candidate=[...ordered.slice(shift),...ordered.slice(0,shift)];
        const leftMoved=previous.left===undefined||candidate.findIndex(item=>item.value==='left')!==previous.left;
        const rightMoved=previous.right===undefined||candidate.findIndex(item=>item.value==='right')!==previous.right;
        if(leftMoved&&rightMoved){
          ordered=candidate;
          break;
        }
      }
    }
    ctx.state.session.data.flankerChoicePositions={
      left:ordered.findIndex(item=>item.value==='left'),
      right:ordered.findIndex(item=>item.value==='right')
    };
    return ordered;
  }

  registry.register({
    id:'flanker',
    age:'teen',
    title:'숨은 방향',
    original:'Hidden Direction',
    icon:'➸',
    target:'선택적 주의 · 시공간 처리',
    desc:'주변 화살표에 흔들리지 말고 지정된 위치의 화살표 방향을 찾아요.',
    research:{
      ko:'플랭커(Flanker) 과제를 기반으로 합니다. 지정된 목표 화살표 주변에 배치된 방해 화살표의 간섭을 억제하고 목표 위치에 주의를 고정하는 능력을 다룹니다.',
      en:'Based on the Flanker task, this activity requires suppressing interference from surrounding arrows and keeping attention fixed on the designated target position.',
      zh:'本活动基于Flanker侧抑制任务，要求玩家抑制周围干扰箭头的影响，并将注意保持在指定的目标位置上。'
    },
    paper:'Dye, M. W. G., Green, C. S., & Bavelier, D. (2009). The development of attention skills in action video game players. Neuropsychologia, 47(8–9), 1780–1789.',
    paperUrl:'https://pmc.ncbi.nlm.nih.gov/articles/PMC2680769/',
    type:'flanker',
    instruction:()=>'주변 화살표는 무시하고 문제에서 지정한 위치의 화살표 방향을 고르세요.',
    round(ctx) {
      const difficulty=ctx.state.session.difficulty;

      if(difficulty==='easy'){
        const target=randomItem(HORIZONTAL);
        const focus=randomItem(TARGET_POSITIONS);
        ctx.choiceStage(
          `${focus.label} 화살표만 보고 방향을 고르세요`,
          rowStimulus(3,target,HORIZONTAL,focus.value),
          variedChoices(ctx,HORIZONTAL),
          target.value
        );
        return;
      }

      if(difficulty==='medium'){
        const target=randomItem(HORIZONTAL);
        const focus=randomItem(TARGET_POSITIONS);
        ctx.choiceStage(
          `${focus.label} 화살표만 보고 방향을 고르세요`,
          rowStimulus(5,target,HORIZONTAL,focus.value),
          variedChoices(ctx,HORIZONTAL),
          target.value
        );
        return;
      }

      const target=randomItem(ALL_DIRECTIONS);
      const focus=randomItem(TARGET_POSITIONS);
      const focusIndex={left:3,center:4,right:5}[focus.value];
      const arrows=Array.from({length:9},(_,index)=>{
        if(index===focusIndex)return `<span class="flanker-target">${target.symbol}</span>`;
        const distractors=ALL_DIRECTIONS.filter(item=>item.value!==target.value);
        return `<span>${randomItem(distractors).symbol}</span>`;
      });
      ctx.choiceStage(
        `${focus.label} 화살표만 보고 방향을 고르세요`,
        `<div class="flanker-grid">${arrows.join('')}</div>`,
        variedChoices(ctx,ALL_DIRECTIONS),
        target.value
      );
    }
  });
})(window.DailyCogGames);
