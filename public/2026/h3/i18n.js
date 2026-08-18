(function () {
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  const en = {
    '유아':'Children','유아동':'Children','청소년':'Youth','성인':'Adults','노인':'Seniors','4–12세':'Ages 4–12','13–29세':'Ages 13–29','30–64세':'Ages 30–64','65세 이상':'Ages 65+',
    '오늘의 학습 친구':'Today’s learning buddy','첫 학습을 기다리고 있어요!':'Ready for the first activity!','한 번 학습해서 기분이 좋아졌어요!':'One activity made your buddy happier!','함께 학습해서 정말 행복해요!':'Your buddy is so happy to learn with you!','배가 고파요. 간식을 기다리고 있어요!':'Your buddy is hungry and waiting for a treat!','오늘 완료한 학습':'Activities completed today','회':'',
    'Daily Cog 강아지 캐릭터':'Daily Cog puppy character',
    '놀이로 익히는 집중과 자기조절':'Build focus and self-control through play','도전하며 키우는 기억과 주의력':'Challenge memory and attention','바쁜 일상 속 인지 체력 관리':'Maintain cognitive fitness in daily life','편안하게 지키는 두뇌 건강 습관':'Gentle habits for a healthy mind',
    '바꿔서 분류하기':'Switch & Sort','반대로 움직이기':'Do the Opposite','멈춰! 출발!':'Stop! Go!','듀얼 N-백':'Dual N-Back','숨은 방향':'Hidden Direction','멀티태스킹 드라이브':'Multitasking Drive','표적 찾기':'Spot the target','실시간 자원 전략':'Real-Time Resource Strategy','듀얼 N-백 포커스':'Dual N-Back Focus','빠른 포착':'Quick Glance','소리 기억 산책':'Sound Memory Walk','기억 짝 맞추기':'Memory Match',
    'DCCS · 차원 변경 카드 분류':'DCCS · Dimensional Change Card Sort','HTKS · 신체 역반응 청각':'HTKS · Opposite Action Listening','Flanker 기반 시공간 주의력':'Flanker-based Visual Attention','NeuroRacer 방식 인지제어':'NeuroRacer-style Cognitive Control','디지털 인지 보드게임':'Digital Cognitive Board Game',
    '인지적 유연성':'Cognitive flexibility','작업기억 · 억제 제어':'Working memory · Inhibitory control','충동 조절 · 주의집중':'Impulse control · Attention','작업기억 · 유체지능':'Working memory · Fluid intelligence','선택적 주의 · 시공간 처리':'Selective attention · Spatial processing','인지 제어 · 유연성':'Cognitive control · Flexibility','처리 속도 · 유용 시야':'Processing speed · Useful field of view','계획 · 인지적 예비능':'Planning · Cognitive reserve','언어 기억 · 집중력':'Verbal memory · Attention','기억 · 인지적 예비능':'Memory · Cognitive reserve',
    '색깔 규칙과 모양 규칙을 번갈아 적용해 카드를 분류해요.':'Switch between color and shape rules to sort the cards.','들은 지시와 반대되는 동작을 골라 주의력과 자기조절을 연습해요.':'Choose the opposite action to practice attention and self-control.','초록 신호에는 빠르게 누르고, 빨간 신호에는 잠깐 멈춰요.':'Tap quickly on green and pause on red.','위치와 문자가 이전 자극과 같은지 동시에 기억해요.':'Remember whether the position or letter matches the previous cue.','주변 화살표에 흔들리지 말고 가운데 화살표 방향만 찾아요.':'Ignore the surrounding arrows and follow only the center arrow.','주행 경로를 지키면서 나타나는 표적 신호에도 반응해요.':'Stay on course while responding to target signals.','중앙 표적과 주변 위치를 짧은 순간에 함께 파악해요.':'Identify the center target and peripheral location at once.','제한된 자원을 적절히 배분해 매 라운드의 목표를 달성해요.':'Allocate limited resources to meet each round’s goal.','연속 자극의 위치와 문자를 비교하며 기억을 업데이트해요.':'Update your memory by comparing each new position and letter.','큰 글씨와 선명한 신호로 중앙과 주변 정보를 함께 찾아요.':'Use clear signals to find central and peripheral information together.','들려주는 음의 높낮이 순서를 기억하고 그대로 맞춰요.':'Remember the order of high and low tones.','카드를 뒤집어 같은 그림의 위치를 기억하고 짝을 찾아요.':'Turn over cards, remember their positions, and find matching pairs.',
    '연령 변경':'Change age','사용자 대시보드':'User dashboard','사용자 대시보드를 보려면 먼저 연령층을 선택해 주세요.':'Choose an age group before viewing your dashboard.','로그아웃':'Sign out','설정':'Settings','Daily Cog 홈':'Daily Cog home','Daily Cog를 준비하고 있어요':'Getting Daily Cog ready','안전하게 계정과 기록을 불러오는 중입니다.':'Securely loading your account and activity records.',
    '하루 10분 인지 루틴':'A 10-minute daily cognitive routine','매일 조금씩,':'A little every day,','생각의 힘':'wake up your mind','을 깨워요.':'','내 연령에 맞춘 짧고 즐거운 두뇌 활동. 오늘의 작은 자극을 건강한 인지 습관으로 이어가세요.':'Short, enjoyable brain activities tailored to your age. Turn today’s small challenge into a healthy cognitive habit.','맞춤 연령층':'Age groups','인지 훈련 게임':'Cognitive games','10분':'10 min','하루 권장 루틴':'Daily routine',
    '로그인':'Sign in','회원가입':'Sign up','반가워요!':'Welcome!','다시 만나 반가워요':'Welcome back','나에게 꼭 맞는 인지 루틴을 시작해 보세요.':'Start a cognitive routine designed for you.','오늘의 두뇌 루틴을 이어서 시작해 볼까요?':'Ready to continue today’s brain routine?','이름':'Name','이름을 입력해 주세요':'Enter your name','이메일':'Email','비밀번호':'Password','6자 이상 입력해 주세요':'Enter at least 6 characters','Daily Cog 시작하기':'Start Daily Cog','로그인하고 시작하기':'Sign in and start','계정과 활동 기록은 Supabase에 안전하게 저장됩니다.':'Your account and activity records are securely stored in Supabase.','Supabase 설정 전에는 계정 정보가 현재 브라우저에만 저장됩니다.':'Until Supabase is configured, account data is stored only in this browser.',
    'STEP 01 · 맞춤 설정':'STEP 01 · PERSONALIZE','누구를 위한':'Who is this','두뇌 운동인가요?':'brain activity for?','연령층을 선택하면 발달 단계와 목표에 맞는 게임을 추천해 드려요.':'Choose an age group to get games suited to its developmental stage and goals.','선택은 언제든 바꿀 수 있어요.':'You can change this anytime.','한 가지를 선택해 주세요.':'Please choose one.','맞춤 루틴 보기 →':'View my routine →','저장하고 있어요…':'Saving…',
    "TODAY'S ROUTINE":"TODAY'S ROUTINE",'하루 10분':'10 minutes a day','세 게임 중 하나를 골라 부담 없이 시작하세요.':'Choose any of the three games and start at your pace.','완료한 세션':'Sessions completed','이 브라우저에 저장된 기록':'Your saved activity record','평균 최고점수':'Average best score','점':' pts','꾸준함이 가장 중요해요':'Consistency matters most','3개의 맞춤 활동':'3 tailored activities','Daily Cog는 일상적인 인지 활동을 돕는 웰니스 도구이며 의료기기나 진단·치료 서비스가 아닙니다. 인지 변화가 걱정되면 의료 전문가와 상담해 주세요. 소개된 연구 결과가 이 간이 게임의 동일한 효과를 보장하지는 않습니다.':'Daily Cog is a wellness tool for everyday cognitive activity, not a medical device or diagnostic or treatment service. Consult a healthcare professional if you are concerned about cognitive changes. The cited studies do not guarantee the same effects from these simplified games.',
    '← 오늘의 루틴으로':'← Back to today’s routine','준비':'Ready','이 활동은요':'About this activity','현재 기록':'Current record','점수':'Score','최고':'Best','연구 배경':'Research background','정확한 의학적 검사 대신, 즐겁고 짧은 인지 자극을 위한 활동입니다.':'This is a brief, enjoyable cognitive activity—not a medical assessment.','준비되셨나요?':'Ready to begin?','게임 시작하기 →':'Start game →',
    '화면에 표시된 규칙에 맞는 답을 골라주세요.':'Choose the answer that follows the rule shown.','말과 반대되는 동작을 선택하세요.':'Choose the action opposite to the instruction.','초록 원은 누르고, 빨간 원은 기다리세요.':'Tap the green circle and wait on red.','한 단계 전의 위치 또는 문자가 같으면 눌러요.':'Respond if the position or letter matches the previous cue.','가운데 화살표 방향만 답하세요.':'Respond only to the center arrow.','도로 방향과 표적 색을 함께 판단해요.':'Judge both the road direction and target color.','중앙 문자와 주변 점 위치를 함께 기억해요.':'Remember both the center letter and peripheral dot.','필요한 자원 조합을 선택해 목표를 달성하세요.':'Choose the right resource mix to meet the goal.','재생된 음의 순서를 기억해 눌러요.':'Remember and repeat the tone sequence.','같은 그림 카드의 짝을 모두 찾아요.':'Find all matching picture pairs.',
    '좋아요! 정확해요 ✓':'Great! Correct ✓','조금 아쉬워요. 다음 문제!':'Almost. Try the next one!','색깔별로 분류해요':'Sort by color','모양별로 분류해요':'Sort by shape','🔴 빨강 상자':'🔴 Red box','🔵 파랑 상자':'🔵 Blue box','● 동그라미 상자':'● Circle box','▲ 세모 상자':'▲ Triangle box','반대로 움직여요':'Do the opposite','🙌 지시대로':'🙌 Follow it','👇 반대로':'👇 Opposite','→ 지시대로':'→ Follow it','← 반대로':'← Opposite','⬆ 지시대로':'⬆ Follow it','⬇ 반대로':'⬇ Opposite','초록불! 빠르게 눌러요':'Green! Tap quickly','빨간불! 누르지 마세요':'Red! Do not tap','빨간불에는 잠깐 멈춰요!':'Pause when the light is red!','초록불에는 눌러주세요!':'Tap when the light is green!','멈추기 성공!':'Great stop!',
    '첫 자극을 기억하세요':'Remember the first cue','다음 자극과 비교해요':'Compare it with the next cue','한 단계 전과 같은 요소가 있나요?':'Does anything match the previous cue?','같은 요소 있음':'A match','모두 다름':'All different','가운데 화살표만 보세요':'Look only at the center arrow','← 왼쪽':'← Left','오른쪽 →':'Right →','도로 방향 + 표적 색을 함께!':'Road direction + target color!','왼쪽 · 주황':'Left · Orange','왼쪽 · 파랑':'Left · Blue','오른쪽 · 주황':'Right · Orange','오른쪽 · 파랑':'Right · Blue','왼쪽 위':'Top left','오른쪽 위':'Top right','왼쪽 아래':'Bottom left','오른쪽 아래':'Bottom right','중앙과 주변을 함께 보세요':'Watch the center and the edge','잠시 후 사라집니다':'It will disappear shortly','무엇을 보았나요?':'What did you see?','자원 4개를 배분하세요':'Allocate 4 resources','마을에 식량 3, 지식 1이 필요해요':'The village needs 3 food and 1 knowledge','연구소에 지식 3, 식량 1이 필요해요':'The lab needs 3 knowledge and 1 food','식량 3 · 지식 1':'Food 3 · Knowledge 1','식량 1 · 지식 3':'Food 1 · Knowledge 3',
    '세 개의 음을 기억하세요':'Remember three tones','소리를 재생합니다…':'Playing tones…','낮은 음 ♪':'Low tone ♪','높은 음 ♫':'High tone ♫','들은 순서대로 눌러주세요':'Tap the tones in the order you heard','같은 그림의 짝을 찾아요':'Find matching pictures','완료':'Done','오늘의 두뇌 루틴 완료!':'Today’s brain routine is complete!','집중력이 빛났어요. 이 리듬을 이어가세요!':'Excellent focus. Keep this rhythm going!','좋은 시작이에요. 반복할수록 더 익숙해져요.':'A good start. It gets easier with practice.','괜찮아요. 천천히 규칙에 익숙해지는 중이에요.':'That’s okay. You are getting used to the rules.','다시 하기':'Try again','루틴으로':'Back to routine',
    '언어':'Language','한국어':'Korean','영어':'English','중국어':'Chinese','글자 크기':'Text size','작게':'Small','중간':'Medium','크게':'Large','설정 닫기':'Close settings','화면 설정':'Display settings','원하는 언어와 글자 크기를 선택하세요.':'Choose your preferred language and text size.','선택됨':'Selected','가볍게 깨워볼까요?':'Shall we gently wake it up?','내 계정에 저장된 기록':'Saved to your account','계정을 만들고 있어요…':'Creating your account…','로그인하고 있어요…':'Signing you in…','손을 올려요':'Raise your hands','오른쪽을 봐요':'Look right','일어나요':'Stand up','Supabase SDK를 불러오지 못해 로컬 모드로 실행합니다.':'Could not load Supabase. Running in local mode.','Supabase 연결을 확인해 주세요.':'Please check your Supabase connection.','로그아웃하지 못했습니다. 다시 시도해 주세요.':'Could not sign out. Please try again.','가입 확인 메일을 보냈어요. 이메일 확인 후 로그인해 주세요.':'We sent a confirmation email. Confirm it, then sign in.','인증 중 문제가 발생했습니다.':'Something went wrong during authentication.','연령 설정을 저장하지 못했습니다.':'Could not save the age setting.','이 브라우저에서 소리를 재생할 수 없어요.':'This browser cannot play audio.','점수 저장에 실패했습니다. 연결을 확인해 주세요.':'Could not save your score. Check the connection.','설정을 저장하지 못했습니다.':'Could not save settings.','내 프로필':'My profile','로그인 정보와 프로필 사진을 관리하세요.':'Manage your sign-in information and profile photo.','프로필 닫기':'Close profile','프로필 사진':'Profile photo','프로필 사진 미리보기':'Profile photo preview','JPG, PNG, WEBP 또는 GIF · 최대 5MB':'JPG, PNG, WEBP or GIF · Up to 5MB','사진 변경':'Change photo','사진 제거':'Remove photo','아이디 (이메일)':'ID (Email)','현재 비밀번호':'Current password','비밀번호 변경 시 입력':'Enter when changing your password','새 비밀번호':'New password','변경하지 않으려면 비워두세요':'Leave blank to keep your current password','이메일을 변경하면 새 주소로 확인 메일이 전송될 수 있습니다. 비밀번호는 6자 이상 입력해 주세요.':'Changing your email may send a confirmation message to the new address. Passwords must have at least 6 characters.','변경사항 저장':'Save changes','JPG, PNG, WEBP 또는 GIF 이미지를 선택해 주세요.':'Choose a JPG, PNG, WEBP, or GIF image.','프로필 사진은 5MB 이하만 사용할 수 있습니다.':'Profile photos must be 5MB or smaller.','새 비밀번호는 6자 이상 입력해 주세요.':'Your new password must have at least 6 characters.','프로필을 저장하고 있어요…':'Saving your profile…','프로필을 저장했습니다. 이메일 확인함도 확인해 주세요.':'Profile saved. Please check your inbox as well.','프로필을 저장했습니다.':'Profile saved.','프로필을 저장하지 못했습니다.':'Could not save your profile.','라운드':'Round','남은 시간':'Time left','난이도를 선택하세요':'Choose a difficulty','쉬움':'Easy','어려움':'Hard','제한시간':'Time limit','목표':'Goal','짝 찾기':'Find pairs','두 단계 전의 위치 또는 문자가 같으면 눌러요.':'Respond if the position or letter matches two cues back.','두 단계 뒤 자극과 비교해요':'Compare this with the cue two steps later','두 단계 전과 같은 요소가 있나요?':'Does anything match the cue two steps back?','시간이 종료되었어요!':'Time is up!','제한시간까지 집중한 결과예요. 다시 도전하면 더 좋아질 수 있어요.':'This is your result at the time limit. Try again to improve it.'
  };

  const zh = {
    '유아':'幼儿','유아동':'幼儿','청소년':'青少年','성인':'成人','노인':'老年人','4–12세':'4–12岁','13–29세':'13–29岁','30–64세':'30–64岁','65세 이상':'65岁以上',
    '오늘의 학습 친구':'今日学习伙伴','첫 학습을 기다리고 있어요!':'正在等待第一次学习！','한 번 학습해서 기분이 좋아졌어요!':'完成一次学习，伙伴更开心了！','함께 학습해서 정말 행복해요!':'一起学习让伙伴非常开心！','배가 고파요. 간식을 기다리고 있어요!':'肚子饿了，正在等待零食！','오늘 완료한 학습':'今日完成学习','회':'次',
    'Daily Cog 강아지 캐릭터':'Daily Cog小狗角色',
    '놀이로 익히는 집중과 자기조절':'在游戏中培养专注力与自控力','도전하며 키우는 기억과 주의력':'通过挑战提升记忆力和注意力','바쁜 일상 속 인지 체력 관리':'在忙碌生活中保持认知活力','편안하게 지키는 두뇌 건강 습관':'轻松养成健脑习惯',
    '바꿔서 분류하기':'切换分类','반대로 움직이기':'反向动作','멈춰! 출발!':'停！开始！','듀얼 N-백':'双重 N-Back','숨은 방향':'隐藏方向','멀티태스킹 드라이브':'多任务驾驶','표적 찾기':'寻找目标','실시간 자원 전략':'实时资源策略','듀얼 N-백 포커스':'双重N-Back专注','빠른 포착':'快速一瞥','소리 기억 산책':'声音记忆漫步','기억 짝 맞추기':'记忆配对',
    'DCCS · 차원 변경 카드 분류':'DCCS · 维度变化卡片分类','HTKS · 신체 역반응 청각':'HTKS · 听觉反向动作','Flanker 기반 시공간 주의력':'基于Flanker的视觉空间注意力','NeuroRacer 방식 인지제어':'NeuroRacer式认知控制','디지털 인지 보드게임':'数字认知桌游',
    '인지적 유연성':'认知灵活性','작업기억 · 억제 제어':'工作记忆 · 抑制控制','충동 조절 · 주의집중':'冲动控制 · 注意力','작업기억 · 유체지능':'工作记忆 · 流体智力','선택적 주의 · 시공간 처리':'选择性注意 · 空间处理','인지 제어 · 유연성':'认知控制 · 灵活性','처리 속도 · 유용 시야':'处理速度 · 有效视野','계획 · 인지적 예비능':'计划 · 认知储备','언어 기억 · 집중력':'语言记忆 · 专注力','기억 · 인지적 예비능':'记忆 · 认知储备',
    '색깔 규칙과 모양 규칙을 번갈아 적용해 카드를 분류해요.':'在颜色与形状规则之间切换并分类卡片。','들은 지시와 반대되는 동작을 골라 주의력과 자기조절을 연습해요.':'选择与指令相反的动作，练习注意力与自控力。','초록 신호에는 빠르게 누르고, 빨간 신호에는 잠깐 멈춰요.':'看到绿灯快速点击，看到红灯暂停。','위치와 문자가 이전 자극과 같은지 동시에 기억해요.':'同时记住位置或字母是否与上一个提示相同。','주변 화살표에 흔들리지 말고 가운데 화살표 방향만 찾아요.':'忽略周围箭头，只判断中央箭头方向。','주행 경로를 지키면서 나타나는 표적 신호에도 반응해요.':'保持行驶方向，同时回应目标信号。','중앙 표적과 주변 위치를 짧은 순간에 함께 파악해요.':'在短时间内同时识别中央目标与周边位置。','제한된 자원을 적절히 배분해 매 라운드의 목표를 달성해요.':'合理分配有限资源，完成每轮目标。','연속 자극의 위치와 문자를 비교하며 기억을 업데이트해요.':'比较连续出现的位置和字母，不断更新记忆。','큰 글씨와 선명한 신호로 중앙과 주변 정보를 함께 찾아요.':'通过清晰信号同时寻找中央与周边信息。','들려주는 음의 높낮이 순서를 기억하고 그대로 맞춰요.':'记住高低音的顺序并正确复现。','카드를 뒤집어 같은 그림의 위치를 기억하고 짝을 찾아요.':'翻开卡片，记住图案位置并找到配对。',
    '연령 변경':'更改年龄层','사용자 대시보드':'用户仪表板','사용자 대시보드를 보려면 먼저 연령층을 선택해 주세요.':'请先选择年龄层，再查看用户仪表板。','로그아웃':'退出登录','설정':'设置','Daily Cog 홈':'Daily Cog主页','Daily Cog를 준비하고 있어요':'正在准备Daily Cog','안전하게 계정과 기록을 불러오는 중입니다.':'正在安全加载账户与活动记录。',
    '하루 10분 인지 루틴':'每天10分钟认知训练','매일 조금씩,':'每天一点点，','생각의 힘':'唤醒思考力','을 깨워요.':'','내 연령에 맞춘 짧고 즐거운 두뇌 활동. 오늘의 작은 자극을 건강한 인지 습관으로 이어가세요.':'适合您年龄的短时趣味脑力活动。把今天的小挑战变成健康的认知习惯。','맞춤 연령층':'年龄分组','인지 훈련 게임':'认知训练游戏','10분':'10分钟','하루 권장 루틴':'每日建议训练',
    '로그인':'登录','회원가입':'注册','반가워요!':'欢迎！','다시 만나 반가워요':'欢迎回来','나에게 꼭 맞는 인지 루틴을 시작해 보세요.':'开始适合您的认知训练吧。','오늘의 두뇌 루틴을 이어서 시작해 볼까요?':'继续今天的脑力训练吧？','이름':'姓名','이름을 입력해 주세요':'请输入姓名','이메일':'邮箱','비밀번호':'密码','6자 이상 입력해 주세요':'请输入至少6个字符','Daily Cog 시작하기':'开始使用Daily Cog','로그인하고 시작하기':'登录并开始','계정과 활동 기록은 Supabase에 안전하게 저장됩니다.':'账户与活动记录将安全保存至Supabase。','Supabase 설정 전에는 계정 정보가 현재 브라우저에만 저장됩니다.':'配置Supabase之前，账户信息仅保存在当前浏览器中。',
    'STEP 01 · 맞춤 설정':'步骤01 · 个性化设置','누구를 위한':'这是为谁准备的','두뇌 운동인가요?':'脑力训练？','연령층을 선택하면 발달 단계와 목표에 맞는 게임을 추천해 드려요.':'选择年龄层后，我们将推荐适合其发展阶段与目标的游戏。','선택은 언제든 바꿀 수 있어요.':'您可以随时更改选择。','한 가지를 선택해 주세요.':'请选择一项。','맞춤 루틴 보기 →':'查看定制训练 →','저장하고 있어요…':'正在保存…',
    "TODAY'S ROUTINE":'今日训练','하루 10분':'每天10分钟','세 게임 중 하나를 골라 부담 없이 시작하세요.':'从三个游戏中任选一个，轻松开始。','완료한 세션':'已完成次数','이 브라우저에 저장된 기록':'已保存的活动记录','평균 최고점수':'平均最高分','점':'分','꾸준함이 가장 중요해요':'坚持最重要','3개의 맞춤 활동':'3项定制活动','Daily Cog는 일상적인 인지 활동을 돕는 웰니스 도구이며 의료기기나 진단·치료 서비스가 아닙니다. 인지 변화가 걱정되면 의료 전문가와 상담해 주세요. 소개된 연구 결과가 이 간이 게임의 동일한 효과를 보장하지는 않습니다.':'Daily Cog是辅助日常认知活动的健康工具，并非医疗器械、诊断或治疗服务。如担心认知变化，请咨询医疗专业人士。引用的研究并不保证这些简化游戏具有相同效果。',
    '← 오늘의 루틴으로':'← 返回今日训练','준비':'准备','이 활동은요':'活动说明','현재 기록':'当前记录','점수':'分数','최고':'最高','연구 배경':'研究背景','정확한 의학적 검사 대신, 즐겁고 짧은 인지 자극을 위한 활동입니다.':'这是一项轻松简短的认知活动，并非医学评估。','준비되셨나요?':'准备好了吗？','게임 시작하기 →':'开始游戏 →',
    '화면에 표시된 규칙에 맞는 답을 골라주세요.':'请选择符合屏幕规则的答案。','말과 반대되는 동작을 선택하세요.':'请选择与指令相反的动作。','초록 원은 누르고, 빨간 원은 기다리세요.':'点击绿色圆圈，红色时等待。','한 단계 전의 위치 또는 문자가 같으면 눌러요.':'若位置或字母与上一个提示相同，请点击。','가운데 화살표 방향만 답하세요.':'只判断中央箭头的方向。','도로 방향과 표적 색을 함께 판단해요.':'同时判断道路方向与目标颜色。','중앙 문자와 주변 점 위치를 함께 기억해요.':'同时记住中央字母与周边圆点位置。','필요한 자원 조합을 선택해 목표를 달성하세요.':'选择正确的资源组合来完成目标。','재생된 음의 순서를 기억해 눌러요.':'记住播放的音调顺序并点击。','같은 그림 카드의 짝을 모두 찾아요.':'找出所有相同图案的配对。',
    '좋아요! 정확해요 ✓':'很好！正确 ✓','조금 아쉬워요. 다음 문제!':'差一点，继续下一题！','색깔별로 분류해요':'按颜色分类','모양별로 분류해요':'按形状分类','🔴 빨강 상자':'🔴 红色框','🔵 파랑 상자':'🔵 蓝色框','● 동그라미 상자':'● 圆形框','▲ 세모 상자':'▲ 三角形框','반대로 움직여요':'做相反动作','🙌 지시대로':'🙌 按指令','👇 반대로':'👇 相反','→ 지시대로':'→ 按指令','← 반대로':'← 相反','⬆ 지시대로':'⬆ 按指令','⬇ 반대로':'⬇ 相反','초록불! 빠르게 눌러요':'绿灯！快速点击','빨간불! 누르지 마세요':'红灯！不要点击','빨간불에는 잠깐 멈춰요!':'红灯时请暂停！','초록불에는 눌러주세요!':'绿灯时请点击！','멈추기 성공!':'成功停止！',
    '첫 자극을 기억하세요':'记住第一个提示','다음 자극과 비교해요':'与下一个提示比较','한 단계 전과 같은 요소가 있나요?':'是否有元素与上一个提示相同？','같은 요소 있음':'有相同元素','모두 다름':'全部不同','가운데 화살표만 보세요':'只看中央箭头','← 왼쪽':'← 左','오른쪽 →':'右 →','도로 방향 + 표적 색을 함께!':'道路方向＋目标颜色！','왼쪽 · 주황':'左 · 橙色','왼쪽 · 파랑':'左 · 蓝色','오른쪽 · 주황':'右 · 橙色','오른쪽 · 파랑':'右 · 蓝色','왼쪽 위':'左上','오른쪽 위':'右上','왼쪽 아래':'左下','오른쪽 아래':'右下','중앙과 주변을 함께 보세요':'同时观察中央与周边','잠시 후 사라집니다':'即将消失','무엇을 보았나요?':'您看到了什么？','자원 4개를 배분하세요':'分配4个资源','마을에 식량 3, 지식 1이 필요해요':'村庄需要3份食物和1份知识','연구소에 지식 3, 식량 1이 필요해요':'研究所需要3份知识和1份食物','식량 3 · 지식 1':'食物3 · 知识1','식량 1 · 지식 3':'食物1 · 知识3',
    '세 개의 음을 기억하세요':'记住三个音调','소리를 재생합니다…':'正在播放声音…','낮은 음 ♪':'低音 ♪','높은 음 ♫':'高音 ♫','들은 순서대로 눌러주세요':'请按听到的顺序点击','같은 그림의 짝을 찾아요':'寻找相同图案','완료':'完成','오늘의 두뇌 루틴 완료!':'今天的脑力训练完成！','집중력이 빛났어요. 이 리듬을 이어가세요!':'专注力非常出色，请继续保持！','좋은 시작이에요. 반복할수록 더 익숙해져요.':'这是一个好开始，练习后会更熟悉。','괜찮아요. 천천히 규칙에 익숙해지는 중이에요.':'没关系，您正在逐渐熟悉规则。','다시 하기':'再试一次','루틴으로':'返回训练',
    '언어':'语言','한국어':'韩语','영어':'英语','중국어':'中文','글자 크기':'文字大小','작게':'小','중간':'中','크게':'大','설정 닫기':'关闭设置','화면 설정':'显示设置','원하는 언어와 글자 크기를 선택하세요.':'请选择语言和文字大小。','선택됨':'已选择','가볍게 깨워볼까요?':'轻松唤醒大脑吧？','내 계정에 저장된 기록':'已保存至您的账户','계정을 만들고 있어요…':'正在创建账户…','로그인하고 있어요…':'正在登录…','손을 올려요':'举起双手','오른쪽을 봐요':'向右看','일어나요':'站起来','Supabase SDK를 불러오지 못해 로컬 모드로 실행합니다.':'无法加载Supabase，将使用本地模式。','Supabase 연결을 확인해 주세요.':'请检查Supabase连接。','로그아웃하지 못했습니다. 다시 시도해 주세요.':'无法退出登录，请重试。','가입 확인 메일을 보냈어요. 이메일 확인 후 로그인해 주세요.':'确认邮件已发送，请确认邮箱后登录。','인증 중 문제가 발생했습니다.':'认证过程中出现问题。','연령 설정을 저장하지 못했습니다.':'无法保存年龄设置。','이 브라우저에서 소리를 재생할 수 없어요.':'此浏览器无法播放声音。','점수 저장에 실패했습니다. 연결을 확인해 주세요.':'分数保存失败，请检查连接。','설정을 저장하지 못했습니다.':'无法保存设置。','내 프로필':'我的资料','로그인 정보와 프로필 사진을 관리하세요.':'管理登录信息与头像。','프로필 닫기':'关闭资料','프로필 사진':'头像','프로필 사진 미리보기':'头像预览','JPG, PNG, WEBP 또는 GIF · 최대 5MB':'JPG、PNG、WEBP或GIF · 最大5MB','사진 변경':'更换照片','사진 제거':'移除照片','아이디 (이메일)':'账号（邮箱）','현재 비밀번호':'当前密码','비밀번호 변경 시 입력':'更改密码时输入','새 비밀번호':'新密码','변경하지 않으려면 비워두세요':'如不更改请留空','이메일을 변경하면 새 주소로 확인 메일이 전송될 수 있습니다. 비밀번호는 6자 이상 입력해 주세요.':'更改邮箱后，系统可能向新地址发送确认邮件。密码至少需要6个字符。','변경사항 저장':'保存更改','JPG, PNG, WEBP 또는 GIF 이미지를 선택해 주세요.':'请选择JPG、PNG、WEBP或GIF图片。','프로필 사진은 5MB 이하만 사용할 수 있습니다.':'头像大小不能超过5MB。','새 비밀번호는 6자 이상 입력해 주세요.':'新密码至少需要6个字符。','프로필을 저장하고 있어요…':'正在保存资料…','프로필을 저장했습니다. 이메일 확인함도 확인해 주세요.':'资料已保存，请同时检查邮箱。','프로필을 저장했습니다.':'资料已保存。','프로필을 저장하지 못했습니다.':'无法保存资料。','라운드':'轮次','남은 시간':'剩余时间','난이도를 선택하세요':'请选择难度','쉬움':'简单','어려움':'困难','제한시간':'时间限制','목표':'目标','짝 찾기':'寻找配对','두 단계 전의 위치 또는 문자가 같으면 눌러요.':'若位置或字母与前两个提示相同，请点击。','두 단계 뒤 자극과 비교해요':'与两个提示之后的内容比较','두 단계 전과 같은 요소가 있나요?':'是否有元素与前两个提示相同？','시간이 종료되었어요!':'时间到！','제한시간까지 집중한 결과예요. 다시 도전하면 더 좋아질 수 있어요.':'这是时间结束时的成绩，再次挑战可以取得更好结果。'
  };

  // 게임 중 동적으로 조합되는 짧은 문구와 상태 라벨
  Object.assign(en, {
    '계정 관리':'Account management','로그아웃하거나 Daily Cog 계정과 학습 기록을 삭제할 수 있습니다.':'Sign out or delete your Daily Cog account and learning records.','회원 탈퇴':'Delete account','회원 탈퇴 시 계정, 게임 기록, 별점과 상점 정보가 모두 삭제됩니다. 정말 탈퇴하시겠습니까?':'Deleting your account permanently removes your account, game history, stars, and shop data. Are you sure?','탈퇴 처리 중…':'Deleting account…','회원 탈퇴를 완료하지 못했습니다. 다시 시도해 주세요.':'Could not delete your account. Please try again.','회원 탈퇴가 완료되었습니다.':'Your account has been deleted.',
    '이메일 학습 알림':'Email learning reminders','자녀가 3일 동안 별을 얻지 못하면 자녀와 연결된 보호자에게 격려 이메일을 보냅니다.':'If a child earns no stars for 3 days, an encouragement email is sent to the child and linked guardians.','알림 켜짐':'Notifications on','알림 꺼짐':'Notifications off','이메일 알림은 Supabase에 연결된 계정에서 사용할 수 있습니다.':'Email reminders are available for accounts connected to Supabase.','이메일 알림 스키마를 먼저 적용해 주세요.':'Apply the email notification schema first.','이메일 학습 알림을 켰습니다.':'Email learning reminders are on.','이메일 학습 알림을 껐습니다.':'Email learning reminders are off.',
    '화면 색감':'Color theme','빨간색':'Red','주황색':'Orange','노란색':'Yellow','초록색':'Green','파란색':'Blue','라벤더':'Lavender','흰색':'White','검정색':'Black','원하는 언어, 글자 크기와 화면 색감을 선택하세요.':'Choose your preferred language, text size, and color theme.',
    '오늘의 루틴': "TODAY'S ROUTINE",
    '출발': 'GO',
    '멈춤': 'STOP',
    '세션 완료': 'SESSION COMPLETE',
    '빠른 메뉴': 'Quick menu',
    '오늘의 별점': "Today's stars",
    '별점 기록을 저장하지 못했습니다.': 'Could not save your star rating.',
    '별점 계산': 'Star calculation',
    '정확도 80%와 남은 시간 20%를 함께 반영해요.': 'Stars combine 80% accuracy and 20% remaining time.',
    '짧은 순간 나타나는 동그라미의 위치를 빠르게 파악해요.':'Quickly identify where the circle appears.','선명한 동그라미가 나타난 위치를 빠르게 찾아요.':'Quickly find the position of the clear circle.','동그라미가 나타난 위치를 기억해요.':'Remember where the circle appears.','같은 화살표의 방향을 고르세요':'Choose the direction of the matching arrows','주변을 무시하고 가운데만 보세요':'Ignore the sides and look only at the center','가운데 주황색 화살표의 방향을 찾으세요':'Find the direction of the orange center arrow','↑ 위':'↑ Up','아래 ↓':'Down ↓','🙌 손 올리기':'🙌 Raise hands','👇 손 내리기':'👇 Lower hands','→ 오른쪽 보기':'→ Look right','← 왼쪽 보기':'← Look left','⬆ 일어서기':'⬆ Stand up','⬇ 앉기':'⬇ Sit down',
    '크기별로 분류해요':'Sort by size','⬤ 큰 카드':'⬤ Large card','• 작은 카드':'• Small card','두 지시를 순서대로 반대로 하세요':'Reverse both instructions in order','글자가 아닌 원의 색에 반응하세요':'Respond to the circle color, not the word','많은 방해 화살표 속 가운데만 보세요':'Focus on the center among many distractors','도로 방향을 선택하세요':'Choose the road direction','방향 + 색 + 모양을 모두 판단하세요':'Judge direction, color, and shape','주황':'Orange','파랑':'Blue','왼쪽':'Left','오른쪽':'Right','가운데':'Center','위':'Up','아래':'Down','중앙 문자를 바라보며 동그라미 위치를 기억해요.':'Keep your eyes on the center letter and remember the circle position.','동그라미 위치를 기억하세요':'Remember the circle position','동그라미는 어디에 있었나요?':'Where was the circle?','응답 시간이 지났어요!':'Response time is up!','두 자원을 목표에 맞게 배분하세요':'Allocate two resources to match the goal','세 자원을 정확히 배분하세요':'Allocate all three resources correctly','방해 선택지 속 정확한 배분을 찾으세요':'Find the exact allocation among the distractors','마을 목표: 🌾3 · 📚1':'Village goal: 🌾3 · 📚1','연구소 목표: 🌾1 · 📚3':'Lab goal: 🌾1 · 📚3','도시 목표: 🌾2 · 📚2 · ⚡1':'City goal: 🌾2 · 📚2 · ⚡1','연구 목표: 🌾1 · 📚3 · ⚡1':'Research goal: 🌾1 · 📚3 · ⚡1','복합 목표: 🌾2 · 📚3 · ⚡2':'Combined goal: 🌾2 · 📚3 · ⚡2','긴급 목표: 🌾3 · 📚1 · ⚡3':'Urgent goal: 🌾3 · 📚1 · ⚡3'
  });
  Object.assign(zh, {
    '계정 관리':'账户管理','로그아웃하거나 Daily Cog 계정과 학습 기록을 삭제할 수 있습니다.':'您可以退出登录，或删除Daily Cog账户和学习记录。','회원 탈퇴':'删除账户','회원 탈퇴 시 계정, 게임 기록, 별점과 상점 정보가 모두 삭제됩니다. 정말 탈퇴하시겠습니까?':'删除账户后，账户、游戏记录、星级和商店信息都将被永久删除。确定要删除吗？','탈퇴 처리 중…':'正在删除账户…','회원 탈퇴를 완료하지 못했습니다. 다시 시도해 주세요.':'无法删除账户，请重试。','회원 탈퇴가 완료되었습니다.':'账户已删除。',
    '이메일 학습 알림':'电子邮件学习提醒','자녀가 3일 동안 별을 얻지 못하면 자녀와 연결된 보호자에게 격려 이메일을 보냅니다.':'如果孩子连续3天没有获得星星，系统会向孩子和已关联的监护人发送鼓励邮件。','알림 켜짐':'提醒已开启','알림 꺼짐':'提醒已关闭','이메일 알림은 Supabase에 연결된 계정에서 사용할 수 있습니다.':'电子邮件提醒仅适用于已连接Supabase的账户。','이메일 알림 스키마를 먼저 적용해 주세요.':'请先应用电子邮件提醒数据库架构。','이메일 학습 알림을 켰습니다.':'电子邮件学习提醒已开启。','이메일 학습 알림을 껐습니다.':'电子邮件学习提醒已关闭。',
    '화면 색감':'界面色调','빨간색':'红色','주황색':'橙色','노란색':'黄色','초록색':'绿色','파란색':'蓝色','라벤더':'薰衣草紫','흰색':'白色','검정색':'黑色','원하는 언어, 글자 크기와 화면 색감을 선택하세요.':'请选择语言、文字大小和界面色调。',
    '오늘의 루틴': '今日训练',
    '출발': '开始',
    '멈춤': '停止',
    '세션 완료': '训练完成',
    '빠른 메뉴': '快捷菜单',
    '오늘의 별점': '今日星星',
    '별점 기록을 저장하지 못했습니다.': '无法保存星级记录。',
    '별점 계산': '星级计算',
    '정확도 80%와 남은 시간 20%를 함께 반영해요.': '星级由80%的准确率和20%的剩余时间共同计算。',
    '짧은 순간 나타나는 동그라미의 위치를 빠르게 파악해요.':'快速判断短暂出现的圆圈位置。','선명한 동그라미가 나타난 위치를 빠르게 찾아요.':'快速找到清晰圆圈出现的位置。','동그라미가 나타난 위치를 기억해요.':'记住圆圈出现的位置。','같은 화살표의 방향을 고르세요':'选择相同箭头的方向','주변을 무시하고 가운데만 보세요':'忽略两侧，只看中央','가운데 주황색 화살표의 방향을 찾으세요':'找出中央橙色箭头的方向','↑ 위':'↑ 上','아래 ↓':'下 ↓','🙌 손 올리기':'🙌 举手','👇 손 내리기':'👇 放下双手','→ 오른쪽 보기':'→ 向右看','← 왼쪽 보기':'← 向左看','⬆ 일어서기':'⬆ 站起来','⬇ 앉기':'⬇ 坐下',
    '크기별로 분류해요':'按大小分类','⬤ 큰 카드':'⬤ 大卡片','• 작은 카드':'• 小卡片','두 지시를 순서대로 반대로 하세요':'按顺序反向执行两个指令','글자가 아닌 원의 색에 반응하세요':'根据圆圈颜色而不是文字作答','많은 방해 화살표 속 가운데만 보세요':'在众多干扰箭头中只看中央','도로 방향을 선택하세요':'选择道路方向','방향 + 색 + 모양을 모두 판단하세요':'同时判断方向、颜色和形状','주황':'橙色','파랑':'蓝色','왼쪽':'左','오른쪽':'右','가운데':'中间','위':'上','아래':'下','중앙 문자를 바라보며 동그라미 위치를 기억해요.':'注视中央字母并记住圆圈的位置。','동그라미 위치를 기억하세요':'记住圆圈的位置','동그라미는 어디에 있었나요?':'圆圈在哪里？','응답 시간이 지났어요!':'作答时间已结束！','두 자원을 목표에 맞게 배분하세요':'根据目标分配两种资源','세 자원을 정확히 배분하세요':'准确分配三种资源','방해 선택지 속 정확한 배분을 찾으세요':'从干扰选项中找出准确分配','마을 목표: 🌾3 · 📚1':'村庄目标：🌾3 · 📚1','연구소 목표: 🌾1 · 📚3':'研究所目标：🌾1 · 📚3','도시 목표: 🌾2 · 📚2 · ⚡1':'城市目标：🌾2 · 📚2 · ⚡1','연구 목표: 🌾1 · 📚3 · ⚡1':'研究目标：🌾1 · 📚3 · ⚡1','복합 목표: 🌾2 · 📚3 · ⚡2':'综合目标：🌾2 · 📚3 · ⚡2','긴급 목표: 🌾3 · 📚1 · ⚡3':'紧急目标：🌾3 · 📚1 · ⚡3'
  });

  Object.assign(en, {
    '생각의 힘을 깨워요.': 'Awaken your mind.',
    '목표 달성!': 'Goal achieved!',
    '✓ 목표 달성!': '✓ Goal achieved!',
    '현재 비밀번호를 입력해 주세요.': 'Enter your current password.',
    '현재 비밀번호가 올바르지 않습니다.': 'The current password is incorrect.',
    '새 비밀번호는 현재 비밀번호와 달라야 합니다.': 'The new password must be different from the current password.',
    '이메일 또는 비밀번호가 올바르지 않습니다.': 'The email or password is incorrect.',
    '이 브라우저에서는 안전한 비밀번호 저장을 지원하지 않습니다.': 'This browser does not support secure password storage.',
    '연속 출석': 'Attendance streak',
    '일째': 'days',
    '하루 세 게임으로 이어가요': 'Keep it going with three games a day.',
    'Daily Cog 성인 강아지': 'Daily Cog adult dog',
    '사용자 대시보드': 'User dashboard',
    '게임 기록을 바탕으로 정확도와 꾸준한 활동을 확인해요.': 'Review your accuracy and consistency based on your game history.',
    '오늘의 루틴 보기': "View today's routine",
    '전체 게임': 'Total games',
    '회': 'plays',
    '지금까지 완료한 활동': 'Activities completed so far',
    '평균 정확도': 'Average accuracy',
    '일일 목표 달성률': 'Daily goal progress',
    '누적 별점': 'Total stars',
    '완료한 게임에서 모은 별': 'Stars earned from completed games',
    '최근 7일 활동': 'Last 7 days',
    '게임별 성과': 'Performance by game',
    '현재 제공된 게임': 'Currently assigned games',
    '맞춤 게임별 성과': 'Performance by assigned game',
    '최근 게임 기록': 'Recent game history',
    '나의 성장 일지': 'My growth journal',
    '자녀 성장 일지': 'Ward growth journal',
    '자녀의 게임 종류 또는 인지능력별 평균 정확도 변화를 확인합니다.': 'Track the child’s average accuracy changes by game or cognitive ability.',
    '자녀 성장 일지 분류': 'Child growth journal category',
    '자녀 성장 그래프 기간': 'Child growth chart period',
    '게임 종류 또는 인지능력별 평균 정확도의 변화를 확인해요.': 'Track changes in average accuracy by game or cognitive ability.',
    '성장 일지 분류': 'Growth journal category',
    '그래프 기간': 'Chart period',
    '게임별': 'By game',
    '인지능력별': 'By cognitive ability',
    '주간': 'Weekly',
    '월간': 'Monthly',
    '연간': 'Yearly',
    '확인할 항목': 'Metric to view',
    '전체 기록': 'Total records',
    '전체 평균': 'Overall average',
    '최근 주 평균': 'Latest weekly average',
    '최근 학습일 평균': 'Latest learning-day average',
    '최근 학습월 평균': 'Latest learning-month average',
    '최근 주간 평균': 'Latest weekly average',
    '첫 기록 대비': 'Change from first record',
    '첫 기록 주 대비': 'Change from first recorded week',
    '첫 기록일 대비': 'Change from first recorded day',
    '첫 기록월 대비': 'Change from first recorded month',
    '첫 주 대비': 'Change from first week',
    '선택한 항목의 최근 8주 게임 기록이 없습니다.': 'There is no game history for the selected metric in the last 8 weeks.',
    '최근 8주 평균 정확도 성장 그래프': 'Average accuracy growth chart for the last 8 weeks',
    '최근 8주 평균 정확도 꺾은선 그래프': 'Average accuracy line chart for the last 8 weeks',
    '최근 8주 날짜별 평균 정확도 꺾은선 그래프': 'Daily average accuracy line chart for the last 8 weeks',
    '선택한 항목의 최근 7일 기록이 없습니다.': 'There is no record for the selected metric in the last 7 days.',
    '선택한 항목의 최근 30일 기록이 없습니다.': 'There is no record for the selected metric in the last 30 days.',
    '선택한 항목의 최근 4주 기록이 없습니다.': 'There is no record for the selected metric in the last 4 weeks.',
    '선택한 항목의 최근 12개월 기록이 없습니다.': 'There is no record for the selected metric in the last 12 months.',
    '최근 7일 평균 정확도 꺾은선 그래프': 'Average accuracy line chart for the last 7 days',
    '최근 30일 평균 정확도 꺾은선 그래프': 'Average accuracy line chart for the last 30 days',
    '최근 4주 주간 평균 정확도 꺾은선 그래프': 'Weekly average accuracy line chart for the last 4 weeks',
    '최근 12개월 월별 평균 정확도 꺾은선 그래프': 'Monthly average accuracy line chart for the last 12 months',
    '주간 평균은 월요일부터 일요일까지 완료한 게임 점수를 기준으로 계산합니다.': 'Weekly averages use game scores completed from Monday through Sunday.',
    '주간 평균은 월요일부터 일요일까지 완료한 게임의 실제 정확도를 기준으로 계산합니다.': 'Weekly averages use the actual accuracy of games completed from Monday through Sunday.',
    '주간 평균은 월요일부터 일요일까지 완료한 게임의 실제 정확도를 기준으로 계산합니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': 'Weekly averages use actual accuracy from Monday through Sunday. Older Memory Match records without actual accuracy are excluded from accuracy averages.',
    '날짜별 평균은 해당 날짜에 완료한 게임의 실제 정확도를 기준으로 계산하고, 학습한 날짜의 점을 시간 순서대로 연결합니다.': 'Daily averages use the actual accuracy of games completed that day and connect learning-day points in chronological order.',
    '날짜별 평균은 해당 날짜에 완료한 게임의 실제 정확도를 기준으로 계산하고, 학습한 날짜의 점을 시간 순서대로 연결합니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': 'Daily averages use actual accuracy from that day and connect learning-day points chronologically. Older Memory Match records without actual accuracy are excluded.',
    '주간·월간 그래프는 날짜별 평균을, 연간 그래프는 월별 평균을 표시합니다. 기록이 한 시점뿐이면 점으로만 나타납니다.': 'Weekly and monthly charts show daily averages, while the yearly chart shows monthly averages. A single data point is shown only as a dot.',
    '주간·월간 그래프는 날짜별 평균을, 연간 그래프는 월별 평균을 표시합니다. 기록이 한 시점뿐이면 점으로만 나타납니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': 'Weekly and monthly charts show daily averages, while the yearly chart shows monthly averages. A single data point is shown only as a dot. Older Memory Match records without actual accuracy are excluded.',
    '주간 그래프는 날짜별 평균을, 월간 그래프는 7일간 평균을, 연간 그래프는 월별 평균을 표시합니다. 각 점은 집계 기간의 마지막 날짜 위에 표시되며 기록이 한 시점뿐이면 점으로만 나타납니다.': 'The weekly chart shows daily averages, the monthly chart shows 7-day averages, and the yearly chart shows monthly averages. Each point appears above the final date of its period, and a single record is shown only as a dot.',
    '주간 그래프는 날짜별 평균을, 월간 그래프는 7일간 평균을, 연간 그래프는 월별 평균을 표시합니다. 각 점은 집계 기간의 마지막 날짜 위에 표시되며 기록이 한 시점뿐이면 점으로만 나타납니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': 'The weekly chart shows daily averages, the monthly chart shows 7-day averages, and the yearly chart shows monthly averages. Each point appears above the final date of its period, and a single record is shown only as a dot. Older Memory Match records without actual accuracy are excluded.',
    '정확도 백분위 비교': 'Accuracy percentile comparison',
    '자녀 정확도 백분위 비교': 'Ward accuracy percentile comparison',
    '연령대 및 전체 비교는 Supabase에 연결된 계정에서 제공됩니다.': 'Age-group and overall comparisons are available for accounts connected to Supabase.',
    '익명 비교 통계를 불러오는 중입니다.': 'Loading anonymous comparison statistics.',
    '자녀의 익명 비교 통계를 불러오는 중입니다.': 'Loading the child’s anonymous comparison statistics.',
    '비교 통계를 표시하려면 최신 Supabase 스키마를 적용해 주세요.': 'Apply the latest Supabase schema to display comparison statistics.',
    '자녀 비교 통계를 표시하려면 최신 Supabase 스키마를 적용해 주세요.': 'Apply the latest Supabase schema to display child comparison statistics.',
    '다시 시도': 'Try again',
    '게임 기록이 쌓이면 같은 연령대와 전체 참여자 중 나의 위치를 확인할 수 있습니다.': 'After you build a game history, you can compare your position with your age group and all participants.',
    '각 사용자의 게임별 평균 정확도를 기준으로 익명 비교합니다. 백분위가 높을수록 상대적으로 높은 성과입니다.': 'Anonymous comparisons use each participant’s average game accuracy. A higher percentile indicates relatively stronger performance.',
    '같은 연령 참여자': 'Same-age participants',
    '전체 참여자': 'All participants',
    '내 평균': 'My average',
    '자녀 평균': 'Child average',
    '연령대 평균': 'Age-group average',
    '연령대 백분위': 'Age-group percentile',
    '전체 백분위': 'Overall percentile',
    '백분위': 'Percentile',
    '상위': 'Top',
    '비교 표본 부족': 'Not enough comparison data',
    '게임': 'Game',
    '게임별 비교를 위한 기록이 아직 없습니다.': 'There is not enough game history for per-game comparisons yet.',
    '게임별 비교를 위한 자녀 기록이 아직 없습니다.': 'There is not enough child game history for per-game comparisons yet.',
    '자녀의 게임 기록이 쌓이면 같은 연령대와 전체 참여자 중 위치를 확인할 수 있습니다.': 'After the child builds a game history, you can compare their position with the same age group and all participants.',
    '선택한 자녀의 게임별 평균 정확도를 같은 연령대와 전체 참여자의 익명 기록과 비교합니다. 백분위가 높을수록 상대적으로 높은 성과입니다.': 'The selected child’s average game accuracy is compared anonymously with the same age group and all participants. A higher percentile indicates relatively stronger performance.',
    '비교 결과는 참여자의 Daily Cog 기록만 사용하며 의학적 평가나 진단을 의미하지 않습니다.': 'Comparisons use only participants’ Daily Cog records and are not a medical assessment or diagnosis.',
    '비교 결과는 참여자의 Daily Cog 기록만 사용하며 의학적 평가나 진단을 의미하지 않습니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': 'Comparisons use only participants’ Daily Cog records and are not a medical assessment or diagnosis. Older Memory Match records without actual accuracy are excluded from accuracy averages.',
    '원문 보기 ↗': 'View source ↗',
    '아직 완료한 게임이 없습니다.': 'No completed games yet.',
    '올리기': 'Raise',
    '내리기': 'Lower',
    '일어서기': 'Stand up',
    '앉기': 'Sit down'
  });
  Object.assign(zh, {
    '생각의 힘을 깨워요.': '唤醒思考力。',
    '목표 달성!': '目标达成！',
    '✓ 목표 달성!': '✓ 目标达成！',
    '현재 비밀번호를 입력해 주세요.': '请输入当前密码。',
    '현재 비밀번호가 올바르지 않습니다.': '当前密码不正确。',
    '새 비밀번호는 현재 비밀번호와 달라야 합니다.': '新密码必须与当前密码不同。',
    '이메일 또는 비밀번호가 올바르지 않습니다.': '邮箱或密码不正确。',
    '이 브라우저에서는 안전한 비밀번호 저장을 지원하지 않습니다.': '此浏览器不支持安全的密码存储。',
    '연속 출석': '连续打卡',
    '일째': '天',
    '하루 세 게임으로 이어가요': '每天完成三个游戏，保持连续记录。',
    '사용자 대시보드': '用户仪表板',
    '게임 기록을 바탕으로 정확도와 꾸준한 활동을 확인해요.': '根据游戏记录查看准确率和持续活动情况。',
    '오늘의 루틴 보기': '查看今日训练',
    '전체 게임': '游戏总数',
    '회': '次',
    '지금까지 완료한 활동': '迄今完成的活动',
    '평균 정확도': '平均准确率',
    'Daily Cog 성인 강아지': 'Daily Cog成犬',
    '일일 목표 달성률': '每日目标完成率',
    '누적 별점': '累计星星',
    '완료한 게임에서 모은 별': '从已完成游戏中获得的星星',
    '최근 7일 활동': '最近7天活动',
    '게임별 성과': '各游戏成绩',
    '현재 제공된 게임': '当前提供的游戏',
    '맞춤 게임별 성과': '定制游戏成绩',
    '최근 게임 기록': '最近游戏记录',
    '나의 성장 일지': '我的成长日志',
    '자녀 성장 일지': '子女成长日志',
    '자녀의 게임 종류 또는 인지능력별 평균 정확도 변화를 확인합니다.': '查看子女按游戏或认知能力划分的平均准确率变化。',
    '자녀 성장 일지 분류': '子女成长日志分类',
    '자녀 성장 그래프 기간': '子女成长图表周期',
    '게임 종류 또는 인지능력별 평균 정확도의 변화를 확인해요.': '查看不同游戏或认知能力的平均准确率变化。',
    '성장 일지 분류': '成长日志分类',
    '그래프 기간': '图表周期',
    '게임별': '按游戏',
    '인지능력별': '按认知能力',
    '주간': '周',
    '월간': '月',
    '연간': '年',
    '확인할 항목': '查看项目',
    '전체 기록': '全部记录',
    '전체 평균': '总体平均',
    '최근 주 평균': '最近一周平均',
    '최근 학습일 평균': '最近学习日平均',
    '최근 학습월 평균': '最近学习月平均',
    '최근 주간 평균': '最近一周平均',
    '첫 기록 대비': '相比首次记录',
    '첫 기록 주 대비': '相比首次记录周',
    '첫 기록일 대비': '相比首次记录日',
    '첫 기록월 대비': '相比首次记录月',
    '첫 주 대비': '相比第一周',
    '선택한 항목의 최근 8주 게임 기록이 없습니다.': '所选项目最近8周没有游戏记录。',
    '최근 8주 평균 정확도 성장 그래프': '最近8周平均准确率成长图',
    '최근 8주 평균 정확도 꺾은선 그래프': '最近8周平均准确率折线图',
    '최근 8주 날짜별 평균 정확도 꺾은선 그래프': '最近8周每日平均准确率折线图',
    '선택한 항목의 최근 7일 기록이 없습니다.': '所选项目最近7天没有记录。',
    '선택한 항목의 최근 30일 기록이 없습니다.': '所选项目最近30天没有记录。',
    '선택한 항목의 최근 4주 기록이 없습니다.': '所选项目最近4周没有记录。',
    '선택한 항목의 최근 12개월 기록이 없습니다.': '所选项目最近12个月没有记录。',
    '최근 7일 평균 정확도 꺾은선 그래프': '最近7天平均准确率折线图',
    '최근 30일 평균 정확도 꺾은선 그래프': '最近30天平均准确率折线图',
    '최근 4주 주간 평균 정확도 꺾은선 그래프': '最近4周每周平均准确率折线图',
    '최근 12개월 월별 평균 정확도 꺾은선 그래프': '最近12个月月平均准确率折线图',
    '주간 평균은 월요일부터 일요일까지 완료한 게임 점수를 기준으로 계산합니다.': '周平均值根据周一至周日完成的游戏分数计算。',
    '주간 평균은 월요일부터 일요일까지 완료한 게임의 실제 정확도를 기준으로 계산합니다.': '周平均值根据周一至周日完成游戏的实际准确率计算。',
    '주간 평균은 월요일부터 일요일까지 완료한 게임의 실제 정확도를 기준으로 계산합니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': '周平均值使用周一至周日完成游戏的实际准确率。没有实际准确率的旧版记忆配对记录不计入准确率平均值。',
    '날짜별 평균은 해당 날짜에 완료한 게임의 실제 정확도를 기준으로 계산하고, 학습한 날짜의 점을 시간 순서대로 연결합니다.': '每日平均值根据当天完成游戏的实际准确率计算，并按时间顺序连接学习日的数据点。',
    '날짜별 평균은 해당 날짜에 완료한 게임의 실제 정확도를 기준으로 계산하고, 학습한 날짜의 점을 시간 순서대로 연결합니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': '每日平均值根据当天的实际准确率计算，并按时间顺序连接学习日数据点。没有实际准确率的旧版记忆配对记录不计入平均值。',
    '주간·월간 그래프는 날짜별 평균을, 연간 그래프는 월별 평균을 표시합니다. 기록이 한 시점뿐이면 점으로만 나타납니다.': '周图和月图显示每日平均值，年图显示每月平均值。只有一个数据点时仅显示为圆点。',
    '주간·월간 그래프는 날짜별 평균을, 연간 그래프는 월별 평균을 표시합니다. 기록이 한 시점뿐이면 점으로만 나타납니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': '周图和月图显示每日平均值，年图显示每月平均值。只有一个数据点时仅显示为圆点。没有实际准确率的旧版记忆配对记录不计入平均值。',
    '주간 그래프는 날짜별 평균을, 월간 그래프는 7일간 평균을, 연간 그래프는 월별 평균을 표시합니다. 각 점은 집계 기간의 마지막 날짜 위에 표시되며 기록이 한 시점뿐이면 점으로만 나타납니다.': '周图显示每日平均值，月图显示每7天平均值，年图显示每月平均值。每个点显示在统计周期最后日期的正上方，只有一个记录时仅显示为圆点。',
    '주간 그래프는 날짜별 평균을, 월간 그래프는 7일간 평균을, 연간 그래프는 월별 평균을 표시합니다. 각 점은 집계 기간의 마지막 날짜 위에 표시되며 기록이 한 시점뿐이면 점으로만 나타납니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': '周图显示每日平均值，月图显示每7天平均值，年图显示每月平均值。每个点显示在统计周期最后日期的正上方，只有一个记录时仅显示为圆点。没有实际准确率的旧版记忆配对记录不计入平均值。',
    '정확도 백분위 비교': '准确率百分位比较',
    '자녀 정확도 백분위 비교': '子女准确率百分位比较',
    '연령대 및 전체 비교는 Supabase에 연결된 계정에서 제공됩니다.': '年龄组和总体比较仅适用于连接Supabase的账户。',
    '익명 비교 통계를 불러오는 중입니다.': '正在加载匿名比较统计。',
    '자녀의 익명 비교 통계를 불러오는 중입니다.': '正在加载子女的匿名比较统计。',
    '비교 통계를 표시하려면 최신 Supabase 스키마를 적용해 주세요.': '请应用最新的Supabase架构以显示比较统计。',
    '자녀 비교 통계를 표시하려면 최신 Supabase 스키마를 적용해 주세요.': '请应用最新的Supabase架构以显示子女比较统计。',
    '다시 시도': '重试',
    '게임 기록이 쌓이면 같은 연령대와 전체 참여자 중 나의 위치를 확인할 수 있습니다.': '积累游戏记录后，可以查看自己在同龄组和所有参与者中的位置。',
    '각 사용자의 게임별 평균 정확도를 기준으로 익명 비교합니다. 백분위가 높을수록 상대적으로 높은 성과입니다.': '匿名比较以每位参与者的游戏平均准确率为依据。百分位越高，代表相对表现越好。',
    '같은 연령 참여자': '同龄参与者',
    '전체 참여자': '全部参与者',
    '내 평균': '我的平均',
    '자녀 평균': '子女平均',
    '연령대 평균': '年龄组平均',
    '연령대 백분위': '年龄组百分位',
    '전체 백분위': '总体百分位',
    '백분위': '百分位',
    '상위': '前',
    '비교 표본 부족': '比较样本不足',
    '게임': '游戏',
    '게임별 비교를 위한 기록이 아직 없습니다.': '暂无足够的游戏记录用于逐项比较。',
    '게임별 비교를 위한 자녀 기록이 아직 없습니다.': '暂无足够的子女游戏记录用于逐项比较。',
    '자녀의 게임 기록이 쌓이면 같은 연령대와 전체 참여자 중 위치를 확인할 수 있습니다.': '积累子女的游戏记录后，可以查看其在同龄组和所有参与者中的位置。',
    '선택한 자녀의 게임별 평균 정확도를 같은 연령대와 전체 참여자의 익명 기록과 비교합니다. 백분위가 높을수록 상대적으로 높은 성과입니다.': '将所选子女的游戏平均准确率与同龄组和全部参与者的匿名记录进行比较。百分位越高，代表相对表现越好。',
    '비교 결과는 참여자의 Daily Cog 기록만 사용하며 의학적 평가나 진단을 의미하지 않습니다.': '比较仅使用参与者的Daily Cog记录，不代表医学评估或诊断。',
    '비교 결과는 참여자의 Daily Cog 기록만 사용하며 의학적 평가나 진단을 의미하지 않습니다. 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.': '比较仅使用参与者的Daily Cog记录，不代表医学评估或诊断。没有实际准确率的旧版记忆配对记录不计入准确率平均值。',
    '원문 보기 ↗': '查看原文 ↗',
    '아직 완료한 게임이 없습니다.': '尚无已完成的游戏。',
    '올리기': '举起',
    '내리기': '放下',
    '일어서기': '站起来',
    '앉기': '坐下'
  });

  Object.assign(en, {
    '이미 가입된 이메일입니다.':'This email is already registered.',
    '이미 가입된 이메일입니다. 로그인해 주세요.':'This email is already registered. Please sign in.'
  });
  Object.assign(zh, {
    '이미 가입된 이메일입니다.':'该邮箱已注册。',
    '이미 가입된 이메일입니다. 로그인해 주세요.':'该邮箱已注册，请直接登录。'
  });
  Object.assign(en, {
    '강아지 친구':'Puppy buddy','강아지 꾸미기 상점':'Dress-up shop','게임에서 모은 별로 특별한 장식을 구매하고 학습 친구를 꾸며보세요.':'Use the stars you earn in games to dress up your learning buddy.','사용 가능한 별':'Available stars',
    '누적':'Earned','사용':'Spent','관리자 무제한 별':'Unlimited stars for admin','님의 학습 친구':'’s learning buddy','모자':'Hats','안경':'Glasses','목도리':'Scarves','착용 안 함':'Not equipped','구매한 장식은 홈 화면의 강아지에게도 바로 적용돼요.':'Purchased accessories also appear on your puppy at home.','장식 아이템':'Accessories','보유':'Owned',
    '라벤더 캡':'Lavender cap','파티 모자':'Party hat','황금 왕관':'Golden crown','멋쟁이 선글라스':'Cool sunglasses','동그란 안경':'Round glasses','라벤더 목도리':'Lavender scarf','별빛 목도리':'Starlight scarf',
    '✓ 보유':'✓ Owned','벗기':'Remove','착용하기':'Equip','구매하기':'Buy','별 부족':'Not enough stars','별이 부족해요. 게임을 완료해 별을 모아보세요!':'Not enough stars. Complete games to earn more!','상점 정보를 저장하지 못했습니다.':'Could not save your shop data.'
  });
  Object.assign(zh, {
    '강아지 친구':'小狗伙伴','강아지 꾸미기 상점':'小狗装扮商店','게임에서 모은 별로 특별한 장식을 구매하고 학습 친구를 꾸며보세요.':'使用游戏中获得的星星购买装饰，打扮您的学习伙伴。','사용 가능한 별':'可用星星',
    '누적':'累计','사용':'已使用','관리자 무제한 별':'管理员无限星星','님의 학습 친구':'的学习伙伴','모자':'帽子','안경':'眼镜','목도리':'围巾','착용 안 함':'未佩戴','구매한 장식은 홈 화면의 강아지에게도 바로 적용돼요.':'购买的装饰也会立即显示在主页的小狗上。','장식 아이템':'装饰物品','보유':'已拥有',
    '라벤더 캡':'薰衣草帽','파티 모자':'派对帽','황금 왕관':'黄金王冠','멋쟁이 선글라스':'时尚墨镜','동그란 안경':'圆框眼镜','라벤더 목도리':'薰衣草围巾','별빛 목도리':'星光围巾',
    '✓ 보유':'✓ 已拥有','벗기':'取下','착용하기':'佩戴','구매하기':'购买','별 부족':'星星不足','별이 부족해요. 게임을 완료해 별을 모아보세요!':'星星不足，请完成游戏来收集更多星星！','상점 정보를 저장하지 못했습니다.':'无法保存商店数据。'
  });

  Object.assign(en, {
    '강아지 친구':'Puppy buddy','별로 견종과 장식, 맛있는 간식을 구매해 나만의 학습 친구를 돌봐주세요.':'Use stars to choose breeds, accessories, and tasty treats for your learning buddy.','별로 장식과 맛있는 간식을 구매해 골든 리트리버 학습 친구를 돌봐주세요.':'Use stars to buy accessories and tasty treats for your Golden Retriever learning buddy.',
    '선택한 견종과 장식, 간식 효과는 홈 화면에도 바로 적용돼요.':'Your selected breed, accessories, and treat effects appear on the home screen too.','선택한 장식과 간식 효과는 홈 화면에도 바로 적용돼요.':'Your selected accessories and treat effects appear on the home screen too.','견종 · 간식 · 장식':'Breeds · Treats · Accessories','간식':'Treats','골든 리트리버 전용':'For Golden Retriever','강아지 견종':'Dog breeds','강아지 간식':'Dog treats','간식을 구매해 먹이면 강아지가 배부르고 더 행복해져요.':'Buy a treat and feed your puppy to make it full and even happier.',
    '골든 리트리버':'Golden Retriever','비글':'Beagle','토이 푸들':'Toy Poodle','치와와':'Chihuahua','포근하고 다정한 기본 학습 친구':'A warm and gentle starter buddy','호기심 많고 활기찬 친구':'A curious and energetic buddy','복슬복슬 영리한 친구':'A fluffy and clever buddy','작지만 용감하고 사랑스러운 친구':'A tiny, brave, lovable buddy',
    '별 쿠키':'Star Cookie','닭고기 육포':'Chicken Jerky','행복 케이크':'Happy Cupcake','행복 컵케이크':'Happy Cupcake','바삭한 한입 간식':'A crunchy bite-sized treat','든든하고 고소한 간식':'A hearty, savory treat','오래 행복해지는 특별 간식':'A special treat for lasting happiness',
    '기본 친구':'Starter buddy','함께하는 중':'Current buddy','선택하기':'Choose','먹이기':'Feed','배부르고 행복해요!':'Full and happy!','♥ 배부르고 행복해요!':'♥ Full and happy!','♡ 간식을 기다리고 있어요':'♡ Waiting for a treat','♡ 배가 고파요':'♡ Hungry and waiting for a treat','간식을 먹여주세요':'Please give your buddy a treat','간식을 먹고 배부르고 정말 행복해요!':'A tasty treat made your buddy full and extra happy!',
    '아기 강아지 성장 중':'Baby puppy growing','성견으로 성장 완료!':'Grown into an adult dog!','성견 · 최종 성장 중':'Adult dog · Final growth in progress','최종 성장 완료!':'Final growth complete!','누적 별 100개를 모아 성견으로 성장했어요!':'Your puppy grew into an adult dog after earning 100 stars!','누적 별 200개를 모아 최종 단계로 성장했어요!':'Your buddy reached its final growth stage after earning 200 stars!','강아지 성장 진행도':'Puppy growth progress','아기 강아지':'Baby puppy','성견':'Adult dog','최종 성장 강아지':'Fully grown dog',
    '아기 강아지 · 성견 업그레이드 준비':'Baby puppy · Adult upgrade','성견 · 최종 업그레이드 준비':'Adult dog · Final upgrade','별 포인트를 사용해 최종 성장 단계를 해제했어요!':'The final growth stage was unlocked with star points!','강아지 업그레이드 포인트':'Dog upgrade points','성견으로 업그레이드':'Upgrade to adult','최종 단계로 업그레이드':'Upgrade to final stage','최종 성장 완료':'Final growth complete','강아지를 업그레이드할 별 포인트가 부족해요.':'Not enough star points to upgrade your puppy.','관리자 무제한 별로 강아지를 성견으로 업그레이드할까요?':'Use unlimited admin stars to upgrade your puppy to an adult?','관리자 무제한 별로 강아지를 최종 성장 단계로 업그레이드할까요?':'Use unlimited admin stars to unlock the final growth stage?','강아지가 성견으로 성장했어요!':'Your puppy grew into an adult dog!','강아지가 최종 성장 단계로 업그레이드됐어요!':'Your puppy reached the final growth stage!'
  });
  Object.assign(zh, {
    '강아지 친구':'小狗伙伴','별로 견종과 장식, 맛있는 간식을 구매해 나만의 학습 친구를 돌봐주세요.':'使用星星购买犬种、装饰和美味零食，照顾专属学习伙伴。','별로 장식과 맛있는 간식을 구매해 골든 리트리버 학습 친구를 돌봐주세요.':'使用星星购买装饰和美味零食，照顾金毛寻回犬学习伙伴。',
    '선택한 견종과 장식, 간식 효과는 홈 화면에도 바로 적용돼요.':'所选犬种、装饰和零食效果也会立即显示在主页。','선택한 장식과 간식 효과는 홈 화면에도 바로 적용돼요.':'所选装饰和零食效果也会立即显示在主页。','견종 · 간식 · 장식':'犬种 · 零食 · 装饰','간식':'零食','골든 리트리버 전용':'金毛寻回犬专用','강아지 견종':'小狗犬种','강아지 간식':'小狗零食','간식을 구매해 먹이면 강아지가 배부르고 더 행복해져요.':'购买零食喂给小狗，让它吃饱并变得更加开心。',
    '골든 리트리버':'金毛寻回犬','비글':'比格犬','토이 푸들':'玩具贵宾犬','치와와':'吉娃娃','포근하고 다정한 기본 학습 친구':'温暖亲切的初始学习伙伴','호기심 많고 활기찬 친구':'好奇又活泼的伙伴','복슬복슬 영리한 친구':'毛茸茸又聪明的伙伴','작지만 용감하고 사랑스러운 친구':'小巧勇敢又可爱的伙伴',
    '별 쿠키':'星星饼干','닭고기 육포':'鸡肉干','행복 케이크':'幸福纸杯蛋糕','행복 컵케이크':'幸福纸杯蛋糕','바삭한 한입 간식':'香脆的一口小零食','든든하고 고소한 간식':'饱腹又香浓的零食','오래 행복해지는 특별 간식':'让快乐更持久的特别零食',
    '기본 친구':'初始伙伴','함께하는 중':'当前伙伴','선택하기':'选择','먹이기':'喂食','배부르고 행복해요!':'吃饱又开心！','♥ 배부르고 행복해요!':'♥ 吃饱又开心！','♡ 간식을 기다리고 있어요':'♡ 正在等待零食','♡ 배가 고파요':'♡ 肚子饿了，正在等待零食','간식을 먹여주세요':'请给小狗喂零食','간식을 먹고 배부르고 정말 행복해요!':'吃了零食后，小狗饱饱的，更加开心了！',
    '아기 강아지 성장 중':'幼犬成长中','성견으로 성장 완료!':'已成长为成犬！','성견 · 최종 성장 중':'成犬 · 正在迈向最终成长阶段','최종 성장 완료!':'最终成长完成！','누적 별 100개를 모아 성견으로 성장했어요!':'累计获得100颗星，幼犬已经成长为成犬！','누적 별 200개를 모아 최종 단계로 성장했어요!':'累计获得200颗星，小狗已进入最终成长阶段！','강아지 성장 진행도':'小狗成长进度','아기 강아지':'幼犬','성견':'成犬','최종 성장 강아지':'完全成长的小狗',
    '아기 강아지 · 성견 업그레이드 준비':'幼犬 · 成犬升级','성견 · 최종 업그레이드 준비':'成犬 · 最终升级','별 포인트를 사용해 최종 성장 단계를 해제했어요!':'已使用星星积分解锁最终成长阶段！','강아지 업그레이드 포인트':'小狗升级积分','성견으로 업그레이드':'升级为成犬','최종 단계로 업그레이드':'升级到最终阶段','최종 성장 완료':'最终成长完成','강아지를 업그레이드할 별 포인트가 부족해요.':'升级小狗所需的星星积分不足。','관리자 무제한 별로 강아지를 성견으로 업그레이드할까요?':'使用管理员无限星星将小狗升级为成犬吗？','관리자 무제한 별로 강아지를 최종 성장 단계로 업그레이드할까요?':'使用管理员无限星星解锁最终成长阶段吗？','강아지가 성견으로 성장했어요!':'小狗已经成长为成犬！','강아지가 최종 성장 단계로 업그레이드됐어요!':'小狗已升级到最终成长阶段！'
  });

  Object.assign(en, {
    '스마트 노트':'Smart Note',
    '생각과 할 일을 적고 어디서든 확인하세요.':'Write down ideas and tasks, then keep them close anywhere.',
    '작성한 노트 열기':'Open saved note',
    '노트 작성하기':'Write a note',
    '자동 저장됨':'Saved automatically',
    '저장 중…':'Saving…',
    '이 기기에 저장됨':'Saved on this device',
    '고정 해제':'Unpin',
    '화면에 고정':'Pin to screen',
    '펼치기':'Expand',
    '접기':'Collapse',
    '노트 닫기':'Close note',
    '기억할 일, 학습 아이디어, 오늘의 목표를 적어보세요.':'Write reminders, learning ideas, or today’s goals.',
    '화면에 고정됨':'Pinned to screen',
    '⌖ 버튼을 누르면 다른 화면에서도 볼 수 있어요.':'Press ⌖ to keep the note visible on other screens.'
  });
  Object.assign(zh, {
    '스마트 노트':'智能笔记',
    '생각과 할 일을 적고 어디서든 확인하세요.':'记录想法和待办事项，随时随地查看。',
    '작성한 노트 열기':'打开已写笔记',
    '노트 작성하기':'写笔记',
    '자동 저장됨':'已自动保存',
    '저장 중…':'正在保存…',
    '이 기기에 저장됨':'已保存在此设备',
    '고정 해제':'取消固定',
    '화면에 고정':'固定到屏幕',
    '펼치기':'展开',
    '접기':'收起',
    '노트 닫기':'关闭笔记',
    '기억할 일, 학습 아이디어, 오늘의 목표를 적어보세요.':'写下提醒、学习想法或今天的目标。',
    '화면에 고정됨':'已固定到屏幕',
    '⌖ 버튼을 누르면 다른 화면에서도 볼 수 있어요.':'按下⌖即可在其他页面继续查看笔记。'
  });

  Object.assign(en, {
    '관리자':'Admin','관리자 대시보드':'Admin dashboard','관리자 권한이 필요합니다.':'Administrator access is required.','관리자 모드':'Admin mode','명':'users','나라':'Country','나라 선택':'Select country','나라를 선택해 주세요.':'Select your country.','로그인 정보, 나라와 프로필 사진을 관리하세요.':'Manage your sign-in information, country, and profile photo.','로그인 정보, 나라, 생년월일과 프로필 사진을 관리하세요.':'Manage your sign-in information, country, date of birth, and profile photo.','생년월일을 변경하면 현재 나이에 맞는 게임으로 자동 변경됩니다.':'Changing your date of birth automatically updates the games for your current age.',
    '관리자 대시보드를 준비하고 있어요':'Preparing the admin dashboard','접속 현황과 학습 기록을 안전하게 집계하는 중입니다.':'Securely aggregating presence and learning records.','관리자 통계를 불러오지 못했습니다.':'Could not load admin statistics.','다시 시도':'Try again',
    '사용자 접속과 학습 활동을 한눈에 확인합니다.':'View user presence and learning activity at a glance.','새로고침':'Refresh','전체 사용자':'Total users','현재 등록된 계정':'Currently registered accounts','현재 접속':'Online now','최근 2분 이내 활동':'Active within the last 2 minutes','오늘 가입자':'New users today','오늘 게임 완료':'Games completed today','오늘 생성된 학습 기록':'Learning records created today',
    '연령대별 이용 현황':'Usage by age group','미설정':'Not set','게임별 전체 평균 점수':'Overall average score by game','모든 사용자의 완료 기록 기준':"Based on all users' completed sessions",'게임별 평균 데이터를 불러오려면 최신 Supabase 스키마를 적용해 주세요.':'Apply the latest Supabase schema to load average scores by game.','사용자 목록':'Users','이름 또는 이메일 검색':'Search by name or email','사용자':'User','연령대':'Age group','게임':'Games','평균':'Average','별':'Stars','스트릭':'Streak','상태':'Status','접속 중':'Online','오프라인':'Offline','오늘 날짜 기준':"Based on today's date",
    '사용자 기록을 불러오는 중입니다.':'Loading user records.','사용자 기록을 불러오지 못했습니다.':'Could not load user records.','가입일':'Joined','최근 로그인':'Last sign-in','접속 상태':'Presence','최근 게임 점수':'Recent game scores','검색 결과가 없습니다.':'No matching users found.',
    '생년월일':'Date of birth','만 4세 이상부터 가입할 수 있습니다.':'You must be at least 4 years old to sign up.','만 4세 이상부터 이용할 수 있습니다.':'Available from age 4.','생년월일로':'Using your date of birth,','맞춤 게임을 찾아드려요':'we’ll find the right games for you','현재 나이에 맞는 연령층을 자동으로 적용합니다.':'Your age group is assigned automatically based on your current age.','나이가 다음 연령대에 포함되면 게임도 자동으로 변경됩니다.':'Your games update automatically when you enter the next age group.','맞춤 게임 시작하기 →':'Start tailored games →','맞춤 게임을 준비하고 있어요…':'Preparing your games…','생년월일을 먼저 입력해 주세요.':'Please enter your date of birth first.','생년월일을 저장하지 못했습니다.':'Could not save the date of birth.','올바른 생년월일을 입력해 주세요. 만 4세 이상부터 가입할 수 있습니다.':'Enter a valid date of birth. You must be at least 4 years old to sign up.','올바른 생년월일을 입력해 주세요. 만 4세 이상부터 이용할 수 있습니다.':'Enter a valid date of birth. This service is available from age 4.'
  });
  Object.assign(zh, {
    '관리자':'管理员','관리자 대시보드':'管理员仪表板','관리자 권한이 필요합니다.':'需要管理员权限。','관리자 모드':'管理员模式','명':'人','나라':'国家','나라 선택':'选择国家','나라를 선택해 주세요.':'请选择国家。','로그인 정보, 나라와 프로필 사진을 관리하세요.':'管理登录信息、国家和头像。','로그인 정보, 나라, 생년월일과 프로필 사진을 관리하세요.':'管理登录信息、国家、出生日期和头像。','생년월일을 변경하면 현재 나이에 맞는 게임으로 자동 변경됩니다.':'更改出生日期后，游戏会自动更新为适合当前年龄的内容。',
    '관리자 대시보드를 준비하고 있어요':'正在准备管理员仪表板','접속 현황과 학습 기록을 안전하게 집계하는 중입니다.':'正在安全汇总在线状态和学习记录。','관리자 통계를 불러오지 못했습니다.':'无法加载管理员统计数据。','다시 시도':'重试',
    '사용자 접속과 학습 활동을 한눈에 확인합니다.':'集中查看用户在线状态和学习活动。','새로고침':'刷新','전체 사용자':'全部用户','현재 등록된 계정':'当前注册账户','현재 접속':'当前在线','최근 2분 이내 활동':'最近2分钟内活跃','오늘 가입자':'今日注册','오늘 게임 완료':'今日完成游戏','오늘 생성된 학습 기록':'今日生成的学习记录',
    '연령대별 이용 현황':'各年龄段使用情况','미설정':'未设置','게임별 전체 평균 점수':'各游戏总体平均分','모든 사용자의 완료 기록 기준':'基于所有用户的已完成记录','게임별 평균 데이터를 불러오려면 최신 Supabase 스키마를 적용해 주세요.':'请应用最新的 Supabase 架构以加载各游戏平均分。','사용자 목록':'用户列表','이름 또는 이메일 검색':'按姓名或邮箱搜索','사용자':'用户','연령대':'年龄段','게임':'游戏','평균':'平均','별':'星星','스트릭':'连续学习','상태':'状态','접속 중':'在线','오프라인':'离线','오늘 날짜 기준':'按今天日期统计',
    '사용자 기록을 불러오는 중입니다.':'正在加载用户记录。','사용자 기록을 불러오지 못했습니다.':'无法加载用户记录。','가입일':'注册日期','최근 로그인':'最近登录','접속 상태':'在线状态','최근 게임 점수':'最近游戏分数','검색 결과가 없습니다.':'未找到匹配的用户。',
    '생년월일':'出生日期','만 4세 이상부터 가입할 수 있습니다.':'年满4岁方可注册。','만 4세 이상부터 이용할 수 있습니다.':'年满4岁方可使用。','생년월일로':'根据出生日期，','맞춤 게임을 찾아드려요':'为您匹配合适的游戏','현재 나이에 맞는 연령층을 자동으로 적용합니다.':'系统会根据当前年龄自动设置年龄段。','나이가 다음 연령대에 포함되면 게임도 자동으로 변경됩니다.':'进入下一个年龄段后，游戏会自动更新。','맞춤 게임 시작하기 →':'开始定制游戏 →','맞춤 게임을 준비하고 있어요…':'正在准备定制游戏…','생년월일을 먼저 입력해 주세요.':'请先输入出生日期。','생년월일을 저장하지 못했습니다.':'无法保存出生日期。','올바른 생년월일을 입력해 주세요. 만 4세 이상부터 가입할 수 있습니다.':'请输入有效的出生日期。年满4岁方可注册。','올바른 생년월일을 입력해 주세요. 만 4세 이상부터 이용할 수 있습니다.':'请输入有效的出生日期。年满4岁方可使用。'
  });

  Object.assign(en, {
    '6가지 인지능력 기초선':'6-ABILITY COGNITIVE BASELINE','나의 인지 육각형':'My cognitive profile',
    '12개 기초 평가를 완료하면 여섯 영역의 기준선을 확인할 수 있습니다.':'Complete 12 baseline games to see your starting point across six abilities.','현재 종합 수행점수':'Current overall performance',
    '기초 평가 시작하기':'Start baseline assessment','기초 평가 이어하기':'Continue baseline assessment','다시 평가하기':'Retake assessment','8주 기초 평가 시작하기':'Start the 8-week baseline assessment',
    '집행기능':'Executive function','주의력':'Attention','작업기억':'Working memory','처리속도':'Processing speed','일화기억':'Episodic memory','언어능력':'Language ability',
    '여섯 가지 인지능력 육각형 차트':'Six-ability cognitive radar chart','이 결과는 게임 수행의 기초선이며 의학적 진단이나 일반 인지능력 검사를 대신하지 않습니다.':'These results are a baseline of game performance and do not replace a medical diagnosis or general cognitive assessment.',
    '← 홈으로 돌아가기':'← Back to home','STEP 02 · 최초 기초 평가':'STEP 02 · INITIAL BASELINE','STEP 02 · 8주 기초 평가':'STEP 02 · 8-WEEK BASELINE','12개 게임으로':'Build your cognitive profile','나의 인지 프로필을 만들어요.':'with 12 short games.',
    '🔒 기초 평가를 먼저 완료해 주세요.':'🔒 Complete the baseline assessment first.','평가를 마치기 전에는 일반 게임을 이용할 수 없으며 이 화면으로 돌아옵니다.':'Regular games stay locked until you complete the assessment, and navigation returns to this screen.','마지막 평가 후 8주가 지났습니다. 새 평가를 완료하면 일반 게임이 다시 열리고 인지 육각형도 최신 결과로 갱신됩니다.':'Eight weeks have passed since your last assessment. Complete the new assessment to unlock regular games and refresh your cognitive profile.','이번 8주 평가를 이어서 완료해 주세요. 모든 평가를 마치면 일반 게임이 다시 열리고 인지 육각형도 최신 결과로 갱신됩니다.':'Continue this 8-week assessment. Complete all games to unlock regular games and refresh your cognitive profile.','새로운 8주 기초 평가가 열렸습니다. 평가를 완료해야 게임을 시작할 수 있습니다.':'A new 8-week baseline assessment is ready. Complete it before starting regular games.','기초 평가를 완료해야 일반 게임을 시작할 수 있습니다.':'Complete the baseline assessment before starting regular games.',
    '모든 게임은 쉬움 난이도로 진행됩니다. 결과는 집행기능·주의력·작업기억·처리속도·일화기억·언어능력의 육각형 대시보드로 정리됩니다.':'Every game uses Easy difficulty. Results form a six-part profile of executive function, attention, working memory, processing speed, episodic memory, and language ability.','모든 게임은 쉬움 난이도로 진행됩니다. 원하는 평가 게임부터 자유롭게 선택할 수 있으며, 결과는 여섯 가지 인지능력의 육각형 대시보드로 정리됩니다.':'Every game uses Easy difficulty. Choose any assessment game to begin, and the results will form your six-ability cognitive profile.',
    '완료한 기초 평가':'Baseline games completed','쉬움 · 다음 평가':'Easy · Up next','쉬움 · 대기 중':'Easy · Waiting','쉬움 · 선택 가능':'Easy · Available','선택 가능':'Available','평가 목록으로':'Back to assessment list','평가 결과는 의학적 진단이 아니라 현재 게임 수행의 기초선입니다.':'This assessment is a game-performance baseline, not a medical diagnosis.',
    '← 기초 평가 목록으로':'← Back to assessment list','기초 평가 기록':'Baseline result','진행':'Progress','평가 방식':'Assessment method',
    '모든 평가는 같은 쉬움 난이도로 진행되며, 정확도를 0~100점으로 환산합니다.':'Every assessment uses the same Easy difficulty and converts accuracy to a score from 0 to 100.',
    '쉬움 · 기초 평가':'Easy · Baseline assessment','평가를 시작할까요?':'Ready to begin this assessment?','이 평가 시작하기':'Start this assessment',
    '12개 기초 평가 완료':'All 12 baseline games complete','평가를 완료했어요!':'Assessment complete!','여섯 가지 인지능력 결과가 홈의 육각형에 반영되었습니다.':'Your six cognitive scores are now reflected in the home radar chart.',
    '이 점수가 인지 육각형의 관련 영역에 반영됩니다.':'This score will update the related areas of your cognitive profile.','육각형 결과 보기':'View radar results','다음 평가':'Next assessment','기초 평가 결과를 저장하지 못했습니다.':'Could not save the baseline assessment result.'
  });
  Object.assign(zh, {
    '6가지 인지능력 기초선':'六项认知能力基线','나의 인지 육각형':'我的认知六边形',
    '12개 기초 평가를 완료하면 여섯 영역의 기준선을 확인할 수 있습니다.':'完成12项基线游戏后，即可查看六个能力领域的起点。','현재 종합 수행점수':'当前综合表现分数',
    '기초 평가 시작하기':'开始基线评估','기초 평가 이어하기':'继续基线评估','다시 평가하기':'重新评估','8주 기초 평가 시작하기':'开始8周基线评估',
    '집행기능':'执行功能','주의력':'注意力','작업기억':'工作记忆','처리속도':'处理速度','일화기억':'情景记忆','언어능력':'语言能力',
    '여섯 가지 인지능력 육각형 차트':'六项认知能力雷达图','이 결과는 게임 수행의 기초선이며 의학적 진단이나 일반 인지능력 검사를 대신하지 않습니다.':'该结果仅为游戏表现基线，不能代替医学诊断或一般认知能力评估。',
    '← 홈으로 돌아가기':'← 返回首页','STEP 02 · 최초 기초 평가':'STEP 02 · 初始基线评估','STEP 02 · 8주 기초 평가':'STEP 02 · 8周基线评估','12개 게임으로':'通过12个游戏','나의 인지 프로필을 만들어요.':'建立我的认知档案。',
    '🔒 기초 평가를 먼저 완료해 주세요.':'🔒 请先完成基线评估。','평가를 마치기 전에는 일반 게임을 이용할 수 없으며 이 화면으로 돌아옵니다.':'完成评估前，普通游戏将保持锁定，页面会返回此处。','마지막 평가 후 8주가 지났습니다. 새 평가를 완료하면 일반 게임이 다시 열리고 인지 육각형도 최신 결과로 갱신됩니다.':'距离上次评估已满8周。完成新评估后将解锁普通游戏，并更新认知六边形。','이번 8주 평가를 이어서 완료해 주세요. 모든 평가를 마치면 일반 게임이 다시 열리고 인지 육각형도 최신 결과로 갱신됩니다.':'请继续完成本次8周评估。完成所有项目后将解锁普通游戏，并更新认知六边形。','새로운 8주 기초 평가가 열렸습니다. 평가를 완료해야 게임을 시작할 수 있습니다.':'新的8周基线评估已开放。完成后才能开始普通游戏。','기초 평가를 완료해야 일반 게임을 시작할 수 있습니다.':'完成基线评估后才能开始普通游戏。',
    '모든 게임은 쉬움 난이도로 진행됩니다. 결과는 집행기능·주의력·작업기억·처리속도·일화기억·언어능력의 육각형 대시보드로 정리됩니다.':'所有游戏均采用简单难度，结果将整理为六项认知能力档案。','모든 게임은 쉬움 난이도로 진행됩니다. 원하는 평가 게임부터 자유롭게 선택할 수 있으며, 결과는 여섯 가지 인지능력의 육각형 대시보드로 정리됩니다.':'所有游戏均采用简单难度。您可以自由选择任一评估游戏开始，结果将整理为六项认知能力档案。',
    '완료한 기초 평가':'已完成的基线评估','쉬움 · 다음 평가':'简单 · 下一项','쉬움 · 대기 중':'简单 · 等待中','쉬움 · 선택 가능':'简单 · 可选择','선택 가능':'可选择','평가 목록으로':'返回评估列表','평가 결과는 의학적 진단이 아니라 현재 게임 수행의 기초선입니다.':'评估结果是当前游戏表现的基线，并非医学诊断。',
    '← 기초 평가 목록으로':'← 返回评估列表','기초 평가 기록':'基线结果','진행':'进度','평가 방식':'评估方式',
    '모든 평가는 같은 쉬움 난이도로 진행되며, 정확도를 0~100점으로 환산합니다.':'所有评估均采用相同的简单难度，并将准确率换算为0至100分。',
    '쉬움 · 기초 평가':'简单 · 基线评估','평가를 시작할까요?':'准备开始这项评估吗？','이 평가 시작하기':'开始这项评估',
    '12개 기초 평가 완료':'12项基线评估全部完成','평가를 완료했어요!':'评估完成！','여섯 가지 인지능력 결과가 홈의 육각형에 반영되었습니다.':'六项认知能力结果已显示在首页雷达图中。',
    '이 점수가 인지 육각형의 관련 영역에 반영됩니다.':'该分数将更新认知档案中的相关领域。','육각형 결과 보기':'查看雷达图结果','다음 평가':'下一项评估','기초 평가 결과를 저장하지 못했습니다.':'无法保存基线评估结果。'
  });
  Object.assign(en, {
    '메인 페이지':'Main page','데일리 코그 플레이':'Daily Cog play','플래시카드':'Flash cards','학습 게임':'Play Game',
    '플래시카드 검색...':'Search flashcards...','분류 필터':'Category filter','정렬':'Sort','전체':'All','최근 만든 순':'Recently Created','오래된 순':'Oldest First','가나다 순':'A–Z',
    '아직 플래시카드가 없어요':'No flashcards yet','+ 버튼을 눌러 첫 카드를 만들어보세요.':'Click the + button to create your first card.','검색 결과가 없습니다.':'No matching flashcards','검색어나 필터를 바꿔보세요.':'Try another search or filter.',
    '카드 앞면 보기':'Show card front','카드 뒷면 보기':'Show card back','카드를 눌러 뒤집기':'Click to flip','카드를 눌러 앞면 보기':'Click to see the front','수정':'Edit','삭제':'Delete',
    '새 플래시카드 만들기':'Create a new flashcard','플래시카드 수정':'Edit flashcard','새 플래시카드':'New flashcard','앞면에는 질문이나 단어를, 뒷면에는 정답이나 설명을 적어주세요.':'Write a question or term on the front and the answer or explanation on the back.',
    '앞면':'Front','뒷면':'Back','질문 또는 학습할 단어':'Question or term to learn','정답 또는 설명':'Answer or explanation','분류':'Category','일반':'General','예: 단어, 인지게임, 약속':'e.g. Vocabulary, cognitive games, reminders',
    '변경사항 저장':'Save changes','카드 만들기':'Create card','앞면과 뒷면을 모두 입력해 주세요.':'Enter both the front and back.','플래시카드를 수정했습니다.':'Flashcard updated.','새 플래시카드를 만들었습니다.':'New flashcard created.','플래시카드를 삭제했습니다.':'Flashcard deleted.',
    '먼저 플래시카드를 만들어 주세요.':'Create a flashcard first.','← 플래시카드 목록으로':'← Back to flashcards','기억을 확인해 볼까요?':'Ready to test your memory?','정답':'Answer','질문':'Question',
    '한 번 더 누르면 질문을 볼 수 있어요.':'Tap again to see the question.','카드를 눌러 정답 보기':'Tap the card to reveal the answer.','← 이전':'← Previous','학습 마치기':'Finish session','다음 카드':'Next card','플래시카드 학습을 완료했어요!':'Flashcard session complete!','닫기':'Close','현재 나이에 맞는 게임으로 변경했습니다.':'Games were updated to match your current age.'
  });
  Object.assign(zh, {
    '메인 페이지':'主页','데일리 코그 플레이':'Daily Cog畅玩','플래시카드':'闪卡','학습 게임':'开始学习',
    '플래시카드 검색...':'搜索闪卡...','분류 필터':'分类筛选','정렬':'排序','전체':'全部','최근 만든 순':'最近创建','오래된 순':'最早创建','가나다 순':'按字母排序',
    '아직 플래시카드가 없어요':'还没有闪卡','+ 버튼을 눌러 첫 카드를 만들어보세요.':'点击 + 按钮创建第一张卡片。','검색 결과가 없습니다.':'没有匹配的闪卡','검색어나 필터를 바꿔보세요.':'请尝试其他搜索词或筛选条件。',
    '카드 앞면 보기':'查看卡片正面','카드 뒷면 보기':'查看卡片背面','카드를 눌러 뒤집기':'点击翻面','카드를 눌러 앞면 보기':'点击查看正面','수정':'编辑','삭제':'删除',
    '새 플래시카드 만들기':'新建闪卡','플래시카드 수정':'编辑闪卡','새 플래시카드':'新闪卡','앞면에는 질문이나 단어를, 뒷면에는 정답이나 설명을 적어주세요.':'正面填写问题或词语，背面填写答案或说明。',
    '앞면':'正面','뒷면':'背面','질문 또는 학습할 단어':'问题或要学习的词语','정답 또는 설명':'答案或说明','분류':'分类','일반':'常规','예: 단어, 인지게임, 약속':'例如：词汇、认知游戏、提醒',
    '변경사항 저장':'保存更改','카드 만들기':'创建卡片','앞면과 뒷면을 모두 입력해 주세요.':'请填写正面和背面。','플래시카드를 수정했습니다.':'闪卡已更新。','새 플래시카드를 만들었습니다.':'已创建新闪卡。','플래시카드를 삭제했습니다.':'闪卡已删除。',
    '먼저 플래시카드를 만들어 주세요.':'请先创建闪卡。','← 플래시카드 목록으로':'← 返回闪卡列表','기억을 확인해 볼까요?':'准备测试记忆了吗？','정답':'答案','질문':'问题',
    '한 번 더 누르면 질문을 볼 수 있어요.':'再次点击可查看问题。','카드를 눌러 정답 보기':'点击卡片查看答案。','← 이전':'← 上一张','학습 마치기':'结束学习','다음 카드':'下一张','플래시카드 학습을 완료했어요!':'闪卡学习完成！','닫기':'关闭','현재 나이에 맞는 게임으로 변경했습니다.':'游戏已更新为适合当前年龄的内容。'
  });
  Object.assign(en, {
    '맞춤 연령대':'Tailored age group','생년월일을 기준으로 유아 4–12세, 청소년 13–29세, 성인 30–64세, 노인 65세 이상 게임을 자동으로 제공합니다.':'Games are assigned automatically by date of birth: Children 4–12, Youth 13–29, Adults 30–64, and Seniors 65+.','생년월일 저장':'Save date of birth',
    '보호자':'Guardian','자녀 활동':'Child activity','자녀':'Child','연령 미설정':'Age not set','연결 해제':'Unlink','오늘 학습 완료':'Learning complete today','일':'days','자녀 계정 연결을 해제했습니다.':'Child account unlinked.','자녀 계정 연결을 해제하지 못했습니다.':'Could not unlink the child account.',
    '자녀 계정을 선택해 주세요.':'Select a child account.','자녀 활동을 불러오지 못했습니다.':'Could not load child activity.','자녀 활동을 준비하고 있어요':'Preparing child activity','인지 역량과 게임 기록을 안전하게 불러오는 중입니다.':'Securely loading cognitive results and game history.',
    '자녀 선택':'Select child','등록한 자녀':'Registered wards','확인할 자녀를 선택하세요.':'Choose a child to view.','연결된 자녀 계정의 인지 기초선과 학습 활동을 읽기 전용으로 확인합니다.':'View the linked child’s cognitive baseline and learning activity in read-only mode.','완료한 활동':'Completed activities','지금까지 완료한 게임':'Games completed so far','현재 스트릭':'Current streak','연속 학습 일수':'Consecutive learning days',
    '6가지 인지능력':'Six cognitive abilities','자녀 계정에서 완료한 기초평가 결과입니다.':'Baseline assessment results completed on the child account.','게임별 정확도':'Accuracy by game','최근 활동 내역':'Recent activity history'
  });
  Object.assign(zh, {
    '맞춤 연령대':'定制年龄段','생년월일을 기준으로 유아 4–12세, 청소년 13–29세, 성인 30–64세, 노인 65세 이상 게임을 자동으로 제공합니다.':'系统会根据出生日期自动分配游戏：幼儿4–12岁、青少年13–29岁、成人30–64岁、老年人65岁以上。','생년월일 저장':'保存出生日期',
    '보호자':'监护人','자녀 활동':'子女活动','자녀':'子女','연령 미설정':'未设置年龄','연결 해제':'解除关联','오늘 학습 완료':'今日学习已完成','일':'天','자녀 계정 연결을 해제했습니다.':'已解除子女账户关联。','자녀 계정 연결을 해제하지 못했습니다.':'无法解除子女账户关联。',
    '자녀 계정을 선택해 주세요.':'请选择子女账户。','자녀 활동을 불러오지 못했습니다.':'无法加载子女活动。','자녀 활동을 준비하고 있어요':'正在准备子女活动','인지 역량과 게임 기록을 안전하게 불러오는 중입니다.':'正在安全加载认知结果和游戏记录。',
    '자녀 선택':'选择子女','등록한 자녀':'已添加的子女','확인할 자녀를 선택하세요.':'请选择要查看的子女。','연결된 자녀 계정의 인지 기초선과 학습 활동을 읽기 전용으로 확인합니다.':'以只读方式查看已关联子女的认知基线和学习活动。','완료한 활동':'已完成活动','지금까지 완료한 게임':'迄今完成的游戏','현재 스트릭':'当前连续学习','연속 학습 일수':'连续学习天数',
    '6가지 인지능력':'六项认知能力','자녀 계정에서 완료한 기초평가 결과입니다.':'子女账户完成的基线评估结果。','게임별 정확도':'各游戏准确率','최근 활동 내역':'最近活动记录'
  });
  Object.assign(en, {
    '← 게임 선택으로':'← Back to game selection','어떤 방식으로':'How would you like to','학습할까요?':'study?','현재 검색과 분류에 포함된 플래시카드로 게임을 시작합니다.':'Games use the flashcards included in the current search and category filters.',
    '기억력 훈련':'Memory Training','질문을 보고 답을 떠올린 뒤 스스로 기억 여부를 확인해요.':'See the prompt, recall the answer, and check whether you remembered it.','짝 맞추기 연습':'Matching Practice','섞여 있는 앞면과 뒷면을 찾아 올바른 짝으로 연결해요.':'Match each shuffled front with its correct back.','퀴즈':'Quiz','질문에 맞는 정답을 여러 선택지 중에서 골라요.':'Choose the correct answer from multiple options.','간격 반복':'Spaced Repetition','기억 정도에 따라 다음 복습 시점을 자동으로 조절해요.':'Automatically schedule the next review based on how well you remember.','최대 6쌍':'Up to 6 pairs','최대 12문제':'Up to 12 questions','자유 복습':'Free review','카드가 더 필요해요':'More cards needed','시작하기':'Start',
    '짝 맞추기에는 플래시카드가 2개 이상 필요합니다.':'Matching requires at least two flashcards.','퀴즈에는 서로 다른 정답을 가진 카드가 2개 이상 필요합니다.':'Quiz requires at least two cards with different answers.','답을 떠올린 다음 카드를 눌러주세요.':'Recall the answer, then tap the card.','내가 떠올린 답과 비교해 보세요.':'Compare it with the answer you recalled.','정답 확인하기':'Reveal answer','다시 볼래요':'Review again','기억했어요 ✓':'I remembered ✓','기억력 훈련 완료':'Memory training complete',
    '찾은 짝':'Pairs found','시도':'Attempts','짝 맞추기 완료':'Matching complete','문제':'Question','정답이에요! ✓':'Correct! ✓','아쉬워요. 정답을 확인해 보세요.':'Not quite. Check the correct answer.','결과 보기':'View results','다음 문제':'Next question','퀴즈 완료':'Quiz complete',
    '기억하기 얼마나 어려웠는지 선택해 주세요.':'Choose how difficult this card was to remember.','다시':'Again','10분 후':'In 10 min','1일 후':'In 1 day','보통':'Good','기억 간격 늘리기':'Increase interval','긴 간격으로':'Use a longer interval','간격 반복 완료':'Spaced repetition complete','다른 게임 선택':'Choose another game','한 번 더 하기':'Play again'
  });
  Object.assign(zh, {
    '← 게임 선택으로':'← 返回游戏选择','어떤 방식으로':'想用哪种方式','학습할까요?':'学习？','현재 검색과 분류에 포함된 플래시카드로 게임을 시작합니다.':'游戏将使用当前搜索和分类筛选中的闪卡。',
    '기억력 훈련':'记忆训练','질문을 보고 답을 떠올린 뒤 스스로 기억 여부를 확인해요.':'查看问题、回想答案，然后确认是否记住。','짝 맞추기 연습':'配对练习','섞여 있는 앞면과 뒷면을 찾아 올바른 짝으로 연결해요.':'将打乱的卡片正面与正确背面配对。','퀴즈':'测验','질문에 맞는 정답을 여러 선택지 중에서 골라요.':'从多个选项中选择问题的正确答案。','간격 반복':'间隔重复','기억 정도에 따라 다음 복습 시점을 자동으로 조절해요.':'根据记忆程度自动安排下次复习时间。','최대 6쌍':'最多6对','최대 12문제':'最多12题','자유 복습':'自由复习','카드가 더 필요해요':'需要更多卡片','시작하기':'开始',
    '짝 맞추기에는 플래시카드가 2개 이상 필요합니다.':'配对练习至少需要两张闪卡。','퀴즈에는 서로 다른 정답을 가진 카드가 2개 이상 필요합니다.':'测验至少需要两张答案不同的卡片。','답을 떠올린 다음 카드를 눌러주세요.':'回想答案后点击卡片。','내가 떠올린 답과 비교해 보세요.':'与自己回想的答案比较。','정답 확인하기':'查看答案','다시 볼래요':'再次复习','기억했어요 ✓':'我记住了 ✓','기억력 훈련 완료':'记忆训练完成',
    '찾은 짝':'已找到配对','시도':'尝试','짝 맞추기 완료':'配对完成','문제':'题','정답이에요! ✓':'回答正确！✓','아쉬워요. 정답을 확인해 보세요.':'差一点，请查看正确答案。','결과 보기':'查看结果','다음 문제':'下一题','퀴즈 완료':'测验完成',
    '기억하기 얼마나 어려웠는지 선택해 주세요.':'请选择记住这张卡片的难度。','다시':'重来','10분 후':'10分钟后','1일 후':'1天后','보통':'一般','기억 간격 늘리기':'延长记忆间隔','긴 간격으로':'使用更长间隔','간격 반복 완료':'间隔重复完成','다른 게임 선택':'选择其他游戏','한 번 더 하기':'再玩一次'
  });
  Object.assign(en, {
    '오늘의 맞춤 추천 게임':'Today’s tailored recommendations','낮은 인지영역 2개 · 연령 맞춤 1개':'2 games for your lowest area · 1 age-tailored game',
    '단어 탐험가':'Word Explorer','수용어휘 · 표현어휘 · 의미기억':'Receptive vocabulary · Word retrieval · Semantic memory','한 단어를 소리·그림·범주·특징·문장으로 연결해 깊이 있게 익혀요.':'Learn each word deeply by connecting its sound, picture, category, features, and context.','단어를 듣고 그림과 의미를 여러 방법으로 연결해 보세요.':'Listen to each word and connect it with pictures and meaning in several ways.',
    '소리 다리':'Sound bridge','글자-소리 대응 · 단어 읽기':'Letter–sound mapping · Word reading','들리는 소리와 한글의 자음·모음·받침·음절·단어를 단계적으로 연결해요.':'Connect spoken sounds step by step with Korean consonants, vowels, final consonants, syllables, and words.','소리를 잘 듣고 알맞은 글자·음절·단어를 찾아보세요.':'Listen carefully and find the matching letter, syllable, or word.',
    '들리는 소리와 자음·모음·글자·음절·단어를 단계적으로 연결해요.':'Connect spoken sounds step by step with consonants, vowels, letters, syllables, and words.',
    '이번 표적':'Target signal','현재 신호':'Current signal','색깔만 확인':'Check color only','색깔과 모양 확인':'Check color and shape','표적이 3라운드마다 변경':'Target changes every 3 rounds','왼쪽 차선':'Left lane','오른쪽 차선':'Right lane','왼쪽 차선 · 표적 반응':'Left lane · Respond to target','오른쪽 차선 · 표적 반응':'Right lane · Respond to target',
    '주변 화살표는 무시하고 정확히 가운데 화살표의 방향만 고르세요.':'Ignore the surrounding arrows and choose only the exact direction of the center arrow.','가운데 화살표만 보고 방향을 고르세요':'Look only at the center arrow and choose its direction.',
    '모든 짝을 찾은 뒤 남은 시간이 50% 이상이면 별 3개, 25% 이상이면 2개, 그보다 적으면 1개를 얻어요.':'After finding every pair, earn 3 stars with at least 50% time left, 2 stars with at least 25%, or 1 star with less time remaining.',
    '중앙 기호와 주변 위치를 짧은 순간에 동시에 파악해 빠르게 결합해요.':'Quickly combine a center symbol and a peripheral location shown at the same moment.','잠깐 나타나는 중앙 기호와 주변 점 위치를 모두 기억하세요.':'Remember both the briefly shown center symbol and peripheral dot location.','중앙 기호와 주변 점을 한눈에 보세요':'Take in the center symbol and peripheral dot at a glance.','보았던 중앙 기호와 주변 점 위치를 함께 고르세요':'Choose both the center symbol and peripheral dot location you saw.',
    'Visual Search · Selective Attention':'Visual Search · Selective Attention','선택적 주의 · 시각 탐색':'Selective attention · Visual search','비슷한 방해 항목 사이에서 목표의 색·모양·표시가 모두 같은 항목을 찾아요.':'Find the item whose color, shape, and inner mark all match the target among similar distractors.','위에 제시된 목표와 완전히 같은 항목을 방해 항목 사이에서 찾으세요.':'Find the exact match for the target among the distractors.','위 목표와 완전히 같은 항목을 찾으세요':'Find the item that exactly matches the target above.','찾을 목표':'Target to find',
    '점수와 별점은 모든 짝을 찾은 뒤 남은 시간만으로 계산해요. 남은 시간이 50% 이상이면 별 3개, 25% 이상이면 2개, 그보다 적으면 1개를 얻어요.':'Score and stars use only the time remaining after every pair is found. Earn 3 stars with at least 50% time left, 2 stars with at least 25%, or 1 star with less time remaining.',
    '기억 짝 맞추기는 모든 짝을 찾은 뒤 남은 시간 비율을 0~100점으로 환산합니다.':'Memory Match converts the percentage of time remaining after all pairs are found into a score from 0 to 100.',
    '기억 짝 맞추기는 모든 짝을 찾았을 때 남은 시간이 50% 이상이면 100점이며, 그보다 적으면 남은 시간에 비례해 점수가 계산됩니다.':'Memory Match awards 100 points when at least 50% of the time remains after finding every pair; below that, the score scales with the remaining time.','모든 짝을 찾았을 때 남은 시간이 50% 이상이면 100점과 별 3개를 얻어요. 25% 이상이면 별 2개, 그보다 적으면 별 1개이며 점수는 남은 시간에 비례해 계산됩니다.':'Find every pair with at least 50% of the time left to earn 100 points and 3 stars. At least 25% earns 2 stars, less earns 1 star, and the score scales with the remaining time.',
    '자동차가 있는 차선을 확인하면서 현재 신호가 표적인지도 동시에 판단하세요.':'Identify the lane containing the car while also deciding whether the current signal is the target.','자동차 차선과 표적 신호를 동시에 판단하세요':'Judge the car’s lane and target signal at the same time.',
    '왼쪽 차선 · 표적 아님':'Left lane · Not the target','오른쪽 차선 · 표적 아님':'Right lane · Not the target','표적 아님':'Not the target',
    '단어를 듣고 알맞은 그림을 고르세요':'Listen to the word and choose the matching picture.','이 단어는 어떤 범주에 속하나요?':'Which category does this word belong to?','빈칸에 들어갈 알맞은 단어를 고르세요':'Choose the word that completes the sentence.','조금 전에 배운 그림의 이름을 다시 찾아보세요':'Recall the name of the picture you learned earlier.',
    '자음과 모음을 구별하세요':'Tell consonants and vowels apart.','들리는 소리와 같은 글자를 고르세요':'Choose the letter that matches the sound.','이 글자에는 받침이 있나요?':'Does this letter have a final consonant?','받침 있음':'Has a final consonant','받침 없음':'No final consonant','자음과 모음을 합쳐 알맞은 음절을 고르세요':'Combine the consonant and vowel and choose the syllable.','단어와 알맞은 그림을 연결하세요':'Match the word with its picture.','실제로 사용하는 단어인지 구별하세요':'Decide whether this is a real word.','실제 단어':'Real word','가짜 단어':'Made-up word','자음':'Consonant','모음':'Vowel','이 브라우저에서 음성을 재생할 수 없어요.':'Audio playback is unavailable in this browser.'
  });
  Object.assign(zh, {
    '오늘의 맞춤 추천 게임':'今日个性化推荐游戏','낮은 인지영역 2개 · 연령 맞춤 1개':'2个薄弱领域游戏 · 1个年龄定制游戏',
    '단어 탐험가':'词语探索家','수용어휘 · 표현어휘 · 의미기억':'接受性词汇 · 词语提取 · 语义记忆','한 단어를 소리·그림·범주·특징·문장으로 연결해 깊이 있게 익혀요.':'通过声音、图片、类别、特征和句子深入学习每个词语。','단어를 듣고 그림과 의미를 여러 방법으로 연결해 보세요.':'听词语，并用多种方式将它与图片和含义联系起来。',
    '소리 다리':'声音桥','글자-소리 대응 · 단어 읽기':'字音对应 · 词语阅读','들리는 소리와 한글의 자음·모음·받침·음절·단어를 단계적으로 연결해요.':'逐步将听到的声音与韩文辅音、元音、收音、音节和词语联系起来。','소리를 잘 듣고 알맞은 글자·음절·단어를 찾아보세요.':'仔细听声音，找出对应的字母、音节或词语。',
    '들리는 소리와 자음·모음·글자·음절·단어를 단계적으로 연결해요.':'逐步将听到的声音与辅音、元音、文字、音节和词语联系起来。',
    '이번 표적':'本轮目标','현재 신호':'当前信号','색깔만 확인':'只判断颜色','색깔과 모양 확인':'判断颜色和形状','표적이 3라운드마다 변경':'目标每3轮变化','왼쪽 차선':'左车道','오른쪽 차선':'右车道','왼쪽 차선 · 표적 반응':'左车道 · 响应目标','오른쪽 차선 · 표적 반응':'右车道 · 响应目标',
    '주변 화살표는 무시하고 정확히 가운데 화살표의 방향만 고르세요.':'忽略周围箭头，只选择正中央箭头的方向。','가운데 화살표만 보고 방향을 고르세요':'只看中央箭头并选择它的方向。',
    '모든 짝을 찾은 뒤 남은 시간이 50% 이상이면 별 3개, 25% 이상이면 2개, 그보다 적으면 1개를 얻어요.':'找出所有配对后，剩余时间达到50%可得3颗星，达到25%可得2颗星，更少则得1颗星。',
    '중앙 기호와 주변 위치를 짧은 순간에 동시에 파악해 빠르게 결합해요.':'快速结合同时短暂出现的中央符号和周边位置。','잠깐 나타나는 중앙 기호와 주변 점 위치를 모두 기억하세요.':'同时记住短暂出现的中央符号和周边圆点位置。','중앙 기호와 주변 점을 한눈에 보세요':'一眼看清中央符号和周边圆点。','보았던 중앙 기호와 주변 점 위치를 함께 고르세요':'同时选择刚才看到的中央符号和周边圆点位置。',
    'Visual Search · Selective Attention':'视觉搜索 · 选择性注意','선택적 주의 · 시각 탐색':'选择性注意 · 视觉搜索','비슷한 방해 항목 사이에서 목표의 색·모양·표시가 모두 같은 항목을 찾아요.':'在相似干扰项中找出颜色、形状和内部标记都与目标相同的项目。','위에 제시된 목표와 완전히 같은 항목을 방해 항목 사이에서 찾으세요.':'在干扰项中找出与上方目标完全相同的项目。','위 목표와 완전히 같은 항목을 찾으세요':'找出与上方目标完全相同的项目。','찾을 목표':'查找目标',
    '점수와 별점은 모든 짝을 찾은 뒤 남은 시간만으로 계산해요. 남은 시간이 50% 이상이면 별 3개, 25% 이상이면 2개, 그보다 적으면 1개를 얻어요.':'分数和星级只根据找出所有配对后的剩余时间计算。剩余时间达到50%可得3颗星，达到25%可得2颗星，更少则得1颗星。',
    '기억 짝 맞추기는 모든 짝을 찾은 뒤 남은 시간 비율을 0~100점으로 환산합니다.':'记忆配对会把找出所有配对后的剩余时间比例换算为0到100分。',
    '기억 짝 맞추기는 모든 짝을 찾았을 때 남은 시간이 50% 이상이면 100점이며, 그보다 적으면 남은 시간에 비례해 점수가 계산됩니다.':'记忆配对在找出所有配对后若剩余时间达到50%即可获得100分；低于该比例时，分数按剩余时间计算。','모든 짝을 찾았을 때 남은 시간이 50% 이상이면 100점과 별 3개를 얻어요. 25% 이상이면 별 2개, 그보다 적으면 별 1개이며 점수는 남은 시간에 비례해 계산됩니다.':'找出所有配对后，剩余时间达到50%可得100分和3颗星；达到25%可得2颗星，更少则得1颗星，分数按剩余时间计算。',
    '자동차가 있는 차선을 확인하면서 현재 신호가 표적인지도 동시에 판단하세요.':'确认汽车所在车道，同时判断当前信号是否为目标。','자동차 차선과 표적 신호를 동시에 판단하세요':'同时判断汽车所在车道和目标信号。',
    '왼쪽 차선 · 표적 아님':'左车道 · 不是目标','오른쪽 차선 · 표적 아님':'右车道 · 不是目标','표적 아님':'不是目标',
    '단어를 듣고 알맞은 그림을 고르세요':'听词语并选择对应的图片。','이 단어는 어떤 범주에 속하나요?':'这个词属于哪个类别？','빈칸에 들어갈 알맞은 단어를 고르세요':'选择适合填入空格的词语。','조금 전에 배운 그림의 이름을 다시 찾아보세요':'回想刚才学习的图片名称。',
    '자음과 모음을 구별하세요':'区分辅音和元音。','들리는 소리와 같은 글자를 고르세요':'选择与听到的声音相同的文字。','이 글자에는 받침이 있나요?':'这个字有收音吗？','받침 있음':'有收音','받침 없음':'无收音','자음과 모음을 합쳐 알맞은 음절을 고르세요':'组合辅音和元音并选择正确音节。','단어와 알맞은 그림을 연결하세요':'将词语与正确图片配对。','실제로 사용하는 단어인지 구별하세요':'判断是否为实际使用的词语。','실제 단어':'真实词语','가짜 단어':'假词','자음':'辅音','모음':'元音','이 브라우저에서 음성을 재생할 수 없어요.':'此浏览器无法播放语音。'
  });
  Object.assign(en, {
    '자녀 활동 AI 보고서':'Ward Activity AI Report','활동 기록을 한눈에 정리해 드려요':'See the activity record at a glance',
    '6가지 인지영역, 게임 정확도, 최근 활동과 스트릭을 바탕으로 보호자가 이해하기 쉬운 요약을 만듭니다.':'Creates a guardian-friendly summary from six cognitive areas, game accuracy, recent activity, and the learning streak.',
    '자녀의 이메일, 생년월일과 계정정보는 AI로 전송하지 않지만 자녀의 데이터의 일부가 노출될 가능성이 있습니다.':'Your child’s email, birth date, and account details are not sent to AI, but some of your child’s data may be exposed.',
    'AI 보고서 생성하기':'Generate AI report','보고서 다시 생성':'Generate again','자녀의 활동 흐름을 분석하고 있어요…':'Analyzing the learning pattern…',
    '전체 요약':'Overview','관찰된 강점':'Observed strengths','함께 살펴볼 영역':'Areas to support','추천 학습 활동':'Suggested activities','보호자 도움말':'Guardian tip','생성 시각':'Generated',
    'AI 생성 보고서':'AI-generated report','기본 분석 보고서':'Basic analysis report','AI 연결이 없어 기기에서 기본 분석 보고서를 만들었습니다.':'AI is not connected, so a basic on-device analysis is shown.',
    'AI 보고서를 불러오지 못해 기본 분석으로 전환했습니다.':'The AI report was unavailable, so Daily Cog switched to a basic analysis.'
  });
  Object.assign(zh, {
    '자녀 활동 AI 보고서':'子女活动AI报告','활동 기록을 한눈에 정리해 드려요':'一目了然地查看活动记录',
    '6가지 인지영역, 게임 정확도, 최근 활동과 스트릭을 바탕으로 보호자가 이해하기 쉬운 요약을 만듭니다.':'根据六项认知领域、游戏正确率、近期活动和连续学习天数，生成便于监护人理解的摘要。',
    '자녀의 이메일, 생년월일과 계정정보는 AI로 전송하지 않지만 자녀의 데이터의 일부가 노출될 가능성이 있습니다.':'孩子的邮箱、出生日期和账户信息不会发送给 AI，但孩子的部分数据可能会被披露。',
    'AI 보고서 생성하기':'生成AI报告','보고서 다시 생성':'重新生成报告','자녀의 활동 흐름을 분석하고 있어요…':'正在分析孩子的学习情况…',
    '전체 요약':'总体摘要','관찰된 강점':'观察到的优势','함께 살펴볼 영역':'需要支持的领域','추천 학습 활동':'推荐学习活动','보호자 도움말':'监护人建议','생성 시각':'生成时间',
    'AI 생성 보고서':'AI生成报告','기본 분석 보고서':'基础分析报告','AI 연결이 없어 기기에서 기본 분석 보고서를 만들었습니다.':'AI尚未连接，当前显示设备生成的基础分析。',
    'AI 보고서를 불러오지 못해 기본 분석으로 전환했습니다.':'AI报告暂时不可用，已切换为基础分析。'
  });

  // Switch & Sort uses SVG shapes, so its visible option text does not include
  // the emoji prefixes used by the older translation keys.
  Object.assign(en, {
    '빨강 상자':'Red box',
    '파랑 상자':'Blue box',
    '동그라미 상자':'Circle box',
    '세모 상자':'Triangle box'
  });
  Object.assign(zh, {
    '빨강 상자':'红色框',
    '파랑 상자':'蓝色框',
    '동그라미 상자':'圆形框',
    '세모 상자':'三角形框'
  });
  Object.assign(en, {
    '공유돌봄':'Share care',
    '연결된 자녀':'Linked children',
    '현재 공유된 자녀 활동 계정을 확인하거나 연결을 해제할 수 있습니다.':'Review currently shared child activity accounts or unlink them.',
    '연결된 자녀 계정이 없습니다.':'No linked child accounts.',
    '연결 정보를 확인할 수 없습니다.':'Could not check linked accounts.',
    '최신 Supabase 스키마가 적용되어 있는지 확인해 주세요.':'Check that the latest Supabase schema has been applied.',
    '공유돌봄 연결':'Share care connections','연동할 보호자 또는 자녀의 정확한 이메일 아이디를 검색해 요청을 보내세요.':'Search the exact email ID of a guardian or child and send a request.',
    '사용자 이메일 아이디':'User email ID','연결 관계':'Relationship','이 사용자를 자녀로 연결':'Connect this user as a child','이 사용자를 보호자로 연결':'Connect this user as a guardian',
    '아이디 검색':'Search ID','검색 중…':'Searching…','개인정보 보호를 위해 정확히 일치하는 이메일 아이디만 검색됩니다.':'For privacy, only an exact email ID match is returned.',
    '연결 요청 보내기':'Send connection request','받은 요청':'Received requests','보낸 요청':'Sent requests','수락':'Accept','거절':'Decline','요청 취소':'Cancel request',
    '연결된 공유돌봄':'Connected share care','아직 연결된 공유돌봄 관계가 없습니다.':'No share care relationships are connected yet.',
    '받은 요청이 없습니다.':'No received requests.','대기 중인 요청이 없습니다.':'No pending sent requests.','공유돌봄 요청을 불러오는 중입니다…':'Loading share care requests…',
    '연결된 자녀 활동이 없습니다.':'No linked child activity.','위에서 자녀의 이메일 아이디를 검색해 요청을 보내거나, 받은 보호자 연결 요청을 확인하세요.':'Search a child’s email ID above to send a request, or review received guardian requests.',
    '공유돌봄 요청 기능을 사용하려면 최신 Supabase 스키마를 적용해 주세요.':'Apply the latest Supabase schema to use share care requests.',
    '공유돌봄 연결 요청은 Supabase에 연결된 사이트에서 사용할 수 있습니다.':'Share care requests are available on a Supabase-connected site.',
    '일치하는 계정을 찾지 못했습니다.':'No matching account was found.','본인 계정에는 연결 요청을 보낼 수 없습니다.':'You cannot send a connection request to your own account.',
    '이미 연결된 계정입니다.':'These accounts are already connected.','두 계정 사이에 이미 대기 중인 요청이 있습니다.':'A request is already pending between these accounts.',
    '공유돌봄 연결 요청을 보냈습니다.':'Share care request sent.','공유돌봄 연결 요청을 수락했습니다.':'Share care request accepted.','공유돌봄 연결 요청을 거절했습니다.':'Share care request declined.','보낸 요청을 취소했습니다.':'Sent request cancelled.',
    '보호자':'Guardian','자녀':'Child','사용자':'User'
  });
  Object.assign(zh, {
    '공유돌봄':'共享照护',
    '연결된 자녀':'已关联子女',
    '현재 공유된 자녀 활동 계정을 확인하거나 연결을 해제할 수 있습니다.':'查看当前共享的子女活动账户或解除关联。',
    '연결된 자녀 계정이 없습니다.':'没有已关联的子女账户。',
    '연결 정보를 확인할 수 없습니다.':'无法检查关联账户。',
    '최신 Supabase 스키마가 적용되어 있는지 확인해 주세요.':'请确认已应用最新的 Supabase 架构。',
    '공유돌봄 연결':'共享照护连接','연동할 보호자 또는 자녀의 정확한 이메일 아이디를 검색해 요청을 보내세요.':'搜索监护人或子女的准确邮箱账号并发送请求。',
    '사용자 이메일 아이디':'用户邮箱账号','연결 관계':'关联关系','이 사용자를 자녀로 연결':'将此用户关联为子女','이 사용자를 보호자로 연결':'将此用户关联为监护人',
    '아이디 검색':'搜索账号','검색 중…':'搜索中…','개인정보 보호를 위해 정확히 일치하는 이메일 아이디만 검색됩니다.':'为保护隐私，仅返回完全匹配的邮箱账号。',
    '연결 요청 보내기':'发送关联请求','받은 요청':'收到的请求','보낸 요청':'已发送请求','수락':'接受','거절':'拒绝','요청 취소':'取消请求',
    '연결된 공유돌봄':'已关联的共享照护','아직 연결된 공유돌봄 관계가 없습니다.':'尚无已关联的共享照护关系。',
    '받은 요청이 없습니다.':'没有收到请求。','대기 중인 요청이 없습니다.':'没有等待处理的已发送请求。','공유돌봄 요청을 불러오는 중입니다…':'正在加载共享照护请求…',
    '연결된 자녀 활동이 없습니다.':'暂无已关联的子女活动。','위에서 자녀의 이메일 아이디를 검색해 요청을 보내거나, 받은 보호자 연결 요청을 확인하세요.':'在上方搜索子女邮箱并发送请求，或查看收到的监护人关联请求。',
    '공유돌봄 요청 기능을 사용하려면 최신 Supabase 스키마를 적용해 주세요.':'请应用最新的 Supabase 架构以使用共享照护请求。',
    '공유돌봄 연결 요청은 Supabase에 연결된 사이트에서 사용할 수 있습니다.':'共享照护请求可在已连接 Supabase 的网站中使用。',
    '일치하는 계정을 찾지 못했습니다.':'未找到匹配的账户。','본인 계정에는 연결 요청을 보낼 수 없습니다.':'不能向自己的账户发送关联请求。',
    '이미 연결된 계정입니다.':'这些账户已关联。','두 계정 사이에 이미 대기 중인 요청이 있습니다.':'两个账户之间已有待处理请求。',
    '공유돌봄 연결 요청을 보냈습니다.':'共享照护请求已发送。','공유돌봄 연결 요청을 수락했습니다.':'已接受共享照护请求。','공유돌봄 연결 요청을 거절했습니다.':'已拒绝共享照护请求。','보낸 요청을 취소했습니다.':'已取消发送的请求。',
    '보호자':'监护人','자녀':'子女','사용자':'用户'
  });

  // Game UI copy kept together so the shortened choices and variable
  // Hidden Direction target positions switch languages immediately.
  Object.assign(en, {
    '빨강':'Red','파랑':'Blue','동그라미':'Circle','세모':'Triangle',
    '하나라도 같음':'Any match',
    '왼쪽 · 응답':'Left · Respond','오른쪽 · 응답':'Right · Respond',
    '왼쪽 · 응답 안 함':'Left · Not respond','오른쪽 · 응답 안 함':'Right · Not respond',
    '주변 화살표에 흔들리지 말고 지정된 위치의 화살표 방향을 찾아요.':'Ignore the surrounding arrows and follow the arrow at the designated position.',
    '주변 화살표는 무시하고 문제에서 지정한 위치의 화살표 방향을 고르세요.':'Ignore the surrounding arrows and choose the direction at the position named in the prompt.',
    '왼쪽 화살표만 보고 방향을 고르세요':'Look only at the left arrow and choose its direction.',
    '가운데 화살표만 보고 방향을 고르세요':'Look only at the center arrow and choose its direction.',
    '오른쪽 화살표만 보고 방향을 고르세요':'Look only at the right arrow and choose its direction.'
  });
  Object.assign(zh, {
    '빨강':'红色','파랑':'蓝色','동그라미':'圆形','세모':'三角形',
    '하나라도 같음':'任一项相同',
    '왼쪽 · 응답':'左 · 响应','오른쪽 · 응답':'右 · 响应',
    '왼쪽 · 응답 안 함':'左 · 不响应','오른쪽 · 응답 안 함':'右 · 不响应',
    '주변 화살표에 흔들리지 말고 지정된 위치의 화살표 방향을 찾아요.':'忽略周围箭头，判断指定位置箭头的方向。',
    '주변 화살표는 무시하고 문제에서 지정한 위치의 화살표 방향을 고르세요.':'忽略周围箭头，选择题目指定位置箭头的方向。',
    '왼쪽 화살표만 보고 방향을 고르세요':'只看左侧箭头并选择它的方向。',
    '가운데 화살표만 보고 방향을 고르세요':'只看中央箭头并选择它的方向。',
    '오른쪽 화살표만 보고 방향을 고르세요':'只看右侧箭头并选择它的方向。'
  });

  function dynamic(source, lang) {
    const table = lang === 'en' ? en : zh;
    if (Object.prototype.hasOwnProperty.call(table, source)) return table[source];
    if (source.endsWith(' →')) return dynamic(source.slice(0, -2), lang) + ' →';
    let match = source.match(/^(\d+)개의 새 요청$/);
    if (match) return lang === 'en' ? `${match[1]} new ${match[1]==='1'?'request':'requests'}` : `${match[1]}个新请求`;
    match = source.match(/^(.+)님의 오늘,$/);
    if (match) return lang === 'en' ? `Today, ${match[1]}` : `${match[1]}的今天，`;
    match = source.match(/^(.+)님$/);
    if (match) return lang === 'en' ? match[1] : `${match[1]}`;
    match = source.match(/^(.+)님의 학습 친구$/);
    if (match) return lang === 'en' ? `${match[1]}’s learning buddy` : `${match[1]}的学习伙伴`;
    match = source.match(/^(.+) 맞춤 루틴$/);
    if (match) return lang === 'en' ? `${table[match[1]] || match[1]} routine` : `${table[match[1]] || match[1]}定制训练`;
    match = source.match(/^(.+) 추천 게임$/);
    if (match) return lang === 'en' ? `Recommended for ${table[match[1]] || match[1]}` : `${table[match[1]] || match[1]}推荐游戏`;
    match = source.match(/^(.+) 보완 추천$/);
    if (match) return lang === 'en' ? `${dynamic(match[1],lang)} support` : `${dynamic(match[1],lang)}强化推荐`;
    match = source.match(/^(.+) 연령 맞춤$/);
    if (match) return lang === 'en' ? `${dynamic(match[1],lang)} age-tailored` : `${dynamic(match[1],lang)}年龄定制`;
    match = source.match(/^(.+)은\(는\) 어떤 기능이나 특징이 있나요\?$/);
    if (match) return lang === 'en' ? `What is ${match[1]} used for or known for?` : `${match[1]}有什么功能或特征？`;
    match = source.match(/^(.+)과\(와\) 관련 있는 장소는 어디인가요\?$/);
    if (match) return lang === 'en' ? `Which place is related to ${match[1]}?` : `哪个地点与${match[1]}有关？`;
    match = source.match(/^(.+)과\(와\) 가장 관련 있는 단어를 고르세요\.$/);
    if (match) return lang === 'en' ? `Choose the word most related to ${match[1]}.` : `选择与${match[1]}最相关的词语。`;
    match = source.match(/^문장에서 “(.+)”을 찾아보세요$/);
    if (match) return lang === 'en' ? `Find “${match[1]}” in the sentence.` : `在句子中找出“${match[1]}”。`;
    match = source.match(/^(.+) 맞춤 루틴을 준비했어요\.$/);
    if (match) return lang === 'en' ? `Your ${table[match[1]] || match[1]} routine is ready.` : `${table[match[1]] || match[1]}定制训练已准备好。`;
    match = source.match(/^(.+) 맞춤 게임을 준비했습니다\.$/);
    if (match) return lang === 'en' ? `Your ${table[match[1]] || match[1]} games are ready.` : `${table[match[1]] || match[1]}定制游戏已准备好。`;
    match = source.match(/^(.+) 맞춤 게임으로 자동 변경되었습니다\.$/);
    if (match) return lang === 'en' ? `Games automatically changed to the ${table[match[1]] || match[1]} group.` : `游戏已自动切换至${table[match[1]] || match[1]}组。`;
    match = source.match(/^(.+) 맞춤 게임으로 변경했습니다\.$/);
    if (match) return lang === 'en' ? `Games changed to the ${table[match[1]] || match[1]} group.` : `游戏已切换至${table[match[1]] || match[1]}组。`;
    match = source.match(/^(유아|청소년|성인|노인) 평균$/);
    if (match) return lang === 'en' ? `${table[match[1]] || match[1]} average` : `${table[match[1]] || match[1]}平均`;
    match = source.match(/^(\d+) \/ 12개 평가 완료$/);
    if (match) return lang === 'en' ? `${match[1]} / 12 assessments complete` : `已完成 ${match[1]} / 12 项评估`;
    match = source.match(/^기초 평가 (\d+) \/ 12$/);
    if (match) return lang === 'en' ? `Baseline assessment ${match[1]} / 12` : `基线评估 ${match[1]} / 12`;
    match = source.match(/^다음 평가 (.+)$/);
    if (match) return lang === 'en' ? `Next assessment ${match[1]}` : `下次评估 ${match[1]}`;
    match = source.match(/^다음 기초 평가는 (.+)부터 진행할 수 있습니다\.$/);
    if (match) return lang === 'en' ? `The next baseline assessment is available from ${match[1]}.` : `下次基线评估可从${match[1]}开始。`;
    match = source.match(/^쉬움 · 완료 · (\d+)점$/);
    if (match) return lang === 'en' ? `Easy · Complete · ${match[1]} pts` : `简单 · 已完成 · ${match[1]}分`;
    match = source.match(/^(\d+) \/ 12 기초 평가 완료$/);
    if (match) return lang === 'en' ? `${match[1]} / 12 baseline games complete` : `已完成 ${match[1]} / 12 项基线评估`;
    match = source.match(/^(\d+)개 카드$/);
    if (match) return lang === 'en' ? `${match[1]} ${match[1]==='1'?'card':'cards'}` : `${match[1]}张卡片`;
    match = source.match(/^오늘 복습 (\d+)개$/);
    if (match) return lang === 'en' ? `${match[1]} due today` : `今日复习${match[1]}张`;
    match = source.match(/^시도 (\d+)회$/);
    if (match) return lang === 'en' ? `${match[1]} attempts` : `尝试${match[1]}次`;
    match = source.match(/^(\d+) \/ (\d+) 문제$/);
    if (match) return lang === 'en' ? `Question ${match[1]} / ${match[2]}` : `第${match[1]} / ${match[2]}题`;
    match = source.match(/^정답 (\d+)개$/);
    if (match) return lang === 'en' ? `${match[1]} correct` : `答对${match[1]}题`;
    match = source.match(/^(\d+)개 중 (\d+)개를 기억했어요\.$/);
    if (match) return lang === 'en' ? `You remembered ${match[2]} of ${match[1]} cards.` : `${match[1]}张中记住了${match[2]}张。`;
    match = source.match(/^(\d+)번 만에 (\d+)쌍을 모두 찾았어요\.$/);
    if (match) return lang === 'en' ? `You found all ${match[2]} pairs in ${match[1]} attempts.` : `用${match[1]}次尝试找到了全部${match[2]}对。`;
    match = source.match(/^(\d+)문제 중 (\d+)문제를 맞혔어요\.$/);
    if (match) return lang === 'en' ? `You answered ${match[2]} of ${match[1]} questions correctly.` : `${match[1]}题中答对了${match[2]}题。`;
    match = source.match(/^(\d+)개의 다음 복습 일정을 저장했어요\.$/);
    if (match) return lang === 'en' ? `Saved the next review schedule for ${match[1]} cards.` : `已保存${match[1]}张卡片的下次复习计划。`;
    match = source.match(/^(\d+)개 카드 · 카드를 누르면 뒤집혀요$/);
    if (match) return lang === 'en' ? `${match[1]} ${match[1]==='1'?'card':'cards'} · Click any card to flip it` : `${match[1]}张卡片 · 点击卡片即可翻面`;
    match = source.match(/^(\d+) \/ (\d+) 카드$/);
    if (match) return lang === 'en' ? `${match[1]} / ${match[2]} cards` : `${match[1]} / ${match[2]} 张卡片`;
    match = source.match(/^“(.+)” 카드를 삭제할까요\?$/);
    if (match) return lang === 'en' ? `Delete the “${match[1]}” card?` : `要删除“${match[1]}”卡片吗？`;
    match = source.match(/^(.+)님의 활동$/);
    if (match) return lang === 'en' ? `${match[1]}’s activity` : `${match[1]}的活动`;
    match = source.match(/^(.+)님의 인지 육각형$/);
    if (match) return lang === 'en' ? `${match[1]}’s cognitive profile` : `${match[1]}的认知六边形`;
    match = source.match(/^(.+) 계정의 연결을 해제할까요\?$/);
    if (match) return lang === 'en' ? `Unlink ${match[1]}’s account?` : `要解除与${match[1]}账户的关联吗？`;
    match = source.match(/^총 (\d+)라운드, 약 2분이면 충분해요\.$/);
    if (match) return lang === 'en' ? `${match[1]} rounds take about 2 minutes.` : `共${match[1]}轮，约2分钟即可完成。`;
    match = source.match(/^찾은 짝 (\d+) \/ (\d+)$/);
    if (match) return lang === 'en' ? `Pairs found ${match[1]} / ${match[2]}` : `已找到 ${match[1]} / ${match[2]} 对`;
    match = source.match(/^(\d+)라운드$/);
    if (match) return lang === 'en' ? `${match[1]} rounds` : `${match[1]}轮`;
    match = source.match(/^(\d+)개의 짝$/);
    if (match) return lang === 'en' ? `${match[1]} pairs` : `${match[1]}对`;
    match = source.match(/^(\d+)개의 음을 기억하세요$/);
    if (match) return lang === 'en' ? `Remember ${match[1]} tones` : `记住${match[1]}个音调`;
    match = source.match(/^⏱ 제한시간 (.+)$/);
    if (match) return lang === 'en' ? `⏱ Time limit ${match[1]}` : `⏱ 时间限制 ${match[1]}`;
    match = source.match(/^◎ 목표 (.+)$/);
    if (match) return lang === 'en' ? `◎ Goal ${dynamic(match[1],lang)}` : `◎ 目标 ${dynamic(match[1],lang)}`;
    match = source.match(/^“(.+), 그리고 (.+)”$/);
    if (match) return lang === 'en' ? `“${dynamic(match[1],lang)}, then ${dynamic(match[2],lang)}”` : `“${dynamic(match[1],lang)}，然后${dynamic(match[2],lang)}”`;
    match = source.match(/^(.+), 그리고 (.+)$/);
    if (match) return lang === 'en' ? `${dynamic(match[1],lang)}, then ${dynamic(match[2],lang)}` : `${dynamic(match[1],lang)}，然后${dynamic(match[2],lang)}`;
    match = source.match(/^“(.+)”$/);
    if (match) return `“${dynamic(match[1],lang)}”`;
    match = source.match(/^(🏘️|🌾|📚)\s+(.+)$/);
    if (match) return `${match[1]} ${dynamic(match[2],lang)}`;
    match = source.match(/^활동 (\d+)$/);
    if (match) return lang === 'en' ? `ACTIVITY ${match[1]}` : `活动 ${match[1]}`;
    match = source.match(/^최고 (\d+)$/);
    if (match) return lang === 'en' ? `BEST ${match[1]}` : `最高 ${match[1]}`;
    match = source.match(/^오늘 완료한 게임 (\d+)개$/);
    if (match) return lang === 'en' ? `${match[1]} ${match[1]==='1'?'game':'games'} completed today` : `今日完成${match[1]}个游戏`;
    match = source.match(/^오늘 별 (\d+) \/ (\d+)$/);
    if (match) return lang === 'en' ? `Today's stars ${match[1]} / ${match[2]}` : `今日星星 ${match[1]} / ${match[2]}`;
    match = source.match(/^(\d+)회 플레이 · 최고 (\d+)$/);
    if (match) return lang === 'en' ? `${match[1]} plays · Best ${match[2]}` : `游戏${match[1]}次 · 最高${match[2]}`;
    match = source.match(/^별 3개 중 (\d+)개$/);
    if (match) return lang === 'en' ? `${match[1]} out of 3 stars` : `获得3颗星中的${match[1]}颗`;
    match = source.match(/^(\d+)개의 별을 얻었어요$/);
    if (match) return lang === 'en' ? `You earned ${match[1]} ${match[1]==='1'?'star':'stars'}` : `您获得了${match[1]}颗星`;
    match = source.match(/^(\d+)명$/);
    if (match) return lang === 'en' ? `${match[1]} users` : `${match[1]}人`;
    match = source.match(/^(\d+)회$/);
    if (match) return lang === 'en' ? `${match[1]} sessions` : `${match[1]}次`;
    match = source.match(/^🔥 (\d+)일$/);
    if (match) return lang === 'en' ? `🔥 ${match[1]} days` : `🔥 ${match[1]}天`;
    match = source.match(/^오늘 완료한 학습 (\d+)회$/);
    if (match) return lang === 'en' ? `${match[1]} ${match[1]==='1'?'activity':'activities'} completed today` : `今日完成学习${match[1]}次`;
    match = source.match(/^누적 (\d+) · 사용 (\d+)$/);
    if (match) return lang === 'en' ? `Earned ${match[1]} · Spent ${match[2]}` : `累计${match[1]} · 已使用${match[2]}`;
    match = source.match(/^(\d+) \/ (\d+) 보유$/);
    if (match) return lang === 'en' ? `${match[1]} / ${match[2]} owned` : `已拥有 ${match[1]} / ${match[2]}`;
    match = source.match(/^견종 (\d+) \/ (\d+)$/);
    if (match) return lang === 'en' ? `Breeds ${match[1]} / ${match[2]}` : `犬种 ${match[1]} / ${match[2]}`;
    match = source.match(/^(\d+)개 보유$/);
    if (match) return lang === 'en' ? `${match[1]} owned` : `持有${match[1]}个`;
    match = source.match(/^(.+) · 행복 (\d+)분$/);
    if (match) return lang === 'en' ? `${dynamic(match[1],lang)} · Happy for ${match[2]} minutes` : `${dynamic(match[1],lang)} · 快乐${match[2]}分钟`;
    match = source.match(/^(.+) 구매 완료! 바로 착용했어요\.$/);
    if (match) return lang === 'en' ? `${dynamic(match[1],lang)} purchased and equipped!` : `${dynamic(match[1],lang)}购买成功并已佩戴！`;
    match = source.match(/^(.+)을 벗었어요\.$/);
    if (match) return lang === 'en' ? `Removed ${dynamic(match[1],lang)}.` : `已取下${dynamic(match[1],lang)}。`;
    match = source.match(/^(.+)을 착용했어요\.$/);
    if (match) return lang === 'en' ? `Equipped ${dynamic(match[1],lang)}.` : `已佩戴${dynamic(match[1],lang)}。`;
    match = source.match(/^(.+)와 새로운 학습 친구가 되었어요!$/);
    if (match) return lang === 'en' ? `${dynamic(match[1],lang)} is now your new learning buddy!` : `${dynamic(match[1],lang)}成为了新的学习伙伴！`;
    match = source.match(/^(.+)을 구매했어요!$/);
    if (match) return lang === 'en' ? `Purchased ${dynamic(match[1],lang)}!` : `已购买${dynamic(match[1],lang)}！`;
    match = source.match(/^(.+)을 맛있게 먹고 더 행복해졌어요!$/);
    if (match) return lang === 'en' ? `Your puppy enjoyed ${dynamic(match[1],lang)} and became even happier!` : `小狗开心地吃了${dynamic(match[1],lang)}，变得更快乐了！`;
    match = source.match(/^성견까지 별 (\d+)개 남았어요$/);
    if (match) return lang === 'en' ? `${match[1]} stars left until adulthood` : `距离成长为成犬还差${match[1]}颗星`;
    match = source.match(/^최종 성장까지 별 (\d+)개 남았어요$/);
    if (match) return lang === 'en' ? `${match[1]} stars left until the final growth stage` : `距离最终成长阶段还差${match[1]}颗星`;
    match = source.match(/^성견 업그레이드까지 별 포인트 (\d+)개가 더 필요해요$/);
    if (match) return lang === 'en' ? `${match[1]} more star points needed to upgrade to an adult dog` : `升级为成犬还需要${match[1]}个星星积分`;
    match = source.match(/^최종 업그레이드까지 별 포인트 (\d+)개가 더 필요해요$/);
    if (match) return lang === 'en' ? `${match[1]} more star points needed for the final upgrade` : `最终升级还需要${match[1]}个星星积分`;
    match = source.match(/^별 포인트 (\d+)개를 사용해 강아지를 성견으로 업그레이드할까요\?$/);
    if (match) return lang === 'en' ? `Use ${match[1]} star points to upgrade your puppy to an adult dog?` : `要使用${match[1]}个星星积分将小狗升级为成犬吗？`;
    match = source.match(/^별 포인트 (\d+)개를 사용해 강아지를 최종 성장 단계로 업그레이드할까요\?$/);
    if (match) return lang === 'en' ? `Use ${match[1]} star points to unlock your puppy's final growth stage?` : `要使用${match[1]}个星星积分解锁小狗的最终成长阶段吗？`;
    match = source.match(/^(\d+(?:\.\d+)?)초 후 사라집니다$/);
    if (match) return lang === 'en' ? `Disappears in ${match[1]} seconds` : `${match[1]}秒后消失`;
    match = source.match(/^(\d+)월 (\d+)일 (월요일|화요일|수요일|목요일|금요일|토요일|일요일)$/);
    if (match) {
      const weekdaysEn={월요일:'Monday',화요일:'Tuesday',수요일:'Wednesday',목요일:'Thursday',금요일:'Friday',토요일:'Saturday',일요일:'Sunday'};
      const weekdaysZh={월요일:'星期一',화요일:'星期二',수요일:'星期三',목요일:'星期四',금요일:'星期五',토요일:'星期六',일요일:'星期日'};
      return lang === 'en' ? `${match[1]}/${match[2]} · ${weekdaysEn[match[3]]}` : `${match[1]}月${match[2]}日 · ${weekdaysZh[match[3]]}`;
    }
    match = source.match(/^(.+?) · (.+)$/);
    if (match) return `${dynamic(match[1], lang)} · ${dynamic(match[2], lang)}`;
    return source;
  }

  function translateString(value, lang) {
    if (!value || lang === 'ko') return value;
    const lead = value.match(/^\s*/)[0], tail = value.match(/\s*$/)[0];
    const core = value.trim();
    return lead + dynamic(core, lang) + tail;
  }

  function apply(root, lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement && node.parentElement.classList.contains('size-preview')) {
        node.nodeValue = ({ko:'가',en:'A',zh:'文'})[lang] || 'A';
        return;
      }
      if (node.parentElement && ['TEXTAREA','SCRIPT','STYLE'].includes(node.parentElement.tagName)) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      node.nodeValue = translateString(originalText.get(node), lang);
    });
    root.querySelectorAll('[placeholder], [title], [aria-label]').forEach(el => {
      if (!originalAttributes.has(el)) {
        originalAttributes.set(el, {
          placeholder: el.getAttribute('placeholder'), title: el.getAttribute('title'), aria: el.getAttribute('aria-label')
        });
      }
      const attrs = originalAttributes.get(el);
      if (attrs.placeholder !== null) el.setAttribute('placeholder', translateString(attrs.placeholder, lang));
      if (attrs.title !== null) el.setAttribute('title', translateString(attrs.title, lang));
      if (attrs.aria !== null) el.setAttribute('aria-label', translateString(attrs.aria, lang));
    });
    root.querySelectorAll('[data-i18n-key]').forEach(el => {
      const translated = translateString(el.dataset.i18nKey || '', lang);
      if (el.textContent !== translated) el.textContent = translated;
    });
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      const translated = translateString(el.dataset.i18nTitle || '', lang);
      if (el.getAttribute('title') !== translated) el.setAttribute('title', translated);
    });
  }

  window.DailyCogI18n = { apply, translate: translateString };
})();
