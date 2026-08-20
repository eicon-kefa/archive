const AGE_GROUPS = {
  child: { label: '유아', range: '4–12세', icon: '🧩', desc: '놀이로 익히는 집중과 자기조절', color: '#e8def8' },
  teen: { label: '청소년', range: '13–29세', icon: '⚡', desc: '도전하며 키우는 기억과 주의력', color: '#eee5fb' },
  adult: { label: '성인', range: '30–64세', icon: '◒', desc: '바쁜 일상 속 인지 체력 관리', color: '#ddd2f2' },
  senior: { label: '노인', range: '65세 이상', icon: '🌿', desc: '편안하게 지키는 두뇌 건강 습관', color: '#f1eafa' }
};
const AGE_BANDS = Object.freeze([
  {id:'child',min:4,max:12},
  {id:'teen',min:13,max:29},
  {id:'adult',min:30,max:64},
  {id:'senior',min:65,max:120}
]);

if(!window.DailyCogGames)throw new Error('게임 레지스트리를 불러오지 못했습니다.');
const GAMES=window.DailyCogGames.grouped();
const ALL_GAMES=Object.values(GAMES).flat();

const DIFFICULTIES = {
  easy: { label:'쉬움', rounds:6, seconds:90, pace:1.3, responseMs:8000, nBack:1, memoryPairs:3, audioLength:2, flankerCount:3 },
  medium: { label:'중간', rounds:8, seconds:60, pace:1, responseMs:5200, nBack:1, memoryPairs:4, audioLength:3, flankerCount:5 },
  hard: { label:'어려움', rounds:9, seconds:55, pace:.86, responseMs:4500, nBack:2, memoryPairs:6, audioLength:4, flankerCount:7 }
};
const ASSESSMENT_GAME_IDS = [
  'dccs','gonogo','audio','ufovadult','multiteen','dualteen',
  'htks','ufovsenior','flanker','board','pictureword','soundletter'
];
const ASSESSMENT_GAMES = ASSESSMENT_GAME_IDS.map(id=>ALL_GAMES.find(game=>game.id===id)).filter(Boolean);
const COGNITIVE_DOMAINS = [
  {id:'executive',label:'집행기능',color:'#9a78d0'},
  {id:'attention',label:'주의력',color:'#7298d8'},
  {id:'workingMemory',label:'작업기억',color:'#72bca6'},
  {id:'processingSpeed',label:'처리속도',color:'#e7a05e'},
  {id:'episodicMemory',label:'일화기억',color:'#dc7894'},
  {id:'language',label:'언어능력',color:'#8392cf'}
];
const ASSESSMENT_WEIGHTS = {
  dccs:{executive:1},
  htks:{executive:1},
  dualteen:{workingMemory:1},
  multiteen:{workingMemory:1},
  gonogo:{processingSpeed:1},
  ufovadult:{processingSpeed:1},
  ufovsenior:{attention:1},
  flanker:{attention:1},
  audio:{episodicMemory:1},
  board:{episodicMemory:1},
  pictureword:{language:1},
  soundletter:{language:1}
};
const COGNITIVE_DOMAIN_GAMES = Object.freeze({
  executive:['dccs','htks'],
  workingMemory:['dualteen','multiteen'],
  processingSpeed:['gonogo','ufovadult'],
  attention:['ufovsenior','flanker'],
  episodicMemory:['audio','board'],
  language:['pictureword','soundletter']
});
const PICTURE_WORD_TREASURES = [
  {
    word:'망원경',image:'🔭',category:'도구',function:'멀리 있는 것을 본다',place:'천문대',
    related:['별','행성','관찰'],sentence:'천문대에서 ___으로 달을 관찰했어요.',
    pictures:['🔭','🧲','🎻','🪜'],categories:['도구','동물','음식','탈것'],
    functions:['멀리 있는 것을 본다','소리를 크게 낸다','길이를 잰다','종이를 자른다']
  },
  {
    word:'우산',image:'☂️',category:'생활용품',function:'비를 막아 준다',place:'현관',
    related:['비','구름','장화'],sentence:'비가 내려서 ___을 펼쳤어요.',
    pictures:['☂️','🧤','🎒','🪁'],categories:['생활용품','동물','음식','식물'],
    functions:['비를 막아 준다','손을 따뜻하게 한다','물을 끓인다','시간을 알려 준다']
  },
  {
    word:'체온계',image:'🌡️',category:'의료 도구',function:'몸의 온도를 잰다',place:'병원',
    related:['열','건강','의사'],sentence:'열이 나는지 ___으로 확인했어요.',
    pictures:['🌡️','🧯','🔦','🧹'],categories:['의료 도구','악기','과일','탈것'],
    functions:['몸의 온도를 잰다','어두운 곳을 비춘다','바닥을 청소한다','소리를 녹음한다']
  },
  {
    word:'칫솔',image:'🪥',category:'생활용품',function:'이를 닦는다',place:'욕실',
    related:['치약','이','양치'],sentence:'잠자기 전에 ___로 이를 깨끗이 닦았어요.',
    pictures:['🪥','🖌️','🥄','🔑'],categories:['생활용품','동물','채소','건물'],
    functions:['이를 닦는다','문을 연다','음식을 젓는다','그림을 자른다']
  },
  {
    word:'나침반',image:'🧭',category:'도구',function:'방향을 알려 준다',place:'등산로',
    related:['북쪽','지도','길'],sentence:'산에서 길을 찾으려고 ___을 확인했어요.',
    pictures:['🧭','⏰','📷','⚽'],categories:['도구','음식','동물','옷'],
    functions:['방향을 알려 준다','사진을 인화한다','시간을 멈춘다','공기를 따뜻하게 한다']
  }
];
const SOUND_LETTER_BRIDGE_TASKS = [
  {id:'vowel',kind:'자음·모음 구별',instruction:'다음 중 모음을 고르세요.',display:'모음 찾기',choices:['ㅁ','ㄴ','ㅏ','ㄹ'],answer:'ㅏ',metric:'letterSound'},
  {id:'sound',kind:'글자-소리 대응',instruction:'들리는 소리에 맞는 글자를 고르세요.',spoken:'가',display:'🔊 소리를 들어보세요',choices:['가','나','다','라'],answer:'가',metric:'letterSound'},
  {id:'batchim',kind:'받침 유무 구별',instruction:'들리는 소리와 같은 글자를 고르세요.',spoken:'달',display:'받침 소리 구별',choices:['다','달','닥','단'],answer:'달',metric:'letterSound'},
  {id:'blend',kind:'음절 조합',instruction:'두 음절을 순서대로 합친 단어를 고르세요.',spoken:'가, 방',display:'가 + 방',choices:['가방','방가','가봉','방아'],answer:'가방',metric:'syllableBlend'},
  {id:'picture',kind:'단어와 그림 연결',instruction:'들리는 단어와 맞는 그림을 고르세요.',spoken:'사과',display:'🔊 단어를 들어보세요',choices:['🍎','🍌','🍇','🥕'],answer:'🍎',metric:'letterSound'},
  {id:'real',kind:'실제 단어 판별',instruction:'실제로 사용하는 단어를 고르세요.',display:'진짜 단어 찾기',choices:['나무','무나','누마','마누'],answer:'나무',metric:'realWord'},
  {id:'sentence',kind:'짧은 문장 읽기',instruction:'문장 속에서 들려주는 목표 단어를 찾으세요.',spoken:'학교',display:'나는 아침에 학교에 갑니다.',choices:['나는','아침','학교','갑니다'],answer:'학교',metric:'reading'}
];
const DAILY_STAR_GOAL = 9;
const DOG_ADULT_UPGRADE_COST = 100;
const DOG_FINAL_UPGRADE_COST = 100;
const ASSESSMENT_INTERVAL_WEEKS = 8;
const COLOR_THEMES = [
  {id:'red',label:'빨간색',color:'#a85d6c'},
  {id:'orange',label:'주황색',color:'#a06436'},
  {id:'yellow',label:'노란색',color:'#877228'},
  {id:'green',label:'초록색',color:'#527b63'},
  {id:'blue',label:'파란색',color:'#52739e'},
  {id:'lavender',label:'라벤더',color:'#67558f'},
  {id:'white',label:'흰색',color:'#f4f4f2'},
  {id:'black',label:'검정색',color:'#17191d'}
];
const COUNTRY_CODES = 'AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW'.split(' ');
const FONT_PREVIEW_CHARACTERS = {ko:'가',en:'A',zh:'文'};
const SHOP_ITEMS = [
  {id:'lavender_cap',slot:'hat',name:'라벤더 캡',asset:'lavender-cap.png',price:3},
  {id:'party_hat',slot:'hat',name:'파티 모자',asset:'party-hat.png',price:6},
  {id:'gold_crown',slot:'hat',name:'황금 왕관',asset:'gold-crown-natural.png',price:12},
  {id:'sunglasses',slot:'glasses',name:'멋쟁이 선글라스',asset:'sunglasses.png',price:5},
  {id:'round_glasses',slot:'glasses',name:'동그란 안경',asset:'round-glasses-no-temples.png',previewAsset:'assets/dog/accessories/round-glasses-natural.png',price:7},
  {id:'lavender_scarf',slot:'scarf',name:'라벤더 목도리',asset:'lavender-scarf.png',price:4},
  {id:'star_scarf',slot:'scarf',name:'별빛 목도리',asset:'star-scarf.png',price:9}
];
const SHOP_SLOTS = {hat:'모자',glasses:'안경',scarf:'목도리'};
const DOG_BREED = {id:'retriever',name:'골든 리트리버',image:'assets/dog/daily-cog-dog-happy.png'};
const LEGACY_BREED_PRICES = {beagle:8,poodle:10,chihuahua:12};
const DOG_TREATS = [
  {id:'biscuit',name:'별 쿠키',asset:'star-cookie.png',price:1,minutes:5,desc:'바삭한 한입 간식'},
  {id:'chicken',name:'닭고기 육포',asset:'chicken-jerky.png',price:2,minutes:10,desc:'든든하고 고소한 간식'},
  {id:'cake',name:'행복 컵케이크',asset:'happy-cupcake.png',price:3,minutes:15,desc:'오래 행복해지는 특별 간식'}
];
const DOG_HUNGER_DELAY_MS = 24*60*60*1000;

function normalizeShopState(value) {
  const shop=value&&typeof value==='object'?value:{};
  const owned=Array.isArray(shop.owned)?shop.owned.filter(id=>SHOP_ITEMS.some(item=>item.id===id)):[];
  const breedRefund=Array.isArray(shop.ownedBreeds)
    ? [...new Set(shop.ownedBreeds)].reduce((sum,id)=>sum+(LEGACY_BREED_PRICES[id]||0),0)
    : 0;
  const equipped={};
  Object.keys(SHOP_SLOTS).forEach(slot=>{
    const id=shop.equipped&&shop.equipped[slot];
    if(owned.includes(id)&&SHOP_ITEMS.some(item=>item.id===id&&item.slot===slot)) equipped[slot]=id;
  });
  return {
    owned:[...new Set(owned)],
    treats:Object.fromEntries(DOG_TREATS.map(treat=>[treat.id,Math.max(0,Math.floor(Number(shop.treats&&shop.treats[treat.id])||0))])),
    fedUntil:Number(shop.fedUntil)||0,
    lastTreat:DOG_TREATS.some(treat=>treat.id===shop.lastTreat)?shop.lastTreat:null,
    growthStage:['baby','adult','final'].includes(shop.growthStage)?shop.growthStage:'baby',
    equipped,
    spent:Math.max(0,(Number(shop.spent)||0)-breedRefund)
  };
}

function normalizeSmartNote(value) {
  const note=value&&typeof value==='object'?value:{};
  return {
    content:String(note.content||'').slice(0,10000),
    pinned:Boolean(note.pinned),
    collapsed:Boolean(note.collapsed),
    open:Boolean(note.pinned),
    view:null
  };
}

function normalizeAssessment(value) {
  const source=value&&typeof value==='object'?value:{};
  const scores={};
  Object.entries(source.scores||{}).forEach(([id,score])=>{
    if(ASSESSMENT_GAME_IDS.includes(id)&&Number.isFinite(Number(score))){
      scores[id]=Math.max(0,Math.min(100,Math.round(Number(score))));
    }
  });
  return {
    scores,
    attemptId:Math.max(0,Math.floor(Number(source.attemptId)||0)),
    startedAt:typeof source.startedAt==='string'?source.startedAt:null,
    completedAt:typeof source.completedAt==='string'?source.completedAt:null,
    active:false
  };
}

const SUPABASE_CONFIG = window.DAILY_COG_CONFIG || {};
const SUPABASE_CONFIGURED = Boolean(
  SUPABASE_CONFIG.supabaseUrl &&
  SUPABASE_CONFIG.supabasePublishableKey &&
  !SUPABASE_CONFIG.supabaseUrl.startsWith('YOUR_') &&
  !SUPABASE_CONFIG.supabasePublishableKey.startsWith('YOUR_')
);
const SUPABASE_ENABLED = SUPABASE_CONFIGURED && window.supabase && window.supabase.createClient;
const db = SUPABASE_ENABLED
  ? window.supabase.createClient(SUPABASE_CONFIG.supabaseUrl, SUPABASE_CONFIG.supabasePublishableKey)
  : null;

const LOCAL_ACCOUNTS_KEY = 'dcCredentials';
const LEGACY_CREDENTIAL_KEY = 'dcCredential';
const LOCAL_ACCOUNT_PREFIX = 'dcAccount:';
const SMART_NOTE_PREFIX = 'dcSmartNote:';
const FLASHCARD_PREFIX = 'dcFlashcards:';
const emptyLocalAccountData = () => ({ age:null, birthDate:null, country:null, scores:{}, gameSessions:[], difficulties:{}, settings:null, avatarUrl:null, shop:normalizeShopState(null), smartNote:normalizeSmartNote(null), assessment:normalizeAssessment(null), flashcards:[], guardianLinks:[] });
const localEmail = email => String(email || '').trim().toLowerCase();
const localAccountKey = email => `${LOCAL_ACCOUNT_PREFIX}${encodeURIComponent(localEmail(email))}`;
const smartNoteKey = user => `${SMART_NOTE_PREFIX}${encodeURIComponent(String((user&&user.id)||(user&&user.email)||'guest'))}`;
const flashcardKey = user => `${FLASHCARD_PREFIX}${encodeURIComponent(String((user&&user.id)||(user&&user.email)||'guest'))}`;

function normalizeFlashcards(value) {
  if(!Array.isArray(value))return [];
  const seen=new Set();
  return value.slice(0,500).map((item,index)=>{
    if(!item||typeof item!=='object')return null;
    const front=String(item.front||'').trim().slice(0,500);
    const back=String(item.back||'').trim().slice(0,1000);
    if(!front||!back)return null;
    let id=String(item.id||`card-${Date.now()}-${index}`).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80);
    if(!id||seen.has(id))id=`card-${Date.now()}-${index}`;
    seen.add(id);
    const createdAt=/^\d{4}-\d{2}-\d{2}T/.test(String(item.createdAt||''))?item.createdAt:new Date().toISOString();
    const reviewSource=item.review&&typeof item.review==='object'?item.review:{};
    const dueAt=/^\d{4}-\d{2}-\d{2}T/.test(String(reviewSource.dueAt||''))?reviewSource.dueAt:null;
    const lastReviewedAt=/^\d{4}-\d{2}-\d{2}T/.test(String(reviewSource.lastReviewedAt||''))?reviewSource.lastReviewedAt:null;
    return {
      id,
      front,
      back,
      category:String(item.category||'일반').trim().slice(0,40)||'일반',
      createdAt,
      updatedAt:/^\d{4}-\d{2}-\d{2}T/.test(String(item.updatedAt||''))?item.updatedAt:createdAt,
      review:{
        intervalDays:Math.max(0,Math.min(365,Number(reviewSource.intervalDays)||0)),
        repetitions:Math.max(0,Math.floor(Number(reviewSource.repetitions)||0)),
        dueAt,
        lastReviewedAt
      }
    };
  }).filter(Boolean);
}

function normalizeGuardianLinks(value) {
  if(!Array.isArray(value))return [];
  return [...new Set(value.map(item=>localEmail(typeof item==='string'?item:item&&item.id)).filter(Boolean))].slice(0,50);
}

function resolveLocalGuardianChildren(links) {
  return normalizeGuardianLinks(links).map(email=>{
    const credential=readLocalCredential(email);
    if(!credential)return null;
    const account=readLocalAccountData(email,false);
    const birthDate=typeof account.birthDate==='string'?account.birthDate:null;
    return {
      id:email,
      email,
      name:credential.name||email.split('@')[0],
      birthDate,
      ageGroup:ageGroupFromBirthDate(birthDate)||account.age||null,
      linkedAt:null,
      learnedToday:(account.gameSessions||[]).some(session=>{
        const playedAt=new Date(session.completedAt);
        const today=new Date();
        return !Number.isNaN(playedAt.getTime())
          &&playedAt.getFullYear()===today.getFullYear()
          &&playedAt.getMonth()===today.getMonth()
          &&playedAt.getDate()===today.getDate();
      })
    };
  }).filter(Boolean);
}

function readJsonStorage(key, fallback) {
  try {
    const value=JSON.parse(localStorage.getItem(key) || 'null');
    return value === null ? fallback : value;
  } catch(error) { return fallback; }
}

function readLocalAccountData(email, migrateLegacy=false) {
  const key=localAccountKey(email);
  const stored=readJsonStorage(key,null);
  if(stored) return {...emptyLocalAccountData(),...stored};
  if(!migrateLegacy) return emptyLocalAccountData();
  const migrated={
    age:localStorage.getItem('dcAge'),
    birthDate:null,
    country:null,
    scores:readJsonStorage('dcScores',{}),
    gameSessions:readJsonStorage('dcGameSessions',[]),
    difficulties:readJsonStorage('dcDifficulties',{}),
    settings:readJsonStorage('dcSettings',null),
    avatarUrl:null,
    shop:normalizeShopState(null),
    smartNote:normalizeSmartNote(null),
    assessment:normalizeAssessment(null),
    flashcards:[],
    guardianLinks:[]
  };
  localStorage.setItem(key,JSON.stringify(migrated));
  ['dcAge','dcScores','dcGameSessions','dcDifficulties'].forEach(item=>localStorage.removeItem(item));
  return migrated;
}

const initialLocalUser = SUPABASE_ENABLED ? null : readJsonStorage('dcUser',null);
const initialLocalData = initialLocalUser && initialLocalUser.email
  ? readLocalAccountData(initialLocalUser.email,true)
  : emptyLocalAccountData();
function readSavedSettings() {
  return initialLocalData.settings || readJsonStorage('dcSettings',{});
}
const savedSettings = readSavedSettings();
function readSavedDifficulties() {
  return initialLocalData.difficulties || {};
}

const state = {
  screen: SUPABASE_ENABLED ? 'loading' : (initialLocalUser ? (initialLocalData.age ? 'dashboard' : 'age') : 'auth'),
  authMode: 'login',
  user: SUPABASE_ENABLED ? null : initialLocalUser,
  age: SUPABASE_ENABLED ? null : initialLocalData.age,
  selectedAge: SUPABASE_ENABLED ? null : initialLocalData.age,
  birthDate: SUPABASE_ENABLED ? null : initialLocalData.birthDate,
  country: SUPABASE_ENABLED ? null : initialLocalData.country,
  currentGame: null,
  session: null,
  scores: SUPABASE_ENABLED ? {} : initialLocalData.scores,
  gameSessions: SUPABASE_ENABLED ? [] : initialLocalData.gameSessions,
  userDashboardUi: {growthMode:'game',growthKey:null,growthPeriod:'week'},
  assessment: SUPABASE_ENABLED ? normalizeAssessment(null) : normalizeAssessment(initialLocalData.assessment),
  flashcards: SUPABASE_ENABLED ? [] : normalizeFlashcards(initialLocalData.flashcards),
  flashcardUi: {search:'',category:'all',sort:'recent',flippedId:null,play:null},
  guardianLinks: SUPABASE_ENABLED ? [] : normalizeGuardianLinks(initialLocalData.guardianLinks),
  guardianChildren: [],
  guardianFeatureError: null,
  selectedChildId: null,
  childActivity: null,
  childActivityError: null,
  childActivityRequestId: 0,
  childBenchmarks: null,
  childBenchmarksLoading: false,
  childBenchmarksError: null,
  childBenchmarksChildId: null,
  childAiReports: {},
  childGrowthUiByChild: {},
  careOverview: {incoming:[],outgoing:[],connections:[]},
  careOverviewLoading: false,
  careOverviewError: null,
  careSearch: {email:'',targetRole:'child',loading:false,result:null,error:null},
  shop: SUPABASE_ENABLED ? normalizeShopState(null) : normalizeShopState(initialLocalData.shop),
  smartNote: SUPABASE_ENABLED ? normalizeSmartNote(null) : normalizeSmartNote(initialLocalData.smartNote),
  isAdmin: false,
  adminData: null,
  adminError: null,
  adminUserDetail: null,
  difficulties: readSavedDifficulties(),
  settings: {
    language: ['ko','en','zh'].includes(savedSettings.language) ? savedSettings.language : 'en',
    fontSize: ['small','medium','large'].includes(savedSettings.fontSize) ? savedSettings.fontSize : 'medium',
    theme: COLOR_THEMES.some(theme=>theme.id===savedSettings.theme) ? savedSettings.theme : 'lavender',
    emailNotifications: Boolean(savedSettings.emailNotifications)
  }
};
if(!SUPABASE_ENABLED&&initialLocalUser){
  state.guardianChildren=resolveLocalGuardianChildren(state.guardianLinks);
}

function persistCurrentLocalAccount() {
  if(SUPABASE_ENABLED || !state.user || !state.user.email) return;
  localStorage.setItem(localAccountKey(state.user.email),JSON.stringify({
    age:state.age,
    birthDate:state.birthDate,
    country:state.country,
    scores:state.scores,
    gameSessions:state.gameSessions,
    difficulties:state.difficulties,
    settings:state.settings,
    avatarUrl:state.user.avatarUrl || null,
    shop:state.shop,
    smartNote:state.smartNote,
    assessment:state.assessment,
    flashcards:state.flashcards,
    guardianLinks:state.guardianLinks
  }));
  localStorage.setItem('dcUser',JSON.stringify(state.user));
}

function loadLocalAccountState(email) {
  const data=readLocalAccountData(email,false);
  state.birthDate=normalizeBirthDateValue(data.birthDate);
  const automaticAgeGroup=ageGroupFromBirthDate(state.birthDate);
  state.age=automaticAgeGroup||data.age;
  state.selectedAge=state.age;
  state.country=COUNTRY_CODES.includes(data.country)?data.country:null;
  state.scores=data.scores || {};
  state.gameSessions=data.gameSessions || [];
  state.assessment=normalizeAssessment(data.assessment);
  state.flashcards=normalizeFlashcards(data.flashcards);
  state.flashcardUi={search:'',category:'all',sort:'recent',flippedId:null,play:null};
  state.guardianLinks=normalizeGuardianLinks(data.guardianLinks);
  state.guardianChildren=resolveLocalGuardianChildren(state.guardianLinks);
  state.guardianFeatureError=null;
  state.selectedChildId=null;
  state.childActivity=null;
  state.childActivityError=null;
  state.childBenchmarks=null;
  state.childBenchmarksLoading=false;
  state.childBenchmarksError=null;
  state.childBenchmarksChildId=null;
  state.childAiReports={};
  state.childGrowthUiByChild={};
  state.careOverview={incoming:[],outgoing:[],connections:[]};
  state.careOverviewLoading=false;
  state.careOverviewError=null;
  state.careSearch={email:'',targetRole:'child',loading:false,result:null,error:null};
  state.difficulties=data.difficulties || {};
  state.shop=normalizeShopState(data.shop);
  state.smartNote=normalizeSmartNote(data.smartNote);
  if(data.settings){
    state.settings.language=['ko','en','zh'].includes(data.settings.language)?data.settings.language:'en';
    state.settings.fontSize=['small','medium','large'].includes(data.settings.fontSize)?data.settings.fontSize:'medium';
    state.settings.theme=COLOR_THEMES.some(theme=>theme.id===data.settings.theme)?data.settings.theme:'lavender';
    state.settings.emailNotifications=Boolean(data.settings.emailNotifications);
  } else { state.settings.language='en'; state.settings.fontSize='medium'; state.settings.theme='lavender'; state.settings.emailNotifications=false; }
  state.user.avatarUrl=data.avatarUrl || null;
}

function setInitialAuthScreen() {
  state.screen = 'auth';
  state.settings.language = 'en';
  state.settings.theme = 'lavender';
}

if (!SUPABASE_ENABLED && state.screen === 'auth') setInitialAuthScreen();

const app = document.querySelector('#app');
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHtml = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
function researchBackgroundHtml(game) {
  const localizedResearch=game&&game.research&&typeof game.research==='object'
    ? (game.research[state.settings.language]||game.research.en||game.research.ko||'')
    : (game&&game.research||'');
  const summary=localizedResearch?`<p class="research-summary">${escapeHtml(localizedResearch)}</p>`:'';
  const citation=escapeHtml(game&&game.paper||'');
  const url=String(game&&game.paperUrl||'').trim();
  if(!/^https:\/\/[^\s]+$/i.test(url))return `${summary}<p class="citation">${citation}</p>`;
  return `${summary}<a class="citation research-citation" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"><span>${citation}</span><b>원문 보기 ↗</b></a>`;
}
let dogFedResetTimer = null;
let presenceTimer = null;
let accessLogSessionId = null;
let accessLogStartedAt = null;
let accessLogAvailable = true;
let automaticAgeTimer = null;
let assessmentDueTimer = null;

function countryDisplayName(code) {
  const locale=state.settings.language==='ko'?'ko-KR':state.settings.language==='zh'?'zh-CN':'en-US';
  try {
    return new Intl.DisplayNames([locale],{type:'region'}).of(code)||code;
  } catch(error) {
    return code;
  }
}

function countryOptionsHtml(selectedCode) {
  const placeholder={ko:'나라를 선택해 주세요',en:'Select your country',zh:'请选择国家'}[state.settings.language]||'Select your country';
  const options=COUNTRY_CODES.map(code=>({code,name:countryDisplayName(code)}))
    .sort((a,b)=>a.name.localeCompare(b.name));
  return `<option value="">${placeholder}</option>${options.map(item=>`<option value="${item.code}" ${selectedCode===item.code?'selected':''}>${escapeHtml(item.name)}</option>`).join('')}`;
}

function dateInputValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function normalizeBirthDateValue(value) {
  const match=String(value||'').trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(!match)return null;
  const year=Number(match[1]),month=Number(match[2]),day=Number(match[3]);
  const date=new Date(year,month-1,day);
  if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return null;
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function birthDateLimits() {
  const today=new Date();
  const latest=new Date(today.getFullYear()-4,today.getMonth(),today.getDate());
  const earliest=new Date(today.getFullYear()-120,today.getMonth(),today.getDate());
  return {min:dateInputValue(earliest),max:dateInputValue(latest)};
}

function ageFromBirthDate(birthDate, today=new Date()) {
  const normalized=normalizeBirthDateValue(birthDate);
  if(!normalized)return null;
  const [year,month,day]=normalized.split('-').map(Number);
  let age=today.getFullYear()-year;
  if(today.getMonth()<month-1||(today.getMonth()===month-1&&today.getDate()<day))age-=1;
  return age;
}

function ageGroupFromAge(age) {
  if(!Number.isInteger(age))return null;
  const band=AGE_BANDS.find(item=>age>=item.min&&age<=item.max);
  return band?band.id:null;
}

function ageGroupFromBirthDate(birthDate,today=new Date()) {
  return ageGroupFromAge(ageFromBirthDate(birthDate,today));
}

function validServiceBirthDate(birthDate) {
  return Boolean(ageGroupFromBirthDate(birthDate));
}

function currentUserAgeGroup() {
  return ageGroupFromBirthDate(state.birthDate);
}

function gamesForCurrentUser() {
  const ageGroup=currentUserAgeGroup();
  return ageGroup&&Array.isArray(GAMES[ageGroup])
    ? GAMES[ageGroup].filter(game=>game.age===ageGroup)
    : [];
}

function stableRecommendationIndex(salt,length) {
  if(!length)return 0;
  const identity=`${(state.user&&state.user.id)||(state.user&&state.user.email)||'daily-cog'}:${salt}`;
  let hash=0;
  for(let index=0;index<identity.length;index+=1)hash=((hash<<5)-hash+identity.charCodeAt(index))|0;
  return Math.abs(hash)%length;
}

function rotatedRecommendationGames(ids,salt) {
  const games=ids.map(id=>ALL_GAMES.find(game=>game.id===id)).filter(Boolean);
  if(!games.length)return [];
  const offset=stableRecommendationIndex(salt,games.length);
  return [...games.slice(offset),...games.slice(0,offset)];
}

function homeGameRecommendations() {
  const ageGames=gamesForCurrentUser();
  if(!assessmentIsComplete()){
    return ageGames.slice(0,3).map(game=>({game,kind:'age',domain:null}));
  }
  const assessmentCycle=Math.max(1,Number(state.assessment.attemptId)||1);
  const domainScores=calculateCognitiveDomains();
  const rankedDomains=COGNITIVE_DOMAINS.slice().sort((a,b)=>{
    const scoreDifference=(domainScores[a.id]||0)-(domainScores[b.id]||0);
    return scoreDifference||COGNITIVE_DOMAINS.findIndex(item=>item.id===a.id)-COGNITIVE_DOMAINS.findIndex(item=>item.id===b.id);
  });
  const weakest=rankedDomains[0];
  let weakGames=rotatedRecommendationGames(
    COGNITIVE_DOMAIN_GAMES[weakest.id]||[],
    `${weakest.id}:assessment:${assessmentCycle}`
  ).slice(0,2);
  let weakSelections=weakGames.map(game=>({game,domain:weakest}));
  const selectedIds=new Set(weakGames.map(game=>game.id));
  const ageCandidates=ageGames.filter(game=>!selectedIds.has(game.id));
  let ageGame=ageCandidates[stableRecommendationIndex(
    `age:${currentUserAgeGroup()}:assessment:${assessmentCycle}`,
    ageCandidates.length
  )]||ageGames.find(game=>!selectedIds.has(game.id));
  if(!ageGame&&ageGames.length){
    ageGame=ageGames[stableRecommendationIndex(
      `age:${currentUserAgeGroup()}:assessment:${assessmentCycle}`,
      ageGames.length
    )];
    const weakCandidates=[];
    const seenIds=new Set([ageGame.id]);
    rankedDomains.forEach(domain=>{
      rotatedRecommendationGames(
        COGNITIVE_DOMAIN_GAMES[domain.id]||[],
        `${domain.id}:assessment:${assessmentCycle}`
      ).forEach(game=>{
        if(!seenIds.has(game.id)){
          seenIds.add(game.id);
          weakCandidates.push({game,domain});
        }
      });
    });
    weakSelections=weakCandidates.slice(0,2);
    weakGames=weakSelections.map(item=>item.game);
  }
  const recommendations=weakSelections.map(item=>({game:item.game,kind:'weak',domain:item.domain}));
  if(ageGame)recommendations.push({game:ageGame,kind:'age',domain:null});
  return recommendations.slice(0,3);
}

function isCurrentHomeRecommendation(gameId) {
  return homeGameRecommendations().some(item=>item.game.id===gameId);
}

function synchronizeCurrentAgeGroup() {
  if(!state.user||!state.birthDate)return false;
  const normalizedBirthDate=normalizeBirthDateValue(state.birthDate);
  if(!normalizedBirthDate)return false;
  state.birthDate=normalizedBirthDate;
  state.user.birthDate=normalizedBirthDate;
  const nextAgeGroup=ageGroupFromBirthDate(state.birthDate);
  if(!nextAgeGroup||nextAgeGroup===state.age)return false;
  state.age=nextAgeGroup;
  state.selectedAge=nextAgeGroup;
  if(state.currentGame&&!state.assessment.active&&state.currentGame.age!==nextAgeGroup){
    clearSessionTimers();
    state.currentGame=null;
    state.session=null;
  }
  if(SUPABASE_ENABLED){
    db.from('profiles').update({
      age_group:nextAgeGroup,
      updated_at:new Date().toISOString()
    }).eq('id',state.user.id).then(result=>{if(result.error)console.error(result.error);});
  }else{
    persistCurrentLocalAccount();
  }
  return true;
}

function scheduleAutomaticAgeRefresh() {
  clearTimeout(automaticAgeTimer);
  if(!state.user||!state.birthDate)return;
  const now=new Date();
  const nextMidnight=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,2);
  automaticAgeTimer=setTimeout(async()=>{
    const nextAgeGroup=ageGroupFromBirthDate(state.birthDate);
    if(synchronizeCurrentAgeGroup()){
      if(['dashboard','userDashboard'].includes(state.screen))render();
      toast(`${AGE_GROUPS[nextAgeGroup].label} 맞춤 게임으로 자동 변경되었습니다.`);
    }
    scheduleAutomaticAgeRefresh();
  },Math.max(1000,nextMidnight.getTime()-now.getTime()));
}

function localizedAuthMessage(key) {
  const language = state.settings.language;
  const messages = {
    emailRateLimit: {
      ko: 'Supabase 이메일 발송 한도를 초과했어요. 회원가입 버튼을 반복해서 누르지 말고 약 1시간 후 한 번만 다시 시도해 주세요.',
      en: 'The Supabase email sending limit has been reached. Do not repeatedly submit; please try once more in about an hour.',
      zh: '已达到 Supabase 邮件发送上限。请勿重复提交，并在大约一小时后仅重试一次。'
    },
    directSignupNotEnabled: {
      ko: 'Supabase에서 Confirm email을 꺼야 즉시 회원가입할 수 있어요.',
      en: 'Turn off Confirm email in Supabase to enable instant sign-up.',
      zh: '请在 Supabase 中关闭 Confirm email 以启用即时注册。'
    },
    invalidCredentials: {
      ko: '이메일 또는 비밀번호가 가입할 때 입력한 정보와 일치하지 않습니다.',
      en: 'The email or password does not match the information used when signing up.',
      zh: '邮箱或密码与注册时输入的信息不一致。'
    },
    alreadyRegistered: {
      ko: '이미 가입된 이메일입니다. 회원가입이 아닌 로그인 탭을 이용해 주세요.',
      en: 'This email is already registered. Please use the Sign in tab.',
      zh: '该邮箱已注册，请使用登录选项卡。'
    },
    authFailed: {
      ko: '인증 중 문제가 발생했습니다.',
      en: 'There was a problem with authentication.',
      zh: '身份验证时出现问题。'
    }
  };
  return (messages[key] && (messages[key][language] || messages[key].en)) || messages.authFailed[language] || messages.authFailed.en;
}

function authErrorMessage(error) {
  const code = String(error && error.code || '').toLowerCase();
  const message = String(error && error.message || '').toLowerCase();
  if (code === 'over_email_send_rate_limit' || message.includes('email rate limit') || message.includes('rate limit exceeded')) {
    return localizedAuthMessage('emailRateLimit');
  }
  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return localizedAuthMessage('invalidCredentials');
  }
  if (code === 'user_already_exists' || message.includes('already registered')) {
    return localizedAuthMessage('alreadyRegistered');
  }
  return (error && error.message) || localizedAuthMessage('authFailed');
}

function applyDisplaySettings() {
  document.documentElement.dataset.fontSize = state.settings.fontSize;
  document.documentElement.dataset.theme = state.settings.theme || 'lavender';
  if (window.DailyCogI18n) window.DailyCogI18n.apply(document.body, state.settings.language);
}

let translationQueued = false;
new MutationObserver(() => {
  if (translationQueued) return;
  translationQueued = true;
  queueMicrotask(() => { translationQueued = false; applyDisplaySettings(); });
}).observe(document.body, { childList: true, subtree: true });

function authUserToAppUser(authUser, profile) {
  const metadata = authUser.user_metadata || {};
  const birthDate=normalizeBirthDateValue((profile&&profile.birth_date)||metadata.birth_date);
  return {
    id: authUser.id,
    email: authUser.email,
    name: (profile && profile.name) || metadata.name || authUser.email.split('@')[0] || '사용자',
    avatarPath: (profile && profile.avatar_path) || null,
    avatarUrl: null,
    birthDate
  };
}

async function createAvatarUrl(path) {
  if (!SUPABASE_ENABLED || !path) return null;
  const result = await db.storage.from('profile-avatars').createSignedUrl(path, 3600);
  if (result.error) { console.error(result.error); return null; }
  return result.data.signedUrl;
}

async function refreshGuardianChildren() {
  if(!state.user){
    state.guardianChildren=[];
    state.guardianFeatureError=null;
    return false;
  }
  if(!SUPABASE_ENABLED){
    state.guardianChildren=resolveLocalGuardianChildren(state.guardianLinks);
    state.guardianFeatureError=null;
    return true;
  }
  const previousChildren=new Map(state.guardianChildren.map(child=>[child.id,child]));
  const linksResult=await db.from('guardian_links')
    .select('child_id, created_at')
    .eq('guardian_id',state.user.id)
    .order('created_at',{ascending:true});
  if(linksResult.error){
    state.guardianLinks=[];
    state.guardianChildren=[];
    state.guardianFeatureError=linksResult.error;
    console.warn('Guardian links are unavailable until the latest Supabase schema is applied.',linksResult.error);
    return false;
  }
  state.guardianFeatureError=null;
  const links=linksResult.data||[];
  const childIds=links.map(item=>item.child_id).filter(Boolean);
  state.guardianLinks=childIds;
  if(!childIds.length){
    state.guardianChildren=[];
    return true;
  }
  const todayStart=new Date();todayStart.setHours(0,0,0,0);
  const tomorrowStart=new Date(todayStart);tomorrowStart.setDate(tomorrowStart.getDate()+1);
  const [profilesResult,todaySessionsResult]=await Promise.all([
    db.from('profiles').select('id, name, age_group, birth_date').in('id',childIds),
    db.from('game_sessions').select('user_id').in('user_id',childIds)
      .gte('completed_at',todayStart.toISOString()).lt('completed_at',tomorrowStart.toISOString())
  ]);
  if(profilesResult.error){
    console.error(profilesResult.error);
    state.guardianChildren=links.map(link=>previousChildren.get(link.child_id)||{
      id:link.child_id,
      email:null,
      name:'자녀',
      birthDate:null,
      ageGroup:null,
      linkedAt:link.created_at||null
    });
    return false;
  }
  if(todaySessionsResult.error)console.error('Could not load today learning status.',todaySessionsResult.error);
  const learnedTodayIds=new Set((todaySessionsResult.data||[]).map(session=>session.user_id));
  const profilesById=new Map((profilesResult.data||[]).map(profile=>[profile.id,profile]));
  state.guardianChildren=links.map(link=>{
    const profile=profilesById.get(link.child_id);
    if(!profile){
      const fallback=previousChildren.get(link.child_id)||{
        id:link.child_id,
        email:null,
        name:'자녀',
        birthDate:null,
        ageGroup:null,
        linkedAt:link.created_at||null
      };
      return {...fallback,learnedToday:learnedTodayIds.has(link.child_id)};
    }
    return {
      id:profile.id,
      email:null,
      name:profile.name||'자녀',
      birthDate:profile.birth_date||null,
      ageGroup:ageGroupFromBirthDate(profile.birth_date)||profile.age_group||null,
      linkedAt:link.created_at||null,
      learnedToday:learnedTodayIds.has(profile.id)
    };
  });
  if(state.selectedChildId&&!state.guardianChildren.some(child=>child.id===state.selectedChildId)){
    state.selectedChildId=null;
    state.childActivity=null;
    state.childBenchmarks=null;
    state.childBenchmarksError=null;
    state.childBenchmarksChildId=null;
  }
  const linkedChildIds=new Set(state.guardianChildren.map(child=>child.id));
  Object.keys(state.childAiReports).forEach(childId=>{if(!linkedChildIds.has(childId))delete state.childAiReports[childId];});
  return true;
}

async function loadRemoteState(authUser) {
  const results = await Promise.all([
    db.from('profiles').select('name, age_group, birth_date, country_code, language, font_size, theme_color, email_notifications_enabled, avatar_path, shop_state, smart_note').eq('id', authUser.id).maybeSingle(),
    db.from('game_scores').select('game_id, best_score, play_count, last_played'),
    db.from('game_sessions').select('game_id, difficulty, score, accuracy, stars, duration_seconds, completed_at').order('completed_at',{ascending:false}).limit(1000),
    db.from('profiles').select('flashcards').eq('id',authUser.id).maybeSingle()
  ]);
  let profileResult = results[0];
  const scoresResult = results[1];
  let sessionsResult = results[2];
  const flashcardsResult = results[3];
  // 최신 설정 열을 아직 추가하지 않은 기존 프로젝트에서도 로그인은 유지합니다.
  if (profileResult.error) {
    profileResult = await db.from('profiles').select('name, age_group, birth_date, country_code, language, font_size, avatar_path, shop_state').eq('id', authUser.id).maybeSingle();
  }
  if (profileResult.error) {
    profileResult = await db.from('profiles').select('name, age_group, language, font_size, avatar_path, shop_state').eq('id', authUser.id).maybeSingle();
  }
  if (profileResult.error) throw profileResult.error;
  if (scoresResult.error) throw scoresResult.error;
  if(sessionsResult.error&&/accuracy/i.test(String(sessionsResult.error.message||sessionsResult.error.details||''))){
    sessionsResult=await db.from('game_sessions')
      .select('game_id, difficulty, score, stars, duration_seconds, completed_at')
      .order('completed_at',{ascending:false}).limit(1000);
  }
  const profile = profileResult.data;
  state.user = authUserToAppUser(authUser, profile);
  state.user.avatarUrl = await createAvatarUrl(state.user.avatarPath);
  state.age = profile && profile.age_group;
  state.selectedAge = state.age;
  state.birthDate = normalizeBirthDateValue((profile&&profile.birth_date)||(authUser.user_metadata&&authUser.user_metadata.birth_date));
  state.user.birthDate=state.birthDate;
  state.country = profile && COUNTRY_CODES.includes(profile.country_code) ? profile.country_code : null;
  state.shop = normalizeShopState(profile && profile.shop_state);
  const cachedNote=readJsonStorage(smartNoteKey(authUser),null);
  state.smartNote=normalizeSmartNote((profile&&profile.smart_note)||cachedNote);
  const cachedFlashcards=normalizeFlashcards(readJsonStorage(flashcardKey(authUser),[]));
  const remoteFlashcards=normalizeFlashcards(
    flashcardsResult&&!flashcardsResult.error&&flashcardsResult.data
      ? flashcardsResult.data.flashcards
      : []
  );
  state.flashcards=remoteFlashcards.length?remoteFlashcards:cachedFlashcards;
  state.flashcardUi={search:'',category:'all',sort:'recent',flippedId:null,play:null};
  if (profile && ['ko','en','zh'].includes(profile.language)) state.settings.language = profile.language;
  if (profile && ['small','medium','large'].includes(profile.font_size)) state.settings.fontSize = profile.font_size;
  if (profile && COLOR_THEMES.some(theme=>theme.id===profile.theme_color)) state.settings.theme = profile.theme_color;
  state.settings.emailNotifications=Boolean(profile&&profile.email_notifications_enabled);
  localStorage.setItem('dcSettings', JSON.stringify(state.settings));
  state.scores = {};
  const assessmentRows=(scoresResult.data||[]).filter(row=>String(row.game_id).startsWith('assessment:'));
  const assessmentMeta=assessmentRows.find(row=>row.game_id==='assessment:meta');
  const assessmentAttempt=Math.max(0,Number(assessmentMeta&&assessmentMeta.play_count)||0);
  const assessmentScores={};
  assessmentRows.forEach(row=>{
    const gameId=String(row.game_id).slice('assessment:'.length);
    if(gameId!=='meta'&&ASSESSMENT_GAME_IDS.includes(gameId)&&(!assessmentAttempt||Number(row.play_count)===assessmentAttempt)){
      assessmentScores[gameId]=Math.max(0,Math.min(100,Math.round(Number(row.best_score)||0)));
    }
  });
  state.assessment=normalizeAssessment({
    scores:assessmentScores,
    attemptId:assessmentAttempt,
    startedAt:assessmentMeta&&assessmentMeta.last_played,
    completedAt:Object.keys(assessmentScores).length===ASSESSMENT_GAMES.length
      ? (assessmentMeta&&assessmentMeta.last_played)||new Date().toISOString()
      : null
  });
  (scoresResult.data || []).forEach(row => {
    if(String(row.game_id).startsWith('assessment:'))return;
    state.scores[row.game_id] = { best: row.best_score, plays: row.play_count, last: row.last_played };
  });
  state.gameSessions = sessionsResult.error ? [] : (sessionsResult.data || []).map(row => ({
    gameId:row.game_id, difficulty:row.difficulty, score:row.score,
    accuracy:row.accuracy===null||row.accuracy===undefined?null:row.accuracy, stars:row.stars,
    durationSeconds:row.duration_seconds, completedAt:row.completed_at
  }));
  if (sessionsResult.error) console.error(sessionsResult.error);
  const adminResult = await db.rpc('current_user_is_admin');
  state.isAdmin = !adminResult.error && adminResult.data === true;
  await refreshGuardianChildren();
  const automaticAgeGroup=ageGroupFromBirthDate(state.birthDate);
  if(automaticAgeGroup){
    if(state.age!==automaticAgeGroup){
      const ageUpdate=await db.from('profiles').upsert({
        id:authUser.id,
        age_group:automaticAgeGroup,
        birth_date:state.birthDate,
        updated_at:new Date().toISOString()
      },{onConflict:'id'});
      if(ageUpdate.error)console.error(ageUpdate.error);
    }
    state.age=automaticAgeGroup;
    state.selectedAge=automaticAgeGroup;
  }else{
    state.age=null;
    state.selectedAge=null;
  }
  state.screen=state.birthDate&&state.age
    ? (assessmentIsDue()?'assessment':'dashboard')
    : 'birthdate';
  startPresenceHeartbeat();
  scheduleAutomaticAgeRefresh();
  scheduleAssessmentDueRefresh();
}

async function sendPresenceHeartbeat() {
  if (!SUPABASE_ENABLED || !state.user) return false;
  const now = new Date().toISOString();
  const result = await db.from('user_presence').upsert({
    user_id: state.user.id,
    last_seen_at: now,
    current_screen: state.screen
  }, { onConflict:'user_id' });
  if (result.error) { console.error(result.error); return false; }
  if(accessLogAvailable&&accessLogSessionId){
    const accessResult=await db.from('user_access_logs').upsert({
      session_id:accessLogSessionId,
      user_id:state.user.id,
      signed_in_at:accessLogStartedAt,
      last_seen_at:now,
      signed_out_at:null,
      current_screen:state.screen
    },{onConflict:'session_id'});
    if(accessResult.error){
      const message=String(accessResult.error.message||'').toLowerCase();
      if(accessResult.error.code==='42P01'||message.includes('user_access_logs'))accessLogAvailable=false;
      else console.error(accessResult.error);
    }
  }
  return true;
}

function startPresenceHeartbeat() {
  clearInterval(presenceTimer);
  clearTimeout(automaticAgeTimer);
  accessLogSessionId=`${Date.now()}-${Math.random().toString(36).slice(2,12)}`;
  accessLogStartedAt=new Date().toISOString();
  accessLogAvailable=true;
  sendPresenceHeartbeat();
  presenceTimer = setInterval(sendPresenceHeartbeat, 45000);
}

async function markPresenceOffline() {
  clearInterval(presenceTimer);
  if (!SUPABASE_ENABLED || !state.user) return;
  const now=new Date().toISOString();
  if(accessLogAvailable&&accessLogSessionId){
    const accessResult=await db.from('user_access_logs').update({
      last_seen_at:now,
      signed_out_at:now,
      current_screen:'signed_out'
    }).eq('session_id',accessLogSessionId).eq('user_id',state.user.id);
    if(accessResult.error)console.error(accessResult.error);
  }
  const result = await db.from('user_presence').update({
    last_seen_at:'1970-01-01T00:00:00.000Z',
    current_screen:'signed_out'
  }).eq('user_id',state.user.id);
  if(result.error) console.error(result.error);
  accessLogSessionId=null;
  accessLogStartedAt=null;
}

async function initializeApp() {
  if (!SUPABASE_ENABLED) {
    render();
    if (SUPABASE_CONFIGURED) toast('Supabase SDK를 불러오지 못해 로컬 모드로 실행합니다.');
    return;
  }
  render();
  try {
    const result = await db.auth.getSession();
    if (result.error) throw result.error;
    if (result.data.session) await loadRemoteState(result.data.session.user);
    else setInitialAuthScreen();
  } catch (error) {
    console.error(error);
    setInitialAuthScreen();
    toast('Supabase 연결을 확인해 주세요.');
  }
  render();
}

function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}

function avatarHtml(user, className) {
  const classes = className || 'avatar';
  return user.avatarUrl
    ? `<span class="${classes}"><img src="${escapeHtml(user.avatarUrl)}" alt="프로필 사진"></span>`
    : `<span class="${classes}">${escapeHtml((user.name || 'U')[0])}</span>`;
}

function sideIconSvg(name) {
  const icons={
    home:'<path d="M3.5 10.5 12 3l8.5 7.5"></path><path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7"></path>',
    shop:'<path d="M5 8h14l-1 13H6L5 8Z"></path><path d="M8 8a4 4 0 0 1 8 0M9 12h6"></path>',
    dashboard:'<rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect>',
    flashcards:'<rect x="3" y="6" width="18" height="13" rx="3"></rect><path d="M3 10h18M8 15h2M14 15h2"></path>',
    children:'<circle cx="9" cy="8" r="3"></circle><circle cx="17" cy="10" r="2.5"></circle><path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M14 15.5a4.5 4.5 0 0 1 6.5 4"></path>',
    settings:'<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.06.06-2.76 2.76-.06-.06a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1.1 1.65V21H10v-.09A1.8 1.8 0 0 0 8.9 19.3a1.8 1.8 0 0 0-2 .36l-.06.06-2.76-2.76.06-.06a1.8 1.8 0 0 0 .36-2A1.8 1.8 0 0 0 2.85 13H2.8V9h.05A1.8 1.8 0 0 0 4.5 7.9a1.8 1.8 0 0 0-.36-2l-.06-.06 2.76-2.76.06.06a1.8 1.8 0 0 0 2 .36A1.8 1.8 0 0 0 10 1.85V1.8h4v.05a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 2-.36l.06-.06 2.76 2.76-.06.06a1.8 1.8 0 0 0-.36 2A1.8 1.8 0 0 0 21.15 9h.05v4h-.05A1.8 1.8 0 0 0 19.4 15Z"></path>',
    profile:'<circle cx="12" cy="7" r="4"></circle><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2"></path>',
    admin:'<path d="m12 3 8 4v5c0 5-3.4 8.1-8 9-4.6-.9-8-4-8-9V7l8-4Z"></path><path d="M9 12h6M12 9v6"></path>'
  };
  return `<span class="side-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${icons[name]||icons.dashboard}</svg></span>`;
}

function header() {
  const logged = !!state.user;
  return `<aside class="side-nav" aria-label="빠른 메뉴">
    <button class="side-logo-button" data-go="${logged&&state.age?'dashboard':'auth'}" title="Daily Cog 홈" aria-label="Daily Cog 홈">
      <img class="side-home-icon" src="assets/icons/daily-cog-home-transparent.png" alt="" aria-hidden="true">
    </button>
    <nav class="side-nav-actions">
      ${logged ? `<button class="side-nav-btn ${state.screen==='dashboard'?'active':''}" data-go="dashboard" title="데일리 코그 플레이" ${state.screen==='dashboard'?'aria-current="page"':''}>${sideIconSvg('home')}<small>데일리 코그 플레이</small></button>` : ''}
      ${logged ? `<button class="side-nav-btn ${state.screen==='shop'?'active':''}" data-shop title="강아지 친구" ${state.screen==='shop'?'aria-current="page"':''}>${sideIconSvg('shop')}<small>강아지 친구</small></button>` : ''}
      ${logged ? `<button class="side-nav-btn ${state.screen==='childActivity'?'active':''}" data-child-activity data-i18n-title="공유돌봄" title="공유돌봄" ${state.screen==='childActivity'?'aria-current="page"':''}>${sideIconSvg('children')}<small data-i18n-key="공유돌봄">공유돌봄</small></button>` : ''}
      ${logged&&state.isAdmin ? `<button class="side-nav-btn ${state.screen==='flashcards'?'active':''}" data-flashcards title="플래시카드" ${state.screen==='flashcards'?'aria-current="page"':''}>${sideIconSvg('flashcards')}<small>플래시카드</small></button>` : ''}
      ${logged ? `<button class="side-nav-btn ${state.screen==='userDashboard'?'active':''}" data-user-dashboard title="사용자 대시보드" ${state.screen==='userDashboard'?'aria-current="page"':''}>${sideIconSvg('dashboard')}<small>사용자 대시보드</small></button>` : ''}
      ${logged && state.isAdmin ? `<button class="side-nav-btn ${state.screen==='adminDashboard'?'active':''}" data-admin-dashboard title="관리자 대시보드" ${state.screen==='adminDashboard'?'aria-current="page"':''}>${sideIconSvg('admin')}<small>관리자</small></button>` : ''}
      ${logged&&!state.isAdmin ? `<button class="side-nav-btn ${state.screen==='flashcards'?'active':''}" data-flashcards title="플래시카드" ${state.screen==='flashcards'?'aria-current="page"':''}>${sideIconSvg('flashcards')}<small>플래시카드</small></button>` : ''}
      <button class="side-nav-btn" data-settings title="설정">${sideIconSvg('settings')}<small>설정</small></button>
      ${logged ? `<button class="side-nav-btn" data-profile title="내 프로필">${sideIconSvg('profile')}<small>내 프로필</small></button>` : ''}
    </nav>
  </aside><header class="topbar">
    <button class="brand text-btn" data-go="${logged && state.age ? 'dashboard' : 'auth'}" aria-label="Daily Cog 홈">
      <img class="topbar-home-icon" src="assets/icons/daily-cog-home-transparent.png" alt="" aria-hidden="true"><span>Daily Cog</span>
    </button>
    <nav class="nav-actions">
      <span class="eyebrow nav-eyebrow"><i></i> ${state.isAdmin ? 'ADMIN MODE' : 'cognitive wellness'}</span>
    </nav>
  </header>`;
}

function render() {
  window.scrollTo(0,0);
  synchronizeCurrentAgeGroup();
  enforceAssessmentGate();
  scheduleAssessmentDueRefresh();
  scheduleDogFedReset();
  if(state.smartNote.open&&!state.smartNote.pinned&&state.smartNote.view&&state.smartNote.view!==state.screen) state.smartNote.open=false;
  if (state.screen === 'loading') renderLoading();
  else if (state.screen === 'auth') renderAuth();
  else if (state.screen === 'birthdate') renderBirthdateSetup();
  else if (state.screen === 'age') renderAge();
  else if (state.screen === 'dashboard') renderDashboard();
  else if (state.screen === 'assessment') renderAssessment();
  else if (state.screen === 'shop') renderShop();
  else if (state.screen === 'userDashboard') renderUserDashboard();
  else if (state.screen === 'childActivity') renderChildActivity();
  else if (state.screen === 'flashcards') renderFlashcards();
  else if (state.screen === 'adminDashboard') renderAdminDashboard();
  else if (state.screen === 'game') renderGame();
  bindGlobal();
  applyDisplaySettings();
  syncSmartNote();
}

function renderPreservingScroll() {
  const scrollY=window.scrollY;
  render();
  requestAnimationFrame(()=>window.scrollTo(0,scrollY));
}

function bindGlobal() {
  $$('[data-go]').forEach(b => b.onclick = () => { state.screen = b.dataset.go; render(); });
  $$('[data-settings]').forEach(b => b.onclick = openSettings);
  $$('[data-profile]').forEach(b => b.onclick = openProfile);
  $$('[data-shop]').forEach(b => b.onclick = () => { clearSessionTimers(); state.screen='shop'; render(); });
  $$('[data-flashcards]').forEach(b => b.onclick = () => { clearSessionTimers(); state.flashcardUi.play=null; state.screen='flashcards'; render(); });
  $$('[data-user-dashboard]').forEach(b => b.onclick = () => {
    clearSessionTimers();
    if(!currentUserAgeGroup()){ state.selectedAge=null; state.screen='birthdate'; render(); toast('생년월일을 먼저 입력해 주세요.'); return; }
    state.screen='userDashboard'; render();
  });
  $$('[data-child-activity]').forEach(b=>b.onclick=()=>openChildActivity());
  $$('[data-admin-dashboard]').forEach(b => b.onclick = openAdminDashboard);
}

function resetToSignedOutState() {
  clearTimeout(dogFedResetTimer);
  clearTimeout(assessmentDueTimer);
  clearInterval(presenceTimer);
  $('#settingsModal')?.remove();
  state.user=null;
  state.age=null;
  state.selectedAge=null;
  state.birthDate=null;
  state.country=null;
  state.scores={};
  state.gameSessions=[];
  state.userDashboardUi={growthMode:'game',growthKey:null,growthPeriod:'week'};
  state.assessment=normalizeAssessment(null);
  state.flashcards=[];
  state.flashcardUi={search:'',category:'all',sort:'recent',flippedId:null,play:null};
  state.guardianLinks=[];
  state.guardianChildren=[];
  state.selectedChildId=null;
  state.childActivity=null;
  state.childActivityError=null;
  state.childBenchmarks=null;
  state.childBenchmarksLoading=false;
  state.childBenchmarksError=null;
  state.childBenchmarksChildId=null;
  state.childAiReports={};
  state.childGrowthUiByChild={};
  state.careOverview={incoming:[],outgoing:[],connections:[]};
  state.careOverviewLoading=false;
  state.careOverviewError=null;
  state.careSearch={email:'',targetRole:'child',loading:false,result:null,error:null};
  state.difficulties={};
  state.shop=normalizeShopState(null);
  state.smartNote=normalizeSmartNote(null);
  state.isAdmin=false;
  state.adminData=null;
  state.adminError=null;
  state.adminUserDetail=null;
  state.settings={language:'en',fontSize:'medium',theme:'lavender'};
  state.screen='auth';
  render();
}

async function logoutCurrentUser() {
  if (SUPABASE_ENABLED) {
    await markPresenceOffline();
    const result = await db.auth.signOut();
    if (result.error) { toast('로그아웃하지 못했습니다. 다시 시도해 주세요.'); return false; }
  } else {
    persistCurrentLocalAccount();
    localStorage.removeItem('dcUser');
  }
  resetToSignedOutState();
  return true;
}

async function deleteCurrentAccount() {
  if(!state.user)return false;
  const account={...state.user};
  if(SUPABASE_ENABLED){
    if(account.avatarPath){
      const avatarResult=await db.storage.from('profile-avatars').remove([account.avatarPath]);
      if(avatarResult.error)console.error(avatarResult.error);
    }
    const result=await db.rpc('delete_current_user');
    if(result.error){
      console.error(result.error);
      toast('회원 탈퇴를 완료하지 못했습니다. 다시 시도해 주세요.');
      return false;
    }
    await db.auth.signOut();
  }else{
    removeLocalCredential(account.email);
    localStorage.removeItem(localAccountKey(account.email));
    localStorage.removeItem(smartNoteKey(account));
    localStorage.removeItem(flashcardKey(account));
    localStorage.removeItem('dcUser');
    localStorage.removeItem('dcSettings');
  }
  resetToSignedOutState();
  toast('회원 탈퇴가 완료되었습니다.');
  return true;
}

async function saveEmailNotificationSetting(enabled) {
  if(!SUPABASE_ENABLED||!state.user){
    toast('이메일 알림은 Supabase에 연결된 계정에서 사용할 수 있습니다.');
    return false;
  }
  const result=await db.from('profiles').update({
    email_notifications_enabled:Boolean(enabled),
    updated_at:new Date().toISOString()
  }).eq('id',state.user.id);
  if(result.error){
    console.error(result.error);
    toast('이메일 알림 스키마를 먼저 적용해 주세요.');
    return false;
  }
  state.settings.emailNotifications=Boolean(enabled);
  localStorage.setItem('dcSettings',JSON.stringify(state.settings));
  toast(enabled?'이메일 학습 알림을 켰습니다.':'이메일 학습 알림을 껐습니다.');
  return true;
}

function openSettings() {
  const old = $('#settingsModal'); if (old) old.remove();
  const previewCharacter=FONT_PREVIEW_CHARACTERS[state.settings.language]||'A';
  document.body.insertAdjacentHTML('beforeend', `<div class="settings-overlay" id="settingsModal" role="presentation">
    <section class="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
      <div class="settings-head"><div><span class="step-label">DAILY COG</span><h2 id="settingsTitle">화면 설정</h2><p>원하는 언어, 글자 크기와 화면 색감을 선택하세요.</p></div><button class="icon-btn" data-close-settings title="설정 닫기" aria-label="설정 닫기">×</button></div>
      <div class="setting-group"><strong>언어</strong><div class="setting-options language-options">
        <button data-language="ko" class="setting-option ${state.settings.language==='ko'?'active':''}"><span>가</span><b>한국어</b><i>✓</i></button>
        <button data-language="en" class="setting-option ${state.settings.language==='en'?'active':''}"><span>A</span><b>영어</b><i>✓</i></button>
        <button data-language="zh" class="setting-option ${state.settings.language==='zh'?'active':''}"><span>文</span><b>중국어</b><i>✓</i></button>
      </div></div>
      <div class="setting-group"><strong>글자 크기</strong><div class="setting-options size-options">
        <button data-font-size="small" class="setting-option ${state.settings.fontSize==='small'?'active':''}"><span class="size-preview small">${previewCharacter}</span><b>작게</b><i>✓</i></button>
        <button data-font-size="medium" class="setting-option ${state.settings.fontSize==='medium'?'active':''}"><span class="size-preview medium">${previewCharacter}</span><b>중간</b><i>✓</i></button>
        <button data-font-size="large" class="setting-option ${state.settings.fontSize==='large'?'active':''}"><span class="size-preview large">${previewCharacter}</span><b>크게</b><i>✓</i></button>
      </div></div>
      <div class="setting-group"><strong>화면 색감</strong><div class="setting-options color-options">
        ${COLOR_THEMES.map(theme=>`<button data-theme="${theme.id}" class="setting-option color-option ${state.settings.theme===theme.id?'active':''}"><span class="theme-swatch" style="--swatch:${theme.color}"></span><b>${theme.label}</b><i>✓</i></button>`).join('')}
      </div></div>
      ${state.user?`<section class="email-notification-setting">
        <div class="email-notification-icon" aria-hidden="true">✉</div>
        <div class="email-notification-copy"><strong>이메일 학습 알림</strong><p>자녀가 3일 동안 별을 얻지 못하면 자녀와 연결된 보호자에게 격려 이메일을 보냅니다.</p><small>${escapeHtml(state.user.email||'')}</small></div>
        <button class="email-notification-toggle ${state.settings.emailNotifications?'active':''}" type="button" data-email-notification-toggle aria-pressed="${state.settings.emailNotifications?'true':'false'}">${state.settings.emailNotifications?'알림 켜짐':'알림 꺼짐'}</button>
      </section>`:''}
      ${state.user?`<div class="setting-account">
        <div><strong>계정 관리</strong><p>로그아웃하거나 Daily Cog 계정과 학습 기록을 삭제할 수 있습니다.</p></div>
        <div class="setting-account-actions"><button class="secondary-btn" type="button" data-settings-logout>로그아웃</button><button class="danger-btn" type="button" data-delete-account>회원 탈퇴</button></div>
      </div>`:''}
    </section></div>`);
  const modal = $('#settingsModal');
  const close = () => modal.remove();
  $('[data-close-settings]', modal).onclick = close;
  modal.onclick = e => { if (e.target === modal) close(); };
  document.addEventListener('keydown', function esc(e) { if(e.key==='Escape'){ close(); document.removeEventListener('keydown',esc); } });
  $$('[data-language]', modal).forEach(button => button.onclick = () => {
    state.settings.language = button.dataset.language;
    $$('[data-language]', modal).forEach(item => item.classList.toggle('active', item===button));
    saveDisplaySettings();
    if(state.screen==='childActivity')renderPreservingScroll();
    else applyDisplaySettings();
    $$('.size-preview',modal).forEach(preview=>preview.textContent=FONT_PREVIEW_CHARACTERS[state.settings.language]||'A');
  });
  $$('[data-font-size]', modal).forEach(button => button.onclick = () => {
    state.settings.fontSize = button.dataset.fontSize;
    $$('[data-font-size]', modal).forEach(item => item.classList.toggle('active', item===button));
    saveDisplaySettings(); applyDisplaySettings();
  });
  $$('[data-theme]', modal).forEach(button => button.onclick = () => {
    state.settings.theme = button.dataset.theme;
    $$('[data-theme]', modal).forEach(item => item.classList.toggle('active', item===button));
    saveDisplaySettings(); applyDisplaySettings();
  });
  const emailNotificationToggle=$('[data-email-notification-toggle]',modal);
  if(emailNotificationToggle)emailNotificationToggle.onclick=async()=>{
    const nextEnabled=!state.settings.emailNotifications;
    emailNotificationToggle.disabled=true;
    const saved=await saveEmailNotificationSetting(nextEnabled);
    emailNotificationToggle.disabled=false;
    if(!saved)return;
    emailNotificationToggle.classList.toggle('active',nextEnabled);
    emailNotificationToggle.setAttribute('aria-pressed',String(nextEnabled));
    emailNotificationToggle.textContent=nextEnabled?'알림 켜짐':'알림 꺼짐';
    applyDisplaySettings();
  };
  const logoutButton=$('[data-settings-logout]',modal);
  if(logoutButton)logoutButton.onclick=async()=>{
    logoutButton.disabled=true;
    if(!await logoutCurrentUser())logoutButton.disabled=false;
  };
  const deleteButton=$('[data-delete-account]',modal);
  if(deleteButton)deleteButton.onclick=async()=>{
    const message='회원 탈퇴 시 계정, 게임 기록, 별점과 상점 정보가 모두 삭제됩니다. 정말 탈퇴하시겠습니까?';
    const translated=window.DailyCogI18n?window.DailyCogI18n.translate(message,state.settings.language):message;
    if(!window.confirm(translated))return;
    deleteButton.disabled=true;
    deleteButton.textContent='탈퇴 처리 중…';
    if(!await deleteCurrentAccount()){
      deleteButton.disabled=false;
      deleteButton.textContent='회원 탈퇴';
      applyDisplaySettings();
    }
  };
  applyDisplaySettings();
}

async function saveDisplaySettings() {
  if (!SUPABASE_ENABLED) { persistCurrentLocalAccount(); return; }
  localStorage.setItem('dcSettings', JSON.stringify(state.settings));
  if (!state.user) return;
  let result = await db.from('profiles').update({
    language: state.settings.language,
    font_size: state.settings.fontSize,
    theme_color: state.settings.theme,
    email_notifications_enabled:state.settings.emailNotifications,
    country_code: state.country,
    updated_at: new Date().toISOString()
  }).eq('id', state.user.id);
  if(result.error){
    result=await db.from('profiles').update({
      language:state.settings.language,
      font_size:state.settings.fontSize,
      updated_at:new Date().toISOString()
    }).eq('id',state.user.id);
  }
  if (result.error) { console.error(result.error); toast('설정을 저장하지 못했습니다.'); }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function bytesToHex(bytes) {
  return [...bytes].map(value => value.toString(16).padStart(2,'0')).join('');
}

function readLocalCredentials() {
  const credentials=readJsonStorage(LOCAL_ACCOUNTS_KEY,{});
  const legacy=readJsonStorage(LEGACY_CREDENTIAL_KEY,null);
  if(legacy && legacy.email && !credentials[localEmail(legacy.email)]){
    credentials[localEmail(legacy.email)]=legacy;
    localStorage.setItem(LOCAL_ACCOUNTS_KEY,JSON.stringify(credentials));
  }
  if(legacy) localStorage.removeItem(LEGACY_CREDENTIAL_KEY);
  return credentials;
}

function readLocalCredential(email) {
  return readLocalCredentials()[localEmail(email)] || null;
}

function removeLocalCredential(email) {
  const credentials=readLocalCredentials();
  delete credentials[localEmail(email)];
  localStorage.setItem(LOCAL_ACCOUNTS_KEY,JSON.stringify(credentials));
}

async function passwordHash(password, salt) {
  if (!window.crypto || !window.crypto.subtle) throw new Error('이 브라우저에서는 안전한 비밀번호 저장을 지원하지 않습니다.');
  const data = new TextEncoder().encode(`${salt}:${password}`);
  return bytesToHex(new Uint8Array(await window.crypto.subtle.digest('SHA-256', data)));
}

async function saveLocalCredential(email, password, name) {
  const saltBytes = new Uint8Array(16);
  window.crypto.getRandomValues(saltBytes);
  const salt = bytesToHex(saltBytes);
  const normalizedEmail=localEmail(email);
  const credential = { email:normalizedEmail, name, salt, hash:await passwordHash(password,salt), createdAt:new Date().toISOString() };
  const credentials=readLocalCredentials();
  credentials[normalizedEmail]=credential;
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(credentials));
  return credential;
}

async function verifyLocalCredential(email, password) {
  const credential = readLocalCredential(email);
  if (!credential || !credential.salt || !credential.hash) return null;
  const hash = await passwordHash(password, credential.salt);
  return hash === credential.hash ? credential : null;
}

function refreshProfileChips() {
  $$('[data-profile]').forEach(chip => {
    chip.innerHTML = chip.classList.contains('side-nav-btn')
      ? `${sideIconSvg('profile')}<small>내 프로필</small>`
      : `${avatarHtml(state.user)}<span>${escapeHtml(state.user.name)}님</span>`;
  });
  applyDisplaySettings();
}

function guardianChildrenProfileHtml() {
  if(state.guardianFeatureError){
    return '<div class="guardian-setup-error"><strong>연결 정보를 확인할 수 없습니다.</strong><span>최신 Supabase 스키마가 적용되어 있는지 확인해 주세요.</span></div>';
  }
  if(!state.guardianChildren.length)return '<div class="guardian-empty">연결된 자녀 계정이 없습니다.</div>';
  return `<div class="guardian-child-list">${state.guardianChildren.map(child=>`<div class="guardian-child-row">
    <span class="guardian-child-avatar">${escapeHtml((child.name||'C')[0])}</span>
    <span><strong>${escapeHtml(child.name||'자녀')}</strong><small>${child.email?escapeHtml(child.email):escapeHtml((AGE_GROUPS[child.ageGroup]&&AGE_GROUPS[child.ageGroup].label)||'연령 미설정')}</small></span>
    <button type="button" data-unlink-child="${escapeHtml(child.id)}">연결 해제</button>
  </div>`).join('')}</div>`;
}

async function unlinkGuardianChild(childId) {
  delete state.childAiReports[childId];
  if(!SUPABASE_ENABLED){
    state.guardianLinks=state.guardianLinks.filter(id=>id!==localEmail(childId));
    state.guardianChildren=resolveLocalGuardianChildren(state.guardianLinks);
    persistCurrentLocalAccount();
  }else{
    const result=await db.from('guardian_links').delete()
      .eq('guardian_id',state.user.id)
      .eq('child_id',childId);
    if(result.error)throw result.error;
    await refreshGuardianChildren();
  }
  if(state.selectedChildId===childId){
    state.selectedChildId=null;
    state.childActivity=null;
    state.childBenchmarks=null;
    state.childBenchmarksError=null;
    state.childBenchmarksChildId=null;
  }
}

function openProfile() {
  const old = $('#profileModal'); if (old) old.remove();
  const birthLimits=birthDateLimits();
  let selectedFile = null;
  let previewUrl = state.user.avatarUrl;
  let removeAvatar = false;
  document.body.insertAdjacentHTML('beforeend', `<div class="settings-overlay" id="profileModal" role="presentation">
    <section class="settings-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profileTitle">
      <div class="settings-head"><div><span class="step-label">MY DAILY COG</span><h2 id="profileTitle">내 프로필</h2><p>로그인 정보, 나라, 생년월일과 프로필 사진을 관리하세요.</p></div><button class="icon-btn" data-close-profile title="프로필 닫기" aria-label="프로필 닫기">×</button></div>
      <form id="profileForm">
        <div class="profile-photo-row">
          <div class="profile-avatar" id="profilePreview">${previewUrl ? `<img src="${escapeHtml(previewUrl)}" alt="프로필 사진 미리보기">` : escapeHtml((state.user.name || 'U')[0])}</div>
          <div class="photo-actions"><strong>프로필 사진</strong><p>JPG, PNG, WEBP 또는 GIF · 최대 5MB</p><div><label class="secondary-btn file-label" for="avatarInput">사진 변경</label><input id="avatarInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden>${state.user.avatarPath || state.user.avatarUrl ? '<button class="text-btn remove-photo" type="button" id="removePhoto">사진 제거</button>' : ''}</div></div>
        </div>
        <div class="profile-fields">
          <div class="field"><label for="profileEmail">아이디 (이메일)</label><input id="profileEmail" name="email" required type="email" value="${escapeHtml(state.user.email || '')}" autocomplete="email"></div>
          <div class="field"><label for="profileCountry">나라</label><select id="profileCountry" name="country" required autocomplete="country">${countryOptionsHtml(state.country)}</select></div>
          <div class="field"><label for="profileBirthDate">생년월일</label><input id="profileBirthDate" name="birthDate" required type="date" min="${birthLimits.min}" max="${birthLimits.max}" value="${escapeHtml(state.birthDate||'')}" autocomplete="bday"><small class="field-help">생년월일을 변경하면 현재 나이에 맞는 게임으로 자동 변경됩니다.</small></div>
          <div class="field"><label for="currentPassword">현재 비밀번호</label><input id="currentPassword" name="currentPassword" type="password" placeholder="비밀번호 변경 시 입력" autocomplete="current-password"></div>
          <div class="field"><label for="newPassword">새 비밀번호</label><input id="newPassword" name="newPassword" type="password" minlength="6" placeholder="변경하지 않으려면 비워두세요" autocomplete="new-password"></div>
        </div>
        <div class="profile-security-note">이메일을 변경하면 새 주소로 확인 메일이 전송될 수 있습니다. 비밀번호는 6자 이상 입력해 주세요.</div>
        <button class="primary-btn" type="submit" id="saveProfile">변경사항 저장</button>
      </form>
      <section class="guardian-profile-links">
        <div class="guardian-profile-links-head"><span class="step-label">SHARE CARE</span><h3>연결된 자녀</h3><p>현재 공유된 자녀 활동 계정을 확인하거나 연결을 해제할 수 있습니다.</p></div>
        ${guardianChildrenProfileHtml()}
      </section>
    </section></div>`);
  const modal = $('#profileModal');
  const close = () => modal.remove();
  $('[data-close-profile]', modal).onclick = close;
  modal.onclick = e => { if (e.target === modal) close(); };
  document.addEventListener('keydown', function esc(e) { if(e.key==='Escape'){ close(); document.removeEventListener('keydown',esc); } });

  $('#avatarInput').onchange = async e => {
    const file = e.target.files[0]; if (!file) return;
    const allowed = ['image/jpeg','image/png','image/webp','image/gif'];
    if (!allowed.includes(file.type)) { toast('JPG, PNG, WEBP 또는 GIF 이미지를 선택해 주세요.'); e.target.value=''; return; }
    if (file.size > 5 * 1024 * 1024) { toast('프로필 사진은 5MB 이하만 사용할 수 있습니다.'); e.target.value=''; return; }
    selectedFile = file; removeAvatar = false; previewUrl = await fileToDataUrl(file);
    $('#profilePreview').innerHTML = `<img src="${previewUrl}" alt="프로필 사진 미리보기">`;
  };
  const removeButton = $('#removePhoto');
  if (removeButton) removeButton.onclick = () => {
    selectedFile = null; removeAvatar = true; previewUrl = null;
    $('#avatarInput').value=''; $('#profilePreview').textContent=(state.user.name || 'U')[0];
  };
  $$('[data-unlink-child]',modal).forEach(button=>button.onclick=async()=>{
    const child=state.guardianChildren.find(item=>item.id===button.dataset.unlinkChild);
    if(!child)return;
    const message=`${child.name} 계정의 연결을 해제할까요?`;
    const translated=window.DailyCogI18n?window.DailyCogI18n.translate(message,state.settings.language):message;
    if(!confirm(translated))return;
    button.disabled=true;
    try{
      await unlinkGuardianChild(child.id);
      close();
      renderPreservingScroll();
      openProfile();
      toast('자녀 계정 연결을 해제했습니다.');
    }catch(error){
      console.error(error);
      button.disabled=false;
      toast('자녀 계정 연결을 해제하지 못했습니다.');
    }
  });

  $('#profileForm').onsubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget, fd = new FormData(form), button = $('#saveProfile');
    const email = String(fd.get('email') || '').trim();
    const country = String(fd.get('country') || '');
    const birthDate = normalizeBirthDateValue(fd.get('birthDate'));
    const currentPassword = String(fd.get('currentPassword') || '');
    const newPassword = String(fd.get('newPassword') || '');
    if (!COUNTRY_CODES.includes(country)) { toast('나라를 선택해 주세요.'); return; }
    if (!validServiceBirthDate(birthDate)) { toast('올바른 생년월일을 입력해 주세요. 만 4세 이상부터 이용할 수 있습니다.'); return; }
    if (newPassword && newPassword.length < 6) { toast('새 비밀번호는 6자 이상 입력해 주세요.'); return; }
    if (newPassword && !currentPassword) { toast('현재 비밀번호를 입력해 주세요.'); return; }
    if (newPassword && currentPassword === newPassword) { toast('새 비밀번호는 현재 비밀번호와 달라야 합니다.'); return; }
    button.disabled=true; button.textContent='프로필을 저장하고 있어요…';
    try {
      const emailChanged = email.toLowerCase() !== String(state.user.email || '').toLowerCase();
      const automaticAgeGroup=ageGroupFromBirthDate(birthDate);
      const ageChanged=automaticAgeGroup!==state.age;
      if (SUPABASE_ENABLED) {
        if (newPassword) {
          const verifyResult = await db.auth.signInWithPassword({ email:state.user.email, password:currentPassword });
          if (verifyResult.error) throw new Error('현재 비밀번호가 올바르지 않습니다.');
        }
        const authChanges = {};
        if (emailChanged) authChanges.email = email;
        if (newPassword) authChanges.password = newPassword;
        authChanges.data={birth_date:birthDate,country_code:country};
        if (Object.keys(authChanges).length) {
          const authResult = await db.auth.updateUser(authChanges);
          if (authResult.error) throw authResult.error;
          state.user.email = authResult.data.user.email || state.user.email;
        }

        const previousPath = state.user.avatarPath;
        let nextPath = previousPath;
        if (selectedFile) {
          const extensions = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif'};
          nextPath = `${state.user.id}/avatar-${Date.now()}.${extensions[selectedFile.type]}`;
          const uploadResult = await db.storage.from('profile-avatars').upload(nextPath, selectedFile, {
            cacheControl: '3600', contentType: selectedFile.type, upsert: false
          });
          if (uploadResult.error) throw uploadResult.error;
        } else if (removeAvatar) nextPath = null;

        const profileUpdates={
          country_code:country,
          birth_date:birthDate,
          age_group:automaticAgeGroup,
          updated_at:new Date().toISOString()
        };
        if(nextPath!==previousPath)profileUpdates.avatar_path=nextPath;
        const profileResult=await db.from('profiles').upsert({
          id:state.user.id,
          name:state.user.name||'사용자',
          ...profileUpdates
        },{onConflict:'id'});
        if(profileResult.error)throw profileResult.error;
        state.country=country;
        state.birthDate=birthDate;
        state.user.birthDate=birthDate;
        state.age=automaticAgeGroup;
        state.selectedAge=automaticAgeGroup;
        if (nextPath !== previousPath) {
          state.user.avatarPath = nextPath;
          state.user.avatarUrl = await createAvatarUrl(nextPath);
          if (previousPath) {
            const removeResult = await db.storage.from('profile-avatars').remove([previousPath]);
            if (removeResult.error) console.error(removeResult.error);
          }
        }
      } else {
        const oldEmail=localEmail(state.user.email);
        const newEmail=localEmail(email);
        const credential = readLocalCredential(oldEmail);
        if (newPassword && credential) {
          const verified = await verifyLocalCredential(oldEmail, currentPassword);
          if (!verified) throw new Error('현재 비밀번호가 올바르지 않습니다.');
        }
        if(emailChanged && readLocalCredential(newEmail)) throw new Error('이미 가입된 이메일입니다.');
        if(newPassword){
          await saveLocalCredential(newEmail,newPassword,state.user.name);
          if(emailChanged) removeLocalCredential(oldEmail);
        } else if(emailChanged && credential){
          const credentials=readLocalCredentials();
          delete credentials[oldEmail];
          credential.email=newEmail;
          credentials[newEmail]=credential;
          localStorage.setItem(LOCAL_ACCOUNTS_KEY,JSON.stringify(credentials));
        }
        if(emailChanged){
          const accountData=readLocalAccountData(oldEmail,false);
          localStorage.setItem(localAccountKey(newEmail),JSON.stringify(accountData));
          localStorage.removeItem(localAccountKey(oldEmail));
        }
        state.user.email = newEmail;
        state.country=country;
        state.birthDate=birthDate;
        state.user.birthDate=birthDate;
        state.age=automaticAgeGroup;
        state.selectedAge=automaticAgeGroup;
        if (selectedFile) state.user.avatarUrl = previewUrl;
        if (removeAvatar) state.user.avatarUrl = null;
        persistCurrentLocalAccount();
      }
      scheduleAutomaticAgeRefresh();
      close();
      if(ageChanged){
        clearSessionTimers();
        state.currentGame=null;
        state.session=null;
        state.screen='dashboard';
        render();
      }else{
        refreshProfileChips();
      }
      toast(emailChanged && SUPABASE_ENABLED ? '프로필을 저장했습니다. 이메일 확인함도 확인해 주세요.' : '프로필을 저장했습니다.');
      if(ageChanged)setTimeout(()=>toast(`${AGE_GROUPS[automaticAgeGroup].label} 맞춤 게임으로 자동 변경되었습니다.`),900);
    } catch (error) {
      console.error(error); button.disabled=false; button.textContent='변경사항 저장';
      toast(error.message || '프로필을 저장하지 못했습니다.');
    }
  };
  applyDisplaySettings();
}

function renderLoading() {
  app.innerHTML = `<div class="shell">${header()}<div class="loading-screen"><span class="loading-orbit"></span><strong>Daily Cog를 준비하고 있어요</strong><p>안전하게 계정과 기록을 불러오는 중입니다.</p></div></div>`;
}

function renderAuth() {
  const signup = state.authMode === 'signup';
  const birthLimits=birthDateLimits();
  app.innerHTML = `<div class="shell">${header()}<div class="auth-layout">
    <section class="hero">
      <span class="eyebrow"><i></i> 하루 10분 인지 루틴</span>
      <figure class="auth-dog-figure" role="img" aria-label="Daily Cog 최종 성장 강아지">
        <img src="assets/dog/final/daily-cog-final-dog-calm.png" alt="" aria-hidden="true">
      </figure>
      <h1>매일 조금씩,<br><em>생각의 힘을 깨워요.</em></h1>
      <p class="hero-copy">내 연령에 맞춘 짧고 즐거운 두뇌 활동. 오늘의 작은 자극을 건강한 인지 습관으로 이어가세요.</p>
      <div class="hero-stats"><div class="hero-stat"><strong>4</strong><span>맞춤 연령층</span></div><div class="hero-stat"><strong>12</strong><span>인지 훈련 게임</span></div><div class="hero-stat"><strong>10분</strong><span>하루 권장 루틴</span></div></div><div class="orbit"></div>
    </section>
    <aside class="auth-side"><form class="auth-card" id="authForm">
      <div class="auth-tabs"><button type="button" class="auth-tab ${!signup?'active':''}" data-mode="login">로그인</button><button type="button" class="auth-tab ${signup?'active':''}" data-mode="signup">회원가입</button></div>
      <h2>${signup ? '반가워요!' : '다시 만나 반가워요'}</h2>
      <p>${signup ? '나에게 꼭 맞는 인지 루틴을 시작해 보세요.' : '오늘의 두뇌 루틴을 이어서 시작해 볼까요?'}</p>
      ${signup ? `<div class="field"><label for="name">이름</label><input id="name" name="name" required placeholder="이름을 입력해 주세요" autocomplete="name"></div>
      <div class="field"><label for="country">나라</label><select id="country" name="country" required autocomplete="country">${countryOptionsHtml(null)}</select></div>
      <div class="field"><label for="birthDate">생년월일</label><input id="birthDate" name="birthDate" required type="date" min="${birthLimits.min}" max="${birthLimits.max}" autocomplete="bday"><small class="field-help">만 4세 이상부터 가입할 수 있습니다.</small></div>` : ''}
      <div class="field"><label for="email">이메일</label><input id="email" name="email" required type="email" placeholder="hello@dailycog.kr" autocomplete="email"></div>
      <div class="field"><label for="password">비밀번호</label><div class="password-input"><input id="password" name="password" required minlength="6" type="password" placeholder="6자 이상 입력해 주세요" autocomplete="${signup?'new-password':'current-password'}"><button type="button" id="passwordToggle" aria-label="비밀번호 표시">Show</button></div></div>
      <button class="primary-btn" type="submit">${signup ? 'Daily Cog 시작하기' : '로그인하고 시작하기'} →</button>
      <div class="auth-note"><span>●</span><span>${SUPABASE_ENABLED ? '계정과 활동 기록은 Supabase에 안전하게 저장됩니다.' : 'Supabase 설정 전에는 계정 정보가 현재 브라우저에만 저장됩니다.'}</span></div>
      ${SUPABASE_ENABLED ? '' : '<div class="auth-note"><span>★</span><span>데모 계정: demo@dailycog.kr · 비밀번호 demo1234</span></div>'}
    </form></aside>
  </div></div>`;
  $$('[data-mode]').forEach(b => b.onclick = () => { state.authMode=b.dataset.mode; render(); });
  const passwordLabels = {
    ko:{show:'보기',hide:'숨기기'},
    en:{show:'Show',hide:'Hide'},
    zh:{show:'显示',hide:'隐藏'}
  }[state.settings.language] || {show:'Show',hide:'Hide'};
  $('#passwordToggle').textContent = passwordLabels.show;
  $('#passwordToggle').onclick = () => {
    const input = $('#password');
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    $('#passwordToggle').textContent = visible ? passwordLabels.show : passwordLabels.hide;
    $('#passwordToggle').setAttribute('aria-label', visible ? passwordLabels.show : passwordLabels.hide);
    input.focus();
  };
  $('#authForm').onsubmit = async e => {
    e.preventDefault(); const form = e.currentTarget; const fd = new FormData(form);
    const email = fd.get('email'); const name = signup ? fd.get('name') : (email.split('@')[0] || '사용자');
    const country = signup && COUNTRY_CODES.includes(String(fd.get('country')||'')) ? String(fd.get('country')) : null;
    const birthDate = signup ? String(fd.get('birthDate')||'') : null;
    if(signup&&!validServiceBirthDate(birthDate)){toast('올바른 생년월일을 입력해 주세요. 만 4세 이상부터 가입할 수 있습니다.');return;}
    const submit = $('button[type="submit"]', form);
    submit.disabled = true; submit.textContent = signup ? '계정을 만들고 있어요…' : '로그인하고 있어요…';
    if (!SUPABASE_ENABLED) {
      try {
        if(signup && readLocalCredential(email)) throw new Error('이미 가입된 이메일입니다. 로그인해 주세요.');
        const credential = signup
          ? await saveLocalCredential(email, String(fd.get('password') || ''), name)
          : await verifyLocalCredential(email, String(fd.get('password') || ''));
        if (!credential) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        state.user = { name:credential.name || name, email:credential.email };
        loadLocalAccountState(credential.email);
        if(signup){
          state.country=country;
          state.birthDate=birthDate;
          state.age=ageGroupFromBirthDate(birthDate);
          state.selectedAge=state.age;
        }
        persistCurrentLocalAccount();
        scheduleAutomaticAgeRefresh();
        state.screen = state.age
          ? (assessmentIsDue() ? 'assessment' : 'dashboard')
          : 'birthdate';
        render();
      } catch (error) {
        console.error(error); submit.disabled=false;
        submit.textContent = signup ? 'Daily Cog 시작하기 →' : '로그인하고 시작하기 →';
        toast(error.message || '인증 중 문제가 발생했습니다.');
      }
      return;
    }
    try {
      const result = signup
        ? await db.auth.signUp({
            email,
            password:fd.get('password'),
            options:{
              data:{name,country_code:country,birth_date:birthDate}
            }
          })
        : await db.auth.signInWithPassword({ email, password: fd.get('password') });
      if (result.error) throw result.error;
      if (signup && !result.data.session) {
        if (result.data.user && Array.isArray(result.data.user.identities) && result.data.user.identities.length === 0) {
          throw new Error(localizedAuthMessage('alreadyRegistered'));
        }
        throw new Error(localizedAuthMessage('directSignupNotEnabled'));
      }
      await loadRemoteState(result.data.user);
      render();
    } catch (error) {
      console.error(error);
      submit.disabled = false;
      submit.textContent = signup ? 'Daily Cog 시작하기 →' : '로그인하고 시작하기 →';
      toast(authErrorMessage(error));
    }
  };
}

function renderBirthdateSetup() {
  const limits=birthDateLimits();
  app.innerHTML=`<div class="shell">${header()}<section class="onboarding birthdate-onboarding">
    <span class="step-label">PERSONALIZED ROUTINE</span>
    <h1>생년월일로<br>맞춤 게임을 찾아드려요</h1>
    <p class="lead">현재 나이에 맞는 연령층을 자동으로 적용합니다.<br>나이가 다음 연령대에 포함되면 게임도 자동으로 변경됩니다.</p>
    <form class="birthdate-card" id="birthdateSetupForm">
      <div class="field"><label for="setupBirthDate">생년월일</label><input id="setupBirthDate" name="birthDate" type="date" min="${limits.min}" max="${limits.max}" required autocomplete="bday"><small class="field-help">만 4세 이상부터 이용할 수 있습니다.</small></div>
      <button class="primary-btn" type="submit">맞춤 게임 시작하기 →</button>
    </form>
  </section></div>`;
  $('#birthdateSetupForm').onsubmit=async e=>{
    e.preventDefault();
    const form=e.currentTarget;
    const birthDate=String(new FormData(form).get('birthDate')||'');
    if(!validServiceBirthDate(birthDate)){
      toast('올바른 생년월일을 입력해 주세요. 만 4세 이상부터 이용할 수 있습니다.');
      return;
    }
    const ageGroup=ageGroupFromBirthDate(birthDate);
    const button=$('button[type="submit"]',form);
    button.disabled=true;
    button.textContent='맞춤 게임을 준비하고 있어요…';
    if(SUPABASE_ENABLED){
      const result=await db.from('profiles').upsert({
        id:state.user.id,
        name:state.user.name||'사용자',
        birth_date:birthDate,
        age_group:ageGroup,
        updated_at:new Date().toISOString()
      },{onConflict:'id'});
      if(result.error){
        console.error(result.error);
        button.disabled=false;
        button.textContent='맞춤 게임 시작하기 →';
        toast('생년월일을 저장하지 못했습니다.');
        return;
      }
      const authResult=await db.auth.updateUser({data:{birth_date:birthDate}});
      if(authResult.error){
        console.error(authResult.error);
        button.disabled=false;
        button.textContent='맞춤 게임 시작하기 →';
        toast('생년월일을 저장하지 못했습니다.');
        return;
      }
    }
    state.birthDate=birthDate;
    state.user.birthDate=birthDate;
    state.age=ageGroup;
    state.selectedAge=ageGroup;
    if(!SUPABASE_ENABLED)persistCurrentLocalAccount();
    state.screen=state.isAdmin||!assessmentIsDue()?'dashboard':'assessment';
    scheduleAutomaticAgeRefresh();
    render();
    toast(`${AGE_GROUPS[ageGroup].label} 맞춤 게임을 준비했습니다.`);
  };
}

function renderAge() {
  state.screen=state.birthDate&&currentUserAgeGroup()?'dashboard':'birthdate';
  render();
}
