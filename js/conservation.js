   // 导航栏滚动效果
   window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('active');
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
                top: targetElement.offsetTop - 100,
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



// 数字动画
function animateStats() {
    const stats = document.querySelectorAll('.status-stat');

    stats.forEach(stat => {
        const value = parseInt(stat.getAttribute('data-value'));
        const duration = 2000; // 动画持续时间（毫秒）
        const frameRate = 60; // 每秒帧数
        const totalFrames = duration / 1000 * frameRate;
        const increment = value / totalFrames;

        let currentValue = 0;
        let frame = 0;

        const animate = () => {
            if (frame < totalFrames) {
                currentValue += increment;
                stat.textContent = Math.round(currentValue);
                frame++;
                requestAnimationFrame(animate);
            } else {
                stat.textContent = value;
            }
        };

        animate();
    });
}

// 滚动动画
function checkScroll() {
    // 威胁项目动画
    const threatItems = document.querySelectorAll('.threat-item');
    threatItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 100) {
            item.classList.add('show');
        }
    });

    // 重要性卡片动画
    const importanceCards = document.querySelectorAll('.importance-card');
    importanceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.classList.add('show');
        }
    });

    // 保护建议卡片动画
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.classList.add('show');
        }
    });

    // 志愿者机会卡片动画
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    opportunityCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.classList.add('show');
        }
    });
}

// 项目标签页
const projectTabs = document.querySelectorAll('.project-tab');
const projectContents = document.querySelectorAll('.project-content');

projectTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        projectTabs.forEach(t => t.classList.remove('active'));
        projectContents.forEach(c => c.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// 捐赠金额选择
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountInput = document.querySelector('.custom-amount');

amountBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        amountBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (this.getAttribute('data-amount') === 'custom') {
            customAmountInput.classList.add('show');
        } else {
            customAmountInput.classList.remove('show');
        }
    });
});

// 进度条动画
function animateProgressBar() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');

    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// 页面加载完成后执行
window.addEventListener('load', function () {
    animateStats();
    checkScroll();
    animateProgressBar();
});

// 滚动时执行
window.addEventListener('scroll', checkScroll);

// 初始化Three.js场景
const container = document.getElementById('earth-container');
const scene = new THREE.Scene();//创造场景
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);//创造相机
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });//创造渲染器
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 创建地球
const earthGeometry = new THREE.SphereGeometry(3, 64, 64); //地球几何体
const earthTexture = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg');//地球纹理
const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    specular: new THREE.Color(0x333333),
    shininess: 5
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);//创造地球
scene.add(earth);

// 添加云层
const cloudGeometry = new THREE.SphereGeometry(3.05, 64, 64);
const cloudTexture = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png');
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.4
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加定向光（模拟太阳光）
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

camera.position.z = 7;

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 地球自转
    earth.rotation.y += 0.001;
    
    // 云层自转（速度略快于地球）
    clouds.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

// 处理窗口大小变化
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

// 启动动画
animate();