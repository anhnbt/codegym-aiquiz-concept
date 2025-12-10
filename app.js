// State Management
const state = {
  stepIndex: 0,
  questionIndex: 0,
  selectedAnswers: {},
  stepScores: [],
  careerMatches: {
    backend: 0,
    frontend: 0,
    fullstack: 0,
    data: 0,
    devops: 0,
    product: 0,
    leadership: 0,
  },
  answerHistory: [], // Track recent answers for context
  currentLevel: 0, // AI Guide level (0-4)
};

// AI Guide Evolution Levels
const guideLevels = [
  {
    id: 0,
    name: 'Beginner Guide',
    title: 'Người Bắt đầu',
    avatar: '🌱',
    color: '#10b981',
    borderStyle: 'dashed',
    size: 40,
    greetings: [
      'Chúng ta cùng khám phá nhé!',
      'Thú vị đấy!',
      'Đây là bước đầu tốt!',
    ],
    personality: 'curious',
  },
  {
    id: 1,
    name: 'Challenger',
    title: 'Người Thử thách',
    avatar: '⚡',
    color: '#f15a29',
    borderStyle: 'solid',
    size: 45,
    greetings: [
      'Bạn đang tiến bộ!',
      'Pattern rõ ràng rồi đấy!',
      'Thử thách đã bắt đầu!',
    ],
    personality: 'energetic',
  },
  {
    id: 2,
    name: 'Warrior',
    title: 'Chiến binh',
    avatar: '⚔️',
    color: '#9333ea',
    borderStyle: 'double',
    size: 50,
    greetings: [
      'Bạn biết mình muốn gì!',
      'Mục tiêu rõ ràng!',
      'Warrior spirit detected!',
    ],
    personality: 'determined',
  },
  {
    id: 3,
    name: 'Mentor',
    title: 'Người Cố vấn',
    avatar: '🎓',
    color: '#3b82f6',
    borderStyle: 'gradient',
    size: 55,
    greetings: [
      'Dựa trên hồ sơ của bạn...',
      'Phân tích chuyên sâu:',
      'Lộ trình phù hợp nhất:',
    ],
    personality: 'wise',
  },
  {
    id: 4,
    name: 'Master',
    title: 'Bậc Thầy',
    avatar: '🏆',
    color: '#ffd700',
    borderStyle: 'animated-gradient',
    size: 60,
    greetings: [
      'Bạn đã sẵn sàng!',
      'Journey bắt đầu từ đây!',
      'Master vision unlocked!',
    ],
    personality: 'visionary',
  },
];

// Data Structure: 5 Steps, each with 3-4 questions
const steps = [
  {
    id: 0,
    title: 'Phong cách Làm việc',
    icon: '💼',
    questions: [
      {
        text: 'Khi bắt đầu một dự án mới, bạn thường làm gì đầu tiên?',
        options: [
          {
            icon: '📋',
            title: 'Lập kế hoạch chi tiết',
            subtitle: 'Tôi cần roadmap rõ ràng trước khi bắt đầu',
          },
          {
            icon: '⚡',
            title: 'Bắt đầu ngay',
            subtitle: 'Làm phần thú vị trước, hoàn thiện sau',
          },
          {
            icon: '👥',
            title: 'Thảo luận nhóm',
            subtitle: 'Tôi cần nghe nhiều góc nhìn khác nhau',
          },
          {
            icon: '📚',
            title: 'Nghiên cứu trước',
            subtitle: 'Học hỏi từ các dự án tương tự',
          },
        ],
        feedback: [
          'Bạn có xu hướng tiếp cận công việc một cách có hệ thống và cẩn thận. Điều này rất phù hợp với Backend Development và System Design.',
          'Bạn thích hành động và thử nghiệm nhanh. Phong cách này thường thấy ở Frontend Developer và UX Designer.',
          'Bạn đánh giá cao sự hợp tác và đa dạng ý kiến. Điều này rất tốt cho vai trò Team Lead hoặc Product Manager.',
          'Bạn là người học hỏi từ kinh nghiệm và tài liệu. Phong cách này phù hợp với vai trò Research Engineer.',
        ],
      },
      {
        text: 'Trong nhóm, bạn thường đảm nhận vai trò nào?',
        options: [
          {
            icon: '🎯',
            title: 'Người lập kế hoạch',
            subtitle: 'Quản lý tiến độ và tổ chức công việc',
          },
          {
            icon: '💡',
            title: 'Người sáng tạo',
            subtitle: 'Đưa ra ý tưởng và giải pháp mới',
          },
          {
            icon: '🤝',
            title: 'Người kết nối',
            subtitle: 'Giải quyết xung đột, tạo sự hòa hợp',
          },
          {
            icon: '⚙️',
            title: 'Người thực thi',
            subtitle: 'Tập trung vào công việc kỹ thuật',
          },
        ],
        feedback: [
          'Bạn có khả năng tổ chức và quản lý tốt. Điều này phù hợp với vai trò Project Manager hoặc Tech Lead.',
          'Bạn là người đổi mới và sáng tạo. Điều này rất phù hợp với Product Design và Innovation roles.',
          'Bạn có kỹ năng giao tiếp xuất sắc. Điều này tuyệt vời cho vai trò Scrum Master hoặc Team Coordinator.',
          'Bạn tập trung vào kỹ thuật và thực thi. Điều này phù hợp với Software Engineer và Developer roles.',
        ],
      },
      {
        text: 'Bạn thích làm việc trong môi trường nào nhất?',
        options: [
          {
            icon: '🚀',
            title: 'Startup năng động',
            subtitle: 'Nhiều thử thách mới, thay đổi nhanh',
          },
          {
            icon: '🏢',
            title: 'Doanh nghiệp lớn',
            subtitle: 'Quy trình rõ ràng, ổn định',
          },
          {
            icon: '🏠',
            title: 'Remote linh hoạt',
            subtitle: 'Tự do thời gian và địa điểm',
          },
          {
            icon: '👔',
            title: 'Văn phòng truyền thống',
            subtitle: 'Tương tác trực tiếp với đồng nghiệp',
          },
        ],
        feedback: [
          'Bạn thích sự năng động và thay đổi. Startup culture phù hợp với bạn!',
          'Bạn đánh giá cao sự ổn định và quy trình. Enterprise environment là lựa chọn tốt.',
          'Bạn cần tính linh hoạt và tự chủ. Remote work culture phù hợp với bạn.',
          'Bạn thích tương tác trực tiếp và làm việc nhóm. Office culture là điểm mạnh của bạn.',
        ],
      },
    ],
  },
  {
    id: 1,
    title: 'Tư duy & Giải quyết Vấn đề',
    icon: '🧠',
    questions: [
      {
        text: 'Khi gặp một vấn đề phức tạp, bạn thường:',
        options: [
          {
            icon: '🔍',
            title: 'Phân tích có hệ thống',
            subtitle: 'Tìm giải pháp logic từng bước',
          },
          {
            icon: '🎨',
            title: 'Thử nghiệm sáng tạo',
            subtitle: 'Thử nhiều cách khác nhau',
          },
          {
            icon: '🗣️',
            title: 'Thảo luận nhóm',
            subtitle: 'Lắng nghe ý kiến đồng nghiệp',
          },
          {
            icon: '📖',
            title: 'Nghiên cứu tài liệu',
            subtitle: 'Học từ kinh nghiệm có sẵn',
          },
        ],
        feedback: [
          'Tư duy logic của bạn rất mạnh. Backend Development và Data Engineering phù hợp với bạn.',
          'Bạn là người sáng tạo và linh hoạt. Frontend và Creative roles phù hợp.',
          'Bạn là người hợp tác tốt. Teamwork-oriented roles phù hợp với bạn.',
          'Bạn là người học hỏi từ kinh nghiệm. Research-oriented roles phù hợp.',
        ],
      },
      {
        text: 'Bạn thích làm việc với loại vấn đề nào?',
        options: [
          {
            icon: '💻',
            title: 'Vấn đề kỹ thuật',
            subtitle: 'Logic rõ ràng, có cấu trúc',
          },
          {
            icon: '✨',
            title: 'Vấn đề sáng tạo',
            subtitle: 'Thiết kế, UX/UI, đổi mới',
          },
          {
            icon: '👨‍👩‍👧',
            title: 'Vấn đề con người',
            subtitle: 'Giao tiếp, quản lý nhóm',
          },
          {
            icon: '📊',
            title: 'Vấn đề dữ liệu',
            subtitle: 'Phân tích, tìm insight',
          },
        ],
        feedback: [
          'Bạn phù hợp với Software Engineering và System Design.',
          'Bạn phù hợp với UX/UI Design và Product Design.',
          'Bạn phù hợp với Product Management và HR roles.',
          'Bạn phù hợp với Data Science và Analytics roles.',
        ],
      },
      {
        text: 'Phong cách học tập của bạn là:',
        options: [
          {
            icon: '🛠️',
            title: 'Học bằng thực hành',
            subtitle: 'Làm project thực tế ngay',
          },
          {
            icon: '📚',
            title: 'Học bằng đọc',
            subtitle: 'Sách và tài liệu chuyên sâu',
          },
          {
            icon: '🎥',
            title: 'Học bằng xem',
            subtitle: 'Video tutorial và demo',
          },
          {
            icon: '👥',
            title: 'Học bằng thảo luận',
            subtitle: 'Mentoring và làm việc nhóm',
          },
        ],
        feedback: [
          'Learning by doing - phong cách rất hiệu quả cho Developer roles.',
          'Learning by reading - phù hợp với Research và Architecture roles.',
          'Learning by watching - phù hợp với creative và visual roles.',
          'Learning by discussing - phù hợp với collaborative và leadership roles.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Sở thích & Động lực',
    icon: '❤️',
    questions: [
      {
        text: 'Điều gì khiến bạn hứng thú nhất trong công việc?',
        options: [
          {
            icon: '🧩',
            title: 'Giải quyết vấn đề kỹ thuật',
            subtitle: 'Tìm ra giải pháp cho thử thách phức tạp',
          },
          {
            icon: '🌟',
            title: 'Tạo sản phẩm mới',
            subtitle: 'Xây dựng thứ chưa từng có',
          },
          {
            icon: '🤝',
            title: 'Giúp đỡ người khác',
            subtitle: 'Làm việc với con người, tạo impact',
          },
          {
            icon: '📈',
            title: 'Phân tích dữ liệu',
            subtitle: 'Tìm insight từ số liệu',
          },
        ],
        feedback: [
          'Technical problem-solving là đam mê của bạn. Engineering roles phù hợp.',
          'Product creation là động lực của bạn. Product và Design roles phù hợp.',
          'People-oriented work là thế mạnh của bạn. Management và HR roles phù hợp.',
          'Data analysis là sở thích của bạn. Data roles phù hợp.',
        ],
      },
      {
        text: 'Trong thời gian rảnh, bạn thích làm gì?',
        options: [
          {
            icon: '🔬',
            title: 'Tìm hiểu công nghệ',
            subtitle: 'Làm pet project, thử tech mới',
          },
          {
            icon: '🎨',
            title: 'Sáng tạo nội dung',
            subtitle: 'Thiết kế, vẽ, làm content',
          },
          {
            icon: '✍️',
            title: 'Chia sẻ kiến thức',
            subtitle: 'Đọc sách, viết blog, dạy học',
          },
          {
            icon: '🎮',
            title: 'Giải trí thư giãn',
            subtitle: 'Chơi game, xem phim, nghỉ ngơi',
          },
        ],
        feedback: [
          'Tech enthusiast - bạn phù hợp với technical roles đòi hỏi continuous learning.',
          'Creative soul - bạn phù hợp với design và creative roles.',
          'Knowledge sharer - bạn phù hợp với teaching, writing và community roles.',
          'Work-life balance - bạn phù hợp với stable và balanced work environment.',
        ],
      },
      {
        text: 'Động lực làm việc lớn nhất của bạn là:',
        options: [
          {
            icon: '💰',
            title: 'Thu nhập cao',
            subtitle: 'Lương tốt, phúc lợi đầy đủ',
          },
          {
            icon: '📈',
            title: 'Học hỏi phát triển',
            subtitle: 'Tăng kỹ năng liên tục',
          },
          {
            icon: '🌍',
            title: 'Ảnh hưởng xã hội',
            subtitle: 'Tạo giá trị cho cộng đồng',
          },
          {
            icon: '🏆',
            title: 'Công nhận thăng tiến',
            subtitle: 'Thấy được sự tiến bộ rõ ràng',
          },
        ],
        feedback: [
          'Financial motivation - quan trọng là chọn company và negotiation tốt.',
          'Learning motivation - startup và fast-growing company phù hợp với bạn.',
          'Social impact motivation - non-profit và social enterprise phù hợp.',
          'Career growth motivation - corporate ladder và clear career path phù hợp.',
        ],
      },
      {
        text: 'Bạn cảm thấy thành công khi:',
        options: [
          {
            icon: '🏛️',
            title: 'Xây hệ thống tốt',
            subtitle: 'Hệ thống hoạt động ổn định',
          },
          {
            icon: '🚀',
            title: 'Sản phẩm thành công',
            subtitle: 'Nhiều người dùng và yêu thích',
          },
          {
            icon: '🤝',
            title: 'Giúp đỡ team',
            subtitle: 'Hỗ trợ đồng nghiệp tiến bộ',
          },
          {
            icon: '🎯',
            title: 'Đạt mục tiêu',
            subtitle: 'Hoàn thành KPI đề ra',
          },
        ],
        feedback: [
          'System builder mindset - Backend và Infrastructure roles phù hợp.',
          'Product builder mindset - Product và Frontend roles phù hợp.',
          'Team supporter mindset - Leadership và Mentoring roles phù hợp.',
          'Goal achiever mindset - Performance-driven roles phù hợp.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Kỹ năng & Kinh nghiệm',
    icon: '⚙️',
    questions: [
      {
        text: 'Bạn tự đánh giá kỹ năng lập trình của mình:',
        options: [
          {
            icon: '🌱',
            title: 'Mới bắt đầu',
            subtitle: 'Đang học các khái niệm cơ bản',
          },
          {
            icon: '🌿',
            title: 'Trung bình',
            subtitle: 'Có thể làm project đơn giản',
          },
          {
            icon: '🌳',
            title: 'Khá tốt',
            subtitle: 'Xử lý được project phức tạp',
          },
          { icon: '🌲', title: 'Giỏi', subtitle: 'Có kinh nghiệm nhiều năm' },
        ],
        feedback: [
          'Beginner level - focus on fundamentals và build portfolio.',
          'Intermediate level - ready for junior roles và real projects.',
          'Advanced level - ready for mid-level và complex challenges.',
          'Expert level - ready for senior roles và leadership positions.',
        ],
      },
      {
        text: 'Bạn đã làm việc với công nghệ nào?',
        options: [
          {
            icon: '🎨',
            title: 'Frontend',
            subtitle: 'HTML, CSS, JavaScript, React',
          },
          {
            icon: '⚙️',
            title: 'Backend',
            subtitle: 'Java, Python, Node.js, API',
          },
          {
            icon: '🗄️',
            title: 'Database',
            subtitle: 'SQL, NoSQL, Data modeling',
          },
          {
            icon: '🌟',
            title: 'Mới hoàn toàn',
            subtitle: 'Chưa có kinh nghiệm thực tế',
          },
        ],
        feedback: [
          'Frontend experience - strengthen this và explore full-stack.',
          'Backend experience - great foundation for scalable systems.',
          'Database experience - critical skill cho mọi technical roles.',
          'No experience yet - đây là cơ hội để bắt đầu journey của bạn!',
        ],
      },
      {
        text: 'Điểm mạnh kỹ thuật của bạn là:',
        options: [
          {
            icon: '🧩',
            title: 'Logic và thuật toán',
            subtitle: 'Giải quyết vấn đề có cấu trúc',
          },
          {
            icon: '🎨',
            title: 'Design và UI/UX',
            subtitle: 'Thiết kế giao diện đẹp',
          },
          {
            icon: '📀',
            title: 'Database và dữ liệu',
            subtitle: 'Quản lý và phân tích data',
          },
          {
            icon: '🌐',
            title: 'Networking và hệ thống',
            subtitle: 'Hạ tầng và DevOps',
          },
        ],
        feedback: [
          'Algorithms strength - competitive programming và problem solving roles phù hợp.',
          'Design strength - Frontend và UX roles phù hợp.',
          'Data strength - Backend và Data roles phù hợp.',
          'Systems strength - DevOps và Infrastructure roles phù hợp.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Định hướng Tương lai',
    icon: '🎯',
    questions: [
      {
        text: 'Trong 2-3 năm tới, bạn muốn trở thành:',
        options: [
          {
            icon: '👨‍💻',
            title: 'Senior Developer',
            subtitle: 'Chuyên gia kỹ thuật sâu',
          },
          {
            icon: '👑',
            title: 'Tech Lead/Architect',
            subtitle: 'Lãnh đạo kỹ thuật team',
          },
          {
            icon: '💼',
            title: 'Product Manager',
            subtitle: 'Quản lý sản phẩm',
          },
          {
            icon: '🚀',
            title: 'Entrepreneur',
            subtitle: 'Xây dựng startup riêng',
          },
        ],
        feedback: [
          'Individual contributor path - focus on technical depth.',
          'Technical leadership path - develop both technical và people skills.',
          'Product leadership path - focus on business và user perspective.',
          'Entrepreneurship path - build product sense và business skills.',
        ],
      },
      {
        text: 'Bạn sẵn sàng đầu tư bao nhiêu thời gian để học mỗi ngày?',
        options: [
          {
            icon: '⏰',
            title: '1-2 giờ/ngày',
            subtitle: 'Học kết hợp với công việc',
          },
          {
            icon: '⏱️',
            title: '2-4 giờ/ngày',
            subtitle: 'Học nghêm túc, kiên trì',
          },
          { icon: '⏲️', title: '4-6 giờ/ngày', subtitle: 'Học chuyên sâu' },
          {
            icon: '🔥',
            title: 'Full-time (8+ giờ)',
            subtitle: 'Chế độ bootcamp tốc độ',
          },
        ],
        feedback: [
          'Part-time learning - kết hợp với công việc, cần lộ trình dài hạn.',
          'Serious learning - có thể chuyển đổi nghề trong 6-9 tháng.',
          'Intensive learning - có thể chuyển đổi nghề trong 3-6 tháng.',
          'Bootcamp mode - có thể chuyển đổi nghề trong 2-3 tháng.',
        ],
      },
      {
        text: 'Mục tiêu nghề nghiệp quan trọng nhất của bạn:',
        options: [
          {
            icon: '🏛️',
            title: 'Công việc ổn định',
            subtitle: 'Thu nhập tốt, an toàn',
          },
          {
            icon: '🎓',
            title: 'Trở thành chuyên gia',
            subtitle: 'Chuyên sâu trong lĩnh vực',
          },
          {
            icon: '🏭',
            title: 'Xây sản phẩm riêng',
            subtitle: 'Startup hoặc product của bản thân',
          },
          {
            icon: '🌎',
            title: 'Công ty lớn/quốc tế',
            subtitle: 'Làm việc tại Big Tech',
          },
        ],
        feedback: [
          'Stability focus - corporate hoặc stable startups phù hợp.',
          'Expertise focus - specialized roles và deep technical work phù hợp.',
          'Builder focus - product roles hoặc entrepreneurship phù hợp.',
          'Big company focus - prepare for interview process và build strong foundation.',
        ],
      },
      {
        text: 'Bạn sẵn sàng di chuyển/remote work?',
        options: [
          {
            icon: '🏡',
            title: 'Chỉ làm local',
            subtitle: 'Nhà gần, không muốn di chuyển',
          },
          {
            icon: '💻',
            title: 'Sẵn sàng remote',
            subtitle: 'Làm việc từ xa linh hoạt',
          },
          {
            icon: '✈️',
            title: 'Di chuyển trong nước',
            subtitle: 'Chấp nhận relocate Việt Nam',
          },
          {
            icon: '🌏',
            title: 'Đi nước ngoài',
            subtitle: 'Sẵn sàng cơ hội quốc tế',
          },
        ],
        feedback: [
          'Local focus - tận dụng cơ hội và network local.',
          'Remote ready - mở rộng cơ hội với remote-first companies.',
          'Flexible within country - nhiều cơ hội hơn với top companies.',
          'Global mindset - unlimited opportunities với international companies.',
        ],
      },
    ],
  },
];

// Utility Functions
function getQuestionKey(stepIndex, questionIndex) {
  return `step${stepIndex}_q${questionIndex}`;
}

function calculateStepScore(stepIndex) {
  const step = steps[stepIndex];
  let score = 0;
  step.questions.forEach((q, idx) => {
    const key = getQuestionKey(stepIndex, idx);
    if (state.selectedAnswers[key] !== undefined) {
      score += Math.floor(Math.random() * 20) + 70; // Fake score 70-90 per question
    }
  });
  return Math.floor(score / step.questions.length);
}

// Render Functions
function renderProgressHeader() {
  const currentStep = steps[state.stepIndex];
  const totalQuestions = currentStep.questions.length;
  const answeredQuestions = currentStep.questions.filter((q, i) => {
    const key = getQuestionKey(state.stepIndex, i);
    return state.selectedAnswers[key] !== undefined;
  }).length;

  // Compact progress text
  const progressHtml = `
    <span class="font-semibold">Phần ${state.stepIndex + 1}/${
    steps.length
  }</span>
    <span class="opacity-75 mx-2">|</span>
    <span>${currentStep.icon} ${currentStep.title}</span>
  `;
  document.getElementById('progress-compact').innerHTML = progressHtml;

  // Question Pills in header center
  const pillsHtml = currentStep.questions
    .map((q, qIdx) => {
      const key = getQuestionKey(state.stepIndex, qIdx);
      const isAnswered = state.selectedAnswers[key] !== undefined;
      const isCurrent = qIdx === state.questionIndex;

      return `
        <button
          onclick="jumpToQuestion(${qIdx})"
          class="pill-question w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200"
          style="
            ${
              isAnswered
                ? 'background-color: #10b981; color: white; border: 2px solid #10b981;'
                : isCurrent
                ? 'background-color: #f15a29; color: white; border: 2px solid #f15a29; box-shadow: 0 0 0 4px rgba(241,90,41,0.3);'
                : 'background-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); border: 2px solid rgba(255,255,255,0.3);'
            }
            cursor: pointer;
          "
          title="Câu ${qIdx + 1}"
        >
          ${isAnswered ? '✓' : qIdx + 1}
        </button>
      `;
    })
    .join('');

  document.getElementById('question-pills').innerHTML = pillsHtml;
}

function renderSidebar() {
  // Calculate answered questions for current step
  const currentStep = steps[state.stepIndex];
  const totalQuestions = currentStep.questions.length;
  const answeredQuestions = currentStep.questions.filter((q, i) => {
    const key = getQuestionKey(state.stepIndex, i);
    return state.selectedAnswers[key] !== undefined;
  }).length;

  // Vertical Steps List with integrated progress for current step
  const stepsListHtml = `
    <div class="mb-6">
      <div class="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wide">Các bước</div>
      <div class="space-y-2">
        ${steps
          .map((s, i) => {
            const isActive = i === state.stepIndex;
            const isCompleted = i < state.stepIndex;
            const showProgress = isActive || isCompleted;

            return `
            <div class="rounded-lg transition-all" style="${
              isActive
                ? 'background-color: rgba(39,40,130,0.08); border-left: 4px solid #f15a29; padding: 12px 12px 12px 12px;'
                : 'padding: 12px 16px;'
            }">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style="${
                  isCompleted
                    ? 'background-color: #10b981; color: white; border: 2px solid #10b981;'
                    : isActive
                    ? 'background-color: #f15a29; color: white; border: 2px solid #f15a29;'
                    : 'background-color: white; color: #666; border: 2px solid #D1D1D1;'
                }">
                  <span class="text-sm font-bold">${
                    isCompleted ? '✓' : i + 1
                  }</span>
                </div>
                <div class="flex-1">
                  <div class="text-xs" style="color: ${
                    isActive ? '#272882' : '#999'
                  };">Phần ${i + 1}</div>
                  <div class="text-sm font-semibold" style="color: ${
                    isActive ? '#272882' : isCompleted ? '#10b981' : '#666'
                  };">
                    ${s.title}
                  </div>
                </div>
              </div>
              ${
                showProgress
                  ? `
              <div class="ml-11">
                <div class="bg-white rounded-full h-2 mb-2">
                  <div class="h-2 rounded-full transition-all duration-300" style="width: ${
                    isCompleted
                      ? '100'
                      : Math.round((answeredQuestions / totalQuestions) * 100)
                  }%; background-color: ${
                      isCompleted ? '#10b981' : '#f15a29'
                    };"></div>
                </div>
                <div class="text-xs text-gray-600 text-center">
                  ${
                    isCompleted
                      ? `${s.questions.length}/${s.questions.length} câu hỏi`
                      : `${answeredQuestions}/${totalQuestions} câu hỏi`
                  }
                </div>
              </div>
              `
                  : ''
              }
            </div>
          `;
          })
          .join('')}
      </div>
    </div>
  `;

  document.getElementById('sidebar').innerHTML = stepsListHtml;
}

// Jump to step function (only if not locked)
function jumpToStep(stepIdx) {
  if (stepIdx <= state.stepIndex) {
    state.stepIndex = stepIdx;
    state.questionIndex = 0;
    render();
  }
}

// Jump to specific question in current step
function jumpToQuestion(questionIdx) {
  state.questionIndex = questionIdx;
  render();
}

function renderQuestion() {
  const step = steps[state.stepIndex];
  const question = step.questions[state.questionIndex];
  const questionKey = getQuestionKey(state.stepIndex, state.questionIndex);
  const selectedAnswer = state.selectedAnswers[questionKey];

  const html = `
    <div class="fade-in">
      <div class="mb-8">
        <div class="text-sm text-gray-500 mb-2">
          Câu ${state.questionIndex + 1}/${step.questions.length}
        </div>
        <h2 class="text-2xl font-bold mb-6" style="color: #272882;">${
          question.text
        }</h2>
      </div>
      
      <div class="space-y-4">
        ${question.options
          .map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isObject = typeof option === 'object';
            const icon = isObject ? option.icon : '📌';
            const title = isObject ? option.title : option;
            const subtitle = isObject ? option.subtitle : '';

            return `
            <button
              onclick="selectAnswer(${idx})"
              class="card-option w-full text-left rounded-xl transition-all duration-200"
              style="
                padding: 20px 24px;
                border: 2px solid ${isSelected ? '#272882' : '#CCCCCC'};
                background-color: ${
                  isSelected ? 'rgba(39,40,130,0.08)' : 'white'
                };
              "
              onmouseover="if (!${isSelected}) { this.style.borderColor='#272882'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'; }"
              onmouseout="if (!${isSelected}) { this.style.borderColor='#CCCCCC'; this.style.transform='translateY(0)'; this.style.boxShadow='none'; }"
              onmousedown="this.style.transform='scale(0.98)'"
              onmouseup="this.style.transform='translateY(-2px)'"
            >
              <div class="flex items-start gap-4">
                <div class="text-3xl flex-shrink-0" style="line-height: 1;">
                  ${icon}
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-lg mb-1" style="color: #272882;">
                    ${title}
                  </div>
                  ${
                    subtitle
                      ? `<div class="text-sm text-gray-600">${subtitle}</div>`
                      : ''
                  }
                </div>
                <div class="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center" style="${
                  isSelected
                    ? 'border-color: #f15a29; background-color: #f15a29;'
                    : 'border-color: #CCCCCC;'
                }">
                  ${
                    isSelected
                      ? '<span class="text-white text-xs">✓</span>'
                      : ''
                  }
                </div>
              </div>
            </button>
          `;
          })
          .join('')}
      </div>
    </div>
  `;

  document.getElementById('question-card').innerHTML = html;
}

// AI Guide Evolution Functions
function getCurrentGuide() {
  return guideLevels[state.currentLevel];
}

function getGuideGreeting() {
  const guide = getCurrentGuide();
  return guide.greetings[Math.floor(Math.random() * guide.greetings.length)];
}

function createParticles(container, count = 6) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${20 + Math.random() * 60}%`;
    particle.style.top = `${30 + Math.random() * 40}%`;
    particle.style.animationDelay = `${i * 0.2}s`;
    container.appendChild(particle);

    setTimeout(() => particle.remove(), 2000);
  }
}

async function showLevelUpModal(oldLevel, newLevel) {
  const modal = document.getElementById('level-up-modal');
  const oldGuide = guideLevels[oldLevel];
  const newGuide = guideLevels[newLevel];

  // Update modal content
  document.getElementById(
    'old-avatar'
  ).innerHTML = `<span class="text-2xl">${oldGuide.avatar}</span>`;
  document.getElementById('old-avatar').style.borderColor = oldGuide.color;

  const newAvatarEl = document.getElementById('new-avatar');
  newAvatarEl.innerHTML = `<span class="text-3xl">${newGuide.avatar}</span>`;
  newAvatarEl.style.borderColor = newGuide.color;

  if (newGuide.borderStyle === 'animated-gradient') {
    newAvatarEl.classList.add('animated-gradient-border');
  } else if (newGuide.borderStyle === 'gradient') {
    newAvatarEl.style.background = `linear-gradient(135deg, ${oldGuide.color}, ${newGuide.color})`;
  }

  document.getElementById('level-up-title').textContent = 'LEVEL UP!';
  document.getElementById(
    'level-up-subtitle'
  ).textContent = `${oldGuide.title} → ${newGuide.title}`;

  const messages = [
    'Bạn đã vượt qua giai đoạn khám phá. Sẵn sàng thử thách chưa?',
    "Pattern rõ ràng! Bạn đang tiến bộ đáng kể. Let's go deeper!",
    'Warrior spirit awakened! Mục tiêu và động lực đã rõ ràng.',
    'Wisdom unlocked! Phân tích chuyên sâu đang chờ bạn.',
    'Master level achieved! Journey thực sự bắt đầu từ đây!',
  ];

  document.getElementById('level-up-message').textContent = messages[newLevel];

  // Progress bar
  const progressWidth = ((newLevel + 1) / 5) * 100;
  document
    .getElementById('level-progress')
    .querySelector('div').style.width = `${progressWidth}%`;

  // Create particles
  const particlesContainer = document.getElementById('particles-container');
  createParticles(particlesContainer, newLevel === 4 ? 12 : 8);

  // Show modal
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  return new Promise((resolve) => {
    const continueBtn = document.getElementById('btn-level-continue');
    const handleClick = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      continueBtn.removeEventListener('click', handleClick);
      resolve();
    };
    continueBtn.addEventListener('click', handleClick);
  });
}

// AI Feedback Helper Functions
function getAvatarForContext(answerIndex, stepIndex) {
  // Use current guide level avatar
  const currentGuide = getCurrentGuide();
  return currentGuide.avatar;
}

function updateCareerMatches(answerIndex, stepIndex, questionIndex) {
  // Career match mapping based on answers
  const matchMap = {
    // Step 0: Work Style
    '0-0': [
      { backend: 15, data: 10 },
      { frontend: 15, creative: 10 },
      { leadership: 15, product: 10 },
      { backend: 10, data: 15 },
    ],
    '0-1': [
      { leadership: 15, product: 10 },
      { frontend: 15, creative: 10 },
      { leadership: 15, product: 10 },
      { backend: 15, data: 10 },
    ],
    // Step 1: Thinking
    '1-0': [
      { backend: 15, data: 15 },
      { frontend: 15, creative: 10 },
      { leadership: 10, product: 10 },
      { data: 15, backend: 10 },
    ],
    // Add more mappings as needed
  };

  const key = `${stepIndex}-${questionIndex}`;
  const matches = matchMap[key];

  if (matches && matches[answerIndex]) {
    const match = matches[answerIndex];
    Object.keys(match).forEach((career) => {
      if (state.careerMatches[career] !== undefined) {
        state.careerMatches[career] += match[career];
      }
    });
  }
}

function getContextualFeedback(answerIndex, stepIndex, questionIndex) {
  const step = steps[stepIndex];
  const question = step.questions[questionIndex];
  const baseFeedback = question.feedback[answerIndex];
  const option = question.options[answerIndex];

  // Add contextual elements
  let contextPrefix = '';
  const recentAnswers = state.answerHistory.slice(-2);

  if (recentAnswers.length >= 2) {
    // Pattern detection
    const patterns = {
      systematic: ['📋', '🎯', '🔍', '📚'],
      creative: ['⚡', '💡', '🎨', '✨'],
      social: ['👥', '🤝', '🗣️', '👨‍👩‍👧'],
    };

    const recentIcons = recentAnswers.map((a) => a.icon);

    if (recentIcons.every((icon) => patterns.systematic.includes(icon))) {
      contextPrefix = '🎯 Pattern phát hiện! Bạn có xu hướng rất có hệ thống. ';
    } else if (recentIcons.every((icon) => patterns.creative.includes(icon))) {
      contextPrefix = '✨ Thú vị! Bạn có tư duy sáng tạo nhất quán. ';
    } else if (recentIcons.every((icon) => patterns.social.includes(icon))) {
      contextPrefix = '🤝 Rõ ràng! Bạn là người hướng đến con người. ';
    }
  }

  return contextPrefix + baseFeedback;
}

function getTopCareerMatch() {
  const careers = Object.entries(state.careerMatches);
  careers.sort((a, b) => b[1] - a[1]);

  const careerNames = {
    backend: 'Backend Dev',
    frontend: 'Frontend Dev',
    fullstack: 'Full-stack Dev',
    data: 'Data Engineer',
    devops: 'DevOps',
    product: 'Product Manager',
    leadership: 'Tech Lead',
  };

  if (careers[0][1] > 0) {
    return {
      name: careerNames[careers[0][0]],
      score: careers[0][1],
      percentage: Math.min(100, Math.round((careers[0][1] / 150) * 100)),
    };
  }

  return null;
}

async function typeWriter(element, text, speed = 30) {
  element.innerHTML = '';
  let i = 0;

  return new Promise((resolve) => {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    const interval = setInterval(() => {
      if (i < text.length) {
        cursor.remove();
        element.innerHTML += text.charAt(i);
        element.appendChild(cursor);
        i++;
      } else {
        cursor.remove();
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function renderBubbleFeedback(answerIndex) {
  const step = steps[state.stepIndex];
  const question = step.questions[state.questionIndex];
  const option = question.options[answerIndex];
  const currentGuide = getCurrentGuide();

  // Update career matches
  updateCareerMatches(answerIndex, state.stepIndex, state.questionIndex);

  // Track answer history
  state.answerHistory.push({
    icon: option.icon,
    title: option.title,
    stepIndex: state.stepIndex,
    questionIndex: state.questionIndex,
  });

  // Keep only last 5 answers
  if (state.answerHistory.length > 5) {
    state.answerHistory.shift();
  }

  const bubble = document.getElementById('ai-feedback');
  const avatar = getAvatarForContext(answerIndex, state.stepIndex);
  const feedback = getContextualFeedback(
    answerIndex,
    state.stepIndex,
    state.questionIndex
  );
  const topMatch = getTopCareerMatch();

  // Determine border style based on guide level
  let borderStyle = `border: 3px ${
    currentGuide.borderStyle === 'dashed' ? 'dashed' : 'solid'
  } ${currentGuide.color};`;
  if (currentGuide.borderStyle === 'double') {
    borderStyle = `border: 4px double ${currentGuide.color};`;
  } else if (currentGuide.borderStyle === 'gradient') {
    borderStyle = `border: 3px solid transparent; background: linear-gradient(white, white) padding-box, linear-gradient(135deg, ${currentGuide.color}, #f15a29) border-box;`;
  }

  const avatarClass = currentGuide.id >= 2 ? 'avatar-glow' : '';

  // Show loading state first
  bubble.classList.remove('hidden');
  bubble.innerHTML = `
    <div class="slide-in-right">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center avatar-pulse" style="border: 3px solid #f15a29; background-color: white;">
          <span class="text-xl">🤔</span>
        </div>
        <div>
          <div class="font-semibold" style="color: #272882;">${currentGuide.name}</div>
          <div class="text-xs text-gray-500">Đang phân tích...</div>
        </div>
      </div>
      <div class="rounded-lg p-4" style="background-color: white;">
        <p class="text-sm" style="color: #999;">
          <span class="typing-cursor"></span>
        </p>
      </div>
    </div>
  `;

  // Wait a bit for thinking effect
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Update avatar and start typing
  bubble.innerHTML = `
    <div class="slide-in-right">
      <div class="flex items-center gap-2 mb-3">
        <div class="rounded-full flex items-center justify-center ${avatarClass}" style="width: ${
    currentGuide.size
  }px; height: ${currentGuide.size}px; ${borderStyle} background-color: white;">
          <span class="text-xl">${avatar}</span>
        </div>
        <div>
          <div class="font-semibold" style="color: #272882;">${
            currentGuide.name
          }</div>
          <div class="text-xs" style="color: ${currentGuide.color};">Level ${
    currentGuide.id + 1
  }: ${currentGuide.title}</div>
        </div>
      </div>
      <div class="rounded-lg p-4 mb-3" style="background-color: white;">
        <p id="feedback-text" class="text-sm leading-relaxed" style="color: #272882;"></p>
      </div>
      ${
        topMatch
          ? `
      <div class="rounded-lg p-3 badge-bounce" style="background: linear-gradient(135deg, rgba(39,40,130,0.1) 0%, rgba(241,90,41,0.1) 100%); border-left: 3px solid #f15a29;">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-semibold" style="color: #272882;">Top Match</span>
          <span class="text-xs font-bold" style="color: #f15a29;">+${topMatch.score}</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex-1">
            <div class="text-sm font-semibold" style="color: #272882;">${topMatch.name}</div>
            <div class="bg-white rounded-full h-1.5 mt-1">
              <div class="h-1.5 rounded-full transition-all duration-500" style="width: ${topMatch.percentage}%; background-color: #f15a29;"></div>
            </div>
          </div>
          <span class="text-lg">🎯</span>
        </div>
      </div>
      `
          : ''
      }
    </div>
  `;

  // Type the feedback text
  const feedbackElement = document.getElementById('feedback-text');
  await typeWriter(feedbackElement, feedback, 20);
}

function showStepSummary() {
  const step = steps[state.stepIndex];
  const score = calculateStepScore(state.stepIndex);
  state.stepScores[state.stepIndex] = score;

  const modal = document.getElementById('step-summary-modal');
  document.getElementById(
    'summary-title'
  ).textContent = `Hoàn thành ${step.title}`;
  document.getElementById('summary-score').textContent = `${score}/100`;

  const feedbackTexts = [
    'Bạn có xu hướng tư duy logic và có hệ thống. Điều này rất phù hợp với các vai trò Backend Developer và Data Engineer.',
    'Bạn có khả năng giải quyết vấn đề một cách sáng tạo và linh hoạt. Điều này phù hợp với Product và Design roles.',
    'Bạn có động lực học hỏi mạnh mẽ và đam mê công nghệ. Điều này là nền tảng tuyệt vời cho sự nghiệp trong lĩnh vực tech.',
    'Bạn có kỹ năng kỹ thuật vững chắc và sẵn sàng đối mặt với thử thách. Điều này phù hợp với Engineering roles.',
    'Bạn có tầm nhìn rõ ràng và quyết tâm cao. Điều này sẽ giúp bạn đạt được mục tiêu nghề nghiệp.',
  ];

  document.getElementById('summary-feedback').textContent =
    feedbackTexts[state.stepIndex];

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function showFinalResult() {
  const totalScore = state.stepScores.reduce((sum, score) => sum + score, 0);
  document.getElementById('final-score').textContent = `${totalScore}/500`;

  const finalScreen = document.getElementById('final-result');
  finalScreen.classList.remove('hidden');

  // Confetti effect (simple version)
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}

// Navigation Functions
async function selectAnswer(answerIndex) {
  const questionKey = getQuestionKey(state.stepIndex, state.questionIndex);
  state.selectedAnswers[questionKey] = answerIndex;

  renderQuestion();
  await renderBubbleFeedback(answerIndex);

  // Enable Next button after feedback is shown
  document.getElementById('btn-next').disabled = false;
}

function nextQuestion() {
  const step = steps[state.stepIndex];

  // Check if current question is answered
  const questionKey = getQuestionKey(state.stepIndex, state.questionIndex);
  if (state.selectedAnswers[questionKey] === undefined) {
    alert('Vui lòng chọn một câu trả lời trước khi tiếp tục');
    return;
  }

  // Move to next question or step
  if (state.questionIndex < step.questions.length - 1) {
    state.questionIndex++;
    render();
  } else {
    // End of step
    showStepSummary();
  }
}

function prevQuestion() {
  if (state.questionIndex > 0) {
    state.questionIndex--;
  } else if (state.stepIndex > 0) {
    state.stepIndex--;
    state.questionIndex = steps[state.stepIndex].questions.length - 1;
  }
  render();
}

async function continueToNextStep() {
  const modal = document.getElementById('step-summary-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');

  if (state.stepIndex < steps.length - 1) {
    const oldLevel = state.currentLevel;
    state.stepIndex++;
    state.questionIndex = 0;

    // Level up AI Guide
    if (state.stepIndex <= 4) {
      const newLevel = state.stepIndex;
      if (newLevel > oldLevel) {
        state.currentLevel = newLevel;
        await showLevelUpModal(oldLevel, newLevel);
      }
    }

    render();
  } else {
    // Show final result
    showFinalResult();
  }
}

// Main Render Function
function render() {
  renderProgressHeader();
  renderSidebar();
  renderQuestion();

  // Update navigation buttons
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  btnPrev.disabled = state.stepIndex === 0 && state.questionIndex === 0;

  const questionKey = getQuestionKey(state.stepIndex, state.questionIndex);
  btnNext.disabled = state.selectedAnswers[questionKey] === undefined;

  // Hide AI feedback initially
  document.getElementById('ai-feedback').classList.add('hidden');
}

// Tour Guide Functions
function startTour() {
  const overlay = document.getElementById('tour-guide-overlay');
  overlay.classList.add('fade-out');

  // Hide after animation completes
  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.classList.remove('fade-out');
  }, 300);
}

// Event Listeners
document.getElementById('btn-prev').addEventListener('click', prevQuestion);
document.getElementById('btn-next').addEventListener('click', nextQuestion);
document
  .getElementById('btn-continue-step')
  .addEventListener('click', continueToNextStep);
document.getElementById('btn-start-tour').addEventListener('click', startTour);

// Initialize
render();
