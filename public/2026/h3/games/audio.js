(function registerAudio(registry) {
  function playTone(ctx,freq) {
    try{
      const audioContext=new (window.AudioContext||window.webkitAudioContext)();
      const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
      oscillator.frequency.value=freq;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(.12,audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.35);
      oscillator.start();
      oscillator.stop(audioContext.currentTime+.36);
    }catch(error){
      ctx.toast('이 브라우저에서 소리를 재생할 수 없어요.');
    }
  }

  registry.register({
    id:'audio',
    age:'senior',
    title:'소리 기억 산책',
    original:'Auditory Processing',
    icon:'♫',
    target:'언어 기억 · 집중력',
    desc:'들려주는 음의 높낮이 순서를 기억하고 그대로 맞춰요.',
    research:{
      ko:'툴빙의 일화기억 이론은 경험을 무엇·어디서·언제의 맥락과 함께 인출하는 기억으로 설명합니다. 이 간이 활동은 그중 소리의 순서라는 시간적 맥락을 기억하고 다시 인출하는 부분을 연습합니다.',
      en:'Tulving’s episodic-memory framework describes remembering experiences with what, where, and when context. This simplified activity practices one limited component of that framework by encoding and retrieving the temporal order of sounds.',
      zh:'图尔文的情景记忆理论强调在“什么、哪里、何时”的情境中提取经历。本简化活动练习其中较有限的一部分，即记住并提取声音出现的时间顺序。'
    },
    paper:'Tulving, E. (2002). Episodic memory: From mind to brain. Annual Review of Psychology, 53, 1–25.',
    paperUrl:'https://www.annualreviews.org/content/journals/10.1146/annurev.psych.53.100901.135114',
    type:'audio',
    instruction:()=>'재생된 음의 순서를 기억해 눌러요.',
    round(ctx) {
      const s=ctx.state.session,config=ctx.difficulties[s.difficulty],length=config.audioLength,interval=500*config.pace;
      const sequence=Array.from({length},()=>Math.random()>.5?'high':'low');
      s.data.audio=[];
      ctx.$('#stage').innerHTML=`<div class="stage-inner"><h2>${length}개의 음을 기억하세요</h2><div class="stimulus">♫</div><p id="audioText">소리를 재생합니다…</p><div class="choice-grid"><button class="choice-btn" data-tone="low" disabled>낮은 음 ♪</button><button class="choice-btn" data-tone="high" disabled>높은 음 ♫</button></div><div class="feedback"></div></div>`;
      sequence.forEach((tone,index)=>s.queuedTimers.push(setTimeout(()=>{if(!s.finished)playTone(ctx,tone==='high'?660:330);},index*interval)));
      s.timer=setTimeout(()=>{
        if(s.finished)return;
        ctx.$('#audioText').textContent='들은 순서대로 눌러주세요';
        ctx.$$('[data-tone]').forEach(button=>{
          button.disabled=false;
          button.onclick=()=>{
            playTone(ctx,button.dataset.tone==='high'?660:330);
            s.data.audio.push(button.dataset.tone);
            if(s.data.audio.length===length)ctx.answer(s.data.audio.join()===sequence.join());
          };
        });
      },length*interval+100);
    }
  });
})(window.DailyCogGames);
