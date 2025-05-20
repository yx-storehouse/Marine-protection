   // 导航栏滚动效果
   window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 移动端菜单
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    if (mobileMenu.classList.contains('active')) {
        mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // 关闭移动端菜单
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// 年龄分类标签页切换
const ageTabs = document.querySelectorAll('.age-tab');
const ageContents = document.querySelectorAll('.age-content');

ageTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        const ageId = this.getAttribute('data-age');

        ageTabs.forEach(tab => tab.classList.remove('active'));
        ageContents.forEach(content => content.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(ageId + '-content').classList.add('active');
    });
});

// 视频播放按钮
const videoPlayBtn = document.getElementById('children-video-play');
if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', function () {
        alert('视频播放功能将在实际环境中启用');
    });
}

// 科普问答功能
const quizQuestions = document.querySelectorAll('.quiz-question');
const quizOptions = document.querySelectorAll('.quiz-option');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const quizResult = document.getElementById('quiz-result');
const restartQuizBtn = document.getElementById('restart-quiz');

let currentQuestion = 0;
let score = 0;
const correctAnswers = ['C', 'C', 'B', 'A'];

// 初始化进度条
progressBar.style.width = `${(currentQuestion + 1) / quizQuestions.length * 100}%`;

// 选项点击事件
quizOptions.forEach(option => {
    option.addEventListener('click', function () {
        const questionIndex = Math.floor(Array.from(quizOptions).indexOf(this) / 4);// 获取当前问题的索引
        const currentQuestionElement = document.getElementById(`question-${questionIndex + 1}`); // 获取当前问题的DOM元素
        const feedbackElement = document.getElementById(`feedback-${questionIndex + 1}`); // 获取当前问题的反馈元素
        // 移除之前的选择
        currentQuestionElement.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.classList.remove('correct');
            opt.classList.remove('incorrect');
        });
        // 添加当前选择
        this.classList.add('selected');
        // 检查答案
        const selectedAnswer = this.getAttribute('data-answer');// 获取用户选择的答案
        const isCorrect = selectedAnswer === correctAnswers[questionIndex];// 检查用户选择的答案是否正确

        if (isCorrect) {
            this.classList.add('correct');// 标记为正确
            feedbackElement.classList.add('correct');// 显示正确反馈
            feedbackElement.classList.remove('incorrect');
            feedbackElement.innerHTML = '<i class="fas fa-check-circle"></i> 回答正确！';
            feedbackElement.style.display = 'block';
            // 更新分数（如果之前没有回答正确）
            if (!localStorage.getItem(`q${questionIndex + 1}`)) {
                localStorage.setItem(`q${questionIndex + 1}`, 'correct');
                score++;
            }
        } else {
            this.classList.add('incorrect');

            // 显示正确答案
            currentQuestionElement.querySelector(`.quiz-option[data-answer="${correctAnswers[questionIndex]}"]`).classList.add('correct');

            feedbackElement.classList.add('incorrect');
            feedbackElement.classList.remove('correct');
            feedbackElement.innerHTML = `<i class="fas fa-times-circle"></i> 回答错误！正确答案是 ${correctAnswers[questionIndex]}`;
            feedbackElement.style.display = 'block';

            // 更新分数（如果之前回答正确，现在回答错误）
            if (localStorage.getItem(`q${questionIndex + 1}`) === 'correct') {
                localStorage.setItem(`q${questionIndex + 1}`, 'incorrect');
                score--;
            }
        }
    });
});

// 下一题按钮
nextBtn.addEventListener('click', function () {
    if (currentQuestion < quizQuestions.length - 1) {
        // 隐藏当前问题
        quizQuestions[currentQuestion].style.display = 'none';

        // 显示下一个问题
        currentQuestion++;
        quizQuestions[currentQuestion].style.display = 'block';

        // 更新按钮状态
        prevBtn.style.visibility = 'visible';

        if (currentQuestion === quizQuestions.length - 1) {
            nextBtn.textContent = '完成';
        }
    } else {
        // 显示结果
        quizQuestions.forEach(question => {
            question.style.display = 'none';
        });

        // 计算最终分数
        score = 0;
        for (let i = 0; i < quizQuestions.length; i++) {
            if (localStorage.getItem(`q${i + 1}`) === 'correct') {
                score++;
            }
        }

        document.querySelector('.result-score').textContent = `${score}/${quizQuestions.length}`;
        quizResult.style.display = 'block';
        prevBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'hidden';
    }

    // 更新进度条
    progressBar.style.width = `${(currentQuestion + 1) / quizQuestions.length * 100}%`;
});

// 上一题按钮
prevBtn.addEventListener('click', function () {
    if (currentQuestion > 0) {
        // 隐藏当前问题
        quizQuestions[currentQuestion].style.display = 'none';

        // 显示上一个问题
        currentQuestion--;
        quizQuestions[currentQuestion].style.display = 'block';

        // 更新按钮状态
        nextBtn.textContent = '下一题';

        if (currentQuestion === 0) {
            prevBtn.style.visibility = 'hidden';
        }
    }

    // 更新进度条
    progressBar.style.width = `${(currentQuestion + 1) / quizQuestions.length * 100}%`;
});

// 重新开始问答
restartQuizBtn.addEventListener('click', function () {
    // 重置问题显示
    quizQuestions.forEach((question, index) => {
        question.style.display = index === 0 ? 'block' : 'none';

        // 重置选项状态
        question.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });

        // 重置反馈
        document.getElementById(`feedback-${index + 1}`).style.display = 'none';
    });

    // 重置按钮和进度条
    currentQuestion = 0;
    prevBtn.style.visibility = 'hidden';
    nextBtn.style.visibility = 'visible';
    nextBtn.textContent = '下一题';
    progressBar.style.width = `${(currentQuestion + 1) / quizQuestions.length * 100}%`;

    // 隐藏结果
    quizResult.style.display = 'none';

    // 清除本地存储
    for (let i = 1; i <= quizQuestions.length; i++) {
        localStorage.removeItem(`q${i}`);
    }

    // 重置分数
    score = 0;
});

// 创建气泡效果
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    if (!bubblesContainer) return;

    for (let i = 0; i < 50; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // 随机大小
        const size = Math.random() * 20 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // 随机位置
        bubble.style.left = `${Math.random() * 100}%`;

        // 随机动画持续时间
        const duration = Math.random() * 10 + 5;
        bubble.style.animation = `rise ${duration}s linear infinite`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        bubblesContainer.appendChild(bubble);
    }
}

// 页面加载完成后初始化
window.addEventListener('load', function () {
    // 创建气泡效果
    createBubbles();

    // 初始化问答
    for (let i = 1; i <= quizQuestions.length; i++) {
        localStorage.removeItem(`q${i}`);
    }
});