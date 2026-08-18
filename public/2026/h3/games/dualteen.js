(function registerDualTeen(registry) {
  registry.register({
    id:'dualteen',
    age:'teen',
    title:'듀얼 N-백',
    original:'Dual N-Back',
    icon:'▦',
    target:'작업기억 · 유체지능',
    desc:'위치와 문자가 이전 자극과 같은지 동시에 기억해요.',
    research:{
      ko:'N단계 전의 위치와 소리·문자 자극을 계속 기억하고 갱신하는 과제입니다. 정보를 유지하면서 새 자극과 비교해야 하므로 중앙 집행기, 음운 정보와 시공간 정보를 아우르는 작업기억을 집중적으로 사용합니다.',
      en:'This task requires continuously maintaining and updating location and sound or letter cues from N steps earlier. Holding information while comparing it with each new cue places sustained demands on working memory across executive, verbal, and visuospatial components.',
      zh:'该任务要求持续保持并更新N步之前的位置与声音或字母线索。玩家需要一边保存信息一边与新刺激比较，因此会集中运用中央执行、语音和视空间工作记忆。'
    },
    paper:'Jaeggi, S. M., et al. (2008). Improving fluid intelligence with training on working memory. PNAS, 105(19), 6829–6833.',
    paperUrl:'https://www.pnas.org/doi/pdf/10.1073/pnas.0801268105',
    type:'nback',
    instruction:({config})=>config.nBack===2?'두 단계 전의 위치 또는 문자가 같으면 눌러요.':'한 단계 전의 위치 또는 문자가 같으면 눌러요.',
    round(ctx) {
      const s=ctx.state.session,n=ctx.difficulties[s.difficulty].nBack;
      const positions=s.difficulty==='easy'?['↖','↗','↙','↘']:['↖','↑','↗','←','●','→','↙','↓','↘'];
      const letters=s.difficulty==='easy'?['A','B']:s.difficulty==='medium'?['A','B','C','D']:['A','B','C','D','E','F'];
      const history=s.data.history||(s.data.history=[]),reference=history.length>=n?history[history.length-n]:null;
      let pos=positions[Math.floor(Math.random()*positions.length)],letter=letters[Math.floor(Math.random()*letters.length)];
      if(reference&&Math.random()>.55){if(Math.random()>.5)pos=reference.pos;else letter=reference.letter;}
      const matches=reference&&(pos===reference.pos||letter===reference.letter);
      history.push({pos,letter});
      if(!reference){
        ctx.$('#stage').innerHTML=`<div class="stage-inner"><h2>첫 자극을 기억하세요</h2><div class="stimulus">${pos} ${letter}</div><div class="feedback">${n===2?'두 단계 뒤 자극과 비교해요':'다음 자극과 비교해요'}</div></div>`;
        s.timer=setTimeout(ctx.nextRound,950*ctx.difficulties[s.difficulty].pace);
        return;
      }
      ctx.choiceStage(`${n===2?'두':'한'} 단계 전과 같은 요소가 있나요?`,`${pos} ${letter}`,[{value:'yes',label:'하나라도 같음'},{value:'no',label:'모두 다름'}],matches?'yes':'no');
    }
  });
})(window.DailyCogGames);
