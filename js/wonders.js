
        // 移动端菜单
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // 点击菜单项关闭移动端菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
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
                }
            });
        });

        // 创建浮动粒子
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // 数字动画
        function animateNumbers() {
            const numbers = document.querySelectorAll('.stat-number, .hero-stat-number, .exhibition-stat-number');
            
            numbers.forEach(number => {
                const target = parseInt(number.textContent.replace(/[^\d]/g, ''));
                const suffix = number.textContent.replace(/[\d]/g, '');
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current) + suffix;
                }, 20);
            });
        }

        // 滚动动画观察器
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // 如果是统计数字，启动动画
                    if (entry.target.classList.contains('stats-section')) {
                        animateNumbers();
                    }
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.stat-card, .exhibition-card, .interactive-card, .education-card, .testimonial-card, .research-grid').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // 页面加载完成后初始化
        window.addEventListener('load', () => {
            createParticles();
            
            // 延迟启动数字动画
            setTimeout(() => {
                const statsSection = document.querySelector('.stats-section');
                if (statsSection) {
                    observer.observe(statsSection);
                }
            }, 1000);
        });

        // 卡片悬停效果增强
        document.querySelectorAll('.exhibition-card, .interactive-card, .education-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // 研究图片悬停效果
        document.querySelectorAll('.research-image').forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(1deg)';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // 按钮悬停效果
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (this.classList.contains('btn-primary')) {
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = 'var(--shadow-heavy)';
                } else {
                    this.style.background = 'white';
                    this.style.color = 'var(--primary-color)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (this.classList.contains('btn-primary')) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'var(--shadow-medium)';
                } else {
                    this.style.background = 'transparent';
                    this.style.color = 'white';
                }
            });
        });

        // 导航栏下滑变色，保持与其他页面一致
        window.addEventListener('scroll', function () {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });