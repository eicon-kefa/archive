(function registerPictureWordTreasure(registry) {
  const CONTENT={
    ko:{
      voice:'ko-KR',
      words:[
        {id:'telescope',word:'망원경',picture:'🔭',category:'도구',feature:'멀리 있는 것을 본다',place:'천문대',related:'별',sentence:'천문대에서 ___으로 달을 관찰했어요.'},
        {id:'umbrella',word:'우산',picture:'☂️',category:'생활용품',feature:'비를 막아 준다',place:'현관',related:'장화',sentence:'비가 와서 ___을 펼쳤어요.'},
        {id:'apple',word:'사과',picture:'🍎',category:'과일',feature:'먹어서 영양을 얻는다',place:'과수원',related:'나무',sentence:'간식으로 빨간 ___를 먹었어요.'},
        {id:'pencil',word:'연필',picture:'✏️',category:'학용품',feature:'글씨를 쓰거나 그림을 그린다',place:'교실',related:'지우개',sentence:'공책에 ___로 이름을 썼어요.'},
        {id:'clock',word:'시계',picture:'🕰️',category:'도구',feature:'시간을 알려 준다',place:'집',related:'약속',sentence:'벽에 걸린 ___를 보고 시간을 확인했어요.'},
        {id:'butterfly',word:'나비',picture:'🦋',category:'동물',feature:'날개로 날아다닌다',place:'정원',related:'꽃',sentence:'정원에서 예쁜 ___가 꽃에 앉았어요.'}
      ],
      prompts:{
        listen:'단어를 듣고 알맞은 그림을 고르세요',
        category:'이 단어는 어떤 범주에 속하나요?',
        feature:word=>`${word}은(는) 어떤 기능이나 특징이 있나요?`,
        place:word=>`${word}과(와) 관련 있는 장소는 어디인가요?`,
        related:word=>`${word}과(와) 가장 관련 있는 단어를 고르세요.`,
        sentence:'빈칸에 들어갈 알맞은 단어를 고르세요',
        recall:'조금 전에 배운 그림의 이름을 다시 찾아보세요',
        audioError:'이 브라우저에서 음성을 재생할 수 없어요.'
      }
    },
    en:{
      voice:'en-US',
      words:[
        {id:'telescope',word:'telescope',picture:'🔭',category:'tool',feature:'helps you see distant objects',place:'observatory',related:'stars',sentence:'At the observatory, I used a ___ to look at the moon.'},
        {id:'umbrella',word:'umbrella',picture:'☂️',category:'everyday item',feature:'keeps rain off you',place:'entryway',related:'rain boots',sentence:'It started raining, so I opened my ___.'},
        {id:'apple',word:'apple',picture:'🍎',category:'fruit',feature:'is food that gives you nutrients',place:'orchard',related:'tree',sentence:'I ate a red ___ for a snack.'},
        {id:'pencil',word:'pencil',picture:'✏️',category:'school supply',feature:'is used for writing or drawing',place:'classroom',related:'eraser',sentence:'I wrote my name with a ___.'},
        {id:'clock',word:'clock',picture:'🕰️',category:'tool',feature:'tells you the time',place:'home',related:'appointment',sentence:'I checked the time on the wall ___.'},
        {id:'butterfly',word:'butterfly',picture:'🦋',category:'animal',feature:'flies using its wings',place:'garden',related:'flower',sentence:'A pretty ___ landed on a flower.'}
      ],
      prompts:{
        listen:'Listen to the word and choose the matching picture.',
        category:'Which category does this word belong to?',
        feature:word=>`What is a ${word} used for or known for?`,
        place:word=>`Which place is related to ${word}?`,
        related:word=>`Choose the word most related to ${word}.`,
        sentence:'Choose the word that completes the sentence.',
        recall:'Recall the name of the picture you learned earlier.',
        audioError:'Audio playback is unavailable in this browser.'
      }
    },
    zh:{
      voice:'zh-CN',
      words:[
        {id:'telescope',word:'望远镜',picture:'🔭',category:'工具',feature:'观察远处的物体',place:'天文台',related:'星星',sentence:'在天文台，我用___观察月亮。'},
        {id:'umbrella',word:'雨伞',picture:'☂️',category:'生活用品',feature:'遮挡雨水',place:'门口',related:'雨靴',sentence:'下雨了，我撑开了___。'},
        {id:'apple',word:'苹果',picture:'🍎',category:'水果',feature:'食用后可以获得营养',place:'果园',related:'果树',sentence:'我吃了一个红色的___当点心。'},
        {id:'pencil',word:'铅笔',picture:'✏️',category:'学习用品',feature:'用来写字或画画',place:'教室',related:'橡皮',sentence:'我用___在本子上写名字。'},
        {id:'clock',word:'时钟',picture:'🕰️',category:'工具',feature:'告诉我们时间',place:'家里',related:'约定',sentence:'我看墙上的___确认时间。'},
        {id:'butterfly',word:'蝴蝶',picture:'🦋',category:'动物',feature:'用翅膀飞行',place:'花园',related:'花朵',sentence:'一只漂亮的___停在花朵上。'}
      ],
      prompts:{
        listen:'听词语并选择对应的图片。',
        category:'这个词属于哪个类别？',
        feature:word=>`${word}有什么功能或特征？`,
        place:word=>`哪个地点与${word}有关？`,
        related:word=>`选择与${word}最相关的词语。`,
        sentence:'选择适合填入空格的词语。',
        recall:'回想刚才学习的图片名称。',
        audioError:'此浏览器无法播放语音。'
      }
    }
  };

  function language(ctx) {
    const selected=ctx.state.settings&&ctx.state.settings.language;
    return CONTENT[selected]||CONTENT.en;
  }

  function speak(ctx,text,content) {
    try{
      if(!window.speechSynthesis||typeof window.SpeechSynthesisUtterance!=='function')return;
      window.speechSynthesis.cancel();
      const utterance=new SpeechSynthesisUtterance(text);
      utterance.lang=content.voice;
      utterance.rate=ctx.state.session.difficulty==='hard'?.9:.78;
      window.speechSynthesis.speak(utterance);
    }catch(error){
      ctx.toast(content.prompts.audioError);
    }
  }

  function choiceCount(ctx) {
    return ctx.state.session.difficulty==='easy'?2:ctx.state.session.difficulty==='hard'?4:3;
  }

  function fieldChoices(ctx,content,entry,field) {
    const wrong=ctx.shuffled(content.words.filter(item=>item.id!==entry.id).map(item=>item[field])
      .filter((value,index,values)=>values.indexOf(value)===index));
    return ctx.shuffled([entry[field],...wrong.slice(0,choiceCount(ctx)-1)])
      .map(value=>({value,label:value}));
  }

  function activeWord(ctx,content) {
    const s=ctx.state.session;
    const block=Math.floor((s.round-1)/6);
    s.data.pictureWordBlocks=s.data.pictureWordBlocks||[];
    if(!s.data.pictureWordBlocks[block]){
      const previous=s.data.pictureWordBlocks[block-1];
      const pool=content.words.filter(item=>!previous||item.id!==previous.id);
      const selected=pool[Math.floor(Math.random()*pool.length)];
      s.data.pictureWordBlocks[block]={id:selected.id,learnedAt:Date.now()};
    }
    return content.words.find(item=>item.id===s.data.pictureWordBlocks[block].id)||content.words[0];
  }

  registry.register({
    id:'pictureword',
    age:'adult',
    title:'단어 탐험가',
    original:'Word Explorer',
    icon:'🗺️',
    target:'수용어휘 · 표현어휘 · 의미기억',
    desc:'한 단어를 소리·그림·범주·특징·문장으로 연결해 깊이 있게 익혀요.',
    research:{
      ko:'Snodgrass와 Vanderwart의 표준화 그림 자극 및 그림 이름대기 패러다임에 근거합니다. 시각 자극을 의미 체계와 연결하고 알맞은 단어를 인출하며 어휘·범주·의미지식을 다룹니다.',
      en:'Grounded in standardized picture stimuli and picture-naming paradigms from Snodgrass and Vanderwart, this activity connects visual objects with semantic knowledge and retrieves the appropriate word, engaging vocabulary, categories, and meaning.',
      zh:'本活动依据Snodgrass与Vanderwart的标准化图片刺激和图片命名范式，将视觉对象连接到语义知识并提取正确词语，主要涉及词汇、类别与意义。'
    },
    paper:'Snodgrass, J. G., & Vanderwart, M. (1980). A standardized set of 260 pictures: Norms for name agreement, image agreement, familiarity, and visual complexity. Journal of Experimental Psychology: Human Learning and Memory, 6(2), 174–215.',
    paperUrl:'https://psycnet.apa.org/record/1981-06756-001',
    type:'language',
    recommendationDomain:'language',
    measurements:['수용어휘 정확도','표현어휘 인출률','의미특징 연결 정확도','지연 후 유지율','새 문장 적용률'],
    instruction:()=>'단어를 듣고 그림과 의미를 여러 방법으로 연결해 보세요.',
    round(ctx) {
      const content=language(ctx),s=ctx.state.session,entry=activeWord(ctx,content),phase=(s.round-1)%6;
      if(phase===0){
        const entries=ctx.shuffled([entry,...ctx.shuffled(content.words.filter(item=>item.id!==entry.id)).slice(0,choiceCount(ctx)-1)]);
        ctx.choiceStage(content.prompts.listen,'🔊',entries.map(item=>({value:item.id,label:item.picture})),entry.id);
        setTimeout(()=>s.finished||s.locked?null:speak(ctx,entry.word,content),80);
        return;
      }
      if(phase===1){
        ctx.choiceStage(content.prompts.category,`${entry.picture} ${entry.word}`,fieldChoices(ctx,content,entry,'category'),entry.category);
        return;
      }
      if(phase===2){
        ctx.choiceStage(content.prompts.feature(entry.word),entry.picture,fieldChoices(ctx,content,entry,'feature'),entry.feature);
        return;
      }
      if(phase===3){
        const field=s.difficulty==='easy'?'place':Math.random()>.5?'place':'related';
        ctx.choiceStage(content.prompts[field](entry.word),entry.picture,fieldChoices(ctx,content,entry,field),entry[field]);
        return;
      }
      if(phase===4){
        ctx.choiceStage(content.prompts.sentence,entry.sentence,fieldChoices(ctx,content,entry,'word'),entry.word);
        return;
      }
      ctx.choiceStage(content.prompts.recall,entry.picture,fieldChoices(ctx,content,entry,'word'),entry.word);
    }
  });
})(window.DailyCogGames);
