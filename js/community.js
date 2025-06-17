 // 示例数据 - 故事
 const storiesData = [
    {
        id: 1,
        username: '海洋摄影师',
        avatar: '📷',
        time: '2小时前',
        badge: '热门',
        title: '与海豚的奇妙邂逅',
        content: '今天在水族馆的海豚表演区，我遇到了一只特别友好的海豚。它似乎对我的相机很感兴趣，一直游到玻璃前面看着我。当我举起相机的时候，它竟然做出了一个完美的跳跃动作，就像是在为我表演一样！这一刻让我深深感受到了海洋生物的智慧和灵性。',
        images: ['🐬', '📸', '🌊'],
        likes: 156,
        comments: 23,
        shares: 12,
        liked: false,
        commentsList: [
            { username: '海洋爱好者', avatar: '🌊', text: '太棒了！海豚真的很聪明呢！', time: '1小时前' },
            { username: '摄影达人', avatar: '📷', text: '这张照片拍得真好，能分享一下拍摄技巧吗？', time: '30分钟前' }
        ]
    },
    {
        id: 2,
        username: '小小探险家',
        avatar: '👶',
        time: '5小时前',
        badge: '新人',
        title: '第一次看到活珊瑚',
        content: '这是我第一次来水族馆，珊瑚区真的太美了！各种颜色的珊瑚在灯光下闪闪发光，就像童话世界一样。我学到了很多关于珊瑚保护的知识，原来珊瑚对海洋生态这么重要。我决定要好好保护环境，让这些美丽的生物能够继续生存下去。',
        images: ['🪸', '🐠', '🌈'],
        likes: 89,
        comments: 15,
        shares: 8,
        liked: true,
        commentsList: [
            { username: '环保志愿者', avatar: '🌱', text: '小朋友的环保意识真棒！', time: '3小时前' }
        ]
    },
    {
        id: 3,
        username: '深海探索者',
        avatar: '🤿',
        time: '1天前',
        badge: '专家',
        title: '鲨鱼并不可怕',
        content: '很多人对鲨鱼有误解，认为它们很危险。但是在水族馆的鲨鱼隧道里，我看到了鲨鱼优雅游泳的样子，它们其实很温和。工作人员告诉我，鲨鱼是海洋生态系统的重要组成部分，我们应该保护它们而不是害怕它们。',
        images: ['🦈', '🌊'],
        likes: 234,
        comments: 45,
        shares: 28,
        liked: false,
        commentsList: [
            { username: '海洋生物学家', avatar: '🔬', text: '说得很对！鲨鱼是海洋的守护者。', time: '12小时前' },
            { username: '潜水爱好者', avatar: '🤿', text: '我在野外也遇到过鲨鱼，它们确实很温和。', time: '8小时前' }
        ]
    }
];

// 示例数据 - 热门故事
const hotStoriesData = [
    { title: '夜宿水族馆的神奇体验', likes: 456, comments: 78 },
    { title: '海龟宝宝的成长日记', likes: 389, comments: 56 },
    { title: '水母的优雅舞蹈', likes: 312, comments: 42 },
    { title: '与鲸鱼的心灵对话', likes: 298, comments: 67 },
    { title: '珊瑚礁的色彩世界', likes: 267, comments: 34 }
];

// 示例数据 - 活动
const eventsData = [
    {
        date: '3月25日',
        title: '海洋摄影大赛',
        description: '分享你最美的海洋照片，赢取丰厚奖品！'
    },
    {
        date: '4月1日',
        title: '地球日环保活动',
        description: '参与海洋保护倡议，为地球贡献一份力量。'
    },
    {
        date: '4月15日',
        title: '亲子海洋知识竞赛',
        description: '家长和孩子一起学习海洋知识，增进亲子关系。'
    }
];

// 示例数据 - 贡献者
const contributorsData = [
    { username: '海洋摄影师', avatar: '📷', stories: 15, likes: 1250 },
    { username: '深海探索者', avatar: '🤿', stories: 12, likes: 980 },
    { username: '珊瑚守护者', avatar: '🪸', stories: 10, likes: 756 },
    { username: '海豚训练师', avatar: '🐬', stories: 8, likes: 634 }
];

// 初始化页面
function initializePage() {
    populateStories();
    populateHotStories();
    populateEvents();
    populateContributors();
    setupScrollAnimations();
}

// 填充故事
function populateStories() {
    const container = document.getElementById('storyFeed');
    container.innerHTML = '';
    
    storiesData.forEach((story, index) => {
        const storyElement = createStoryElement(story, index);
        container.appendChild(storyElement);
    });
}

// 创建故事元素
function createStoryElement(story, index) {
    const storyDiv = document.createElement('div');
    storyDiv.className = 'story-card';
    storyDiv.style.animationDelay = `${index * 0.1}s`;
    
    const imagesHtml = story.images.map(img => `<div class="story-image">${img}</div>`).join('');
    const commentsHtml = story.commentsList.map(comment => `
        <div class="comment-item">
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-content">
                <div class="comment-username">${comment.username}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-time">${comment.time}</div>
            </div>
        </div>
    `).join('');
    
    storyDiv.innerHTML = `
        <div class="story-header">
            <div class="story-avatar">${story.avatar}</div>
            <div class="story-user-info">
                <div class="story-username">${story.username}</div>
                <div class="story-time">${story.time}</div>
            </div>
            <div class="story-badge">${story.badge}</div>
        </div>
        <h3 class="story-title">${story.title}</h3>
        <p class="story-content">${story.content}</p>
        <div class="story-images">${imagesHtml}</div>
        <div class="story-actions">
            <div class="action-buttons">
                <button class="action-btn ${story.liked ? 'active' : ''}" onclick="toggleLike(${story.id})">
                    ❤️ ${story.likes}
                </button>
                <button class="action-btn" onclick="toggleComments(${story.id})">
                    💬 ${story.comments}
                </button>
                <button class="action-btn" onclick="shareStory(${story.id})">
                    📤 ${story.shares}
                </button>
            </div>
            <div class="story-stats">
                ${story.likes + story.comments + story.shares} 次互动
            </div>
        </div>
        <div class="comments-section" id="comments-${story.id}" style="display: none;">
            <div class="comment-form">
                <input type="text" class="comment-input" placeholder="写下你的评论..." id="commentInput-${story.id}">
                <button class="comment-submit" onclick="addComment(${story.id})">发送</button>
            </div>
            <div class="comments-list">${commentsHtml}</div>
        </div>
    `;
    
    return storyDiv;
}

// 填充热门故事
function populateHotStories() {
    const container = document.getElementById('hotStories');
    container.innerHTML = '';
    
    hotStoriesData.forEach(story => {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'hot-story';
        storyDiv.innerHTML = `
            <div class="hot-story-title">${story.title}</div>
            <div class="hot-story-stats">${story.likes} 点赞 · ${story.comments} 评论</div>
        `;
        storyDiv.addEventListener('click', () => {
            alert(`📖 ${story.title}\n\n❤️ ${story.likes} 点赞\n💬 ${story.comments} 评论\n\n正在跳转到故事详情页面...`);
        });
        container.appendChild(storyDiv);
    });
}

// 填充活动
function populateEvents() {
    const container = document.getElementById('communityEvents');
    container.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.innerHTML = `
            <div class="event-date">${event.date}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
        `;
        container.appendChild(eventDiv);
    });
}

// 填充贡献者
function populateContributors() {
    const container = document.getElementById('topContributors');
    container.innerHTML = '';
    
    contributorsData.forEach((contributor, index) => {
        const contributorDiv = document.createElement('div');
        contributorDiv.className = 'hot-story';
        contributorDiv.innerHTML = `
            <div class="hot-story-title">${index + 1}. ${contributor.username} ${contributor.avatar}</div>
            <div class="hot-story-stats">${contributor.stories} 故事 · ${contributor.likes} 点赞</div>
        `;
        container.appendChild(contributorDiv);
    });
}

// 设置滚动动画
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// 交互功能
function submitStory() {
    const title = document.getElementById('storyTitle').value;
    const content = document.getElementById('storyContent').value;
    const images = document.getElementById('storyImages').files;
    
    if (!title || !content) {
        alert('请填写故事标题和内容！');
        return;
    }
    
    alert(`📝 故事发布成功！\n\n标题：${title}\n内容：${content.substring(0, 50)}...\n图片：${images.length} 张\n\n感谢您的分享！您的故事将在审核后显示在社区中。`);
    
    // 清空表单
    document.getElementById('storyTitle').value = '';
    document.getElementById('storyContent').value = '';
    document.getElementById('storyImages').value = '';
}

function toggleLike(storyId) {
    const story = storiesData.find(s => s.id === storyId);
    if (story) {
        story.liked = !story.liked;
        story.likes += story.liked ? 1 : -1;
        populateStories();
        
        const message = story.liked ? '❤️ 点赞成功！' : '💔 取消点赞';
        showNotification(message);
    }
}

function toggleComments(storyId) {
    const commentsSection = document.getElementById(`comments-${storyId}`);
    const isVisible = commentsSection.style.display !== 'none';
    commentsSection.style.display = isVisible ? 'none' : 'block';
}

function addComment(storyId) {
    const input = document.getElementById(`commentInput-${storyId}`);
    const commentText = input.value.trim();
    
    if (!commentText) {
        alert('请输入评论内容！');
        return;
    }
    
    const story = storiesData.find(s => s.id === storyId);
    if (story) {
        story.commentsList.unshift({
            username: '海洋探索者',
            avatar: '🌊',
            text: commentText,
            time: '刚刚'
        });
        story.comments++;
        populateStories();
        showNotification('💬 评论发表成功！');
    }
}

function shareStory(storyId) {
    const story = storiesData.find(s => s.id === storyId);
    if (story) {
        story.shares++;
        populateStories();
        alert(`📤 分享成功！\n\n故事《${story.title}》已分享到您的社交媒体。\n\n感谢您帮助传播海洋保护的理念！`);
    }
}

function viewPhoto(type) {
    const photoInfo = {
        dolphin: { title: '海豚的微笑', description: '这只海豚总是对游客露出友好的微笑' },
        turtle: { title: '海龟的悠闲时光', description: '百岁海龟在珊瑚礁间慢慢游弋' },
        shark: { title: '鲨鱼的优雅身姿', description: '鲨鱼在水中展现出令人惊叹的优雅' },
        coral: { title: '珊瑚的绚烂色彩', description: '在特殊灯光下，珊瑚展现出梦幻般的色彩' }
    };
    
    const info = photoInfo[type];
    document.getElementById('modalBody').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${type === 'dolphin' ? '🐬' : type === 'turtle' ? '🐢' : type === 'shark' ? '🦈' : '🪸'}</div>
            <h3 style="color: var(--dark-blue); margin-bottom: 1rem;">${info.title}</h3>
            <p style="color: #555;">${info.description}</p>
        </div>
    `;
    document.getElementById('imageModal').classList.add('show');
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('show');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-blue);
        color: var(--white);
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 初始化 AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initializePage);

// 导航栏滚动效果
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 添加滑入动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// 点击模态框外部关闭
document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target.id === 'imageModal') {
        closeModal();
    }
});

// 文件上传预览
document.getElementById('storyImages').addEventListener('change', function(e) {
    const files = e.target.files;
    const label = document.querySelector('.file-upload-label');
    
    if (files.length > 0) {
        label.textContent = `📸 已选择 ${files.length} 张图片`;
        label.style.color = 'var(--primary-color)';
        label.style.borderColor = 'var(--primary-color)';
    } else {
        label.textContent = '📸 点击上传照片 (支持多张图片)';
        label.style.color = '#555';
        label.style.borderColor = 'rgba(0, 119, 182, 0.5)';
    }
});