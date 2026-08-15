(function registerBoard(registry) {
  function flipCard(ctx,index) {
    const s=ctx.state.session,data=s.data;
    if(data.open.includes(index)||data.matched.includes(index)||s.locked)return;
    data.open.push(index);
    ctx.$$('[data-card]')[index].textContent=data.deck[index];
    if(data.open.length!==2)return;
    s.locked=true;
    s.auto=setTimeout(()=>{
      if(s.finished)return;
      const [first,second]=data.open;
      data.pairAttempts=(Number(data.pairAttempts)||0)+1;
      if(data.deck[first]===data.deck[second]){
        data.matched.push(first,second);
        data.pairMatches=(Number(data.pairMatches)||0)+1;
      }
      data.open=[];
      s.locked=false;
      ctx.$('#liveScore').textContent=ctx.calculateScore();
      if(data.matched.length===data.deck.length)ctx.finishGame();
      else registry.get('board').round(ctx);
    },650*ctx.difficulties[s.difficulty].pace);
  }

  registry.register({
    id:'board',
    age:'senior',
    title:'기억 짝 맞추기',
    original:'디지털 인지 보드게임',
    icon:'♟',
    target:'기억 · 인지적 예비능',
    desc:'카드를 뒤집어 같은 그림의 위치를 기억하고 짝을 찾아요.',
    research:{
      ko:'카드 짝 맞추기 형태로, 어느 위치에(Where) 무슨 카드(What)가 있었는가를 연결하여 기억하는 대표적인 위치–대상 연상기억 과제입니다.',
      en:'Presented as a card-matching activity, this is a representative location–object associative-memory task that links where each card appeared with what the card was.',
      zh:'本活动采用卡片配对形式，是典型的位置—对象联想记忆任务，需要把每张卡片出现在哪里与它是什么联系起来记忆。'
    },
    paper:'Postma, A., Kessels, R. P. C., & van Asselen, M. (2008). How the brain remembers and forgets where things are: The neurocognition of object-location memory. Neuroscience & Biobehavioral Reviews, 32(8), 1339–1345.',
    paperUrl:'https://pubmed.ncbi.nlm.nih.gov/18562002/',
    type:'memory',
    instruction:()=>'같은 그림 카드의 짝을 모두 찾아요.',
    round(ctx) {
      const s=ctx.state.session;
      if(!s.data.deck){
        const pairCount=ctx.difficulties[s.difficulty].memoryPairs;
        s.total=1;
        const values=['🌿','☀️','🍎','🦋','🌙','🐳'].slice(0,pairCount);
        s.data.deck=ctx.shuffled([...values,...values]);
        s.data.open=[];
        s.data.matched=[];
        s.data.pairAttempts=0;
        s.data.pairMatches=0;
      }
      const pairs=s.data.deck.length/2;
      ctx.$('#roundLabel').textContent='짝 찾기';
      ctx.$('#progressBar').style.width=`${s.data.matched.length/s.data.deck.length*100}%`;
      ctx.$('#stage').innerHTML=`<div class="stage-inner"><h2>같은 그림의 짝을 찾아요</h2><div class="choice-grid" style="grid-template-columns:repeat(${pairs>4?4:pairs},1fr)">${s.data.deck.map((value,index)=>`<button class="choice-btn" data-card="${index}" style="font-size:28px">${s.data.matched.includes(index)?value:'?'}</button>`).join('')}</div><div class="feedback">찾은 짝 ${s.data.matched.length/2} / ${pairs}</div></div>`;
      ctx.$$('[data-card]').forEach(button=>button.onclick=()=>flipCard(ctx,Number(button.dataset.card)));
    }
  });
})(window.DailyCogGames);
