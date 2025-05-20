// 导航栏滚动效果
        window.addEventListener('scroll', function () {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {  //当页面滚动超过50像素,为导航栏(header)添加scrolled类
                header.classList.add('scrolled');
            } else {  //当页面滚动回到顶部时,移除scrolled类
                header.classList.remove('scrolled');
            }
        });

        // 移动端菜单
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        // 为移动端菜单按钮添加点击事件监听器
        mobileMenu.addEventListener('click', function () {
            navLinks.classList.toggle('active');  //切换导航链接的active类
            mobileMenu.classList.toggle('active');  //切换移动端菜单的active类

            if (mobileMenu.classList.contains('active')) {  //切换移动端菜单的active
                mobileMenu.innerHTML = '<i class="fas fa-times"></i>';  // 如果包含active，将按钮内容更改为关闭图标
            } else {  //否则将按钮内容更改为菜单图标
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // 平滑滚动
        // 为每个带有href属性且以#开头的链接，添加点击事件监听器
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) { //阻止默认的链接点击行为
                e.preventDefault();

                const targetId = this.getAttribute('href'); //获取链接的href，即目标元素的 ID
                const targetElement = document.querySelector(targetId); //根据目标ID获取对应的DOM元素

                if (targetElement) {  //检查目标元素是否存在
                    window.scrollTo({ // 平滑滚动到目标元素的位置
                        top: targetElement.offsetTop - 80, //获取目标元素相对于视口顶部的距离
                        behavior: 'smooth' //设置滚动行为为平滑
                    });

                    // 关闭移动端菜单
                    if (navLinks.classList.contains('active')) {  //检查导航链接是否包含active
                        navLinks.classList.remove('active'); //移除导航链接的active
                        mobileMenu.classList.remove('active'); //移除菜单按钮的active
                        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>'; //将菜单按钮内容更改为菜单图标
                    }
                }
            });
        });

        // 标签页切换
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const tabId = this.getAttribute('data-tab');

                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // 展示区动画
        const showcaseItems = document.querySelectorAll('.showcase-item');

        function checkScroll() {
            showcaseItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (itemTop < windowHeight - 100) {
                    item.classList.add('show');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);

        // 数字动画
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;

        function animateNumbers() {
            if (animated) return;

            const conservationSection = document.querySelector('.conservation');
            const sectionTop = conservationSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 200) {
                statNumbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-count'));
                    const symbol = number.getAttribute('data-symbol');
                    let count = 0;
                    const duration = 2000; // 动画持续时间（毫秒）
                    const interval = Math.floor(duration / target);

                    const timer = setInterval(() => {
                        count += 1;
                        number.textContent = count;

                        if (count >= target) {
                            clearInterval(timer);
                            number.textContent = target;
                        }
                    }, interval > 10 ? interval : 10);
                });

                animated = true;
            }
        }

        window.addEventListener('scroll', animateNumbers);
        window.addEventListener('load', animateNumbers);

        // 弧形轮播图。变量初始化
        const arcCarouselItems = document.querySelectorAll('.arc-carousel-item');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentIndex = 0;  //当前显示的轮播图索引
        const totalItems = arcCarouselItems.length; //轮播图项目的总数
        const angleStep = 360 / totalItems;  //每个项目之间的角度步长，计算为360度除以项目总数。

        function updateCarousel() {
            arcCarouselItems.forEach((item, index) => { //遍历所有的轮播图项目
                // 计算每个项目的角度
                const angle = ((index - currentIndex) * angleStep) % 360;
                const radians = angle * Math.PI / 180; // 将角度转换为弧度
                const z = 400 * Math.cos(radians);  //计算z轴位置，使用余弦函数
                const x = 400 * Math.sin(radians);  //计算x轴位置，使用正弦函数
                const scale = (z + 400) / 800;      //计算缩放比例，基于z轴位置

                // 设置位置和样式
                //用CSS transform来设置项目的位置和旋转(居中,在y轴旋转,在z x轴移动)
                item.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${z}px) translateX(${x}px)`;
                item.style.opacity = scale;  //设置透明度，基于缩放比例
                item.style.zIndex = Math.floor(scale * 100); //设置z-index确保前面的项目显示在后面

                // 激活当前项目
                if (index === currentIndex) { //如果当前项目的索引等于currentIndex，则添加active
                    item.classList.add('active');
                } else { //否则移除active
                    item.classList.remove('active');
                }
            });
        }
-
        // 点击上一张按钮
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems; // 索引向前移动一位，使用模运算确保结果为正数
            updateCarousel(); //更新轮播图显示
        });
        // 点击下一张按钮
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });

        // 初始化轮播图
        updateCarousel();

        // 海洋生物详情弹窗(详细信息，关闭按钮，显示详细内容)
        const marineModal = document.getElementById('marine-modal');
        const modalClose = document.getElementById('modal-close');
        const modalBody = document.getElementById('modal-body');

        // 海洋生物数据
        const marineData = [
            {
                id: 1,
                name: "蓝鲸",
                scientificName: "Balaenoptera musculus",
                description: "蓝鲸是地球上最大的动物，也是有史以来生活在地球上最大的动物。成年蓝鲸的体长可达30米，体重可达200吨，相当于33头非洲象的重量。",
                habitat: "蓝鲸生活在世界各大洋中，它们通常独自或成对游泳，有时也会形成小群体。它们每年会进行长距离迁徙，在温暖的热带水域繁殖，在寒冷的极地水域觅食。",
                diet: "蓝鲸主要以磷虾为食，一头成年蓝鲸每天可以吃掉约4吨的磷虾。它们使用鲸须过滤海水，捕获大量的小型海洋生物。",
                conservation: "蓝鲸曾经因为商业捕鲸而濒临灭绝，虽然现在受到国际保护，但它们的数量仍然很少，面临着船只碰撞、噪音污染和气候变化等威胁。",
                stats: [
                    { name: "体长", value: "24-30米" },
                    { name: "体重", value: "100-200吨" },
                    { name: "寿命", value: "80-90年" },
                    { name: "保护状态", value: "濒危" }
                ],
                image: "https://www.shuomingshu.cn/wp-content/uploads/images/2023/01/05/018293b6-ba14-4247-8d62-bd03d17d94e0_tzlkxoc3pvj.jpg"
            },
            {
                id: 2,
                name: "大白鲨",
                scientificName: "Carcharodon carcharias",
                description: "大白鲨是海洋中最著名的掠食者之一，也是现存最大的掠食性鱼类。它们以其强大的咬合力和敏锐的感官而闻名，能够从很远的距离感知到猎物的存在。",
                habitat: "大白鲨分布在全球温带和亚热带海域，通常在沿海水域活动，但也会进行长距离的跨洋迁徙。它们喜欢在水温为12-24°C的区域活动。",
                diet: "年轻的大白鲨主要以鱼类和其他鲨鱼为食，而成年大白鲨则会捕食海豹、海狮和小型鲸类。它们通常使用'伏击'策略，从下方快速上升攻击猎物。",
                conservation: "尽管大白鲨在许多人心中是可怕的掠食者，但它们实际上面临着严重的生存威胁。过度捕捞、意外捕获和栖息地破坏使得大白鲨的数量持续下降。",
                stats: [
                    { name: "体长", value: "4.6-6.1米" },
                    { name: "体重", value: "2-3吨" },
                    { name: "寿命", value: "70年以上" },
                    { name: "保护状态", value: "易危" }
                ],
                image: "https://wallpaperm.cmcm.com/e7b087900231b88f066fff491b797cd9.jpg"
            },
            // 其他海洋生物数据...
            {
                id: 3,
                name: "珊瑚",
                scientificName: "Anthozoa",
                description: "珊瑚是由数以千计的微小生物——珊瑚虫组成的群体。这些生物通过从海水中提取钙来建造坚硬的骨骼结构，形成我们所知道的珊瑚礁。",
                habitat: "珊瑚礁主要分布在热带和亚热带的浅海区域，通常在水深不超过50米的清澈、温暖的水域中生长。全球最大的珊瑚礁系统是澳大利亚的大堡礁。",
                diet: "大多数珊瑚通过与共生藻类的关系获取营养。这些藻类通过光合作用产生能量，并与珊瑚分享。一些珊瑚也会捕食浮游生物。",
                conservation: "珊瑚礁面临着气候变化、海洋酸化、过度捕捞和污染等多重威胁。全球变暖导致的珊瑚白化现象已经对许多珊瑚礁造成了严重损害。",
                stats: [
                    { name: "种类", value: "超过6000种" },
                    { name: "生长速度", value: "每年0.3-10厘米" },
                    { name: "覆盖面积", value: "全球不到1%" },
                    { name: "保护状态", value: "多种濒危" }
                ],
                image: "https://pic.52112.com/180518/JPG-180518_378/Tdcr9roNHi_small.jpg"
            },
            {
                id: 4,
                name: "章鱼",
                scientificName: "Octopoda",
                description: "章鱼是一种高度智能的软体动物，拥有八条灵活的触手和复杂的神经系统。它们能够改变皮肤的颜色和纹理来伪装，还能通过狭小的缝隙逃脱。",
                habitat: "章鱼生活在世界各地的海洋中，从浅海到深海都有分布。不同种类的章鱼适应了不同的栖息环境，有些生活在珊瑚礁中，有些则生活在深海平原上。",
                diet: "章鱼主要捕食甲壳类动物、贝类和鱼类。它们使用喙状的嘴巴咬碎猎物的外壳，然后注入毒液使猎物瘫痪。",
                conservation: "虽然章鱼不像许多其他海洋生物那样面临灭绝威胁，但它们的栖息地破坏和过度捕捞仍然是需要关注的问题。",
                stats: [
                    { name: "触手数量", value: "8条" },
                    { name: "平均寿命", value: "1-2年" },
                    { name: "大脑大小", value: "5亿神经元" },
                    { name: "保护状态", value: "未评估" }
                ],
                image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
                id: 5,
                name: "海龟",
                scientificName: "Cheloniidae",
                description: "海龟是古老的海洋爬行动物，已经在地球上生存了超过1亿年。它们有坚硬的壳保护身体，长距离迁徙能力强，通常会回到出生的海滩产卵。",
                habitat: "海龟生活在世界各地的热带和亚热带海域，不同种类的海龟有不同的栖息地偏好。绿海龟喜欢在海草床觅食，而玳瑁则喜欢在珊瑚礁附近活动。",
                diet: "不同种类的海龟有不同的饮食习惯。绿海龟主要是素食主义者，以海草为食；而其他种类如玳瑁则以海绵、水母和其他无脊椎动物为食。",
                conservation: "所有七种海龟都被列为濒危或极危物种。它们面临着栖息地丧失、过度捕捞、塑料污染和气候变化等多重威胁。",
                stats: [
                    { name: "种类", value: "7种" },
                    { name: "寿命", value: "50-100年" },
                    { name: "迁徙距离", value: "数千公里" },
                    { name: "保护状态", value: "濒危" }
                ],
                image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
        ];

        // 点击轮播图项目打开弹窗
        document.querySelectorAll('.arc-carousel-item-inner').forEach(item => { //选择元素后执行回调函数
            item.addEventListener('click', function () {
                const id = parseInt(this.parentElement.getAttribute('data-id')); //获取data-id后转换为整数类型
                const marineInfo = marineData.find(item => item.id === id); //通过id查找对应的marineData

                if (marineInfo) {
                    //构建弹窗内容
                    let modalContent = `
                        <div class="marine-modal-header">
                            <img src="${marineInfo.image}" alt="${marineInfo.name}">
                            <div class="marine-modal-header-content">
                                <h2>${marineInfo.name}</h2>
                                <p><em>${marineInfo.scientificName}</em></p>
                            </div>
                        </div>
                        <div class="marine-modal-info">
                            <p>${marineInfo.description}</p>
                            
                            <div class="marine-modal-stats">
                                ${marineInfo.stats.map(stat => `
                                    <div class="marine-modal-stat">
                                        <h4>${stat.name}</h4>
                                        <p>${stat.value}</p>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <h3>栖息地</h3>
                            <p>${marineInfo.habitat}</p>
                            
                            <h3>饮食习惯</h3>
                            <p>${marineInfo.diet}</p>
                            
                            <h3>保护状况</h3>
                            <p>${marineInfo.conservation}</p>
                            
                            <div class="marine-modal-gallery">
                                <div class="marine-modal-gallery-item">
                                    <img src="${marineInfo.image}" alt="${marineInfo.name} 1">
                                </div>
                                <div class="marine-modal-gallery-item">
                                    <img src="${marineInfo.image.replace('w=1350', 'w=1351')}" alt="${marineInfo.name} 2">
                                </div>
                                <div class="marine-modal-gallery-item">
                                    <img src="${marineInfo.image.replace('w=1350', 'w=1352')}" alt="${marineInfo.name} 3">
                                </div>
                            </div>
                        </div>
                    `;

                    modalBody.innerHTML = modalContent; //更新弹窗
                    marineModal.classList.add('active'); //显示弹窗
                    document.body.style.overflow = 'hidden'; // 防止背景滚动
                }
            });
        });

        // 关闭弹窗
        modalClose.addEventListener('click', () => {
            marineModal.classList.remove('active');
            document.body.style.overflow = ''; // 恢复背景滚动
        });

        // 点击弹窗外部关闭弹窗
        marineModal.addEventListener('click', (e) => {
            if (e.target === marineModal) {
                marineModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // 创建背景粒子效果
        function createParticles(containerId, count, colorClass) {
            const container = document.getElementById(containerId);
            if (!container) return;

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle', colorClass);

                // 随机大小
                const size = Math.random() * 10 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                // 随机位置
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;

                // 随机透明度
                particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();

                // 添加动画
                particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
                particle.style.animationDelay = `${Math.random() * 5}s`;

                container.appendChild(particle);
            }
        }

        // 创建英雄区背景粒子
        createParticles('hero-particles', 30, 'hero-particle');

        // 页面加载完成后初始化
        window.addEventListener('load', function () {
            // 检查展示区动画
            checkScroll();

            // 检查数字动画
            animateNumbers();

            // 初始化轮播图
            updateCarousel();
        });
